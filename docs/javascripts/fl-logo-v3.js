(function () {
  var img = document.querySelector('.fl-hero .fl-logo');
  if (!img) return;

  var fx = document.createElement('div'); fx.className = 'fl-logo-fx';
  var tilt = document.createElement('div'); tilt.className = 'fl-logo-tilt';
  var shine = document.createElement('div'); shine.className = 'fl-logo-shine';
  var cv = document.createElement('canvas'); cv.className = 'fl-logo-sparks';
  img.parentNode.insertBefore(fx, img);
  tilt.appendChild(img);
  function ghost(cls) {
    var g = img.cloneNode(false);
    g.className = 'fl-logo-ghost ' + cls; g.alt = ''; g.setAttribute('aria-hidden', 'true');
    g.removeAttribute('width'); g.removeAttribute('height'); g.removeAttribute('style');
    tilt.appendChild(g); return g;
  }
  var g1 = ghost('g1'), g2 = ghost('g2');
  tilt.appendChild(shine); fx.appendChild(tilt); fx.appendChild(cv);
  var ctx = cv.getContext('2d');

  // "Melting" distortion filter used while the trip builds up
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0';
  svg.innerHTML = '<filter id="fl-melt" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">' +
    '<feTurbulence id="fl-melt-t" type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="4" result="n"/>' +
    '<feDisplacementMap id="fl-melt-d" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>';
  document.body.appendChild(svg);
  var melT = svg.querySelector('#fl-melt-t'), melD = svg.querySelector('#fl-melt-d');
  var bg = document.querySelector('canvas.fl-bgfx');

  var W = 0, H = 0, VW = 0, VH = 0, LX = 0, LY = 0, dpr = 1;
  function rect() { var r = fx.getBoundingClientRect(); LX = r.left; LY = r.top; W = r.width; H = r.height; }
  function size() {
    dpr = Math.min(1.5, window.devicePixelRatio || 1);
    VW = window.innerWidth; VH = window.innerHeight;
    cv.width = Math.max(1, Math.round(VW * dpr)); cv.height = Math.max(1, Math.round(VH * dpr));
    rect();
  }
  size();
  window.addEventListener('resize', size);

  var act = false, running = false, last = 0, punchAt = -1e9, hold = 0, ie = 0, T = 0, dirty = false;
  var trx = 0, tryy = 0, rx = 0, ry = 0, sc = 0;
  var parts = [];

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function ember() {
    parts.push({ x: LX + rnd(0.08, 0.92) * W, y: LY + rnd(0.5, 1) * H, vx: rnd(-14, 14), vy: -rnd(30, 95) * (1 + ie),
      g: 0, drag: 0, life: rnd(0.9, 1.8), age: 0, s: rnd(0.8, 2.4) * (1 + ie), hue: Math.random() < ie ? rnd(0, 360) : -1 });
  }

  function punch() {
    var now = performance.now();
    if (now - punchAt < 700) return;
    punchAt = now;
    fx.classList.remove('is-punch'); void fx.offsetWidth; fx.classList.add('is-punch');
    rect();
    var cx = LX + W / 2, cy = LY + H / 2;
    for (var i = 0; i < 70; i++) {
      var a = rnd(0, Math.PI * 2), v = rnd(110, 420);
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 220, drag: 1.6, life: rnd(0.5, 1.2), age: 0, s: rnd(0.8, 2.8), hue: -1 });
    }
    start();
  }

  function trip() {
    if (ie > 0.003) {
      var hue = (ie * T * 90) % 360;
      var R = ie * W * 0.05, a1 = T * 1.7, a2 = a1 + 2.3;
      tilt.style.filter = 'url(#fl-melt) hue-rotate(' + hue.toFixed(1) + 'deg) saturate(' + (1 + ie * 0.9).toFixed(2) + ')';
      melD.setAttribute('scale', (ie * 26).toFixed(1));
      melT.setAttribute('baseFrequency', (0.011 + 0.004 * Math.sin(T * 0.7)).toFixed(4) + ' ' + (0.015 + 0.004 * Math.cos(T * 0.5)).toFixed(4));
      g1.style.opacity = (0.6 * ie).toFixed(3); g1.style.transform = 'translate(' + (Math.cos(a1) * R).toFixed(1) + 'px,' + (Math.sin(a1) * R).toFixed(1) + 'px)';
      g2.style.opacity = (0.6 * ie).toFixed(3); g2.style.transform = 'translate(' + (Math.cos(a2) * R).toFixed(1) + 'px,' + (Math.sin(a2) * R).toFixed(1) + 'px)';
      if (bg) {
        bg.style.filter = 'hue-rotate(' + ((ie * T * 55) % 360).toFixed(1) + 'deg) saturate(' + (1 + ie * 1.4).toFixed(2) + ') contrast(' + (1 + ie * 0.15).toFixed(2) + ')';
        bg.style.transform = 'scale(' + (1 + 0.03 * ie * (0.5 + 0.5 * Math.sin(T * 1.3))).toFixed(4) + ')';
      }
      dirty = true;
    } else if (dirty) {
      tilt.style.filter = ''; g1.style.opacity = '0'; g2.style.opacity = '0';
      if (bg) { bg.style.filter = ''; bg.style.transform = ''; }
      dirty = false;
    }
  }

  function frame(t) {
    var dt = Math.min(0.05, (t - last) / 1000); last = t; T = t / 1000;
    var k = 1 - Math.exp(-dt * 9);
    rx += (trx - rx) * k; ry += (tryy - ry) * k; sc += ((act ? 1 : 0) - sc) * k;
    hold = Math.max(0, Math.min(1, hold + (act ? dt / 8 : -dt / 2.5)));
    ie = hold * hold * (3 - 2 * hold);
    var breathe = 0.03 * ie * Math.sin(T * 2.2);
    tilt.style.transform = 'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) scale(' + (1 + 0.06 * sc + breathe).toFixed(3) + ')';
    trip();
    rect();

    if (act) { var n = 90 * (1 + 2 * ie) * dt, c = Math.floor(n); if (Math.random() < n - c) c++; while (c-- > 0) ember(); }

    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'lighter';

    if (ie > 0.01) {
      var cx = LX + W / 2, cy = LY + H / 2, far = Math.sqrt(VW * VW + VH * VH) * 0.62, hu = (T * 60) % 360;
      var gr = ctx.createRadialGradient(cx, cy, far * (0.25 + 0.05 * Math.sin(T * 2)), cx, cy, far);
      gr.addColorStop(0, 'hsla(' + hu.toFixed(0) + ',100%,55%,0)');
      gr.addColorStop(1, 'hsla(' + ((hu + 90) % 360).toFixed(0) + ',100%,50%,' + (0.3 * ie).toFixed(3) + ')');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, VW, VH);
    }

    for (var j = parts.length - 1; j >= 0; j--) {
      var q = parts[j]; q.age += dt;
      if (q.age >= q.life) { parts.splice(j, 1); continue; }
      var d = Math.exp(-q.drag * dt);
      q.vx = q.vx * d + Math.sin(T * 3 + q.y * 0.02) * 40 * ie * dt * 10; q.vy = q.vy * d + q.g * dt; q.x += q.vx * dt; q.y += q.vy * dt;
      var f = 1 - q.age / q.life;
      ctx.fillStyle = q.hue >= 0 ? 'hsla(' + q.hue.toFixed(0) + ',100%,62%,' + (0.9 * f).toFixed(3) + ')'
        : 'rgba(255,' + Math.round(70 + 150 * f) + ',' + Math.round(20 + 110 * f * f) + ',' + (0.9 * f).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(q.x, q.y, q.s * (0.5 + 0.5 * f), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = q.hue >= 0 ? 'hsla(' + q.hue.toFixed(0) + ',100%,60%,' + (0.18 * f).toFixed(3) + ')' : 'rgba(255,110,30,' + (0.18 * f).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(q.x, q.y, q.s * 3, 0, Math.PI * 2); ctx.fill();
    }

    if (act || parts.length || ie > 0.003 || hold > 0 || Math.abs(rx) > 0.05 || Math.abs(ry) > 0.05 || sc > 0.01) requestAnimationFrame(frame);
    else { running = false; tilt.style.transform = ''; ie = 0; trip(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); }
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
