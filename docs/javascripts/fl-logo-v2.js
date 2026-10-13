(function () {
  var img = document.querySelector('.fl-hero .fl-logo');
  if (!img) return;

  var fx = document.createElement('div'); fx.className = 'fl-logo-fx';
  var tilt = document.createElement('div'); tilt.className = 'fl-logo-tilt';
  var shine = document.createElement('div'); shine.className = 'fl-logo-shine';
  var cv = document.createElement('canvas'); cv.className = 'fl-logo-sparks';
  img.parentNode.insertBefore(fx, img);
  tilt.appendChild(img); tilt.appendChild(shine); fx.appendChild(tilt); fx.appendChild(cv);
  var ctx = cv.getContext('2d');

  var W = 0, H = 0, VW = 0, VH = 0, LX = 0, LY = 0, dpr = 1;
  function size() {
    dpr = Math.min(1.5, window.devicePixelRatio || 1);
    VW = window.innerWidth; VH = window.innerHeight;
    cv.width = Math.max(1, Math.round(VW * dpr)); cv.height = Math.max(1, Math.round(VH * dpr));
    rect();
  }
  function rect() { var r = fx.getBoundingClientRect(); LX = r.left; LY = r.top; W = r.width; H = r.height; }
  size();
  window.addEventListener("resize", size);

  var act = false, running = false, last = 0, punchAt = -1e9;
  var trx = 0, tryy = 0, rx = 0, ry = 0, sc = 0;
  var parts = [], rings = [];

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function ember() {
    parts.push({ x: LX + rnd(0.08, 0.92) * W, y: LY + rnd(0.5, 1) * H, vx: rnd(-14, 14), vy: -rnd(30, 95),
      g: 0, drag: 0, life: rnd(0.9, 1.8), age: 0, s: rnd(0.8, 2.4) });
  }

  function punch() {
    var now = performance.now();
    if (now - punchAt < 700) return;
    punchAt = now;
    fx.classList.remove('is-punch'); void fx.offsetWidth; fx.classList.add('is-punch');
    rect();
    var cx = LX + W / 2, cy = LY + H / 2, far = Math.sqrt(VW * VW + VH * VH) * 0.62;
    for (var i = 0; i < 70; i++) {
      var a = rnd(0, Math.PI * 2), v = rnd(110, 420);
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 220, drag: 1.6, life: rnd(0.5, 1.2), age: 0, s: rnd(0.8, 2.8) });
    }
    rings.push({ cx: cx, cy: cy, age: 0, dur: 1.1, r0: 0.25 * H, r1: far, c: '255,122,51', w: 4 });
    rings.push({ cx: cx, cy: cy, age: -0.14, dur: 1.2, r0: 0.25 * H, r1: far * 1.15, c: '255,235,200', w: 2 });
    start();
  }

  function frame(t) {
    var dt = Math.min(0.05, (t - last) / 1000); last = t;
    var k = 1 - Math.exp(-dt * 9);
    rx += (trx - rx) * k; ry += (tryy - ry) * k; sc += ((act ? 1 : 0) - sc) * k;
    tilt.style.transform = 'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) scale(' + (1 + 0.06 * sc).toFixed(3) + ')';

    rect();
    if (act) { var n = 90 * dt, c = Math.floor(n); if (Math.random() < n - c) c++; while (c-- > 0) ember(); }

    var cw = cv.width, ch = cv.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cw, ch);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'lighter';

    for (var i = rings.length - 1; i >= 0; i--) {
      var rg = rings[i]; rg.age += dt;
      if (rg.age >= rg.dur) { rings.splice(i, 1); continue; }
      if (rg.age < 0) continue;
      var p = rg.age / rg.dur, e = 1 - Math.pow(1 - p, 3);
      var rr = rg.r0 + (rg.r1 - rg.r0) * e;
      ctx.strokeStyle = 'rgba(' + rg.c + ',' + (0.85 * (1 - p)).toFixed(3) + ')';
      ctx.lineWidth = Math.max(0.5, rg.w * (1 - p));
      ctx.beginPath(); ctx.arc(rg.cx, rg.cy, rr, 0, Math.PI * 2); ctx.stroke();
    }

    for (var j = parts.length - 1; j >= 0; j--) {
      var q = parts[j]; q.age += dt;
      if (q.age >= q.life) { parts.splice(j, 1); continue; }
      var d = Math.exp(-q.drag * dt);
      q.vx *= d; q.vy = q.vy * d + q.g * dt; q.x += q.vx * dt; q.y += q.vy * dt;
      var f = 1 - q.age / q.life;
      ctx.fillStyle = 'rgba(255,' + Math.round(70 + 150 * f) + ',' + Math.round(20 + 110 * f * f) + ',' + (0.9 * f).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(q.x, q.y, q.s * (0.5 + 0.5 * f), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,110,30,' + (0.18 * f).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(q.x, q.y, q.s * 3, 0, Math.PI * 2); ctx.fill();
    }

    if (act || parts.length || rings.length || Math.abs(rx) > 0.05 || Math.abs(ry) > 0.05 || sc > 0.01) requestAnimationFrame(frame);
    else { running = false; tilt.style.transform = ''; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cw, ch); }
  }
  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } }

  function move(e) {
    var r = fx.getBoundingClientRect();
    var nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
    nx = Math.max(0, Math.min(1, nx)); ny = Math.max(0, Math.min(1, ny));
    tryy = (nx * 2 - 1) * 16; trx = -(ny * 2 - 1) * 16;
    tilt.style.setProperty('--mx', (nx * 100).toFixed(1) + '%');
    tilt.style.setProperty('--my', (ny * 100).toFixed(1) + '%');
  }

  fx.addEventListener('pointerenter', function (e) { act = true; fx.classList.add('is-on'); move(e); punch(); start(); });
  fx.addEventListener('pointermove', function (e) { if (act) move(e); });
  fx.addEventListener('pointerleave', function () { act = false; trx = 0; tryy = 0; fx.classList.remove('is-on'); start(); });
})();
