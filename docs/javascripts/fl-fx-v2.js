(function () {
  'use strict';
  // Ambient layers for the Veteran skins: CSS layers (styled in fl-skins) + one small canvas for particles.
  // Nothing is created for the default look. Paused when the tab is hidden, thinned out when the device struggles.
  var root = document.documentElement;
  var host = null, cv = null, g = null, raf = 0, skin = '', P = [], hud = null, hudTimer = 0;
  var W = 0, H = 0, DPR = 1, last = 0, frames = 0, spent = 0, slow = 0, nextTracer = 0, lowEnd = false;
  var mouse = { x: -1e4, y: -1e4 };
  var SPR = {};

  var LAYERS = {
    survivalist: '<i class="fx-grain"></i><canvas></canvas><i class="fx-vig"></i>',
    forces: '<i class="fx-grain"></i><canvas></canvas><i class="fx-scan"></i><i class="fx-sweep"></i><i class="fx-vig"></i><i class="fx-brk"></i>' +
      '<div class="fx-hud"><span class="l"><i class="dot"></i>REC // NVG ON // FISTILAND</span><span class="c"></span><span class="r"></span></div>',
    demonic: '<canvas></canvas><i class="fx-vig"></i><i class="fx-flash"></i>',
    zombie: '<i class="fx-trefoil"></i><canvas></canvas><i class="fx-vig"></i>'
  };

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[(Math.random() * a.length) | 0]; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  // soft round glow, drawn once per colour and reused
  function sprite(rgb, core) {
    var k = rgb + '|' + core;
    if (SPR[k]) return SPR[k];
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var x = c.getContext('2d'), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(core, 'rgba(' + rgb + ',.95)'); gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    return (SPR[k] = c);
  }

  function reset(p, init) {
    switch (p.k) {
      case 'firefly':
        p.x = rnd(0, W); p.y = init ? rnd(H * .2, H) : rnd(H * .5, H); p.s = rnd(7, 15); p.ang = rnd(0, 6.28); p.spd = rnd(.12, .38); p.fr = rnd(.5, 1.5); p.ph = rnd(0, 6.28);
        p.sp = sprite('214,255,110', .16); break;
      case 'campember':
        p.x = rnd(W * .005, W * .08); p.y = init ? rnd(H * .55, H) : H + rnd(0, 20); p.vx = rnd(-.15, .45); p.vy = -rnd(.35, 1.25); p.s = rnd(3, 6.5);
        p.life = init ? rnd(.1, 1) : 1; p.dec = rnd(.0028, .0075); p.ph = rnd(0, 6.28); p.sp = sprite(pick(['255,170,70', '255,214,130', '255,120,40']), .14); break;
      case 'ember':
        p.x = rnd(0, W); p.y = init ? rnd(H * .3, H) : H + rnd(0, 30); p.vx = rnd(-.25, .25); p.vy = -rnd(.6, 2.3); p.s = rnd(3, 8);
        p.life = init ? rnd(.1, 1) : 1; p.dec = rnd(.0022, .0072); p.ph = rnd(0, 6.28); p.sp = sprite(pick(['255,190,80', '255,120,40', '255,70,34', '255,210,120']), .12); break;
      case 'spore':
        p.x = rnd(0, W); p.y = init ? rnd(0, H) : H + 20; p.vx = rnd(-.08, .08); p.vy = -rnd(.04, .22); p.s = rnd(4, 11); p.ph = rnd(0, 6.28); p.fr = rnd(.4, 1.1);
        p.sp = sprite(pick(['180,232,60', '150,215,70', '215,240,110']), .22); break;
      case 'dust':
        p.x = rnd(0, W); p.y = rnd(0, H); p.vx = rnd(-.06, .06); p.vy = rnd(-.1, .05); p.s = rnd(2.2, 4.6); p.ph = rnd(0, 6.28); p.fr = rnd(.3, .9); p.sp = sprite('109,255,158', .35); break;
      case 'fly':
        p.x = rnd(W * .2, W * .8); p.y = rnd(H * .2, H * .8); p.tx = rnd(0, W); p.ty = rnd(0, H); p.spd = rnd(1.6, 3.2); p.ph = rnd(0, 6.28); break;
    }
  }
  function make(k) { var p = { k: k, x: 0, y: 0, vx: 0, vy: 0, s: 1, life: 1, dec: .005, ph: 0, fr: 1, ang: 0, spd: 1, sp: null }; reset(p, true); return p; }

  function populate() {
    P = [];
    var A = W * H, small = W < 640, f = small ? .6 : 1, i, n;
    if (skin === 'survivalist') { n = clamp(A / 52000, 8, 30) * f; for (i = 0; i < n; i++) P.push(make('firefly')); for (i = 0; i < (small ? 8 : 16); i++) P.push(make('campember')); }
    else if (skin === 'forces') { n = clamp(A / 110000, 5, 14) * f; for (i = 0; i < n; i++) P.push(make('dust')); nextTracer = performance.now() + rnd(4000, 9000); }
    else if (skin === 'demonic') { n = clamp(A / 15000, 24, 90) * f; for (i = 0; i < n; i++) P.push(make('ember')); }
    else if (skin === 'zombie') { n = clamp(A / 34000, 12, 40) * f; for (i = 0; i < n; i++) P.push(make('spore')); for (i = 0; i < (small ? 2 : 3); i++) P.push(make('fly')); }
  }

  function burst(x, y) {
    if (!g || P.length > 380) return;
    var i, a, s, n;
    if (skin === 'forces') {
      P.push({ k: 'ring', x: x, y: y, r: 3, life: 1 });
      return;
    }
    n = skin === 'demonic' ? 16 : skin === 'zombie' ? 12 : 9;
    for (i = 0; i < n; i++) {
      a = rnd(0, 6.283); s = rnd(.8, skin === 'demonic' ? 4.2 : 3);
      P.push({
        k: 'spark', x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (skin === 'zombie' ? 0 : 1.2), gy: skin === 'zombie' ? .09 : -.015, life: 1, dec: rnd(.018, .04), s: rnd(3, 7),
        sp: sprite(skin === 'zombie' ? pick(['180,232,60', '142,27,20']) : skin === 'demonic' ? pick(['255,190,80', '255,90,40']) : pick(['255,200,110', '255,150,60']), .18)
      });
    }
  }

  function tracer() {
    var fromLeft = Math.random() < .5, y0 = rnd(H * .05, H * .6), sp = rnd(26, 38), ang = rnd(.12, .5) * (Math.random() < .5 ? 1 : -1);
    P.push({ k: 'tracer', x: fromLeft ? -20 : W + 20, y: y0, vx: (fromLeft ? 1 : -1) * sp * Math.cos(ang), vy: sp * Math.sin(ang), life: 1, len: rnd(.9, 1.6) });
  }

  function draw(t, k) {
    g.clearRect(0, 0, W, H);
    g.globalCompositeOperation = 'lighter';
    for (var i = P.length - 1; i >= 0; i--) {
      var p = P[i], a = 1, s = p.s;
      switch (p.k) {
        case 'firefly':
          p.ang += (Math.random() - .5) * .22 * k; p.x += Math.cos(p.ang) * p.spd * k; p.y += Math.sin(p.ang) * p.spd * k - .015 * k;
          if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
          a = .1 + .9 * Math.pow(Math.max(0, Math.sin(t * .001 * p.fr + p.ph)), 3); s *= .7 + .4 * a; break;
        case 'campember':
          p.life -= p.dec * k; if (p.life <= 0) { reset(p, false); continue; }
          p.x += (p.vx + Math.sin(t * .002 + p.ph) * .3 + .08) * k; p.y += p.vy * k; a = Math.min(1, (1 - p.life) * 9) * p.life; s *= .45 + p.life * .55; break;
        case 'ember':
          p.life -= p.dec * k; if (p.life <= 0) { reset(p, false); continue; }
          p.x += (p.vx + Math.sin(t * .0023 + p.ph) * .55) * k; p.y += p.vy * k; a = Math.min(1, (1 - p.life) * 12) * Math.min(1, p.life * 1.5) * (.75 + .25 * Math.sin(t * .02 + p.ph)); s *= .35 + p.life * .65; break;
        case 'spore':
          p.x += (p.vx + Math.sin(t * .0007 * p.fr + p.ph) * .12) * k; p.y += p.vy * k;
          if (p.y < -20) reset(p, false); if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
          a = .22 + .5 * (.5 + .5 * Math.sin(t * .0016 * p.fr + p.ph)); break;
        case 'dust':
          p.x += p.vx * k; p.y += p.vy * k; if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
          a = .12 + .3 * (.5 + .5 * Math.sin(t * .001 * p.fr + p.ph)); break;
        case 'spark':
          p.life -= p.dec * k; if (p.life <= 0) { P.splice(i, 1); continue; }
          p.vy += p.gy * k; p.x += p.vx * k; p.y += p.vy * k; p.vx *= .985; a = p.life; s = p.s * (.3 + p.life * .7); break;
        case 'ring':
          p.r += 1.8 * k; p.life -= .045 * k; if (p.life <= 0) { P.splice(i, 1); continue; }
          g.globalAlpha = p.life; g.strokeStyle = 'rgba(109,255,158,1)'; g.lineWidth = 1.5; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.stroke();
          g.beginPath(); g.moveTo(p.x - p.r - 9, p.y); g.lineTo(p.x - p.r + 3, p.y); g.moveTo(p.x + p.r - 3, p.y); g.lineTo(p.x + p.r + 9, p.y);
          g.moveTo(p.x, p.y - p.r - 9); g.lineTo(p.x, p.y - p.r + 3); g.moveTo(p.x, p.y + p.r - 3); g.lineTo(p.x, p.y + p.r + 9); g.stroke(); g.globalAlpha = 1; continue;
        case 'tracer':
          p.x += p.vx * k; p.y += p.vy * k; p.life -= .02 * k;
          if (p.life <= 0 || p.x < -200 || p.x > W + 200) { P.splice(i, 1); continue; }
          var gr = g.createLinearGradient(p.x, p.y, p.x - p.vx * 5 * p.len, p.y - p.vy * 5 * p.len);
          gr.addColorStop(0, 'rgba(190,255,215,.95)'); gr.addColorStop(1, 'rgba(109,255,158,0)');
          g.globalAlpha = Math.min(1, p.life * 2); g.strokeStyle = gr; g.lineWidth = 1.3; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(p.x - p.vx * 5 * p.len, p.y - p.vy * 5 * p.len); g.stroke(); g.globalAlpha = 1; continue;
        case 'fly':
          var dx = p.tx - p.x, dy = p.ty - p.y, d = Math.sqrt(dx * dx + dy * dy) + .01, mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
          if (d < 14) { p.tx = rnd(0, W); p.ty = rnd(0, H); }
          p.x += (dx / d * p.spd + (Math.random() - .5) * 3.2) * k; p.y += (dy / d * p.spd + (Math.random() - .5) * 3.2) * k;
          if (md < 110) { p.x += mx / (md + .1) * 4 * k; p.y += my / (md + .1) * 4 * k; p.tx = rnd(0, W); p.ty = rnd(0, H); }
          g.globalCompositeOperation = 'source-over';
          g.fillStyle = 'rgba(160,210,70,' + (.08 + .06 * Math.sin(t * .05 + p.ph)) + ')'; g.beginPath(); g.arc(p.x, p.y, 5.5, 0, 6.283); g.fill();
          g.fillStyle = 'rgba(8,10,4,.95)'; g.beginPath(); g.arc(p.x, p.y, 1.7, 0, 6.283); g.fill();
          g.globalCompositeOperation = 'lighter'; continue;
      }
      g.globalAlpha = a < 0 ? 0 : a > 1 ? 1 : a;
      g.drawImage(p.sp, p.x - s, p.y - s, s * 2, s * 2);
    }
    g.globalAlpha = 1;
    if (skin === 'forces' && t >= nextTracer) { tracer(); nextTracer = t + rnd(9000, 22000); }
  }

  function frame(t) {
    raf = requestAnimationFrame(frame);
    var dt = t - last;
    if (dt < (lowEnd ? 33 : 16.2)) return;
    last = t;
    // adaptive quality: thin the field out once if the first second runs below ~35 fps
    if (frames < 90) { spent += dt; frames++; if (frames === 90 && spent / 90 > 29 && !slow) { slow = 1; lowEnd = true; P.splice(0, P.length >> 1); } }
    draw(t, Math.min(dt, 50) / 16.67);
  }

  function resize() {
    if (!cv) return;
    DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    g.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  var rt = 0;
  function onResize() { clearTimeout(rt); rt = setTimeout(function () { if (!host) return; resize(); populate(); }, 160); }

  // HUD (Special Forces): clock and a heading that follows the scroll position
  function hudTick() {
    if (!hud) return;
    var r = hud.querySelector('.r'); if (r) r.textContent = 'ZULU ' + new Date().toISOString().slice(11, 19);
  }
  function hudHeading() {
    if (!hud) return;
    var c = hud.querySelector('.c'), max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var deg = Math.round((window.pageYOffset / max) * 359), dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    if (c) c.textContent = 'HDG ' + ('00' + deg).slice(-3) + '° ' + dirs[Math.round(deg / 45) % 8];
  }
  var hs = 0;
  function onScroll() { if (hs) return; hs = requestAnimationFrame(function () { hs = 0; hudHeading(); }); }

  function onDown(e) { if (host && cv) burst(e.clientX, e.clientY); }
  function onMove(e) { mouse.x = e.clientX; mouse.y = e.clientY; }
  function onVis() {
    if (!host || !cv) return;
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
  }

  function stop() {
    cancelAnimationFrame(raf); raf = 0;
    clearInterval(hudTimer); hudTimer = 0; hud = null;
    if (host && host.parentNode) host.parentNode.removeChild(host);
    host = cv = g = null; P = [];
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('pointerdown', onDown, true);
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('visibilitychange', onVis);
  }

  function start(sk) {
    stop();
    skin = sk;
    if (!sk || !LAYERS[sk] || !(window.flSkin && window.flSkin.fx())) return;
    lowEnd = (navigator.hardwareConcurrency || 4) <= 4 || !!(navigator.connection && navigator.connection.saveData);
    frames = 0; spent = 0; slow = 0;
    host = document.createElement('div');
    host.className = 'fl-fx';
    host.setAttribute('aria-hidden', 'true');
    host.innerHTML = LAYERS[sk];
    document.body.appendChild(host);
    cv = host.querySelector('canvas');
    if (cv && cv.getContext) {
      g = cv.getContext('2d');
      resize(); populate();
      window.addEventListener('resize', onResize);
      document.addEventListener('pointerdown', onDown, true);
      document.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('visibilitychange', onVis);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    }
    hud = host.querySelector('.fx-hud');
    if (hud) { hudTick(); hudHeading(); hudTimer = setInterval(hudTick, 1000); window.addEventListener('scroll', onScroll, { passive: true }); }
  }

  document.addEventListener('fl-skin-change', function (e) { start((e.detail && e.detail.skin) || ''); });
  if (window.flSkin) start(window.flSkin.get());
})();
