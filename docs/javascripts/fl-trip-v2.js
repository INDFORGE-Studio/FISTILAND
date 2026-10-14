(function () {
  // Hallucination effect. Two kinds of subjects can trigger it:
  //  - the home logo (classic orange effect for everybody; the hallucination only exists once the Iron rank is reached)
  //  - the toxic mushrooms of the Mushrooms page
  var logoImg = document.querySelector('.fl-hero .fl-logo');
  var cards = [].slice.call(document.querySelectorAll('.fl-mush.is-tox'));
  if (!logoImg && !cards.length) return;

  function egg(name) { try { window.dispatchEvent(new CustomEvent('fl-egg', { detail: name })); } catch (e) {} }
  function iron() { return !!(window.flRank && window.flRank.hasIron()); }
  // a Veteran has already cured themselves: the home logo no longer hallucinates for them, and its base effect takes the theme colour
  function veteran() { return !!(window.flRank && window.flRank.rank() === 'veteran'); }
  var tone = null;
  function readTone() {
    function rgb(n) {
      var v = getComputedStyle(document.documentElement).getPropertyValue(n).split(',').map(function (x) { return parseInt(x, 10); });
      return v.length === 3 && !v.some(isNaN) ? v : null;
    }
    var o = rgb('--fl-or-rgb'), h = rgb('--fl-hot-rgb');
    tone = veteran() && o && h ? { o: o, h: h, l: h.map(function (c) { return Math.round(c + (255 - c) * 0.45); }) } : null;
  }
  // particle colour: bright theme tone when fresh, deeper theme tone when old
  function toneRgb(f) {
    return Math.round(tone.o[0] + (tone.l[0] - tone.o[0]) * f) + ',' + Math.round(tone.o[1] + (tone.l[1] - tone.o[1]) * f) + ',' + Math.round(tone.o[2] + (tone.l[2] - tone.o[2]) * f);
  }

  // ---- shared layers: screen canvas, backdrop blur layer, SVG filter ----
  var cv = document.createElement('canvas'); cv.className = 'fl-trip-canvas'; cv.setAttribute('aria-hidden', 'true');
  var dof = document.createElement('div'); dof.className = 'fl-trip-dof'; dof.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dof); document.body.appendChild(cv);
  var ctx = cv.getContext('2d');

  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0';
  svg.innerHTML = '<filter id="fl-melt" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="4" result="n"/><feOffset id="fl-melt-o" in="n" dx="0" dy="0" result="no"/>' +
    '<feDisplacementMap id="fl-melt-d" in="SourceGraphic" in2="no" scale="0" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
    '<feColorMatrix in="d" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>' +
    '<feColorMatrix in="d" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>' +
    '<feColorMatrix in="d" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>' +
    '<feOffset id="fl-ca-r" in="r" dx="0" dy="0" result="ro"/><feOffset id="fl-ca-b" in="b" dx="0" dy="0" result="bo"/>' +
    '<feBlend in="ro" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="bo" mode="screen"/></filter>';
  document.body.appendChild(svg);
  var melD = svg.querySelector('#fl-melt-d'), melO = svg.querySelector('#fl-melt-o'), caR = svg.querySelector('#fl-ca-r'), caB = svg.querySelector('#fl-ca-b');

  var VW = 0, VH = 0, dpr = 1;
  function size() {
    dpr = Math.min(1.5, window.devicePixelRatio || 1);
    VW = window.innerWidth; VH = window.innerHeight;
    cv.width = Math.max(1, Math.round(VW * dpr)); cv.height = Math.max(1, Math.round(VH * dpr));
  }
  size();
  window.addEventListener('resize', size);

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  // ---- subjects ----
  function copyOf(base, cls) {
    var g = base.cloneNode(base.nodeName.toLowerCase() === 'svg');
    if (g.nodeName.toLowerCase() === 'svg') g.setAttribute('class', cls); else g.className = cls;
    g.setAttribute('aria-hidden', 'true'); g.removeAttribute('width'); g.removeAttribute('height'); g.removeAttribute('style');
    if (g.nodeName.toLowerCase() === 'img') g.alt = '';
    return g;
  }
  // host: positioned box holding the base picture; the distorted copy and two colour ghosts are stacked over it
  function layers(host, base, S) {
    host.classList.add('fl-trip-host');
    var trip = document.createElement('div'); trip.className = 'fl-logo-trip'; trip.setAttribute('aria-hidden', 'true');
    trip.appendChild(copyOf(base, 'fl-logo-trip-img'));
    var g1 = copyOf(base, 'fl-logo-ghost g1'), g2 = copyOf(base, 'fl-logo-ghost g2');
    host.appendChild(trip); host.appendChild(g1); host.appendChild(g2);
    S.host = host; S.base = base; S.trip = trip; S.g1 = g1; S.g2 = g2;
  }

  var logo = null;
  if (logoImg) {
    var fx = document.createElement('div'); fx.className = 'fl-logo-fx';
    var tilt = document.createElement('div'); tilt.className = 'fl-logo-tilt';
    var shine = document.createElement('div'); shine.className = 'fl-logo-shine';
    logoImg.parentNode.insertBefore(fx, logoImg);
    tilt.appendChild(logoImg); fx.appendChild(tilt);
    logo = { kind: 'logo', el: fx, tilt: tilt, delay: 3, ramp: 9 };
    layers(tilt, logoImg, logo);
    tilt.appendChild(shine);
  }
  var mushes = cards.map(function (card) {
    var s = card.querySelector(':scope > svg');
    if (!s) return null;
    var wrap = document.createElement('span'); wrap.className = 'fl-mush-ico';
    card.insertBefore(wrap, s); wrap.appendChild(s);
    var S = { kind: 'mush', el: wrap, card: card, delay: 0.5, ramp: 6 };
    layers(wrap, s, S);
    return S;
  }).filter(Boolean);

  // ---- state ----
  var cur = null, act = false, running = false, last = 0, punchAt = -1e9, hold = 0, dwell = 0, ie = 0, T = 0, masterSent = false;
  var trx = 0, tryy = 0, rx = 0, ry = 0, sc = 0;
  var L1 = 0, L2 = 0, L3 = 0, hueAcc = 0, orbAcc = 0, waveAcc = 0;
  var LX = 0, LY = 0, W = 0, H = 0;
  var parts = [];

  function rect() {
    if (!cur) return;
    var r = cur.el.getBoundingClientRect(); LX = r.left; LY = r.top; W = r.width; H = r.height;
  }

  function ember() {
    var mush = cur && cur.kind === 'mush';
    parts.push({ x: LX + rnd(0.08, 0.92) * W, y: LY + rnd(0.5, 1) * H, vx: rnd(-14, 14), vy: -rnd(30, 95) * (1 + ie),
      g: 0, drag: 0, life: rnd(0.9, 1.8), age: 0, s: rnd(0.8, 2.4) * (1 + ie), hue: (mush || Math.random() < ie) ? rnd(0, 360) : -1, th: !mush && !!tone });
  }

  function punch() {
    var now = performance.now();
    if (now - punchAt < 700) return;
    punchAt = now;
    logo.el.classList.remove('is-punch'); void logo.el.offsetWidth; logo.el.classList.add('is-punch');
    rect();
    var cx = LX + W / 2, cy = LY + H / 2;
    for (var i = 0; i < 70; i++) {
      var a = rnd(0, Math.PI * 2), v = rnd(110, 420);
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 220, drag: 1.6, life: rnd(0.5, 1.2), age: 0, s: rnd(0.8, 2.8), hue: -1, th: !!tone });
    }
    start();
  }

  function clearLayers(S) {
    if (!S) return;
    S.trip.style.visibility = 'hidden'; S.trip.style.opacity = '0'; S.trip.style.filter = '';
    S.base.style.opacity = ''; S.g1.style.opacity = '0'; S.g2.style.opacity = '0';
  }

  // Stages follow the in-game effect: 1 hallucinations + fatigue, 2 double vision + blur (depth of field), 3 disorientation
  function update() {
    var S = cur;
    if (S) {
      // distorted copy: fades in, the clean picture fades out behind it
      var tOp = clamp01(ie / 0.12); tOp = tOp * tOp * (3 - 2 * tOp);
      if (tOp > 0.001) {
        var sf = Math.max(0.22, Math.min(1, W / 360));
        var blur = L2 * 1.8 * sf * (0.55 + 0.45 * Math.sin(T * 1.2));
        S.trip.style.visibility = 'visible';
        S.trip.style.opacity = tOp.toFixed(3);
        S.trip.style.filter = 'url(#fl-melt) hue-rotate(' + hueAcc.toFixed(1) + 'deg) saturate(' + (1 + ie * 0.9).toFixed(2) +
          ') brightness(' + (1 - 0.18 * L1).toFixed(2) + ') blur(' + blur.toFixed(2) + 'px) drop-shadow(0 0 ' + (12 * sf).toFixed(1) + 'px rgba(255,122,51,.8)) drop-shadow(0 0 ' + (38 * sf).toFixed(1) + 'px rgba(232,99,28,.55))';
        S.base.style.opacity = (1 - 0.92 * tOp).toFixed(3);
        melD.setAttribute('scale', ((6 * L1 + 10 * L2 + 14 * L3) * sf).toFixed(1));
        melO.setAttribute('dx', (Math.sin(T * 0.45) * 22 * sf).toFixed(1)); melO.setAttribute('dy', (Math.cos(T * 0.37) * 22 * sf).toFixed(1));
        // chromatic aberration: grows with the time spent, pulses and slowly turns
        var ca = W * (0.002 + 0.034 * Math.pow(ie, 1.2)) * (0.75 + 0.25 * Math.sin(T * 3.1)), cd = T * 0.8;
        caR.setAttribute('dx', (Math.cos(cd) * ca).toFixed(2)); caR.setAttribute('dy', (Math.sin(cd) * ca * 0.6).toFixed(2));
        caB.setAttribute('dx', (-Math.cos(cd) * ca).toFixed(2)); caB.setAttribute('dy', (-Math.sin(cd) * ca * 0.6).toFixed(2));
        // ghosts: small orbit (stage 1) -> horizontal double vision (stage 2)
        var R = (0.012 + 0.07 * L2) * W * (0.8 + 0.2 * Math.sin(T * 1.1)), a1 = orbAcc;
        var ox = Math.cos(a1) * R * (1 - L2) + R * L2, oy = Math.sin(a1) * R * (1 - L2) * 0.8 + Math.sin(T * 0.9) * W * 0.01 * L2;
        var op = 0.22 * L1 + 0.4 * L2;
        S.g1.style.opacity = op.toFixed(3); S.g1.style.transform = 'translate(' + ox.toFixed(1) + 'px,' + oy.toFixed(1) + 'px)';
        S.g2.style.opacity = op.toFixed(3); S.g2.style.transform = 'translate(' + (-ox).toFixed(1) + 'px,' + (-oy).toFixed(1) + 'px)';
      } else if (S.trip.style.visibility === 'visible') {
        clearLayers(S);
      }
    }
    // the rest of the page loses focus and its colours drift, through a backdrop layer: the page itself is never touched
    if (L2 > 0.003) {
      var bl = L2 * 3.2 * (0.6 + 0.4 * Math.sin(T * 0.8 + 1));
      var v = 'blur(' + bl.toFixed(2) + 'px) hue-rotate(' + (hueAcc * 0.5 * L2).toFixed(1) + 'deg) saturate(' + (1 + 0.8 * L2).toFixed(2) + ')';
      dof.style.visibility = 'visible'; dof.style.webkitBackdropFilter = v; dof.style.backdropFilter = v;
    } else if (dof.style.visibility === 'visible') {
      dof.style.visibility = 'hidden'; dof.style.webkitBackdropFilter = ''; dof.style.backdropFilter = '';
    }
  }

  function frame(t) {
    var dt = Math.min(0.05, (t - last) / 1000); last = t; T = t / 1000;
    var isLogo = cur && cur.kind === 'logo';
    var k = 1 - Math.exp(-dt * (9 - 5 * L1));       // fatigue: the tilt follows the cursor more sluggishly
    rx += (trx - rx) * k; ry += (tryy - ry) * k; sc += ((act && isLogo ? 1 : 0) - sc) * k;
    // the hallucination exists on the home logo only for Iron players; toxic mushrooms always trigger it
    var enabled = act && cur && (cur.kind === 'mush' || (iron() && !veteran()));
    if (enabled) {
      dwell += dt; hold = Math.max(hold, clamp01((dwell - cur.delay) / cur.ramp));
      if (isLogo && !masterSent && dwell > cur.delay) { masterSent = true; egg('master'); }
    } else { dwell = Math.max(0, dwell - dt * 3); hold = clamp01(hold - dt / 3); }
    ie = hold * hold * (3 - 2 * hold);
    L1 = clamp01(ie / 0.34); L2 = clamp01((ie - 0.28) / 0.4); L3 = clamp01((ie - 0.6) / 0.4);
    hueAcc = (hueAcc + dt * 90 * ie) % 360; orbAcc += dt * 1.7 * (1 - L2); waveAcc += dt * 25;
    if (logo) {
      var breathe = isLogo ? 0.03 * ie * Math.sin(T * 2.2) : 0, sway = isLogo ? L3 * 7 * Math.sin(T * 0.9) : 0;
      logo.tilt.style.transform = 'perspective(800px) rotateX(' + (rx + (isLogo ? L3 * 5 * Math.cos(T * 0.7) : 0)).toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) +
        'deg) rotate(' + sway.toFixed(2) + 'deg) scale(' + (1 + 0.06 * sc + breathe).toFixed(3) + ')';
    }
    update();
    rect();

    if (act && cur && (isLogo || ie > 0.05)) { var n = 90 * (1 + 2 * ie) * dt * (isLogo ? 1 : 0.5), c = Math.floor(n); if (Math.random() < n - c) c++; while (c-- > 0) ember(); }

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

    // rainbow waves rolling over the whole screen (stage 2 and 3); band numbers follow the scroll, so colours never jump
    if (L2 > 0.01) {
      var N = 12, bh = VH / N, al = 0.07 * L2 + 0.05 * L3, step = Math.max(16, Math.round(VW / 48));
      var s = waveAcc / bh, n0 = Math.floor(s), fr = s - n0;
      for (var i = -1; i <= N; i++) {
        var m = i - n0, yc = (i + fr) * bh + Math.sin(T * 0.8 + m * 0.7) * bh * 0.5, amp = bh * (0.25 + 0.35 * L3);
        ctx.fillStyle = 'hsla(' + (((m * 30 + T * 40) % 360 + 360) % 360).toFixed(0) + ',100%,55%,' + al.toFixed(3) + ')';
        ctx.beginPath();
        for (var x = 0; x <= VW + step; x += step) ctx.lineTo(x, yc + Math.sin(x * 0.007 + T * 1.5 + m) * amp);
        for (var x2 = VW + step; x2 >= 0; x2 -= step) ctx.lineTo(x2, yc + bh * 0.9 + Math.sin(x2 * 0.007 + T * 1.5 + m + 0.6) * amp);
        ctx.closePath(); ctx.fill();
      }
    }

    for (var j = parts.length - 1; j >= 0; j--) {
      var q = parts[j]; q.age += dt;
      if (q.age >= q.life) { parts.splice(j, 1); continue; }
      var d = Math.exp(-q.drag * dt);
      q.vx = q.vx * d + Math.sin(T * 3 + q.y * 0.02) * 40 * ie * dt * 10; q.vy = q.vy * d + q.g * dt; q.x += q.vx * dt; q.y += q.vy * dt;
      var f = 1 - q.age / q.life;
      var th = q.th && tone;
      ctx.fillStyle = q.hue >= 0 ? 'hsla(' + q.hue.toFixed(0) + ',100%,62%,' + (0.9 * f).toFixed(3) + ')'
        : th ? 'rgba(' + toneRgb(f) + ',' + (0.9 * f).toFixed(3) + ')'
        : 'rgba(255,' + Math.round(70 + 150 * f) + ',' + Math.round(20 + 110 * f * f) + ',' + (0.9 * f).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(q.x, q.y, q.s * (0.5 + 0.5 * f), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = q.hue >= 0 ? 'hsla(' + q.hue.toFixed(0) + ',100%,60%,' + (0.18 * f).toFixed(3) + ')'
        : th ? 'rgba(' + tone.h.join(',') + ',' + (0.18 * f).toFixed(3) + ')' : 'rgba(255,110,30,' + (0.18 * f).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(q.x, q.y, q.s * 3, 0, Math.PI * 2); ctx.fill();
    }

    if (act || parts.length || ie > 0.003 || hold > 0 || Math.abs(rx) > 0.05 || Math.abs(ry) > 0.05 || sc > 0.01) requestAnimationFrame(frame);
    else {
      running = false; if (logo) logo.tilt.style.transform = '';
      ie = 0; L1 = L2 = L3 = 0; update(); clearLayers(cur); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    }
  }
  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } }

  function enter(S) {
    if (cur && cur !== S) clearLayers(cur);
    cur = S; act = true; readTone(); rect(); start();
  }
  function leave(S) { if (cur === S) { act = false; trx = 0; tryy = 0; start(); } }

  // ---- home logo: classic orange effect (tilt, light sweep, punch, embers) ----
  if (logo) {
    var fxEl = logo.el;
    function move(e) {
      var r = fxEl.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
      nx = Math.max(0, Math.min(1, nx)); ny = Math.max(0, Math.min(1, ny));
      tryy = (nx * 2 - 1) * 16; trx = -(ny * 2 - 1) * 16;
      logo.tilt.style.setProperty('--mx', (nx * 100).toFixed(1) + '%');
      logo.tilt.style.setProperty('--my', (ny * 100).toFixed(1) + '%');
    }
    fxEl.addEventListener('pointerenter', function (e) { fxEl.classList.add('is-on'); enter(logo); move(e); punch(); });
    fxEl.addEventListener('pointermove', function (e) { if (act && cur === logo) move(e); });
    function logoLeave() { fxEl.classList.remove('is-on'); leave(logo); }
    fxEl.addEventListener('pointerleave', logoLeave);
    fxEl.addEventListener('pointercancel', logoLeave);
  }

  // ---- toxic mushrooms: mouse hover / keyboard focus; on touch screens the card is open after a tap ----
  mushes.forEach(function (S) {
    var card = S.card, touch = false;
    card.addEventListener('pointerenter', function (e) { if (e.pointerType === 'touch') { touch = true; return; } touch = false; enter(S); });
    card.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') leave(S); });
    card.addEventListener('focusin', function () { if (!touch) enter(S); });
    card.addEventListener('focusout', function () { if (!touch) leave(S); });
    new MutationObserver(function () {
      if (!touch && !window.matchMedia('(hover: none)').matches) return;
      if (card.classList.contains('is-open')) enter(S); else leave(S);
    }).observe(card, { attributes: true, attributeFilter: ['class'] });
  });
})();
