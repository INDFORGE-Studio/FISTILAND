(function () {
  // 404 page: once every wandering Discord character is gone (fl-logo404 sends `fl-invaders`), the snake board turns into a tiny
  // invaders game: a wave of mechas shoots at the SCUM prisoner (the visitor). Left / right to move, space to shoot (a pad shows on
  // touch screens). Twelve mechas down and the visitor is sent back to the home page. This game never grants any rank.
  var cv = document.getElementById('fl-snake'), pipsEl = document.getElementById('fl-pips');
  if (!cv || !cv.getContext) return;
  var game = cv.parentNode, HOME = cv.getAttribute('data-home') || '/', GOAL = 12, FW = 300, PY = 268, PX = 1.6;
  var ctx = cv.getContext('2d');

  // pixel pictures: s skin, o orange jumpsuit, d dark, g gun, # robot plating, e eye
  var HERO = [
    '........g', '...sss..g', '..sdsds.g', '...sss..g', '..ooooooo', '.ooooooo.', '.oo.o.oo.', '..ooooo..', '..oo.oo..', '..dd.dd..'
  ];
  var MECHA = [
    '..#.....#..', '...#...#...', '..#######..', '.##e###e##.', '###########', '#.#######.#', '#.#.....#.#', '...##.##...'
  ];
  var HW = 9 * PX, MW = 11 * PX, MH = 8 * PX;
  var SK = { s: '#e8c9a0', o: '#ff7a1c', d: '#2a1a10', g: '#b9c2c9' };

  var on = false, keys = { L: 0, R: 0, F: 0 };
  var hero, shots, bolts, mechs, parts, kills, lives, state, stateAt, fx, fy, dir, nextBolt, intro, flash, last = 0, shotAt = 0;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function paintPips() {
    var p = pipsEl.children;
    for (var i = 0; i < p.length; i++) p[i].className = i < kills ? 'on' : '';
  }
  function newGame() {
    kills = 0; lives = 3; shots = []; bolts = []; parts = []; flash = 0; intro = 0; dir = 1; fx = 96; fy = -70; nextBolt = 1.6;
    hero = { x: FW / 2, inv: 0 }; mechs = [];
    for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) mechs.push({ c: c, r: r, alive: true });
    state = 'play'; stateAt = 0;
    pipsEl.textContent = '';
    for (var i = 0; i < GOAL; i++) pipsEl.appendChild(document.createElement('i'));
    paintPips();
  }

  function fire() {
    var now = performance.now();
    if (!on || state !== 'play' || now - shotAt < 330 || shots.length >= 3) return;
    shotAt = now; shots.push({ x: hero.x, y: PY - 8 });
  }
  function boom(x, y, c) {
    for (var i = 0; i < 9; i++) { var a = rnd(0, 6.283), v = rnd(30, 90); parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: rnd(.3, .6), age: 0, c: c }); }
  }
  function mx(m) { return fx + m.c * 30; }
  function my(m) { return fy + m.r * 22; }

  function update(dt) {
    var i, j, m, A = 0, minC = 9, maxC = -1, maxR = -1;
    hero.x = Math.max(10, Math.min(FW - 10, hero.x + (keys.R - keys.L) * 150 * dt));
    if (hero.inv > 0) hero.inv -= dt;
    if (flash > 0) flash = Math.max(0, flash - dt * 2.4);
    for (i = parts.length - 1; i >= 0; i--) { var q = parts[i]; q.age += dt; if (q.age >= q.life) { parts.splice(i, 1); continue; } q.x += q.vx * dt; q.y += q.vy * dt; }
    if (state !== 'play') return;
    if (keys.F) fire();

    for (i = 0; i < mechs.length; i++) if (mechs[i].alive) { A++; m = mechs[i]; if (m.c < minC) minC = m.c; if (m.c > maxC) maxC = m.c; if (m.r > maxR) maxR = m.r; }

    // the wave slides in from the top, then sweeps from side to side, dropping a step at each edge and speeding up as it thins out
    if (intro < 1) { intro = Math.min(1, intro + dt / 1.1); var e = 1 - Math.pow(1 - intro, 3); fy = -70 + 92 * e; }
    else {
      fx += dir * (16 + (GOAL - A) * 6) * dt;
      var left = fx + minC * 30, right = fx + maxC * 30 + MW;
      if (right > FW - 8) { fx -= right - (FW - 8); dir = -1; fy += 8; } else if (left < 8) { fx += 8 - left; dir = 1; fy += 8; }
      if (fy + maxR * 22 + MH >= PY - 12) { lives = 0; flash = 1; state = 'lost'; stateAt = performance.now(); return; }
    }

    for (i = shots.length - 1; i >= 0; i--) {
      var s = shots[i]; s.y -= 230 * dt;
      if (s.y < -8) { shots.splice(i, 1); continue; }
      for (j = 0; j < mechs.length; j++) {
        m = mechs[j];
        if (m.alive && Math.abs(s.x - (mx(m) + MW / 2)) < MW / 2 + 1 && s.y > my(m) && s.y < my(m) + MH) {
          m.alive = false; kills++; paintPips(); boom(mx(m) + MW / 2, my(m) + MH / 2, '255,122,51'); shots.splice(i, 1);
          if (kills >= GOAL) { state = 'won'; stateAt = performance.now(); cv.className = 'won'; }
          break;
        }
      }
    }
    if (state !== 'play') return;

    if (intro >= 1) {
      nextBolt -= dt;
      if (nextBolt <= 0 && A) {
        nextBolt = rnd(.7, 1.35);
        var cols = [], c;
        for (c = 0; c < 4; c++) for (j = 0; j < mechs.length; j++) if (mechs[j].alive && mechs[j].c === c) { cols.push(c); break; }
        c = cols[(Math.random() * cols.length) | 0];
        var low = null;
        for (j = 0; j < mechs.length; j++) if (mechs[j].alive && mechs[j].c === c && (!low || mechs[j].r > low.r)) low = mechs[j];
        if (low) bolts.push({ x: mx(low) + MW / 2, y: my(low) + MH });
      }
    }
    for (i = bolts.length - 1; i >= 0; i--) {
      var b = bolts[i]; b.y += 105 * dt;
      if (b.y > FW + 8) { bolts.splice(i, 1); continue; }
      if (hero.inv <= 0 && Math.abs(b.x - hero.x) < 6 && b.y > PY - 8 && b.y < PY + 10) {
        bolts.splice(i, 1); lives--; hero.inv = 1.3; flash = 1; boom(hero.x, PY, '255,58,46');
        if (lives <= 0) { state = 'lost'; stateAt = performance.now(); }
      }
    }
  }

  function spr(rows, x, y, pal) {
    for (var r = 0; r < rows.length; r++) for (var c = 0; c < rows[r].length; c++) {
      var k = rows[r].charAt(c);
      if (k === '.') continue;
      ctx.fillStyle = pal[k]; ctx.fillRect(x + c * PX, y + r * PX, PX + .15, PX + .15);
    }
  }

  function draw(t) {
    var k = cv.width / FW, i;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fillRect(6, PY + 12, FW - 12, 1);
    var steel = ['#aab4bc', '#8f9aa3', '#76828c'], eye = state === 'lost' ? '#7a1c14' : (Math.floor(t / 260) % 2 ? '#ff3a2e' : '#ff8a5c');
    for (i = 0; i < mechs.length; i++) {
      var m = mechs[i]; if (!m.alive) continue;
      spr(MECHA, mx(m), my(m), { '#': steel[m.r], e: eye });
    }
    if (state !== 'lost' && (hero.inv <= 0 || Math.floor(t / 70) % 2)) spr(HERO, hero.x - HW / 2, PY - 8, SK);
    ctx.fillStyle = '#ffb347';
    for (i = 0; i < shots.length; i++) ctx.fillRect(shots[i].x - .8, shots[i].y, 1.6, 6);
    ctx.fillStyle = '#ff3a2e';
    for (i = 0; i < bolts.length; i++) ctx.fillRect(bolts[i].x - .9, bolts[i].y, 1.8, 6);
    for (i = 0; i < parts.length; i++) { var q = parts[i]; ctx.fillStyle = 'rgba(' + q.c + ',' + (1 - q.age / q.life).toFixed(2) + ')'; ctx.fillRect(q.x - 1, q.y - 1, 2, 2); }
    ctx.fillStyle = '#ff7a1c';
    for (i = 0; i < lives; i++) ctx.fillRect(8 + i * 8, 290, 5, 5);
    if (flash > 0) { ctx.fillStyle = 'rgba(255,40,30,' + (flash * .3).toFixed(3) + ')'; ctx.fillRect(0, 0, FW, FW); }
  }

  function loop(t) {
    if (!on) return;
    requestAnimationFrame(loop);
    var dt = Math.min(.05, (t - last) / 1000); last = t;
    update(dt); draw(t);
    if (state === 'lost' && t - stateAt > 900) newGame();
    else if (state === 'won' && t - stateAt > 1100) { on = false; location.assign(HOME); }
  }

  // ---- controls ----
  function setKey(e, v) {
    var k = e.key, c = e.code, id = null;
    if (k === 'ArrowLeft' || k === 'a' || k === 'A' || k === 'q' || k === 'Q' || c === 'KeyA') id = 'L';
    else if (k === 'ArrowRight' || k === 'd' || k === 'D' || c === 'KeyD') id = 'R';
    else if (k === ' ' || k === 'Spacebar' || c === 'Space' || k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'z' || k === 'Z') id = 'F';
    if (!id) return false;
    keys[id] = v; if (v && id === 'F') fire();
    return true;
  }
  document.addEventListener('keydown', function (e) { if (on && !e.ctrlKey && !e.metaKey && !e.altKey && setKey(e, 1)) e.preventDefault(); });
  document.addEventListener('keyup', function (e) { if (on && setKey(e, 0)) e.preventDefault(); });
  window.addEventListener('blur', function () { keys.L = keys.R = keys.F = 0; });

  function buildPad() {
    var pad = document.createElement('div'); pad.className = 'pad';
    pad.innerHTML = '<button type="button" tabindex="-1" aria-label="Left" data-k="L"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 4 6 12l10 8z"/></svg></button>' +
      '<button type="button" tabindex="-1" aria-label="Right" data-k="R"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l10 8-10 8z"/></svg></button>' +
      '<button type="button" tabindex="-1" aria-label="Fire" class="f" data-k="F"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l6 9h-4v9h-4v-9H6z"/></svg></button>';
    game.appendChild(pad);
    [].forEach.call(pad.children, function (b) {
      var id = b.getAttribute('data-k');
      function release() { keys[id] = 0; b.classList.remove('on'); }
      b.addEventListener('pointerdown', function (e) { e.preventDefault(); keys[id] = 1; b.classList.add('on'); try { b.setPointerCapture(e.pointerId); } catch (x) {} if (id === 'F') fire(); });
      b.addEventListener('pointerup', release); b.addEventListener('pointercancel', release); b.addEventListener('lostpointercapture', release);
      b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    });
  }

  function begin() {
    if (on || !window.flSnake || !window.flSnake.halt()) return;   // refused while the snake is celebrating a win
    on = true;
    cv.className = 'invade'; setTimeout(function () { cv.classList.remove('invade'); }, 720);
    cv.setAttribute('aria-label', 'Invaders');
    game.classList.add('inv');
    buildPad(); newGame();
    last = performance.now(); requestAnimationFrame(loop);
  }
  document.addEventListener('fl-invaders', begin);
})();
