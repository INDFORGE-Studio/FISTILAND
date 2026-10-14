(function () {
  // Home: while the pointer is on the JOIN button (or the button has focus), someone inside the bunker
  // switches a torch on and looks around; the light goes off as soon as the pointer leaves.
  var btn = document.querySelector('a.fl-join');
  var main = document.querySelector('.md-main');
  if (!btn || !main || !document.querySelector('.fl-home')) return;

  // Background image geometry (bg-v3.jpg) and the openings of the bunker, in image pixels
  var IW = 1920, IH = 1072;
  var DOOR = { x0: 307, x1: 420, y0: 440, y1: 690 };
  var WIN = { x0: 492, x1: 562, y0: 457, y1: 565 };
  var OX = 372, OY = 598;

  var TINT = {
    '': '255,243,215', survivalist: '255,226,165', forces: '195,255,215', demonic: '255,160,130', zombie: '220,255,155'
  };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var cv = null, ctx = null, raf = 0, last = 0, clock = 0;
  var on = false, onT = 0, offT = 0, offFrom = 0, level = 0;
  var S = { yaw: .25, depth: .45, tyaw: .25, tdepth: .45, k: 2.4, mode: 'linger', until: 0, win: 0, winUntil: 0, nextWin: 0, dip: 0, nextDip: 0 };

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  // A person searching: sweeps, stops to look closely, sometimes whips round at a noise
  function nextLeg() {
    var r = Math.random();
    if (r < .16) {
      S.mode = 'snap'; S.k = 11;
      S.tyaw = clamp(S.yaw + (Math.random() < .5 ? -1 : 1) * rnd(.6, 1.1), -.9, 1);
      S.until = clock + rnd(.45, .8);
    } else if (r < .46) {
      S.mode = 'linger'; S.k = 4;
      S.tyaw = clamp(S.yaw + rnd(-.08, .08), -.9, 1);
      S.tdepth = clamp(S.depth + rnd(-.1, .1), .05, 1);
      S.until = clock + rnd(1.2, 2.6);
    } else {
      S.mode = 'scan'; S.k = rnd(1.5, 2.9);
      S.tyaw = rnd(-.85, 1); S.tdepth = rnd(.08, 1);
      S.until = clock + rnd(1.5, 3.3);
    }
  }

  function ensureCanvas() {
    if (cv) return;
    cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;mix-blend-mode:screen;display:none';
    main.insertBefore(cv, main.firstChild);
    ctx = cv.getContext('2d');
  }

  // Switch-on stutter, then steady; switch-off is a quick fade
  function masterLevel() {
    if (on) {
      if (reduce) return 1;
      if (onT < .06) return 1;
      if (onT < .13) return 0;
      if (onT < .18) return .8;
      if (onT < .27) return 0;
      return Math.min(1, .55 + (onT - .27) * 4);
    }
    return Math.max(0, offFrom * (1 - offT / .22));
  }

  function draw(dt) {
    var W = main.clientWidth, H = main.clientHeight;
    if (!W || !H) return;
    var cw = Math.ceil(W / 2), ch = Math.ceil(H / 2);
    if (cv.width !== cw || cv.height !== ch) { cv.width = cw; cv.height = ch; }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    var m = level;
    if (m <= 0) return;
    var s = Math.max(W / IW, H / IH);
    var ox = (W - IW * s) / 2, oy = (H - IH * s) / 2;
    ctx.setTransform(s / 2, 0, 0, s / 2, ox / 2, oy / 2);

    var tint = TINT[document.documentElement.getAttribute('data-fl-theme') || ''] || TINT[''];
    function c(a) { return 'rgba(' + tint + ',' + Math.max(0, a).toFixed(3) + ')'; }

    // movement
    if (!reduce) {
      if (clock > S.until) nextLeg();
      var f = 1 - Math.exp(-dt * S.k);
      S.yaw += (S.tyaw - S.yaw) * f;
      S.depth += (S.tdepth - S.depth) * (1 - Math.exp(-dt * 1.6));
      if (clock > S.nextDip) { S.dip = clock + .12; S.nextDip = clock + rnd(3, 9); }
      if (clock > S.nextWin) { S.winUntil = clock + rnd(1, 1.8); S.nextWin = clock + rnd(5, 11); }
    }
    var tr = reduce ? 0 : Math.sin(clock * 13.1) * .006 + Math.sin(clock * 5.3 + 1) * .01 + Math.sin(clock * 2.1) * .008;
    var yaw = S.yaw + tr;
    var look = S.mode === 'linger' ? 1 : 0;
    S.look = (S.look || 0) + (look - (S.look || 0)) * (1 - Math.exp(-dt * 3));
    var bob = reduce ? 0 : Math.sin(clock * 4.4) * 1.6;
    var power = m * (clock < S.dip ? .55 : 1) * (reduce ? 1 : .94 + Math.sin(clock * 31) * .03 + Math.sin(clock * 7.7) * .03);

    var ax = OX, ay = OY + bob;
    var sx = OX + yaw * 430, sy = 800 - S.depth * 115;
    var rx = (112 - 50 * S.depth) * (1 - .22 * S.look), ry = rx * .42;
    var boost = 1 + .22 * S.look;

    // inside the doorway
    ctx.save();
    ctx.beginPath(); ctx.rect(DOOR.x0, DOOR.y0, DOOR.x1 - DOOR.x0, DOOR.y1 - DOOR.y0); ctx.clip();
    var winPow = clock < S.winUntil ? Math.sin(Math.PI * clamp(1 - (S.winUntil - clock) / 1.4, 0, 1)) : 0;
    var g = ctx.createRadialGradient(366, 590, 4, 366, 590, 130);
    g.addColorStop(0, c(.3 * power * (1 - .45 * winPow))); g.addColorStop(1, c(0));
    ctx.fillStyle = g; ctx.fillRect(DOOR.x0, DOOR.y0, DOOR.x1 - DOOR.x0, DOOR.y1 - DOOR.y0);
    ctx.restore();

    // someone walking past the window
    if (winPow > 0) {
      ctx.save();
      ctx.beginPath(); ctx.rect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0); ctx.clip();
      ctx.fillStyle = c(.5 * power * winPow); ctx.fillRect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0);
      ctx.restore();
      var gw = ctx.createRadialGradient(527, 511, 4, 527, 511, 85);
      gw.addColorStop(0, c(.2 * power * winPow)); gw.addColorStop(1, c(0));
      ctx.fillStyle = gw; ctx.fillRect(WIN.x0 - 90, WIN.y0 - 90, 250, 290);
    }

    // beam in the fog: three nested cones for soft edges
    var w0 = 15, k, wide;
    var widths = [1, .7, .42], alphas = [.075, .09, .11];
    for (k = 0; k < 3; k++) {
      wide = Math.max(rx * .95, 58) * widths[k];
      var gb = ctx.createLinearGradient(ax, ay, sx, sy);
      gb.addColorStop(0, c(alphas[k] * 3.2 * power)); gb.addColorStop(1, c(alphas[k] * 1.4 * power));
      ctx.fillStyle = gb;
      ctx.beginPath();
      ctx.moveTo(ax - w0 * widths[k], ay); ctx.lineTo(sx - wide, sy); ctx.lineTo(sx + wide, sy); ctx.lineTo(ax + w0 * widths[k], ay);
      ctx.closePath(); ctx.fill();
    }

    // light on the ground
    ctx.save();
    ctx.translate(sx, sy); ctx.scale(1, ry / rx);
    var gs = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    gs.addColorStop(0, c(.62 * power * boost)); gs.addColorStop(.5, c(.26 * power * boost)); gs.addColorStop(1, c(0));
    ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(0, 0, rx, 0, 6.2832); ctx.fill();
    var gc = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * .38);
    gc.addColorStop(0, c(.5 * power * boost)); gc.addColorStop(1, c(0));
    ctx.fillStyle = gc; ctx.beginPath(); ctx.arc(0, 0, rx * .38, 0, 6.2832); ctx.fill();
    ctx.restore();

    // bulb glow at the door
    var go = ctx.createRadialGradient(ax, ay, 0, ax, ay, 62);
    go.addColorStop(0, c(.55 * power)); go.addColorStop(1, c(0));
    ctx.fillStyle = go; ctx.fillRect(ax - 70, ay - 70, 140, 140);
  }

  function frame(ts) {
    raf = 0;
    var dt = last ? Math.min(.05, (ts - last) / 1000) : .016;
    last = ts; clock += dt;
    if (on) onT += dt; else offT += dt;
    level = masterLevel();
    draw(dt);
    if (!on && offT >= .22) { cv.style.display = 'none'; last = 0; return; }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (on) return;
    ensureCanvas();
    if (!on && level > 0) onT = .27;   // lit again before the fade ended: no second stutter
    else onT = 0;
    on = true; offT = 0;
    cv.style.display = 'block';
    if (!S.until || clock > S.until + 30) { S.until = 0; S.nextDip = clock + rnd(2, 5); S.nextWin = clock + rnd(1.5, 4); }
    if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
  }
  function stop() {
    if (!on) return;
    on = false; offT = 0; offFrom = level || 1;
    if (!raf && cv) { last = 0; raf = requestAnimationFrame(frame); }
  }

  btn.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') start(); });
  btn.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') stop(); });
  btn.addEventListener('focus', start);
  btn.addEventListener('blur', stop);
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); });
})();
