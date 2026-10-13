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
  // melting displacement, then chromatic aberration (red and blue channels pushed apart)
  svg.innerHTML = '<filter id="fl-melt" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">' +
    '<feTurbulence id="fl-melt-t" type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="4" result="n"/>' +
    '<feDisplacementMap id="fl-melt-d" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
    '<feColorMatrix in="d" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>' +
    '<feColorMatrix in="d" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>' +
    '<feColorMatrix in="d" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>' +
    '<feOffset id="fl-ca-r" in="r" dx="0" dy="0" result="ro"/><feOffset id="fl-ca-b" in="b" dx="0" dy="0" result="bo"/>' +
    '<feBlend in="ro" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="bo" mode="screen"/></filter>' +
    '<filter id="fl-warp" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence id="fl-warp-t" type="fractalNoise" baseFrequency="0.004 0.009" numOctaves="1" seed="9" result="w"/><feDisplacementMap id="fl-warp-d" in="SourceGraphic" in2="w" scale="0" xChannelSelector="R" yChannelSelector="B"/></filter>';
  document.body.appendChild(svg);
  var melT = svg.querySelector('#fl-melt-t'), melD = svg.querySelector('#fl-melt-d'), caR = svg.querySelector('#fl-ca-r'), caB = svg.querySelector('#fl-ca-b'), warpT = svg.querySelector('#fl-warp-t'), warpD = svg.querySelector('#fl-warp-d');
  var root = document.documentElement, style = root.style;

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

  var act = false, running = false, last = 0, punchAt = -1e9, hold = 0, ie = 0, T = 0, dirty = false, dofOn = false;
  var trx = 0, tryy = 0, rx = 0, ry = 0, sc = 0;
  var L1 = 0, L2 = 0, L3 = 0;
  var parts = [];

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

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

  // Stages follow the in-game effect: 1 hallucinations + fatigue, 2 double vision + blur (depth of field), 3 disorientation
  function trip() {
    if (ie > 0.003) {
      var small = VW < 700 ? 0.6 : 1;
      var hue = (ie * T * 90) % 360;
      var blur = L2 * 1.8 * (0.55 + 0.45 * Math.sin(T * 1.2));
      tilt.style.filter = 'url(#fl-melt) hue-rotate(' + hue.toFixed(1) + 'deg) saturate(' + (1 + ie * 0.9).toFixed(2) +
        ') brightness(' + (1 - 0.18 * L1).toFixed(2) + ') blur(' + blur.toFixed(2) + 'px)';
      melD.setAttribute('scale', (6 * L1 + 10 * L2 + 14 * L3).toFixed(1));
      // chromatic aberration: grows with the time spent on the logo, pulses and slowly turns
      var ca = W * (0.002 + 0.034 * Math.pow(ie, 1.2)) * (0.75 + 0.25 * Math.sin(T * 3.1)), cd = T * 0.8;
      caR.setAttribute('dx', (Math.cos(cd) * ca).toFixed(2)); caR.setAttribute('dy', (Math.sin(cd) * ca * 0.6).toFixed(2));
      caB.setAttribute('dx', (-Math.cos(cd) * ca).toFixed(2)); caB.setAttribute('dy', (-Math.sin(cd) * ca * 0.6).toFixed(2));
      melT.setAttribute('baseFrequency', (0.011 + 0.004 * Math.sin(T * 0.7)).toFixed(4) + ' ' + (0.015 + 0.004 * Math.cos(T * 0.5)).toFixed(4));

      // ghosts: small orbit (stage 1) -> horizontal double vision (stage 2)
      var R = (0.012 + 0.07 * L2) * W * (0.8 + 0.2 * Math.sin(T * 1.1)), a1 = T * 1.7 * (1 - L2), a2 = a1 + Math.PI * (1 - 0.0);
      var ox = Math.cos(a1) * R * (1 - L2) + R * L2, oy = Math.sin(a1) * R * (1 - L2) * 0.8 + Math.sin(T * 0.9) * W * 0.01 * L2;
      var op = 0.22 * L1 + 0.4 * L2;
      g1.style.opacity = op.toFixed(3); g1.style.transform = 'translate(' + ox.toFixed(1) + 'px,' + oy.toFixed(1) + 'px)';
      g2.style.opacity = op.toFixed(3); g2.style.transform = 'translate(' + (-ox).toFixed(1) + 'px,' + (-oy).toFixed(1) + 'px)';

      // the rest of the page loses focus and starts to sway (depth of field, disorientation)
      if (L2 > 0.02 || L3 > 0.02) {
        if (!dofOn) { root.classList.add('fl-dof'); dofOn = true; }
        // rainbow waves bend the surroundings (desktop only: the displacement filter is too heavy for phones)
        var wp = VW >= 700;
        root.classList.toggle('fl-warp', wp);
        if (wp) {
          warpD.setAttribute('scale', (18 * L2 + 14 * L3).toFixed(1));
          warpT.setAttribute('baseFrequency', (0.004 + 0.0015 * Math.sin(T * 0.6)).toFixed(4) + ' ' + (0.009 + 0.003 * Math.cos(T * 0.45)).toFixed(4));
        }
        style.setProperty('--fl-blur', (L2 * 3.2 * (0.6 + 0.4 * Math.sin(T * 0.8 + 1))).toFixed(2) + 'px');
        style.setProperty('--fl-sx', (Math.sin(T * 0.9) * 7 * L3 * small).toFixed(1) + 'px');
        style.setProperty('--fl-sy', (Math.cos(T * 0.7) * 4 * L3 * small).toFixed(1) + 'px');
        style.setProperty('--fl-sr', (Math.sin(T * 0.8 + 2) * 1.1 * L3 * small).toFixed(2) + 'deg');
      }
      dirty = true;
    } else if (dirty) {
      tilt.style.filter = ''; g1.style.opacity = '0'; g2.style.opacity = '0';
      dirty = false;
    }
    if (dofOn && L2 <= 0.02 && L3 <= 0.02) {
      root.classList.remove('fl-dof'); root.classList.remove('fl-warp'); dofOn = false;
      style.removeProperty('--fl-blur'); style.removeProperty('--fl-sx'); style.removeProperty('--fl-sy'); style.removeProperty('--fl-sr');
    }
  }


  function frame(t) {
    var dt = Math.min(0.05, (t - last) / 1000); last = t; T = t / 1000;
    var k = 1 - Math.exp(-dt * (9 - 5 * L1));       // fatigue: the tilt follows the cursor more sluggishly
    rx += (trx - rx) * k; ry += (tryy - ry) * k; sc += ((act ? 1 : 0) - sc) * k;
    hold = Math.max(0, Math.min(1, hold + (act ? dt / 8 : -dt / 3)));
    ie = hold * hold * (3 - 2 * hold);
    L1 = clamp01(ie / 0.34); L2 = clamp01((ie - 0.28) / 0.4); L3 = clamp01((ie - 0.6) / 0.4);
    var breathe = 0.03 * ie * Math.sin(T * 2.2);
    var sway = L3 * 7 * Math.sin(T * 0.9);
    tilt.style.transform = 'perspective(800px) rotateX(' + (rx + L3 * 5 * Math.cos(T * 0.7)).toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) +
      'deg) rotate(' + sway.toFixed(2) + 'deg) scale(' + (1 + 0.06 * sc + breathe).toFixed(3) + ')';
    trip();
    rect();

    if (act) { var n = 90 * (1 + 2 * ie) * dt, c = Math.floor(n); if (Math.random() < n - c) c++; while (c-- > 0) ember(); }


    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    // fatigue: heavy eyelids closing from the top and the bottom of the screen
    if (L1 > 0.01) {
      var lid = VH * 0.16 * L1 * (0.55 + 0.45 * Math.sin(T * 0.9)), a = 0.55 * L1;
      var gt = ctx.createLinearGradient(0, 0, 0, lid), gb = ctx.createLinearGradient(0, VH, 0, VH - lid);
      gt.addColorStop(0, 'rgba(6,4,8,' + a.toFixed(3) + ')'); gt.addColorStop(1, 'rgba(6,4,8,0)');
      gb.addColorStop(0, 'rgba(6,4,8,' + a.toFixed(3) + ')'); gb.addColorStop(1, 'rgba(6,4,8,0)');
      ctx.fillStyle = gt; ctx.fillRect(0, 0, VW, lid);
      ctx.fillStyle = gb; ctx.fillRect(0, VH - lid, VW, lid);
    }

    ctx.globalCompositeOperation = 'lighter';
    if (ie > 0.01) {
      var cx = LX + W / 2, cy = LY + H / 2, far = Math.sqrt(VW * VW + VH * VH) * 0.62, hu = (T * 60) % 360;
      var gr = ctx.createRadialGradient(cx, cy, far * (0.25 + 0.05 * Math.sin(T * 2)), cx, cy, far);
      gr.addColorStop(0, 'hsla(' + hu.toFixed(0) + ',100%,55%,0)');
      gr.addColorStop(1, 'hsla(' + ((hu + 90) % 360).toFixed(0) + ',100%,50%,' + (0.3 * ie).toFixed(3) + ')');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, VW, VH);
    }

    // rainbow waves rolling over the whole screen (stage 2 and 3)
    if (L2 > 0.01) {
      var N = 12, bh = VH / N, al = 0.07 * L2 + 0.05 * L3, step = Math.max(16, Math.round(VW / 48));
      for (var b = -1; b <= N; b++) {
        var yc = b * bh + (T * 25) % bh + Math.sin(T * 0.8 + b * 0.7) * bh * 0.5, amp = bh * (0.25 + 0.35 * L3), kx = 0.006 + 0.002 * Math.sin(T * 0.3 + b);
        ctx.fillStyle = 'hsla(' + (((b * 30 + T * 40) % 360 + 360) % 360).toFixed(0) + ',100%,55%,' + al.toFixed(3) + ')';
        ctx.beginPath();
        for (var x = 0; x <= VW + step; x += step) ctx.lineTo(x, yc + Math.sin(x * kx + T * 1.5 + b) * amp);
        for (var x2 = VW + step; x2 >= 0; x2 -= step) ctx.lineTo(x2, yc + bh * 0.9 + Math.sin(x2 * kx + T * 1.5 + b + 0.6) * amp);
        ctx.closePath(); ctx.fill();
      }
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
    else { running = false; tilt.style.transform = ''; ie = 0; L1 = L2 = L3 = 0; trip(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); }
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

  function leave() { act = false; trx = 0; tryy = 0; fx.classList.remove('is-on'); start(); }
  fx.addEventListener('pointerenter', function (e) { act = true; fx.classList.add('is-on'); move(e); punch(); start(); });
  fx.addEventListener('pointermove', function (e) { if (act) move(e); });
  fx.addEventListener('pointerleave', leave);
  fx.addEventListener('pointercancel', leave);
})();
