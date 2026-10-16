(function () {
  // 404 page: KILLBOX DUEL. After 30 seconds without any input the snake board turns into an attract-mode pong played by two
  // machines (INSERT COIN). A tap, a click or an arrow / W / S key takes the left paddle: the SCUM prisoner's riot shield against a
  // mecha plate, a toxic mushroom for a ball. First to 7 wins. A rally of 12 hits in a human match makes the whole court collapse
  // into the next game (fl-blocks). This game never grants any rank.
  var cv = document.getElementById('fl-snake'), pipsEl = document.getElementById('fl-pips');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d'), HOME = cv.getAttribute('data-home') || '/';
  var FW = 300, IDLE = 30000, WIN = 7, GOAL = 12, REC_KEY = 'fl-pong-best', PH = 44, PW = 6, LX = 16, RX = 284, TOP = 6, BOT = 294;
  var FONT = 'ui-monospace, Consolas, Menlo, monospace';

  var on = false, demo = false, last = 0, lastAct = performance.now(), flash = 0, shake = 0;
  var L, R, ball, sl, sr, rally, best = 0, state, stateAt, serveIn, banner, pieces, trail, sparks;
  var keys = { U: 0, D: 0 }, ptr = null;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function record() { try { return parseInt(localStorage.getItem(REC_KEY), 10) || 0; } catch (e) { return 0; } }
  function sfx(k) { if (!demo && window.flMusic) window.flMusic.sfx(k); }

  function serve(dir) {
    var a = rnd(-.35, .35);
    ball = { x: FW / 2, y: FW / 2, sp: 150, vx: Math.cos(a) * 150 * dir, vy: Math.sin(a) * 150 };
    rally = 0; serveIn = .9; trail = [];
  }
  function newMatch(dir) {
    sl = 0; sr = 0; best = 0; L = { x: LX, y: FW / 2, off: 0 }; R = { x: RX, y: FW / 2, off: 0 };
    sparks = []; pieces = null; flash = 0; shake = 0; state = 'play'; stateAt = 0; serve(dir);
  }

  function spark(x, y, c, n) { for (var i = 0; i < n; i++) { var a = rnd(0, 6.283), v = rnd(25, 80); sparks.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: rnd(.25, .5), age: 0, c: c }); } }

  function paddleHit(p, dir) {
    var off = clamp((ball.y - p.y) / (PH / 2), -1.1, 1.1), a = off * .85;
    ball.sp = Math.min(330, ball.sp * 1.05);
    ball.vx = dir * Math.cos(a) * ball.sp; ball.vy = Math.sin(a) * ball.sp;
    ball.x = p.x + dir * (PW / 2 + 3.2);
    rally++; if (rally > best) best = rally;
    (p === L ? R : L).off = rnd(-1, 1) * PH * (demo ? .62 : .4);   // the machines of the attract mode are sloppy enough to lose points
    spark(ball.x, ball.y, p === L ? '255,122,28' : '170,180,188', 6); shake = Math.max(shake, .1);
    sfx('hit');
    if (!demo && rally >= GOAL) crash();
  }

  function point(leftScored) {
    if (leftScored) sl++; else sr++;
    spark(leftScored ? FW - 6 : 6, ball.y, leftScored ? '255,122,28' : '170,180,188', 14);
    sfx('score');
    if (sl >= WIN || sr >= WIN) {
      if (demo) { sl = 0; sr = 0; } else { state = 'over'; stateAt = performance.now(); ball.vx = ball.vy = 0; ball.x = FW / 2; ball.y = FW / 2; return; }
    }
    serve(leftScored ? 1 : -1);
  }

  // the court falls apart into loose blocks: the hand-over to the next game
  function crash() {
    state = 'crash'; stateAt = performance.now(); flash = 1; shake = .6; sfx('crash');
    pieces = [];
    function add(x, y, c) { pieces.push({ x: x - 3, y: y - 3, vx: rnd(-40, 40), vy: rnd(-90, -10), c: c }); }
    var i;
    for (i = 0; i < 7; i++) { add(L.x, L.y - PH / 2 + 3 + i * 6, '#ff7a1c'); add(R.x, R.y - PH / 2 + 3 + i * 6, '#aab4bc'); }
    for (i = 0; i < 12; i++) add(FW / 2, 14 + i * 24, '#8a7a68');
    for (i = 0; i < 6; i++) add(i * 60, TOP - 2, '#ff7a1c');
    for (i = 0; i < 6; i++) add(i * 60 + 30, BOT + 2, '#ff7a1c');
    add(ball.x, ball.y, '#ffb347');
    ball.vx = ball.vy = 0;
    banner = { t: '?!', age: 0 };
  }

  function aiMove(p, dt, speed, toward) {
    var d = (toward ? ball.y + p.off : FW / 2) - p.y, m = speed * dt;
    if (Math.abs(d) > 1.5) p.y += clamp(d, -m, m);
    p.y = clamp(p.y, PH / 2 + TOP, BOT - PH / 2);
  }

  function update(dt) {
    var i;
    if (banner) { banner.age += dt; if (banner.age > 1.6) banner = null; }
    if (flash > 0) flash = Math.max(0, flash - dt * 2);
    if (shake > 0) shake = Math.max(0, shake - dt);
    for (i = sparks.length - 1; i >= 0; i--) { var q = sparks[i]; q.age += dt; if (q.age >= q.life) { sparks.splice(i, 1); continue; } q.x += q.vx * dt; q.y += q.vy * dt; }
    if (state === 'crash') {
      for (i = 0; i < pieces.length; i++) { var c = pieces[i]; c.vy += 430 * dt; c.x += c.vx * dt; c.y += c.vy * dt; }
      if (performance.now() - stateAt > 1700) handOver();
      return;
    }
    // the left paddle: the visitor (finger / mouse position, or keys), or a slow machine in attract mode
    if (demo) aiMove(L, dt, 90, ball.vx < 0);
    else {
      if (ptr !== null) L.y += clamp(ptr - L.y, -430 * dt, 430 * dt);
      else L.y += (keys.D - keys.U) * 200 * dt;
      L.y = clamp(L.y, PH / 2 + TOP, BOT - PH / 2);
    }
    aiMove(R, dt, 120 + 4 * sl, ball.vx > 0);
    if (state !== 'play') return;
    if (serveIn > 0) { serveIn -= dt; return; }
    trail.push({ x: ball.x, y: ball.y }); if (trail.length > 5) trail.shift();
    var n = Math.max(1, Math.ceil(Math.hypot(ball.vx, ball.vy) * dt / 3)), h = dt / n;
    for (i = 0; i < n; i++) {
      ball.x += ball.vx * h; ball.y += ball.vy * h;
      if (ball.y < TOP + 4) { ball.y = TOP + 4; ball.vy = Math.abs(ball.vy); sfx('wall'); }
      else if (ball.y > BOT - 4) { ball.y = BOT - 4; ball.vy = -Math.abs(ball.vy); sfx('wall'); }
      if (ball.vx < 0 && ball.x - 4 <= L.x + PW / 2 && ball.x > L.x - PW && Math.abs(ball.y - L.y) <= PH / 2 + 3) paddleHit(L, 1);
      else if (ball.vx > 0 && ball.x + 4 >= R.x - PW / 2 && ball.x < R.x + PW && Math.abs(ball.y - R.y) <= PH / 2 + 3) paddleHit(R, -1);
      if (state !== 'play') return;
      if (ball.x < -8) { point(false); break; }
      if (ball.x > FW + 8) { point(true); break; }
    }
  }

  function mushroom(x, y) {   // the ball: a toxic mushroom, 8 px
    ctx.fillStyle = '#e8d8c0'; ctx.fillRect(x - 1.5, y, 3, 4);
    ctx.fillStyle = '#d63b2a'; ctx.beginPath(); ctx.arc(x, y + .5, 4.2, Math.PI, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f4ece3'; ctx.fillRect(x - 2.6, y - 2.4, 1.4, 1.4); ctx.fillRect(x + 1, y - 3, 1.4, 1.4);
  }

  function draw(t) {
    var k = cv.width / FW, sx = shake > 0 ? rnd(-1, 1) * shake * 8 : 0, sy = shake > 0 ? rnd(-1, 1) * shake * 8 : 0, i;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(k, 0, 0, k, sx * k, sy * k);
    var crashing = state === 'crash';
    // bunker walls: hazard stripes top and bottom
    if (!crashing) for (i = 0; i < FW; i += 12) {
      ctx.fillStyle = '#ff7a1c'; ctx.fillRect(i, 0, 6, TOP - 1); ctx.fillRect(i + 6, BOT + 1, 6, TOP - 1);
      ctx.fillStyle = '#2a1a10'; ctx.fillRect(i + 6, 0, 6, TOP - 1); ctx.fillRect(i, BOT + 1, 6, TOP - 1);
    }
    // barbed wire along the middle
    if (!crashing) { ctx.fillStyle = 'rgba(232,214,196,.22)'; for (i = 14; i < FW - 8; i += 12) { ctx.fillRect(FW / 2 - 1, i, 2, 6); if ((i / 12 | 0) % 2) ctx.fillRect(FW / 2 - 3, i + 2, 6, 1.4); } }
    // scores
    ctx.font = '700 26px ' + FONT; ctx.textBaseline = 'top'; ctx.textAlign = 'center';
    ctx.globalAlpha = demo ? .3 : .9;
    if (!crashing) { ctx.fillStyle = '#ff7a1c'; ctx.fillText(String(sl), FW / 2 - 40, 14); ctx.fillStyle = '#aab4bc'; ctx.fillText(String(sr), FW / 2 + 40, 14); }
    ctx.globalAlpha = 1;

    if (crashing) {
      for (i = 0; i < pieces.length; i++) { ctx.fillStyle = pieces[i].c; ctx.fillRect(pieces[i].x, pieces[i].y, 6, 6); }
    } else {
      // the prisoner's riot shield (left, orange) and the mecha plate (right, steel, red eye)
      ctx.fillStyle = '#ff7a1c'; ctx.fillRect(L.x - PW / 2, L.y - PH / 2, PW, PH);
      ctx.fillStyle = '#2a1a10'; ctx.fillRect(L.x - PW / 2, L.y - PH / 2 + 4, PW, 1.5); ctx.fillRect(L.x - PW / 2, L.y + PH / 2 - 5.5, PW, 1.5);
      ctx.fillStyle = '#ffd9a8'; ctx.fillRect(L.x - PW / 2 + 1, L.y - 3, 2, 6);
      ctx.fillStyle = '#aab4bc'; ctx.fillRect(R.x - PW / 2, R.y - PH / 2, PW, PH);
      ctx.fillStyle = '#6f7a84'; ctx.fillRect(R.x - PW / 2, R.y - PH / 2 + 4, PW, 1.5); ctx.fillRect(R.x - PW / 2, R.y + PH / 2 - 5.5, PW, 1.5);
      ctx.fillStyle = Math.floor(t / 300) % 2 ? '#ff3a2e' : '#ff8a5c'; ctx.fillRect(R.x - 1.5, R.y - 2, 3, 4);
      // spores behind the mushroom, then the mushroom
      for (i = 0; i < trail.length; i++) { ctx.fillStyle = 'rgba(255,179,71,' + (.06 + i * .05).toFixed(2) + ')'; ctx.fillRect(trail[i].x - 2, trail[i].y - 2, 4, 4); }
      if (serveIn <= 0 || Math.floor(t / 110) % 2) mushroom(ball.x, ball.y - 1);
    }
    for (i = 0; i < sparks.length; i++) { var q = sparks[i]; ctx.fillStyle = 'rgba(' + q.c + ',' + (1 - q.age / q.life).toFixed(2) + ')'; ctx.fillRect(q.x - 1, q.y - 1, 2, 2); }

    ctx.textAlign = 'center';
    if (demo) {
      ctx.fillStyle = 'rgba(13,12,11,.55)'; ctx.fillRect(40, 236, FW - 80, 44);
      if (Math.floor(t / 520) % 2) { ctx.font = '700 15px ' + FONT; ctx.fillStyle = '#ffb347'; ctx.fillText('INSERT COIN', FW / 2, 241); }
      ctx.font = '700 8px ' + FONT; ctx.fillStyle = 'rgba(232,214,196,.85)'; ctx.fillText('TAP OR PRESS A KEY', FW / 2, 264);
    } else if (rally >= 4 && state === 'play') {
      ctx.font = '700 8px ' + FONT; ctx.fillStyle = 'rgba(232,214,196,.5)'; ctx.fillText('RALLY ' + rally, FW / 2, 280);
    }
    if (banner) {
      var a = banner.age < .2 ? banner.age / .2 : banner.age > 1.2 ? Math.max(0, 1 - (banner.age - 1.2) / .4) : 1;
      ctx.globalAlpha = a; ctx.font = '700 22px ' + FONT; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#0d0c0b'; ctx.fillText(banner.t, FW / 2 + 1.5, 151.5);
      ctx.fillStyle = '#ffb347'; ctx.fillText(banner.t, FW / 2, 150);
      ctx.globalAlpha = 1;
    }
    if (flash > 0) { ctx.fillStyle = 'rgba(255,255,255,' + (flash * .55).toFixed(3) + ')'; ctx.fillRect(-10, -10, FW + 20, FW + 20); }
  }

  function loop(t) {
    if (!on) return;
    requestAnimationFrame(loop);
    var dt = Math.min(.05, (t - last) / 1000); last = t;
    update(dt);
    if (!on) return;   // the court has just collapsed into the next game
    draw(t);
    if (state === 'over' && !cv.getAttribute('data-ended') && t - stateAt > 900) { cv.setAttribute('data-ended', '1'); finish(sl >= WIN); }
  }

  function finish(win) {
    if (window.flMusic) window.flMusic.stop();
    var rec = Math.max(record(), best);
    try { localStorage.setItem(REC_KEY, String(rec)); } catch (e) {}
    var o = { title: win ? 'You win' : 'Game over', score: sl * 100 + best * 10 + (win ? 200 : 0), line: 'BEST RALLY ' + best + '  ·  RECORD ' + rec, replay: startHuman, home: HOME };
    if (window.flArcade) window.flArcade.finish(o); else location.assign(HOME);
  }

  // the court has collapsed: hand the board over to the blocks game
  function handOver() {
    on = false; pieces = null;
    if (window.flMusic) window.flMusic.stop();
    var rec = Math.max(record(), best);
    try { localStorage.setItem(REC_KEY, String(rec)); } catch (e) {}
    document.dispatchEvent(new Event('fl-blocks'));
  }

  function startHuman() {
    demo = false; keys.U = keys.D = 0; ptr = null; cv.removeAttribute('data-ended');
    newMatch(-1);
    banner = { t: 'KILLBOX DUEL', age: 0 };
    if (window.flMusic) { window.flMusic.start(function () { return 1 + Math.min(4, (rally / 3) | 0); }, 'pong'); window.flMusic.sfx('serve'); }
    if (!on) { on = true; last = performance.now(); requestAnimationFrame(loop); }
  }

  function startDemo() {
    if (on || !window.flSnake || !window.flSnake.halt()) { lastAct = performance.now(); return; }
    on = true; demo = true; keys.U = keys.D = 0; ptr = null;
    if (window.flMusic) window.flMusic.stop();
    cv.className = 'invade'; setTimeout(function () { cv.classList.remove('invade'); }, 720);
    cv.setAttribute('aria-label', 'Pong');
    pipsEl.textContent = '';
    newMatch(-1);
    last = performance.now(); requestAnimationFrame(loop);
  }

  // ---- input ----
  function dirKey(e) {
    var k = e.key, c = e.code;
    if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'z' || k === 'Z' || c === 'KeyW') return -1;
    if (k === 'ArrowDown' || k === 's' || k === 'S' || c === 'KeyS') return 1;
    return 0;
  }
  document.addEventListener('keydown', function (e) {
    if (!on || e.ctrlKey || e.metaKey || e.altKey) return;
    var d = dirKey(e);
    if (!d && demo && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); startHuman(); return; }
    if (!d) return;
    e.preventDefault();
    if (demo) startHuman();
    ptr = null; if (d < 0) keys.U = 1; else keys.D = 1;
  });
  document.addEventListener('keyup', function (e) { if (!on) return; var d = dirKey(e); if (d < 0) keys.U = 0; else if (d > 0) keys.D = 0; });
  window.addEventListener('blur', function () { keys.U = keys.D = 0; });
  function setPtr(e) { var r = cv.getBoundingClientRect(); if (r.height > 0) ptr = (e.clientY - r.top) / r.height * FW; }
  cv.addEventListener('pointerdown', function (e) {
    if (!on) return;
    if (demo) startHuman();
    setPtr(e); try { cv.setPointerCapture(e.pointerId); } catch (x) {}
  });
  cv.addEventListener('pointermove', function (e) { if (on && !demo && (e.pointerType === 'mouse' || e.buttons)) setPtr(e); });

  // ---- idle watch: 30 seconds without any input and the machines start playing ----
  function act() { lastAct = performance.now(); }
  ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach(function (n) { window.addEventListener(n, act, { passive: true, capture: true }); });
  setInterval(function () {
    if (document.hidden) { act(); return; }
    if (!on && performance.now() - lastAct >= IDLE) startDemo();
  }, 1000);
})();
