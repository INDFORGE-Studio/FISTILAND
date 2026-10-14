(function () {
  // Home: while the pointer is on the JOIN button (or the button has focus), someone inside the bunker
  // switches a torch on and searches around; the light goes off as soon as the pointer leaves.
  var btn = document.querySelector('a.fl-join');
  var main = document.querySelector('.md-main');
  if (!btn || !main || !document.querySelector('.fl-home')) return;

  // Background image geometry (bg-v3.jpg) and the openings of the bunker, in image pixels
  var IW = 1920, IH = 1072;
  var DOOR = { x0: 307, x1: 420, y0: 440, y1: 690 };
  var WIN = { x0: 492, x1: 562, y0: 457, y1: 565 };

  var TINT = {
    '': '255,243,215', survivalist: '255,226,165', forces: '195,255,215', demonic: '255,160,130', zombie: '220,255,155'
  };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var cv = null, ctx = null, raf = 0, last = 0, clock = 0, canBlur = false;
  var on = false, onT = 0, offT = 0, offFrom = 0, level = 0;
  // The torch is a hand-held spring: it overshoots a little and never stands perfectly still
  var S = {
    yaw: .3, vyaw: 0, tyaw: .3, depth: .45, vdepth: 0, tdepth: .45,
    w: 5, mode: 'linger', until: 0, look: 0, winUntil: 0, nextWin: 0, dip: 0, nextDip: 0
  };
  var motes = [];

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  // A person searching: sweeps, stops to look closely, sometimes whips round at a noise
  function nextLeg() {
    var r = Math.random();
    if (r < .17) {
      S.mode = 'snap'; S.w = 15;
      S.tyaw = clamp(S.yaw + (Math.random() < .5 ? -1 : 1) * rnd(.6, 1.2), -.6, 1.1);
      S.tdepth = rnd(.05, 1);
      S.until = clock + rnd(.5, .9);
    } else if (r < .42) {
      S.mode = 'linger'; S.w = 7;
      S.tyaw = clamp(S.yaw + rnd(-.1, .1), -.6, 1.1);
      S.tdepth = clamp(S.depth + rnd(-.12, .12), .02, 1);
      S.until = clock + rnd(1.1, 2.3);
    } else {
      S.mode = 'scan'; S.w = rnd(3.4, 5.6);
      S.tyaw = rnd(-.6, 1.1); S.tdepth = rnd(.02, 1);
      S.until = clock + rnd(1.2, 2.6);
    }
  }

  function ensureCanvas() {
    if (cv) return;
    cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;mix-blend-mode:screen;display:none';
    main.insertBefore(cv, main.firstChild);
    ctx = cv.getContext('2d');
    canBlur = 'filter' in ctx;
    for (var i = 0; i < 26; i++) {
      motes.push({ x: rnd(300, 780), y: rnd(540, 840), vx: rnd(-5, 5), vy: rnd(-4, 3), r: rnd(.8, 1.9), p: rnd(0, 6.28) });
    }
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

  function spring(x, v, t, w, dt) {
    var a = (t - x) * w * w - 2 * .62 * w * v;
    v += a * dt;
    return [x + v * dt, v];
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
      var r1 = spring(S.yaw, S.vyaw, S.tyaw, S.w, dt); S.yaw = r1[0]; S.vyaw = r1[1];
      var r2 = spring(S.depth, S.vdepth, S.tdepth, S.w * .6, dt); S.depth = r2[0]; S.vdepth = r2[1];
      if (clock > S.nextDip) { S.dip = clock + .12; S.nextDip = clock + rnd(3, 9); }
      if (clock > S.nextWin) { S.winUntil = clock + rnd(1, 1.8); S.nextWin = clock + rnd(5, 11); }
    }
    S.look += ((S.mode === 'linger' ? 1 : 0) - S.look) * (1 - Math.exp(-dt * 3));
    var wob = reduce ? 0 : Math.sin(clock * 13.1) * .006 + Math.sin(clock * 5.3 + 1) * .011 + Math.sin(clock * 2.1) * .01 +
      Math.sin(clock * 1.1) * .06 + Math.sin(clock * 1.9 + 2) * .035;
    var dwob = reduce ? 0 : Math.sin(clock * .8 + 1) * .05 + Math.sin(clock * 2.3) * .015;
    var yaw = S.yaw + wob, depth = clamp(S.depth + dwob, 0, 1);

    // the person walks about inside the doorway and the torch bobs with the steps
    var walk = reduce ? .4 : .5 + .5 * Math.sin(clock * .45 + 1);
    var ax = 338 + walk * 60 + (reduce ? 0 : Math.sin(clock * 2.2) * 3);
    var ay = 604 + (reduce ? 0 : Math.sin(clock * 4.6) * 2.6 + Math.sin(clock * 2.3) * 3);
    var sx = ax + yaw * 470, sy = 812 - depth * 145;
    var dx = sx - ax, dy = sy - ay, L = Math.sqrt(dx * dx + dy * dy);
    var nx = dx / L, ny = dy / L, px = -ny, py = nx;
    var TAN = .15;
    function hw(d) { return 6 + d * TAN; }
    var rx = hw(L) * 1.08 * (1 - .2 * S.look), ry = rx * .42;
    var boost = 1 + .22 * S.look;
    var power = m * (clock < S.dip ? .55 : 1) * (reduce ? 1 : .94 + Math.sin(clock * 31) * .03 + Math.sin(clock * 7.7) * .03);

    // inside the doorway: the glow follows the person
    ctx.save();
    ctx.beginPath(); ctx.rect(DOOR.x0, DOOR.y0, DOOR.x1 - DOOR.x0, DOOR.y1 - DOOR.y0); ctx.clip();
    var winPow = clock < S.winUntil ? Math.sin(Math.PI * clamp(1 - (S.winUntil - clock) / 1.4, 0, 1)) : 0;
    var g = ctx.createRadialGradient(ax, ay - 10, 4, ax, ay - 10, 135);
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

    // beam in the fog: a true cone (width grows with distance), bright at the lamp, fading out, soft edges
    var widths = [1, .82, .64, .48, .34, .21], k;
    if (canBlur) ctx.filter = 'blur(2.5px)';
    for (k = 0; k < widths.length; k++) {
      var w = widths[k];
      var gb = ctx.createLinearGradient(ax, ay, sx, sy);
      gb.addColorStop(0, c(.085 * power)); gb.addColorStop(.55, c(.045 * power)); gb.addColorStop(1, c(.03 * power));
      ctx.fillStyle = gb;
      ctx.beginPath();
      ctx.moveTo(ax + px * hw(0) * w, ay + py * hw(0) * w);
      ctx.lineTo(sx + px * hw(L) * w, sy + py * hw(L) * w);
      ctx.lineTo(sx - px * hw(L) * w, sy - py * hw(L) * w);
      ctx.lineTo(ax - px * hw(0) * w, ay - py * hw(0) * w);
      ctx.closePath(); ctx.fill();
    }
    if (canBlur) ctx.filter = 'none';

    // dust floating in the air, lit only where the beam crosses it
    if (!reduce) {
      for (var i = 0; i < motes.length; i++) {
        var q = motes[i];
        q.x += q.vx * dt; q.y += q.vy * dt;
        if (q.x < 290) q.x = 790; else if (q.x > 790) q.x = 290;
        if (q.y < 530) q.y = 850; else if (q.y > 850) q.y = 530;
        var t = ((q.x - ax) * nx + (q.y - ay) * ny) / L;
        if (t < .02 || t > 1) continue;
        var lat = Math.abs((q.x - ax) * px + (q.y - ay) * py), h = hw(t * L);
        var a = 1 - (lat / h) * (lat / h);
        if (a <= 0) continue;
        ctx.fillStyle = c(.8 * a * (1 - t * .5) * power * (.6 + .4 * Math.sin(clock * 3 + q.p)));
        ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 6.2832); ctx.fill();
      }
    }

    // light on the ground, with a wide soft halo around it
    ctx.save();
    ctx.translate(sx, sy); ctx.scale(1, ry / rx);
    var gh = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 2.3);
    gh.addColorStop(0, c(.1 * power * boost)); gh.addColorStop(1, c(0));
    ctx.fillStyle = gh; ctx.beginPath(); ctx.arc(0, 0, rx * 2.3, 0, 6.2832); ctx.fill();
    var gs = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    gs.addColorStop(0, c(.58 * power * boost)); gs.addColorStop(.5, c(.26 * power * boost)); gs.addColorStop(1, c(0));
    ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(0, 0, rx, 0, 6.2832); ctx.fill();
    var gc = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * .36);
    gc.addColorStop(0, c(.5 * power * boost)); gc.addColorStop(1, c(0));
    ctx.fillStyle = gc; ctx.beginPath(); ctx.arc(0, 0, rx * .36, 0, 6.2832); ctx.fill();
    ctx.restore();

    // bulb glow in the hand
    var go = ctx.createRadialGradient(ax, ay, 0, ax, ay, 58);
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
    onT = level > 0 ? .27 : 0;   // lit again before the fade ended: no second stutter
    on = true; offT = 0;
    cv.style.display = 'block';
    if (!S.nextDip || clock > S.nextDip + 30) { S.until = 0; S.nextDip = clock + rnd(2, 5); S.nextWin = clock + rnd(1.5, 4); }
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
