(function () {
  // 404 page: BUNKER. Reached when a long pong rally makes the court collapse (fl-pong sends `fl-blocks`). Loot crates fall into a
  // bunker; fill a whole row to seal it. The crates are our own set of seven (three- to five-block shapes), the board is
  // 8 x 14. Arrows / WASD (space = drop) or the pad on touch screens. Game over: a result card (fl-arcade) with a
  // copy-to-clipboard button. Nothing is saved. This game never grants any rank.
  var cv = document.getElementById('fl-snake'), pipsEl = document.getElementById('fl-pips');
  if (!cv || !cv.getContext) return;
  var game = cv.parentNode, ctx = cv.getContext('2d'), HOME = cv.getAttribute('data-home') || '/';
  var FW = 300, COLS = 8, ROWS = 14, C = 20, BX = 34, BY = 10, LEVELS = 10;
  var FONT = 'ui-monospace, Consolas, Menlo, monospace';

  // crates: each shape is a list of [x, y] cells
  var SHAPES = [
    [[0, 0], [1, 0], [2, 0]],
    [[0, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [0, 1], [0, 2], [1, 2]],
    [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]],
    [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1]],
    [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]
  ];
  var BAG = [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6];   // small crates come up more often
  var COLORS = [
    { b: '#e8631c', l: '#ff9a5c', d: '#8a3a0f' }, { b: '#6b7a3a', l: '#93a552', d: '#3b4420' }, { b: '#8f9aa3', l: '#bcc5cc', d: '#4e5760' }, { b: '#a8402a', l: '#d66a50', d: '#5c2014' },
    { b: '#d9a63a', l: '#f2cb6e', d: '#7a5a14' }, { b: '#a89a6c', l: '#cfc296', d: '#5a5034' }, { b: '#3f5a3c', l: '#62855d', d: '#223320' }
  ];

  var on = false, last = 0, grid, cur, next, acc, soft, score, lines, level, state, stateAt, full, flash, banner, parts, padBuilt = false;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick() { var i = BAG[(Math.random() * BAG.length) | 0]; return { cells: SHAPES[i].map(function (c) { return [c[0], c[1]]; }), c: i }; }
  function norm(cells) {
    var mx = 99, my = 99, i;
    for (i = 0; i < cells.length; i++) { mx = Math.min(mx, cells[i][0]); my = Math.min(my, cells[i][1]); }
    return cells.map(function (c) { return [c[0] - mx, c[1] - my]; });
  }
  function rot(cells) { return norm(cells.map(function (c) { return [-c[1], c[0]]; })); }
  function width(cells) { var w = 0; cells.forEach(function (c) { w = Math.max(w, c[0] + 1); }); return w; }
  function fits(cells, px, py) {
    for (var i = 0; i < cells.length; i++) {
      var x = px + cells[i][0], y = py + cells[i][1];
      if (x < 0 || x >= COLS || y >= ROWS || (y >= 0 && grid[y][x])) return false;
    }
    return true;
  }
  function sfx(k) { if (window.flMusic) window.flMusic.sfx(k); }

  function paintPips() { var p = pipsEl.children; for (var i = 0; i < p.length; i++) p[i].className = i < level ? 'on' : ''; }
  function spawn() {
    cur = next; next = pick();
    cur.x = ((COLS - width(cur.cells)) / 2) | 0; cur.y = 0; acc = 0;
    if (!fits(cur.cells, cur.x, cur.y)) { state = 'over'; stateAt = performance.now(); flash = 1; sfx('crash'); }
  }
  function newGame() {
    grid = []; for (var r = 0; r < ROWS; r++) grid.push(new Array(COLS).fill(0));
    score = 0; lines = 0; level = 1; soft = 0; full = null; flash = 0; parts = []; state = 'play';
    banner = { t: 'BUNKER', age: 0 };
    pipsEl.textContent = ''; for (var i = 0; i < LEVELS; i++) pipsEl.appendChild(document.createElement('i'));
    paintPips();
    next = pick(); spawn();
  }

  function move(dx, dy) { if (state !== 'play' || !fits(cur.cells, cur.x + dx, cur.y + dy)) return false; cur.x += dx; cur.y += dy; return true; }
  function turn() {
    if (state !== 'play') return;
    var r = rot(cur.cells), k = [0, -1, 1, -2, 2];
    for (var i = 0; i < k.length; i++) if (fits(r, cur.x + k[i], cur.y)) { cur.cells = r; cur.x += k[i]; sfx('rot'); return; }
  }
  function drop() { if (state !== 'play') return; var n = 0; while (move(0, 1)) n++; score += 2 * n; lock(); }
  function boom(x, y, col) { for (var i = 0; i < 7; i++) { var a = rnd(0, 6.283), v = rnd(30, 90); parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 20, life: rnd(.3, .6), age: 0, c: col }); } }

  function lock() {
    var i, r;
    for (i = 0; i < cur.cells.length; i++) { var y = cur.y + cur.cells[i][1], x = cur.x + cur.cells[i][0]; if (y >= 0) grid[y][x] = cur.c + 1; }
    score += 5 * cur.cells.length;
    full = [];
    for (r = 0; r < ROWS; r++) { var f = true; for (i = 0; i < COLS; i++) if (!grid[r][i]) { f = false; break; } if (f) full.push(r); }
    if (full.length) {
      state = 'clear'; stateAt = performance.now(); flash = .6;
      full.forEach(function (rr) { for (var cc = 0; cc < COLS; cc++) boom(BX + cc * C + C / 2, BY + rr * C + C / 2, '255,179,71'); });
      banner = { t: full.length > 1 ? 'SEALED x' + full.length : 'SEALED', age: 0 };
      sfx('line');
    } else { sfx('land'); spawn(); }
  }
  function collapse() {
    var n = full.length, i;
    score += [0, 100, 300, 600, 1000, 1500][Math.min(n, 5)] * level; lines += n;
    for (i = full.length - 1; i >= 0; i--) grid.splice(full[i], 1);
    for (i = 0; i < n; i++) grid.unshift(new Array(COLS).fill(0));
    full = null;
    var nl = Math.min(LEVELS, 1 + ((lines / 6) | 0));
    if (nl > level) { level = nl; paintPips(); banner = { t: 'LEVEL ' + level, age: 0 }; }
    state = 'play'; spawn();
  }

  function update(dt) {
    var i;
    if (banner) { banner.age += dt; if (banner.age > 1.5) banner = null; }
    if (flash > 0) flash = Math.max(0, flash - dt * 2.2);
    for (i = parts.length - 1; i >= 0; i--) { var q = parts[i]; q.age += dt; if (q.age >= q.life) { parts.splice(i, 1); continue; } q.vy += 160 * dt; q.x += q.vx * dt; q.y += q.vy * dt; }
    if (state === 'clear') { if (performance.now() - stateAt > 320) collapse(); return; }
    if (state !== 'play') return;
    acc += dt;
    var iv = soft ? .045 : Math.max(.09, .8 - .075 * (level - 1));
    while (acc >= iv && state === 'play') { acc -= iv; if (!move(0, 1)) { lock(); break; } if (soft) score += 1; }
  }

  function cell(x, y, ci, a) {
    var o = COLORS[ci];
    ctx.globalAlpha = a == null ? 1 : a;
    ctx.fillStyle = o.b; ctx.fillRect(x, y, C, C);
    ctx.fillStyle = o.l; ctx.fillRect(x, y, C, 2); ctx.fillRect(x, y, 2, C);
    ctx.fillStyle = o.d; ctx.fillRect(x, y + C - 2, C, 2); ctx.fillRect(x + C - 2, y, 2, C);
    ctx.fillRect(x + C / 2 - 1, y + 4, 2, C - 8); ctx.fillRect(x + 4, y + C / 2 - 1, C - 8, 2);   // the strap
    ctx.globalAlpha = 1;
  }
  function mini(p, x, y) {   // the preview crate, small
    var k = .5;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    for (var i = 0; i < p.cells.length; i++) cell(p.cells[i][0] * C, p.cells[i][1] * C, p.c);
    ctx.restore();
  }

  function draw(t) {
    var k = cv.width / FW, r, c, i;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.setTransform(k, 0, 0, k, 0, 0);
    // the bunker: concrete walls with bolts, a hazard floor
    ctx.fillStyle = '#3a2d24'; ctx.fillRect(BX - 7, BY - 4, 7, ROWS * C + 8); ctx.fillRect(BX + COLS * C, BY - 4, 7, ROWS * C + 8);
    ctx.fillStyle = '#6a5848'; for (i = 0; i < ROWS; i += 2) { ctx.fillRect(BX - 5, BY + i * C + 8, 3, 3); ctx.fillRect(BX + COLS * C + 2, BY + i * C + 8, 3, 3); }
    for (i = 0; i < COLS * C + 14; i += 12) { ctx.fillStyle = '#ff7a1c'; ctx.fillRect(BX - 7 + i, BY + ROWS * C + 4, 6, 4); ctx.fillStyle = '#2a1a10'; ctx.fillRect(BX - 1 + i, BY + ROWS * C + 4, 6, 4); }
    ctx.fillStyle = 'rgba(10,8,6,.55)'; ctx.fillRect(BX, BY, COLS * C, ROWS * C);
    ctx.fillStyle = 'rgba(255,255,255,.04)';
    for (c = 1; c < COLS; c++) ctx.fillRect(BX + c * C, BY, 1, ROWS * C);
    for (r = 1; r < ROWS; r++) ctx.fillRect(BX, BY + r * C, COLS * C, 1);
    ctx.fillStyle = 'rgba(255,58,46,' + (.18 + .1 * Math.sin(t / 300)).toFixed(3) + ')'; ctx.fillRect(BX, BY + C * 1.5 - 1, COLS * C, 1);   // the line that must not be crossed

    for (r = 0; r < ROWS; r++) for (c = 0; c < COLS; c++) if (grid[r][c]) {
      var blink = full && full.indexOf(r) >= 0;
      if (blink && Math.floor(t / 60) % 2) { ctx.fillStyle = '#fff'; ctx.fillRect(BX + c * C, BY + r * C, C, C); }
      else cell(BX + c * C, BY + r * C, grid[r][c] - 1, state === 'over' ? .45 : 1);
    }
    if (state === 'play') {
      var gy = cur.y; while (fits(cur.cells, cur.x, gy + 1)) gy++;
      if (gy > cur.y) for (i = 0; i < cur.cells.length; i++) { ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(BX + (cur.x + cur.cells[i][0]) * C + 1, BY + (gy + cur.cells[i][1]) * C + 1, C - 2, C - 2); }
      for (i = 0; i < cur.cells.length; i++) cell(BX + (cur.x + cur.cells[i][0]) * C, BY + (cur.y + cur.cells[i][1]) * C, cur.c);
    }
    for (i = 0; i < parts.length; i++) { var q = parts[i]; ctx.fillStyle = 'rgba(' + q.c + ',' + (1 - q.age / q.life).toFixed(2) + ')'; ctx.fillRect(q.x - 1, q.y - 1, 2, 2); }

    // side panel
    ctx.textBaseline = 'top'; ctx.textAlign = 'left'; ctx.font = '700 8px ' + FONT;
    var px = BX + COLS * C + 14;
    ctx.fillStyle = 'rgba(232,214,196,.6)'; ctx.fillText('NEXT', px, 12);
    ctx.fillStyle = 'rgba(10,8,6,.55)'; ctx.fillRect(px, 24, 64, 46);
    if (next && state !== 'over') { var w = width(next.cells); mini(next, px + (64 - w * C * .5) / 2, 24 + (46 - (Math.max.apply(null, next.cells.map(function (q) { return q[1]; })) + 1) * C * .5) / 2); }
    ctx.fillStyle = 'rgba(232,214,196,.6)'; ctx.fillText('FAME', px, 90);
    ctx.fillStyle = '#ffb347'; ctx.font = '700 13px ' + FONT; ctx.fillText(String(score), px, 102);
    ctx.font = '700 8px ' + FONT; ctx.fillStyle = 'rgba(232,214,196,.6)'; ctx.fillText('SEALED', px, 128);
    ctx.fillStyle = '#ffb347'; ctx.font = '700 13px ' + FONT; ctx.fillText(String(lines), px, 140);
    ctx.font = '700 8px ' + FONT; ctx.fillStyle = 'rgba(232,214,196,.6)'; ctx.fillText('LEVEL', px, 166);
    ctx.fillStyle = '#ffb347'; ctx.font = '700 13px ' + FONT; ctx.fillText(String(level), px, 178);

    if (banner) {
      var a = banner.age < .2 ? banner.age / .2 : banner.age > 1.1 ? Math.max(0, 1 - (banner.age - 1.1) / .4) : 1;
      ctx.globalAlpha = a; ctx.font = '700 22px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#0d0c0b'; ctx.fillText(banner.t, BX + COLS * C / 2 + 1.5, 151.5);
      ctx.fillStyle = '#ffb347'; ctx.fillText(banner.t, BX + COLS * C / 2, 150);
      ctx.globalAlpha = 1;
    }
    if (flash > 0) { ctx.fillStyle = (state === 'over' ? 'rgba(255,40,30,' : 'rgba(255,255,255,') + (flash * .3).toFixed(3) + ')'; ctx.fillRect(0, 0, FW, FW); }
  }

  function loop(t) {
    if (!on) return;
    requestAnimationFrame(loop);
    var dt = Math.min(.05, (t - last) / 1000); last = t;
    update(dt); draw(t);
    if (state === 'over' && !cv.getAttribute('data-ended') && t - stateAt > 1000) { cv.setAttribute('data-ended', '1'); finish(); }
  }

  function finish() {
    if (window.flMusic) window.flMusic.stop();
    var o = { game: 'BUNKER', icon: '📦', title: 'Game over', win: false, score: score, stats: [['SEALED', lines], ['LEVEL', level]], tiers: [500, 1500, 3500, 7000], home: HOME };
    if (window.flArcade) window.flArcade.finish(o); else location.assign(HOME);
  }
  function restart() {
    soft = 0; cv.removeAttribute('data-ended');
    newGame();
    if (window.flMusic) window.flMusic.start(function () { return level; }, 'blocks');
  }

  // ---- controls ----
  function act(id) {
    if (!on) return;
    if (id === 'L') move(-1, 0); else if (id === 'R') move(1, 0); else if (id === 'T') turn(); else if (id === 'H') drop();
    else if (id === 'D') { if (move(0, 1)) score += 1; acc = 0; }
  }
  document.addEventListener('keydown', function (e) {
    if (!on || e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key, c = e.code, id = null;
    if (k === 'ArrowLeft' || k === 'a' || k === 'A' || k === 'q' || k === 'Q' || c === 'KeyA') id = 'L';
    else if (k === 'ArrowRight' || k === 'd' || k === 'D' || c === 'KeyD') id = 'R';
    else if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'z' || k === 'Z' || c === 'KeyW') id = 'T';
    else if (k === 'ArrowDown' || k === 's' || k === 'S' || c === 'KeyS') id = 'S';
    else if (k === ' ' || k === 'Spacebar' || c === 'Space') id = 'H';
    if (!id) return;
    e.preventDefault();
    if (id === 'S') soft = 1; else if (!e.repeat || id === 'L' || id === 'R') act(id);
  });
  document.addEventListener('keyup', function (e) {
    if (!on) return;
    var k = e.key, c = e.code;
    if (k === 'ArrowDown' || k === 's' || k === 'S' || c === 'KeyS') soft = 0;
  });
  window.addEventListener('blur', function () { soft = 0; });

  var ICONS = { L: 'M16 4 6 12l10 8z', R: 'M8 4l10 8-10 8z', T: 'M12 5V2L8 6l4 4V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z', D: 'M12 21l-6-9h4V3h4v9h4z', H: 'M6 3h12v3H6zM12 21l-6-9h4V8h4v4h4z' };
  function buildPad() {
    if (padBuilt) return; padBuilt = true;
    var pad = document.createElement('div'); pad.className = 'pad five';
    pad.innerHTML = ['L', 'R', 'T', 'D', 'H'].map(function (id) {
      return '<button type="button" tabindex="-1" aria-label="' + ({ L: 'Left', R: 'Right', T: 'Rotate', D: 'Down', H: 'Drop' })[id] + '" data-k="' + id + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[id] + '"/></svg></button>';
    }).join('');
    game.appendChild(pad);
    [].forEach.call(pad.children, function (b) {
      var id = b.getAttribute('data-k'), t1 = 0, t2 = 0;
      function stop() { clearTimeout(t1); clearInterval(t2); b.classList.remove('on'); }
      b.addEventListener('pointerdown', function (e) {
        e.preventDefault(); b.classList.add('on'); try { b.setPointerCapture(e.pointerId); } catch (x) {}
        act(id);
        if (id === 'L' || id === 'R' || id === 'D') t1 = setTimeout(function () { t2 = setInterval(function () { act(id); }, id === 'D' ? 50 : 90); }, 260);
      });
      b.addEventListener('pointerup', stop); b.addEventListener('pointercancel', stop); b.addEventListener('lostpointercapture', stop);
      b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    });
  }

  function begin() {
    if (on) return;
    on = true;
    cv.className = 'invade'; setTimeout(function () { cv.classList.remove('invade'); }, 720);
    cv.setAttribute('aria-label', 'Blocks');
    game.classList.add('arc');
    if (window.flMusic && window.flMusic.bar && !game.querySelector('.snd')) window.flMusic.bar(game);
    buildPad();
    window.dispatchEvent(new Event('resize'));   // the board may have changed size with the pad
    restart();
    last = performance.now(); requestAnimationFrame(loop);
  }
  document.addEventListener('fl-blocks', begin);
})();
