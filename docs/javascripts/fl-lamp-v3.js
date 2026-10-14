(function () {
  // Home: while the pointer is on the JOIN button (or the button has focus), an industrial lamp runs inside the
  // bunker, fed by a generator that is running dry: it stutters, sags and blacks out from time to time.
  // The lamp itself hangs out of sight in the upper left corner; only its light is visible.
  var btn = document.querySelector('a.fl-join');
  var main = document.querySelector('.md-main');
  if (!btn || !main || !document.querySelector('.fl-home')) return;

  // Background image geometry (bg-v3.jpg) and the openings of the bunker, in image pixels
  var IW = 1920, IH = 1072;
  var DOOR = { x0: 307, x1: 420, y0: 440, y1: 690 };
  var WIN = { x0: 492, x1: 562, y0: 457, y1: 565 };
  var SRC = { x: 270, y: 400 };   // the lamp, up and to the left of the doorway, hidden by the wall

  // Industrial warm white, the same whatever skin is chosen
  var LAMP = [255, 214, 150];
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
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

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

    // inside the doorway: the light comes from the upper left, so the left side and the top of the opening are the brightest
    ctx.save();
    ctx.beginPath(); ctx.rect(DOOR.x0, DOOR.y0, DOOR.x1 - DOOR.x0, DOOR.y1 - DOOR.y0); ctx.clip();
    var g = ctx.createRadialGradient(SRC.x, SRC.y, 20, SRC.x, SRC.y, 290);
    g.addColorStop(0, c(.46 * p)); g.addColorStop(.3, c(.25 * p)); g.addColorStop(.62, c(.07 * p)); g.addColorStop(1, c(0));
    ctx.fillStyle = g; ctx.fillRect(DOOR.x0, DOOR.y0, DOOR.x1 - DOOR.x0, DOOR.y1 - DOOR.y0);
    var hot = ctx.createRadialGradient(DOOR.x0 + 6, DOOR.y0 + 14, 4, DOOR.x0 + 6, DOOR.y0 + 14, 130);
    hot.addColorStop(0, 'rgba(255,206,150,' + clamp(.2 * p, 0, 1).toFixed(3) + ')'); hot.addColorStop(1, 'rgba(255,206,150,0)');
    ctx.fillStyle = hot; ctx.fillRect(DOOR.x0, DOOR.y0, DOOR.x1 - DOOR.x0, DOOR.y1 - DOOR.y0);
    ctx.restore();

    // the window: the room is lit, the glass picks it up
    ctx.save();
    ctx.beginPath(); ctx.rect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0); ctx.clip();
    var gw = ctx.createRadialGradient(SRC.x, SRC.y, 20, SRC.x, SRC.y, 520);
    gw.addColorStop(0, c(.24 * p)); gw.addColorStop(1, c(.07 * p));
    ctx.fillStyle = gw; ctx.fillRect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0);
    ctx.restore();
    var go = ctx.createRadialGradient(527, 511, 6, 527, 511, 90);
    go.addColorStop(0, c(.04 * p)); go.addColorStop(1, c(0));
    ctx.fillStyle = go; ctx.fillRect(WIN.x0 - 90, WIN.y0 - 90, 250, 290);

    // light spilling out of the door: a soft wedge falling to the right, a pool on the ground, haze around the opening
    if (canBlur) ctx.filter = 'blur(5px)';
    var gs = ctx.createLinearGradient(DOOR.x0, DOOR.y0 + 40, DOOR.x1 + 120, 800);
    gs.addColorStop(0, c(.035 * p)); gs.addColorStop(1, c(.004 * p));
    ctx.fillStyle = gs;
    ctx.beginPath();
    ctx.moveTo(DOOR.x0 + 8, DOOR.y0 + 30); ctx.lineTo(DOOR.x1 - 4, DOOR.y0 + 30);
    ctx.lineTo(DOOR.x1 + 150, 790); ctx.lineTo(DOOR.x0 - 40, 800);
    ctx.closePath(); ctx.fill();
    if (canBlur) ctx.filter = 'none';
    ctx.save();
    ctx.translate(372, 735); ctx.scale(1, .34);
    var gp = ctx.createRadialGradient(0, 0, 0, 0, 0, 190);
    gp.addColorStop(0, c(.09 * p)); gp.addColorStop(.55, c(.03 * p)); gp.addColorStop(1, c(0));
    ctx.fillStyle = gp; ctx.beginPath(); ctx.arc(0, 0, 190, 0, 6.2832); ctx.fill();
    ctx.restore();
    var gh = ctx.createRadialGradient(364, 540, 20, 364, 540, 230);
    gh.addColorStop(0, c(.03 * p)); gh.addColorStop(1, c(0));
    ctx.fillStyle = gh; ctx.fillRect(130, 330, 480, 420);

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
