(function () {
  // 404 page: once every wandering Discord character is gone (fl-logo404 sends `fl-invaders`), the snake board turns into a tiny
  // invaders game: waves of mechas shoot at the SCUM prisoner (the visitor). Left / right to move, space to shoot (a pad shows on
  // touch screens). Ten levels, each harder than the last. Clearing a level goes to the next one; losing ends the run: the visitor
  // may sign the score (8 characters at most) on a top 10 kept in this browser, then goes back to the home page.
  // This game never grants any rank.
  var cv = document.getElementById('fl-snake'), pipsEl = document.getElementById('fl-pips');
  if (!cv || !cv.getContext) return;
  var game = cv.parentNode, HOME = cv.getAttribute('data-home') || '/', FW = 300, PY = 268, PX = 1.6, LEVELS = 10, NAME_MAX = 8, TOP_KEY = 'fl-invaders-top';
  var ctx = cv.getContext('2d');
  var COLS = [4, 5, 5, 6, 6, 7, 7, 8, 8, 8], ROWS = [3, 3, 4, 4, 4, 4, 5, 5, 5, 5];

  // pixel pictures: s skin, o orange jumpsuit, d dark, g gun, # robot plating, e eye
  var HERO = [
    '........g', '...sss..g', '..sdsds.g', '...sss..g', '..ooooooo', '.ooooooo.', '.oo.o.oo.', '..ooooo..', '..oo.oo..', '..dd.dd..'
  ];
  var MECHA = [
    '..#.....#..', '...#...#...', '..#######..', '.##e###e##.', '###########', '#.#######.#', '#.#.....#.#', '...##.##...'
  ];
  var HW = 9 * PX, MW = 11 * PX, MH = 8 * PX;
  var SK = { s: '#e8c9a0', o: '#ff7a1c', d: '#2a1a10', g: '#b9c2c9' };
  var FONT = 'ui-monospace, Consolas, Menlo, monospace';

  var on = false, keys = { L: 0, R: 0, F: 0 };
  var hero, shots, bolts, mechs, parts, kills, total, lives, level, score, cfg, state, stateAt, fx, fy, dir, nextBolt, intro, flash, banner, last = 0, shotAt = 0;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  // difficulty per level: 1 is the gentle original wave, 10 is a wall of fast, aimed fire that nobody is meant to survive
  function config(l) {
    var c = COLS[l - 1], r = ROWS[l - 1];
    return { cols: c, rows: r, top: 22 + Math.min(l - 1, 6) * 6, speed: 14 + 4 * (l - 1), boltMin: .7 - .062 * (l - 1), boltMax: 1.35 - .115 * (l - 1), boltV: 105 + 8 * (l - 1), aim: Math.max(0, (l - 2) * .09) };
  }

  function paintPips() {
    var p = pipsEl.children;
    for (var i = 0; i < p.length; i++) p[i].className = i < level ? 'on' : '';
  }
  function setWave() {
    cfg = config(level); shots = []; bolts = []; kills = 0; intro = 0; dir = 1; nextBolt = 1.6; mechs = [];
    fx = (FW - ((cfg.cols - 1) * 30 + MW)) / 2; fy = -cfg.rows * 22;
    for (var r = 0; r < cfg.rows; r++) for (var c = 0; c < cfg.cols; c++) mechs.push({ c: c, r: r, alive: true });
    total = mechs.length;
    banner = { t: 'LEVEL ' + level, age: 0 };
    state = 'play'; stateAt = 0;
    paintPips();
  }
  function newGame() {
    level = 1; score = 0; lives = 3; parts = []; flash = 0;
    hero = { x: FW / 2, inv: 0 };
    pipsEl.textContent = '';
    for (var i = 0; i < LEVELS; i++) pipsEl.appendChild(document.createElement('i'));
    setWave();
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
    var i, j, m, A = 0, minC = 99, maxC = -1, maxR = -1;
    hero.x = Math.max(10, Math.min(FW - 10, hero.x + (keys.R - keys.L) * 150 * dt));
    if (hero.inv > 0) hero.inv -= dt;
    if (flash > 0) flash = Math.max(0, flash - dt * 2.4);
    if (banner) { banner.age += dt; if (banner.age > 1.5) banner = null; }
    for (i = parts.length - 1; i >= 0; i--) { var q = parts[i]; q.age += dt; if (q.age >= q.life) { parts.splice(i, 1); continue; } q.x += q.vx * dt; q.y += q.vy * dt; }
    if (state !== 'play') return;
    if (keys.F) fire();

    for (i = 0; i < mechs.length; i++) if (mechs[i].alive) { A++; m = mechs[i]; if (m.c < minC) minC = m.c; if (m.c > maxC) maxC = m.c; if (m.r > maxR) maxR = m.r; }

    // the wave slides in from the top, then sweeps from side to side, dropping a step at each edge and speeding up as it thins out
    if (intro < 1) { intro = Math.min(1, intro + dt / 1.1); var e = 1 - Math.pow(1 - intro, 3); fy = -cfg.rows * 22 + (cfg.top + cfg.rows * 22) * e; }
    else {
      fx += dir * cfg.speed * (1 + 2.5 * (1 - A / total)) * dt;
      var left = fx + minC * 30, right = fx + maxC * 30 + MW;
      if (right > FW - 8) { fx -= right - (FW - 8); dir = -1; fy += 8; } else if (left < 8) { fx += 8 - left; dir = 1; fy += 8; }
      if (fy + maxR * 22 + MH >= PY - 12) { lives = 0; flash = 1; state = 'lost'; stateAt = performance.now(); return; }
    }

    for (i = shots.length - 1; i >= 0; i--) {
      var s = shots[i]; s.y -= 230 * dt;
      if (s.y < -8) { shots.splice(i, 1); continue; }
      for (j = 0; j < mechs.length; j++) {
        m = mechs[j];
        if (m.alive && Math.abs(s.x - (mx(m) + MW / 2)) < MW / 2 + 1 && s.y + 6 > my(m) && s.y < my(m) + MH) {   // box overlap, so a slow frame never lets a shot slip through
          m.alive = false; kills++; score += 10 * level; boom(mx(m) + MW / 2, my(m) + MH / 2, '255,122,51'); shots.splice(i, 1);
          if (kills >= total) {
            score += 50 * level + 25 * level * lives;
            state = level >= LEVELS ? 'victory' : 'clear'; stateAt = performance.now(); bolts = [];
            banner = { t: level >= LEVELS ? 'YOU WIN' : 'CLEAR', age: 0 };
          }
          break;
        }
      }
    }
    if (state !== 'play') { shots = []; return; }   // wave over: no shot is left hanging in mid-air

    if (intro >= 1) {
      nextBolt -= dt;
      if (nextBolt <= 0 && A) {
        nextBolt = rnd(cfg.boltMin, cfg.boltMax);
        var cols = [], c, seen = {};
        for (j = 0; j < mechs.length; j++) if (mechs[j].alive && !seen[mechs[j].c]) { seen[mechs[j].c] = 1; cols.push(mechs[j].c); }
        if (Math.random() < cfg.aim) {   // from level 3 on, some volleys are aimed at the prisoner
          c = cols[0];
          for (j = 1; j < cols.length; j++) if (Math.abs(fx + cols[j] * 30 + MW / 2 - hero.x) < Math.abs(fx + c * 30 + MW / 2 - hero.x)) c = cols[j];
        } else c = cols[(Math.random() * cols.length) | 0];
        var low = null;
        for (j = 0; j < mechs.length; j++) if (mechs[j].alive && mechs[j].c === c && (!low || mechs[j].r > low.r)) low = mechs[j];
        if (low) bolts.push({ x: mx(low) + MW / 2, y: my(low) + MH });
      }
    }
    for (i = bolts.length - 1; i >= 0; i--) {
      var b = bolts[i]; b.y += cfg.boltV * dt;
      if (b.y > FW + 8) { bolts.splice(i, 1); continue; }
      if (hero.inv <= 0 && Math.abs(b.x - hero.x) < 6 && b.y + 6 > PY - 8 && b.y < PY + 10) {
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
    var steel = ['#aab4bc', '#8f9aa3', '#76828c', '#8a8f96', '#9a8f8a'], eye = state === 'lost' ? '#7a1c14' : (Math.floor(t / 260) % 2 ? '#ff3a2e' : '#ff8a5c');
    for (i = 0; i < mechs.length; i++) {
      var m = mechs[i]; if (!m.alive) continue;
      spr(MECHA, mx(m), my(m), { '#': steel[m.r % steel.length], e: eye });
    }
    if (state !== 'lost' && (hero.inv <= 0 || Math.floor(t / 70) % 2)) spr(HERO, hero.x - HW / 2, PY - 8, SK);
    ctx.fillStyle = '#ffb347';
    for (i = 0; i < shots.length; i++) ctx.fillRect(shots[i].x - .8, shots[i].y, 1.6, 6);
    ctx.fillStyle = '#ff3a2e';
    for (i = 0; i < bolts.length; i++) ctx.fillRect(bolts[i].x - .9, bolts[i].y, 1.8, 6);
    for (i = 0; i < parts.length; i++) { var q = parts[i]; ctx.fillStyle = 'rgba(' + q.c + ',' + (1 - q.age / q.life).toFixed(2) + ')'; ctx.fillRect(q.x - 1, q.y - 1, 2, 2); }
    ctx.fillStyle = '#ff7a1c';
    for (i = 0; i < lives; i++) ctx.fillRect(8 + i * 8, 290, 5, 5);
    ctx.font = '700 8px ' + FONT; ctx.textBaseline = 'top'; ctx.fillStyle = 'rgba(232,214,196,.85)';
    ctx.textAlign = 'left'; ctx.fillText(('00000' + score).slice(-5), 8, 4);
    ctx.textAlign = 'right'; ctx.fillText('LV ' + level, FW - 8, 4);
    if (banner) {
      var a = banner.age < .2 ? banner.age / .2 : banner.age > 1.1 ? Math.max(0, 1 - (banner.age - 1.1) / .4) : 1;
      ctx.globalAlpha = a; ctx.font = '700 22px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#0d0c0b'; ctx.fillText(banner.t, FW / 2 + 1.5, 151.5);
      ctx.fillStyle = '#ffb347'; ctx.fillText(banner.t, FW / 2, 150);
      ctx.globalAlpha = 1;
    }
    if (flash > 0) { ctx.fillStyle = 'rgba(255,40,30,' + (flash * .3).toFixed(3) + ')'; ctx.fillRect(0, 0, FW, FW); }
  }

  function loop(t) {
    if (!on) return;
    requestAnimationFrame(loop);
    var dt = Math.min(.05, (t - last) / 1000); last = t;
    update(dt); draw(t);
    if (state === 'lost' && t - stateAt > 900) finish(false);
    else if (state === 'victory' && t - stateAt > 1800) finish(true);
    else if (state === 'clear' && t - stateAt > 1500) { level++; lives = Math.min(3, lives + 1); setWave(); }
  }

  // ---- end of the run: sign the score, show the top 10, go home ----
  function loadTop() {
    try {
      var a = JSON.parse(localStorage.getItem(TOP_KEY) || '[]');
      if (Array.isArray(a)) return a.filter(function (r) { return r && typeof r.n === 'string' && typeof r.s === 'number' && typeof r.l === 'number'; }).map(function (r) { return { n: r.n.slice(0, NAME_MAX), s: r.s, l: r.l }; }).slice(0, 10);
    } catch (e) {}
    return [];
  }
  function saveTop(list) { try { localStorage.setItem(TOP_KEY, JSON.stringify(list)); } catch (e) {} }
  function clean(v) {
    try { v = v.replace(new RegExp('[^\\p{L}\\p{N} _.\\-]', 'gu'), ''); } catch (e) { v = v.replace(/[^A-Za-z0-9 _.\-]/g, ''); }
    return v.toUpperCase().slice(0, NAME_MAX);
  }
  function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; }

  function finish(win) {
    on = false; keys.L = keys.R = keys.F = 0;
    var ov = el('div', 'ov'), bx = el('div', 'bx'), board = el('ol', 'top'), mine = null;
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', win ? 'You win' : 'Game over');
    bx.appendChild(el('h2', '', win ? 'You win' : 'Game over'));
    var sc = el('p', 'sc', 'SCORE '); sc.appendChild(el('b', '', String(score))); sc.appendChild(document.createTextNode('  ·  LEVEL ')); sc.appendChild(el('b', '', String(win ? LEVELS : level)));
    bx.appendChild(sc);

    function paintBoard(list) {
      board.textContent = '';
      for (var i = 0; i < 10; i++) {
        var r = list[i], li = el('li', r && r === mine ? 'me' : '');
        li.appendChild(el('i', '', String(i + 1)));
        li.appendChild(el('span', '', r ? r.n : '- - -'));
        li.appendChild(el('b', '', r ? String(r.s) : ''));
        li.appendChild(el('em', '', r ? 'L' + r.l : ''));
        board.appendChild(li);
      }
    }
    var home = el('a', 'hm', 'Home'); home.href = HOME;

    var form = null, input = null;
    if (score > 0) {
      form = el('form', 'nm'); input = el('input'); input.type = 'text'; input.maxLength = NAME_MAX; input.placeholder = 'NAME';
      input.setAttribute('autocomplete', 'off'); input.setAttribute('autocapitalize', 'characters'); input.setAttribute('spellcheck', 'false'); input.setAttribute('aria-label', 'Name');
      var ok = el('button', '', 'OK'); ok.type = 'submit';
      form.appendChild(input); form.appendChild(ok);
      input.addEventListener('input', function () { var c = clean(input.value); if (c !== input.value) input.value = c; });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var n = clean(input.value).replace(/\s+/g, ' ').trim();
        if (!n) { input.focus(); return; }
        var list = loadTop(); mine = { n: n, s: score, l: win ? LEVELS : level };
        list.push(mine);
        list.sort(function (a, b) { return b.s - a.s; });
        list = list.slice(0, 10); saveTop(list); paintBoard(list);
        form.parentNode.removeChild(form); form = null; home.focus();
      });
      bx.appendChild(form);
    }
    bx.appendChild(el('h3', '', 'Top 10'));
    paintBoard(loadTop());
    bx.appendChild(board); bx.appendChild(home);
    ov.appendChild(bx); document.body.appendChild(ov);
    if (input) { try { input.focus({ preventScroll: true }); } catch (e) {} }
    document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !form && e.target === document.body) location.assign(HOME); });
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
    window.dispatchEvent(new Event('resize'));   // the board may have changed size with the pad: let the canvas bitmap follow
    last = performance.now(); requestAnimationFrame(loop);
  }
  document.addEventListener('fl-invaders', begin);
})();
