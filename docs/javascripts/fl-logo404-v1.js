(function () {
  // 404 page logo: the home logo effect (3D tilt, light sweep, punch with shockwave, embers) and a silent link back home.
  var lg = document.getElementById('fl-lg');
  if (!lg) return;
  var HOME = lg.getAttribute('href') || '/';
  var tilt = lg.querySelector('.tilt'), img = lg.querySelector('img');
  var pointer = 'mouse';

  // a click on the logo goes home; on a touch screen the tap first shows the punch
  lg.addEventListener('pointerdown', function (e) { pointer = e.pointerType || 'mouse'; });
  lg.addEventListener('click', function (e) {
    if (e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setTimeout(function () { location.assign(HOME); }, pointer === 'mouse' ? 0 : 450);
  });

  var off = false;
  try { off = localStorage.getItem('fl-fx') === 'off'; } catch (e) {}
  if (off || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

  var cv = document.createElement('canvas'); cv.className = 'fx'; cv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d'), VW = 0, VH = 0, dpr = 1;
  function size() {
    dpr = Math.min(1.5, window.devicePixelRatio || 1); VW = window.innerWidth; VH = window.innerHeight;
    cv.width = Math.max(1, Math.round(VW * dpr)); cv.height = Math.max(1, Math.round(VH * dpr));
  }
  size(); window.addEventListener('resize', size);

  function rnd(a, b) { return a + Math.random() * (b - a); }
  var parts = [], act = false, running = false, last = 0, punchAt = -1e9;
  var trx = 0, tryy = 0, rx = 0, ry = 0, sc = 0, LX = 0, LY = 0, W = 0, H = 0;

  function rect() { var r = lg.getBoundingClientRect(); LX = r.left; LY = r.top; W = r.width; H = r.height; }

  function punch() {
    var now = performance.now();
    if (now - punchAt < 700) return;
    punchAt = now;
    lg.classList.remove('is-punch'); void lg.offsetWidth; lg.classList.add('is-punch');
    rect();
    var cx = LX + W / 2, cy = LY + H / 2;
    for (var i = 0; i < 70; i++) {
      var a = rnd(0, Math.PI * 2), v = rnd(110, 420);
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 220, drag: 1.6, life: rnd(0.5, 1.2), age: 0, s: rnd(0.8, 2.8) });
    }
    start();
  }

  function frame(t) {
    var dt = Math.min(0.05, (t - last) / 1000); last = t;
    var k = 1 - Math.exp(-dt * 9);
    rx += (trx - rx) * k; ry += (tryy - ry) * k; sc += ((act ? 1 : 0) - sc) * k;
    tilt.style.transform = 'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) scale(' + (1 + 0.06 * sc).toFixed(3) + ')';
    rect();
    if (act) {   // embers rising from the lower half of the logo
      var n = 90 * dt, c = Math.floor(n); if (Math.random() < n - c) c++;
      while (c-- > 0) parts.push({ x: LX + rnd(0.08, 0.92) * W, y: LY + rnd(0.5, 1) * H, vx: rnd(-14, 14), vy: -rnd(30, 95), g: 0, drag: 0, life: rnd(0.9, 1.8), age: 0, s: rnd(0.8, 2.4) });
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
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
    if (act || parts.length || Math.abs(rx) > 0.05 || Math.abs(ry) > 0.05 || sc > 0.01) requestAnimationFrame(frame);
    else { running = false; tilt.style.transform = ''; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); }
  }
  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } }

  function move(e) {
    var r = lg.getBoundingClientRect();
    var nx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), ny = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    tryy = (nx * 2 - 1) * 16; trx = -(ny * 2 - 1) * 16;
    tilt.style.setProperty('--mx', (nx * 100).toFixed(1) + '%'); tilt.style.setProperty('--my', (ny * 100).toFixed(1) + '%');
  }
  lg.addEventListener('pointerenter', function (e) { lg.classList.add('is-on'); act = true; rect(); move(e); punch(); start(); });
  lg.addEventListener('pointermove', function (e) { if (act) move(e); });
  function leave() { lg.classList.remove('is-on'); act = false; trx = 0; tryy = 0; start(); }
  lg.addEventListener('pointerleave', leave);
  lg.addEventListener('pointercancel', leave);
})();
