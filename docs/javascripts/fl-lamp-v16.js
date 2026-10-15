(function () {
  // Home: while the pointer is on the JOIN button (or the button has focus), an industrial lamp runs inside the
  // bunker, fed by a generator that is running dry: it stutters, sags and blacks out from time to time.
  // The lamp itself hangs out of sight in the upper left corner; only its light is visible.
  // The light is drawn ONCE (three still layers, in idle time); each frame then only fades those layers in and out.
  var btn = document.querySelector('a.fl-join');
  var main = document.querySelector('.md-main');
  if (!btn || !main || !document.querySelector('.fl-home')) return;
  var root = document.documentElement;

  // The picture shown is the poster (1672x941); the openings below were measured on its 1920x1072 original, so the lamp
  // scales x and y separately onto the poster
  var IW = 1672, IH = 941, KX = 1672 / 1920, KY = 941 / 1072;
  // The dark openings (door and window) exactly as drawn by hand on the picture: this image is white inside them
  var BASE = document.currentScript ? document.currentScript.src : location.href;
  var OPEN_URL = new URL('../assets/lamp-mask-v1.png', BASE).href;
  var OPEN_X = 278, OPEN_Y = 403;
  // Branches, grass and fence in front of the door (cut from the background image): they hide the light and so cast shadows
  var MASK_URL = new URL('../assets/torch-mask-v1.png', BASE).href;
  var MASK_X = 240, MASK_Y = 540;
  // Where the red eyes of the Demonic skin watch from: inside the doorway
  var EYES = { x: 358, y: 528 };
  // The one and only point where every ray starts: the upper left corner of the door, where the lamp's light comes in.
  // From there the rays spread out in a fan, crossing the doorway, the wall, the window and the fog.
  var SRC = { x: 307, y: 453 };
  var RAYS = [];   // [angle, start, start, length, strength, half-angle]
  (function () {
    function fr(x) { return x - Math.floor(x); }
    for (var deg = 7, i = 0; deg <= 88; deg += 1.35, i++) {
      var th = deg * Math.PI / 180;
      var r1 = fr(Math.sin(i * 12.9898) * 43758.5453), r2 = fr(Math.sin(i * 78.233) * 12543.17);
      // the ground stops the steep ones sooner
      var tn = Math.tan(th), ya = SRC.y + (491 - SRC.x) * tn, yb = SRC.y + (526 - SRC.x) * tn;
      var thru = Math.max(ya, yb) >= 482 && Math.min(ya, yb) <= 560;   // this ray goes through the window
      RAYS.push([th, 6, 6, Math.min(780, 440 / Math.sin(th)) * (.55 + .45 * fr(Math.sin(i * 5.31) * 9871.3)), (.27 + .2 * r1) * (thru ? 1.2 : 1), (.22 + .5 * r2) * Math.PI / 180, thru, (491 - SRC.x) / Math.cos(th), (526 - SRC.x) / Math.cos(th)]);
    }
    // broad soft shafts among the thin streaks (as light through a barred window): wide, faint, overlapping
    var wide = [14, 19, 25, 31, 38, 46, 56, 68];
    for (var wi = 0; wi < wide.length; wi++) {
      var wr = fr(Math.sin((wi + 3) * 91.7) * 4375.5);
      RAYS.push([wide[wi] * Math.PI / 180, 6, 6, 520 + 220 * wr, .27 + .16 * wr, (2.6 + 2.4 * wr) * Math.PI / 180, false, 0, 0, true]);
    }
  })();

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  // Industrial white (cool), the same whatever skin is chosen; a starved filament goes orange
  function c(a) { return 'rgba(244,247,252,' + clamp(a, 0, 1).toFixed(3) + ')'; }
  var WARM = 'rgba(230,110,48,';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // A piece of ray between two distances from the lamp; `spread` widens it for the soft body of light around the rays
  function drawRay(g, R, i, from, to, spread, mul) {
    if (to <= from) return;
    var L = R[3], dx = Math.cos(R[0]), dy = Math.sin(R[0]), px = -dy, py = dx;
    var ra = R[4] * mul;
    var s0 = Math.min(.9, R[1] / L), s1 = Math.min(.97, s0 + 28 / L);
    var gr = g.createLinearGradient(SRC.x, SRC.y, SRC.x + dx * L, SRC.y + dy * L);
    gr.addColorStop(s0, c(0)); gr.addColorStop(s1, c(ra));
    // the light thins out with distance (and unevenly, as the fog is) and dies away smoothly
    var us = [.14, .3, .5, .72, .9], pk = s1;
    for (var k = 0; k < us.length; k++) {
      var u = Math.max(pk + .01, us[k]); pk = u;
      var fz = Math.sin((i + 1) * 7.13 + k * 3.7) * 43758.5453, nz = .65 + .7 * (fz - Math.floor(fz));
      gr.addColorStop(Math.min(.99, u), c(ra * Math.exp(-u * L / 420) * nz * (k === us.length - 1 ? .5 : 1)));
    }
    gr.addColorStop(1, c(0));
    g.fillStyle = gr;
    var wa = Math.max(1.5, from * R[5] * spread), wb = Math.max(1.5, to * R[5] * spread);
    g.beginPath();
    g.moveTo(SRC.x + dx * from + px * wa, SRC.y + dy * from + py * wa); g.lineTo(SRC.x + dx * to + px * wb, SRC.y + dy * to + py * wb);
    g.lineTo(SRC.x + dx * to - px * wb, SRC.y + dy * to - py * wb); g.lineTo(SRC.x + dx * from - px * wa, SRC.y + dy * from - py * wa);
    g.closePath(); g.fill();
  }

  // ---- geometry: how the poster sits in the page (cover), in half-resolution canvas pixels ----
  function geometry() {
    var W = main.clientWidth, H = main.clientHeight;
    if (!W || !H) return null;
    var s = Math.max(W / IW, H / IH), sx = s * KX, sy = s * KY;
    return { W: W, H: H, cw: Math.ceil(W / 2), ch: Math.ceil(H / 2), sx: sx, sy: sy, ox: (W - IW * s) / 2, oy: (H - IH * s) / 2 };
  }
  function place(g, geo) { g.setTransform(geo.sx / 2, 0, 0, geo.sy / 2, geo.ox / 2, geo.oy / 2); }
  function newCanvas(w, h) { var k = document.createElement('canvas'); k.width = w; k.height = h; return k; }
  function drop(k) { k.width = 0; k.height = 0; }

  // ---- the stills: inside the openings, the soft body of light, the sharper streaks ----
  var cv = null, ctx = null, canBlur = false, openMask = null, shade = null, shadeF = null;
  var Lin = null, Lsoft = null, Lsharp = null, ready = false, bakeW = 0, bakeH = 0, token = 0, tries = 0;

  function ensureImages() {
    if (openMask) return;
    openMask = new Image(); openMask.src = OPEN_URL;
    shade = new Image(); shade.src = MASK_URL;
    canBlur = 'filter' in document.createElement('canvas').getContext('2d');
  }
  function imgReady(i) { return i && i.complete && i.naturalWidth; }
  // The shadow mask has a faint veil all over its rectangle: left as it is, its straight border shows as a line across
  // the light. Its edges are faded out once, here.
  function buildShade() {
    var w = shade.naturalWidth, h = shade.naturalHeight;
    shadeF = newCanvas(w, h);
    var g = shadeF.getContext('2d');
    g.drawImage(shade, 0, 0);
    g.globalCompositeOperation = 'destination-in';
    function fade(x0, y0, x1, y1) {
      var gr = g.createLinearGradient(x0, y0, x1, y1);
      gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,1)');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }
    fade(0, 0, 0, 60); fade(0, 0, 44, 0); fade(w, 0, w - 44, 0); fade(0, h, 0, h - 40);
  }
  function applyShade(g, geo) {
    if (!shadeF) return;
    g.save(); place(g, geo);
    g.globalCompositeOperation = 'destination-out'; g.globalAlpha = .92;
    g.drawImage(shadeF, MASK_X, MASK_Y);
    g.restore();
  }
  function blurred(dst, src, px, alpha) {
    dst.save();
    dst.setTransform(1, 0, 0, 1, 0, 0);
    if (canBlur) dst.filter = 'blur(' + px + 'px)';
    dst.globalAlpha = alpha || 1;
    dst.drawImage(src, 0, 0);
    dst.restore();
  }

  // inside the openings: drawn apart, then cut to the exact shape of the door and the window; the light comes from
  // the upper left, so the left side and the top of the doorway are the brightest
  function bakeIn(geo) {
    var t = newCanvas(geo.cw, geo.ch), tg = t.getContext('2d');
    place(tg, geo);
    var g = tg.createRadialGradient(SRC.x, SRC.y, 20, SRC.x, SRC.y, 290);
    g.addColorStop(0, c(.46)); g.addColorStop(.3, c(.25)); g.addColorStop(.62, c(.07)); g.addColorStop(1, c(0));
    tg.fillStyle = g; tg.fillRect(300, 440, 100, 260);
    var hot = tg.createRadialGradient(312, 458, 4, 312, 458, 130);
    hot.addColorStop(0, 'rgba(250,248,240,.2)'); hot.addColorStop(1, 'rgba(250,248,240,0)');
    tg.fillStyle = hot; tg.fillRect(300, 440, 100, 260);
    var gw = tg.createRadialGradient(SRC.x, SRC.y, 20, SRC.x, SRC.y, 520);
    gw.addColorStop(0, c(.26)); gw.addColorStop(1, c(.08));
    tg.fillStyle = gw; tg.fillRect(485, 470, 50, 100);
    // the rays inside the room: only the stretch between the point of light and the exit of each opening
    var r = newCanvas(geo.cw, geo.ch), rg = r.getContext('2d');
    place(rg, geo);
    for (var ii = 0; ii < RAYS.length; ii++) if (RAYS[ii][6]) drawRay(rg, RAYS[ii], ii, RAYS[ii][7], RAYS[ii][8], 1, .9 * .86);
    blurred(tg, r, 2); drop(r);
    // (the glow and the rays have to be drawn before the cut: the blur above lands on the transformed canvas)
    tg.globalCompositeOperation = 'destination-in';
    place(tg, geo);
    tg.drawImage(openMask, OPEN_X, OPEN_Y);
    Lin = newCanvas(geo.cw, geo.ch);
    var lg = Lin.getContext('2d');
    lg.drawImage(t, 0, 0);
    // bloom: the glow of the room bleeds over the frames and the wall around the openings
    blurred(lg, t, 7, .7);
    drop(t);
    applyShade(lg, geo);
  }
  // outside, the soft body: wide shafts and a broad haze round every ray, plus the pool of light on the ground
  function bakeSoft(geo) {
    var r = newCanvas(geo.cw, geo.ch), rg = r.getContext('2d');
    place(rg, geo);
    for (var ri = 0; ri < RAYS.length; ri++) { if (RAYS[ri][9]) drawRay(rg, RAYS[ri], ri, RAYS[ri][2], RAYS[ri][3], 1, 1); else drawRay(rg, RAYS[ri], ri, RAYS[ri][2], RAYS[ri][3], 3.4, .12); }
    Lsoft = newCanvas(geo.cw, geo.ch);
    var g = Lsoft.getContext('2d');
    blurred(g, r, 9); drop(r);
    place(g, geo);
    g.save();
    g.translate(430, 745); g.scale(1, .3);
    var gp = g.createRadialGradient(0, 0, 0, 0, 0, 240);
    gp.addColorStop(0, c(.16)); gp.addColorStop(.55, c(.06)); gp.addColorStop(1, c(0));
    g.fillStyle = gp; g.beginPath(); g.arc(0, 0, 240, 0, 6.2832); g.fill();
    g.restore();
    applyShade(g, geo);
  }
  // outside, the thin streaks (and a stronger light after the window)
  function bakeSharp(geo) {
    var r = newCanvas(geo.cw, geo.ch), rg = r.getContext('2d');
    place(rg, geo);
    for (var ri = 0; ri < RAYS.length; ri++) {
      if (RAYS[ri][9]) continue;
      drawRay(rg, RAYS[ri], ri, RAYS[ri][2], RAYS[ri][3], 1, 1);
      if (RAYS[ri][6]) drawRay(rg, RAYS[ri], ri, RAYS[ri][8], RAYS[ri][3], 1.3, .55);
    }
    Lsharp = newCanvas(geo.cw, geo.ch);
    var g = Lsharp.getContext('2d');
    blurred(g, r, 2); drop(r);
    applyShade(g, geo);
  }

  // Drawn in three small steps (idle time) so that nothing ever blocks the page; `sync` does it all at once
  function bake(sync) {
    var geo = geometry();
    if (!geo || (ready && geo.W === bakeW && geo.H === bakeH)) return;
    ensureImages();
    if (!imgReady(openMask) || !imgReady(shade)) {
      if (!sync && ++tries < 80) setTimeout(function () { bake(false); }, 150);
      return;
    }
    if (!shadeF) buildShade();
    ready = false;
    var my = ++token, steps = [bakeIn, bakeSoft, bakeSharp];
    function run(i) {
      if (my !== token) return;
      steps[i](geo);
      if (i < 2) { if (sync) run(i + 1); else setTimeout(function () { run(i + 1); }, 30); }
      else { ready = true; bakeW = geo.W; bakeH = geo.H; }
    }
    run(0);
  }

  // ---- what the generator does to the lamp: quick stutters, a long sag, now and then a short blackout ----
  var raf = 0, last = 0, clock = 0, on = false, onT = 0, offT = 0, offFrom = 0, level = 0, ev = null, nextEv = 0;
  var OFF_T = .5;
  function stutter(n) { return { type: 's', t0: clock, P: rnd(.075, .115), n: n, dur: 0 }; }
  function pickEvent() {
    var r = Math.random();
    if (reduce) ev = { type: 'g', t0: clock, dur: rnd(.8, 1.4) };
    else if (r < .42) ev = stutter(2 + Math.floor(Math.random() * 3));
    else if (r < .84) ev = { type: 'g', t0: clock, dur: rnd(.7, 1.5) };
    else ev = { type: 'b', t0: clock, dur: rnd(.25, .5) };
    if (ev.type === 's') ev.dur = ev.n * ev.P;
  }
  function eventLevel() {
    if (!ev) {
      if (clock >= nextEv) pickEvent(); else return 1;
    }
    var et = clock - ev.t0, v = 1;
    if (ev.type === 's') {
      if (et >= ev.dur) { ev = null; nextEv = clock + rnd(1.3, 3.4); return 1; }
      v = ((et / ev.P) % 1) < .45 ? 1 : .14;
    } else if (ev.type === 'g') {
      if (et >= ev.dur + .13) { ev = null; nextEv = clock + rnd(1.3, 3.4); return 1; }
      if (et < ev.dur) {
        var env = smooth(et / .12) * smooth((ev.dur - et) / .3);
        var depth = reduce ? .3 : .62;
        v = 1 - env * (depth - .1 * Math.sin(et * 38) - .06 * Math.sin(et * 17 + 1));
      } else {
        v = 1 + .18 * (1 - (et - ev.dur) / .13);   // surge when the engine catches again
      }
    } else {
      if (et >= ev.dur) { ev = stutter(2); return 1; }
      v = .05;
    }
    return v;
  }
  // Warm-up: the lamp stutters into life; switch-off: the generator coughs and dies
  function masterLevel() {
    if (on) {
      var ramp = Math.min(1, .5 + onT * 3);
      return ramp * eventLevel();
    }
    if (offT < .07) return offFrom;
    if (offT < .13) return offFrom * .2;
    if (offT < .2) return offFrom * .8;
    if (offT < .26) return offFrom * .15;
    return Math.max(0, offFrom * .6 * (1 - (offT - .26) / (OFF_T - .26)));
  }

  function ensureCanvas() {
    if (cv) return;
    ensureImages();
    cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    // plain alpha: the light is near-white, so it adds up on the picture exactly as a screen blend would, without
    // asking the browser to re-compose everything underneath at every frame
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;display:none';
    main.insertBefore(cv, main.firstChild);
    ctx = cv.getContext('2d');
  }

  function draw() {
    var geo = geometry();
    if (!geo) return;
    if (cv.width !== geo.cw || cv.height !== geo.ch) { cv.width = geo.cw; cv.height = geo.ch; }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, geo.cw, geo.ch);
    var m = level;
    if (m <= .005) return;
    if (!ready || geo.W !== bakeW || geo.H !== bakeH) { bake(true); if (!ready) return; }

    var p = Math.min(m, 1.25), a = Math.min(1, p);
    // the streaks shimmer slowly, as the fog does
    var s1 = reduce ? 1 : .86 + .14 * Math.sin(clock * 1.3), s2 = reduce ? 1 : .86 + .14 * Math.sin(clock * 1.3 + 2.1);
    ctx.globalAlpha = a; ctx.drawImage(Lin, 0, 0);
    ctx.globalAlpha = a * s1; ctx.drawImage(Lsoft, 0, 0);
    ctx.globalAlpha = a * s2; ctx.drawImage(Lsharp, 0, 0);
    if (p > 1) {   // surge
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = p - 1;
      ctx.drawImage(Lin, 0, 0); ctx.drawImage(Lsoft, 0, 0); ctx.drawImage(Lsharp, 0, 0);
    }
    // colour: sliding to orange when the lamp is starved
    var sag = clamp((1 - m) * .8, 0, .7);
    if (sag > .02) {
      ctx.globalCompositeOperation = 'source-atop'; ctx.globalAlpha = 1;
      ctx.fillStyle = WARM + sag.toFixed(3) + ')';
      ctx.fillRect(0, 0, geo.cw, geo.ch);
    }
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  }

  function frame(ts) {
    raf = 0;
    var dt = last ? Math.min(.05, (ts - last) / 1000) : .016;
    last = ts; clock += dt;
    if (on) onT += dt; else offT += dt;
    level = masterLevel();
    draw();
    if (!on && offT >= OFF_T) { cv.style.display = 'none'; last = 0; root.classList.remove('fl-lamp-on'); return; }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (on) return;
    ensureCanvas();
    if (level <= 0) { onT = 0; ev = stutter(3); nextEv = clock + rnd(1.4, 2.6); }
    else onT = .5;
    on = true; offT = 0;
    cv.style.display = 'block';
    // the red eyes of the Demonic skin go away while the lamp is on
    root.classList.add('fl-lamp-on');
    if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
  }
  function stop() {
    if (!on) return;
    on = false; offT = 0; offFrom = clamp(level || 1, .3, 1);
    if (!raf && cv) { last = 0; raf = requestAnimationFrame(frame); }
  }

  // ---- the watching eyes (shown by the Demonic skin only; see the skins style sheet) ----
  var eyes = document.createElement('div');
  eyes.className = 'fl-door-eyes';
  eyes.setAttribute('aria-hidden', 'true');
  eyes.innerHTML = '<i></i><i></i>';
  main.insertBefore(eyes, main.firstChild);
  function placeEyes() {
    var geo = geometry();
    if (!geo) return;
    eyes.style.setProperty('--ex', (geo.ox + EYES.x * geo.sx).toFixed(1) + 'px');
    eyes.style.setProperty('--ey', (geo.oy + EYES.y * geo.sy).toFixed(1) + 'px');
    eyes.style.setProperty('--es', geo.sx.toFixed(3));
  }
  placeEyes();

  var rt = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { placeEyes(); if (!on) bake(false); }, 250);
  });

  btn.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') start(); });
  btn.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') stop(); });
  btn.addEventListener('focus', start);
  btn.addEventListener('blur', stop);
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); });

  // Draw the light in advance, once the page is quiet (not on phones: they never hover)
  function warm() {
    placeEyes();
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    bake(false);
  }
  function later() { setTimeout(warm, 1800); }
  if (document.readyState === 'complete') later(); else window.addEventListener('load', later, { once: true });
})();
