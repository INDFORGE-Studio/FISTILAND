(function () {
  // 404 page: once every wandering Discord character is gone (fl-logo404 sends `fl-invaders`), the snake board turns into a tiny
  // invaders game: waves of mechas shoot at the SCUM prisoner (the visitor). Left / right to move, space to shoot (a pad shows on
  // touch screens). Ten levels, each harder than the last. Clearing a level goes to the next one; losing ends the run: the visitor
  // may sign the score (8 characters at most) on a top 3 kept in this browser, then goes back to the home page.
  // This game never grants any rank.
  var cv = document.getElementById('fl-snake'), pipsEl = document.getElementById('fl-pips');
  if (!cv || !cv.getContext) return;
  var game = cv.parentNode, HOME = cv.getAttribute('data-home') || '/', FW = 300, PY = 268, PX = 1.6, LEVELS = 10, NAME_MAX = 8, TOPN = 3, TOP_KEY = 'fl-invaders-top';
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
  // airdrop: reach level 5 without losing a single life and a supply crate falls; catching it gives a second gun for the rest of the run
  var DROP_LEVEL = 5, lostLife = false, armed = false, drop = null, dropIn = 0;

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
    if (level === DROP_LEVEL && !lostLife && !armed && !drop) dropIn = 2.4;
    paintPips();
  }
  function newGame() {
    level = 1; score = 0; lives = 3; parts = []; flash = 0;
    lostLife = false; armed = false; drop = null; dropIn = 0;
    hero = { x: FW / 2, inv: 0 };
    pipsEl.textContent = '';
    for (var i = 0; i < LEVELS; i++) pipsEl.appendChild(document.createElement('i'));
    setWave();
  }

  function fire() {
    var now = performance.now();
    if (!on || state !== 'play' || now - shotAt < 330 || shots.length >= (armed ? 6 : 3)) return;
    shotAt = now;
    if (armed) { shots.push({ x: hero.x - 6, y: PY - 8 }); shots.push({ x: hero.x + 6, y: PY - 8 }); }
    else shots.push({ x: hero.x, y: PY - 8 });
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
    // the supply crate: it floats down on its parachute, then waits on the ground until the prisoner walks into it
    if (dropIn > 0) {
      dropIn -= dt;
      if (dropIn <= 0) { drop = { x0: rnd(26, FW - 26), x: 0, y: -30, age: 0, landed: false }; drop.x = drop.x0; banner = { t: 'AIRDROP', age: 0 }; if (window.flMusic) window.flMusic.sfx(); }
    }
    if (drop) {
      drop.age += dt;
      if (!drop.landed) { drop.y += 38 * dt; drop.x = drop.x0 + Math.sin(drop.age * 1.8) * 7; if (drop.y >= PY + 4) { drop.y = PY + 4; drop.landed = true; drop.x0 = drop.x; } }
      if (state === 'play' && Math.abs(drop.x - hero.x) < HW / 2 + 5 && drop.y + 8 >= PY - 8) {
        armed = true; boom(drop.x, drop.y, '255,200,70'); boom(drop.x, drop.y, '255,200,70'); drop = null;
        banner = { t: 'DOUBLE GUN', age: 0 }; if (window.flMusic) window.flMusic.sfx();
      }
    }
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
        bolts.splice(i, 1); lives--; lostLife = true; hero.inv = 1.3; flash = 1; boom(hero.x, PY, '255,58,46');
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
    if (drop) {
      var dx = drop.x, dy = drop.y;
      if (!drop.landed) {
        ctx.fillStyle = '#ff7a1c'; ctx.beginPath(); ctx.arc(dx, dy - 11, 11, Math.PI, 0); ctx.fill();
        ctx.fillStyle = 'rgba(13,12,11,.35)'; ctx.fillRect(dx - 3.7, dy - 21, 1.4, 10); ctx.fillRect(dx + 2.3, dy - 21, 1.4, 10);
        ctx.strokeStyle = 'rgba(232,214,196,.75)'; ctx.lineWidth = .6; ctx.beginPath();
        ctx.moveTo(dx - 11, dy - 11); ctx.lineTo(dx - 4, dy); ctx.moveTo(dx + 11, dy - 11); ctx.lineTo(dx + 4, dy); ctx.moveTo(dx, dy - 11); ctx.lineTo(dx, dy); ctx.stroke();
      } else {
        ctx.fillStyle = 'rgba(255,200,70,' + (.18 + .14 * Math.sin(t / 160)).toFixed(3) + ')'; ctx.fillRect(dx - 8, dy - 3, 16, 14);
      }
      ctx.fillStyle = '#6b7a3a'; ctx.fillRect(dx - 5, dy, 10, 8);
      ctx.fillStyle = '#3b4420'; ctx.fillRect(dx - 5, dy + 3.2, 10, 1.6); ctx.fillRect(dx - .8, dy, 1.6, 8);
    }
    if (state !== 'lost' && (hero.inv <= 0 || Math.floor(t / 70) % 2)) {
      spr(HERO, hero.x - HW / 2, PY - 8, SK);
      if (armed) { ctx.fillStyle = SK.g; ctx.fillRect(hero.x - HW / 2, PY - 8, PX, PX * 4); ctx.fillStyle = SK.o; ctx.fillRect(hero.x - HW / 2 + PX, PY - 8 + PX * 4, PX, PX); }
    }
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

  // ---- end of the run: sign the score, show the top 3, go home ----
  function loadTop() {
    try {
      var a = JSON.parse(localStorage.getItem(TOP_KEY) || '[]');
      if (Array.isArray(a)) return a.filter(function (r) { return r && typeof r.n === 'string' && typeof r.s === 'number' && typeof r.l === 'number'; }).map(function (r) { return { n: r.n.slice(0, NAME_MAX), s: r.s, l: r.l }; }).slice(0, TOPN);
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
    if (window.flMusic) window.flMusic.stop();
    var ov = el('div', 'ov'), bx = el('div', 'bx'), board = el('ol', 'top'), mine = null;
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', win ? 'You win' : 'Game over');
    bx.appendChild(el('h2', '', win ? 'You win' : 'Game over'));
    var sc = el('p', 'sc', 'SCORE '); sc.appendChild(el('b', '', String(score))); sc.appendChild(document.createTextNode('  ·  LEVEL ')); sc.appendChild(el('b', '', String(win ? LEVELS : level)));
    bx.appendChild(sc);

    function paintBoard(list) {
      board.textContent = '';
      for (var i = 0; i < TOPN; i++) {
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
        list = list.slice(0, TOPN); saveTop(list); paintBoard(list);
        form.parentNode.removeChild(form); form = null; home.focus();
      });
      bx.appendChild(form);
    }
    bx.appendChild(el('h3', '', 'Top 3'));
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

  // ---- music: speaker icon (click = mute) and a volume slider; both choices are kept in this browser ----
  var SND_KEY = 'fl-invaders-snd', ICON_ON = 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
    ICON_OFF = 'M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z';
  function buildSound() {
    var M = window.flMusic; if (!M) return;
    var st = { v: .7, m: 0 };
    try { var o = JSON.parse(localStorage.getItem(SND_KEY) || '{}'); if (typeof o.v === 'number' && o.v >= 0 && o.v <= 1) st.v = o.v; st.m = o.m ? 1 : 0; } catch (e) {}
    var bar = el('div', 'snd'), btn = el('button'), rng = el('input');
    btn.type = 'button'; btn.setAttribute('aria-label', 'Sound');
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d=""/></svg>';
    rng.type = 'range'; rng.min = '0'; rng.max = '100'; rng.step = '1'; rng.setAttribute('aria-label', 'Volume');
    var path = btn.querySelector('path');
    function sync() {
      var off = st.m || st.v === 0;
      path.setAttribute('d', off ? ICON_OFF : ICON_ON);
      btn.setAttribute('aria-pressed', off ? 'true' : 'false'); btn.classList.toggle('off', off);
      rng.value = String(Math.round((st.m ? 0 : st.v) * 100));
      M.volume(st.v); M.mute(off);
      try { localStorage.setItem(SND_KEY, JSON.stringify(st)); } catch (e) {}
    }
    btn.addEventListener('click', function () {
      if (st.v === 0) { st.v = .5; st.m = 0; } else st.m = st.m ? 0 : 1;
      sync(); if (btn.matches(':focus-visible') === false) btn.blur();
    });
    rng.addEventListener('input', function () { st.v = rng.value / 100; st.m = 0; sync(); });
    rng.addEventListener('change', function () { rng.blur(); });
    bar.appendChild(btn); bar.appendChild(rng);
    game.appendChild(bar);
    sync();
  }

  function begin() {
    if (on || !window.flSnake || !window.flSnake.halt()) return;   // refused while the snake is celebrating a win
    on = true;
    cv.className = 'invade'; setTimeout(function () { cv.classList.remove('invade'); }, 720);
    cv.setAttribute('aria-label', 'Invaders');
    game.classList.add('inv');
    buildSound(); buildPad(); newGame();
    if (window.flMusic) window.flMusic.start(function () { return level; });
    window.dispatchEvent(new Event('resize'));   // the board may have changed size with the pad: let the canvas bitmap follow
    last = performance.now(); requestAnimationFrame(loop);
  }
  document.addEventListener('fl-invaders', begin);
})();
