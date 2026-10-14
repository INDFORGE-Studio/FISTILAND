(function () {
  // Home: while the pointer is on the JOIN button (or the button has focus), an industrial lamp runs inside the
  // bunker, fed by a generator that is running dry: it stutters, sags and blacks out from time to time.
  // The lamp itself hangs out of sight in the upper left corner; only its light is visible.
  var btn = document.querySelector('a.fl-join');
  var main = document.querySelector('.md-main');
  if (!btn || !main || !document.querySelector('.fl-home')) return;

  // Background image geometry (bg-v3.jpg) and the openings of the bunker, in image pixels
  var IW = 1920, IH = 1072;
  // The dark openings (door and window) exactly as drawn by hand on the picture: this image is white inside them
  var BASE = document.currentScript ? document.currentScript.src : location.href;
  var OPEN_URL = new URL('../assets/lamp-mask-v1.png', BASE).href;
  var OPEN_X = 278, OPEN_Y = 403, openMask = null, ic = null, ictx = null;
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
  })();
  // A piece of ray between two distances from the lamp; `spread` widens it for the soft body of light around the rays
  function drawRay(g, R, i, c, p, from, to, spread, mul) {
    if (to <= from) return;
    var L = R[3], dx = Math.cos(R[0]), dy = Math.sin(R[0]), px = -dy, py = dx;
    var ra = R[4] * mul * p * (reduce ? 1 : .86 + .14 * Math.sin(clock * 1.3 + i * 1.7));
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

  // Industrial white (cool), the same whatever skin is chosen
  var LAMP = [244, 247, 252];
  var WARM = [230, 110, 48];   // a starved filament goes orange
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Branches, grass and fence in front of the door (cut from the background image): they hide the light and so cast shadows
  var MASK_URL = new URL('../assets/torch-mask-v1.png', document.currentScript ? document.currentScript.src : location.href).href;
  var MASK_X = 240, MASK_Y = 540, shade = null;

  var cv = null, ctx = null, raf = 0, last = 0, clock = 0, canBlur = false;
  var on = false, onT = 0, offT = 0, offFrom = 0, level = 0, ev = null, nextEv = 0;
  var OFF_T = .5;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); }

  // What the generator does to the lamp: quick stutters, a long sag, now and then a short blackout
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

  function ensureCanvas() {
    if (cv) return;
    cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;mix-blend-mode:screen;display:none';
    main.insertBefore(cv, main.firstChild);
    ctx = cv.getContext('2d');
    canBlur = 'filter' in ctx;
    shade = new Image();
    shade.src = MASK_URL;
    openMask = new Image();
    openMask.src = OPEN_URL;
    ic = document.createElement('canvas');
    ictx = ic.getContext('2d');
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

  function draw() {
    var W = main.clientWidth, H = main.clientHeight;
    if (!W || !H) return;
    var cw = Math.ceil(W / 2), ch = Math.ceil(H / 2);
    if (cv.width !== cw || cv.height !== ch) { cv.width = cw; cv.height = ch; }
    if (ic.width !== cw || ic.height !== ch) { ic.width = cw; ic.height = ch; }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    if (!(openMask.complete && openMask.naturalWidth)) return;   // the shape of the openings is still loading

    var m = level;
    if (m <= .005) return;
    var s = Math.max(W / IW, H / IH);
    var ox = (W - IW * s) / 2, oy = (H - IH * s) / 2;
    ctx.setTransform(s / 2, 0, 0, s / 2, ox / 2, oy / 2);

    // colour: sliding to orange when the lamp is starved
    var t0 = LAMP;
    var sag = clamp((1 - m) * .8, 0, .7), tint = [0, 1, 2].map(function (i) { return Math.round(t0[i] + (WARM[i] - t0[i]) * sag); }).join(',');
    function c(a) { return 'rgba(' + tint + ',' + clamp(a, 0, 1).toFixed(3) + ')'; }
    var p = Math.min(m, 1.25);

    // inside the openings: drawn apart, then cut to the exact shape of the door and the window; the light comes from
    // the upper left, so the left side and the top of the doorway are the brightest
    ictx.setTransform(1, 0, 0, 1, 0, 0);
    ictx.clearRect(0, 0, cw, ch);
    ictx.setTransform(s / 2, 0, 0, s / 2, ox / 2, oy / 2);
    ictx.globalCompositeOperation = 'source-over';
    function ic_(a) { return c(a); }
    var g = ictx.createRadialGradient(SRC.x, SRC.y, 20, SRC.x, SRC.y, 290);
    g.addColorStop(0, ic_(.46 * p)); g.addColorStop(.3, ic_(.25 * p)); g.addColorStop(.62, ic_(.07 * p)); g.addColorStop(1, ic_(0));
    ictx.fillStyle = g; ictx.fillRect(300, 440, 100, 260);
    var hot = ictx.createRadialGradient(312, 458, 4, 312, 458, 130);
    hot.addColorStop(0, 'rgba(250,248,240,' + clamp(.2 * p, 0, 1).toFixed(3) + ')'); hot.addColorStop(1, 'rgba(250,248,240,0)');
    ictx.fillStyle = hot; ictx.fillRect(300, 440, 100, 260);
    var gw = ictx.createRadialGradient(SRC.x, SRC.y, 20, SRC.x, SRC.y, 520);
    gw.addColorStop(0, ic_(.26 * p)); gw.addColorStop(1, ic_(.08 * p));
    ictx.fillStyle = gw; ictx.fillRect(485, 470, 50, 100);
    // the rays inside the room: only the stretch between the point of light and the exit of each opening
    if (canBlur) ictx.filter = "blur(2px)";
    for (var ii = 0; ii < RAYS.length; ii++) if (RAYS[ii][6]) drawRay(ictx, RAYS[ii], ii, c, p, RAYS[ii][7], RAYS[ii][8], 1, .9);
    ictx.filter = 'none';
    ictx.globalCompositeOperation = 'destination-in';
    ictx.drawImage(openMask, OPEN_X, OPEN_Y);
    ictx.globalCompositeOperation = 'source-over';
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(ic, 0, 0);
    // bloom: the glow of the room bleeds over the frames and the wall around the openings
    if (canBlur) {
      ctx.filter = 'blur(7px)';
      ctx.globalAlpha = .7;
      ctx.drawImage(ic, 0, 0);
      ctx.filter = 'none';
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    // outside: the same rays go on from the exit of the opening, spreading out from the same single point
    var ri;
    if (canBlur) ctx.filter = 'blur(9px)';
    for (ri = 0; ri < RAYS.length; ri++) drawRay(ctx, RAYS[ri], ri, c, p, RAYS[ri][2], RAYS[ri][3], 3.4, .12);
    if (canBlur) ctx.filter = "blur(2px)";
    for (ri = 0; ri < RAYS.length; ri++) {
      drawRay(ctx, RAYS[ri], ri, c, p, RAYS[ri][2], RAYS[ri][3], 1, 1);
      if (RAYS[ri][6]) drawRay(ctx, RAYS[ri], ri, c, p, RAYS[ri][8], RAYS[ri][3], 1.3, .55);   // and a stronger light after the window
    }
    if (canBlur) ctx.filter = 'none';
    ctx.save();
    ctx.translate(430, 745); ctx.scale(1, .3);
    var gp = ctx.createRadialGradient(0, 0, 0, 0, 0, 240);
    gp.addColorStop(0, c(.16 * p)); gp.addColorStop(.55, c(.06 * p)); gp.addColorStop(1, c(0));
    ctx.fillStyle = gp; ctx.beginPath(); ctx.arc(0, 0, 240, 0, 6.2832); ctx.fill();
    ctx.restore();


    // whatever stands in front of the light is a dark silhouette against it
    if (shade && shade.complete && shade.naturalWidth) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = .92;
      ctx.drawImage(shade, MASK_X, MASK_Y);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  function frame(ts) {
    raf = 0;
    var dt = last ? Math.min(.05, (ts - last) / 1000) : .016;
    last = ts; clock += dt;
    if (on) onT += dt; else offT += dt;
    level = masterLevel();
    draw();
    if (!on && offT >= OFF_T) { cv.style.display = 'none'; last = 0; return; }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (on) return;
    ensureCanvas();
    if (level <= 0) { onT = 0; ev = stutter(3); nextEv = clock + rnd(1.4, 2.6); }
    else onT = .5;
    on = true; offT = 0;
    cv.style.display = 'block';
    if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
  }
  function stop() {
    if (!on) return;
    on = false; offT = 0; offFrom = clamp(level || 1, .3, 1);
    if (!raf && cv) { last = 0; raf = requestAnimationFrame(frame); }
  }

  btn.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') start(); });
  btn.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') stop(); });
  btn.addEventListener('focus', start);
  btn.addEventListener('blur', stop);
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); });
})();
