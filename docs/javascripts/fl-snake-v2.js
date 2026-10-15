(function () {
  // 404 page: a one-level snake. Eat `data-goal` mushrooms and the visitor goes back to the home page.
  // Walls wrap around (only the snake's own body kills), controls: arrows / WASD / ZQSD, or a swipe on the board.
  var cv = document.getElementById('fl-snake'), pipsEl = document.getElementById('fl-pips');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d'), N = 20, STEP = 130;
  var cs = 16, snake, dir, queue, food, eaten, started, state, stateAt;   // state: play | dead | won
  var HOME = cv.getAttribute('data-home') || '/';

  var shift = false;   // true when this win just unlocked the last rank

  // Winning as a Veteran (the four secrets found) grants the last rank. The wiki's rank script (fl-rank) announces it on the next page.
  // Same storage key and flags as fl-rank.
  function grantMeta() {
    try {
      var o = JSON.parse(localStorage.getItem('fl-eggs-5') || '{}');
      if (!o || typeof o !== 'object' || !(o.discord && o.mushroom && o.master && o.veteran) || o.meta) return false;
      o.meta = 1; o.metaNew = 1;
      localStorage.setItem('fl-eggs-5', JSON.stringify(o));
      return true;
    } catch (e) { return false; }
  }

  function goal() { return Math.max(1, parseInt(cv.getAttribute('data-goal'), 10) || 12); }

  function buildPips() {
    pipsEl.textContent = '';
    for (var i = 0; i < goal(); i++) pipsEl.appendChild(document.createElement('i'));
  }
  function paintPips() {
    var p = pipsEl.children;
    for (var i = 0; i < p.length; i++) p[i].className = i < eaten ? 'on' : '';
  }

  function placeFood() {
    var free = [], occ = {}, i;
    for (i = 0; i < snake.length; i++) occ[snake[i].y * N + snake[i].x] = 1;
    for (i = 0; i < N * N; i++) if (!occ[i]) free.push(i);
    var c = free[Math.floor(Math.random() * free.length)];
    food = { x: c % N, y: (c / N) | 0 };
  }

  function reset() {
    snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];   // head first
    dir = { x: 1, y: 0 }; queue = []; eaten = 0; started = false; state = 'play';
    cv.className = ''; shift = false;
    paintPips(); placeFood();
  }

  function size() {
    var dpr = window.devicePixelRatio || 1, css = cv.clientWidth - 4;
    cs = Math.max(8, Math.round(css * dpr / N));
    cv.width = cv.height = cs * N;
  }

  function turn(dx, dy) {
    if (state !== 'play') return;
    var last = queue.length ? queue[queue.length - 1] : dir;
    if (dx === last.x && dy === last.y) { started = true; return; }   // the way the snake already faces: starts the game if it was waiting
    if (queue.length > 1) return;
    if (dx === -last.x && dy === -last.y) {
      if (started) return;
      snake.reverse(); dir = { x: dx, y: dy }; started = true;   // still waiting for the first move: turning back just flips the snake
      return;
    }
    queue.push({ x: dx, y: dy });
    started = true;
  }

  function tick() {
    if (queue.length) dir = queue.shift();
    var h = snake[0], nx = (h.x + dir.x + N) % N, ny = (h.y + dir.y + N) % N, grow = nx === food.x && ny === food.y, i;
    for (i = 0; i < snake.length - (grow ? 0 : 1); i++) {
      if (snake[i].x === nx && snake[i].y === ny) { state = 'dead'; stateAt = performance.now(); cv.className = 'dead'; return; }
    }
    snake.unshift({ x: nx, y: ny });
    if (!grow) { snake.pop(); return; }
    eaten++; paintPips();
    if (eaten >= goal()) {
      state = 'won'; stateAt = performance.now();
      shift = grantMeta();
      cv.className = shift ? 'won morph' : 'won';
      return;
    }
    placeFood();
  }

  function mushroom(gx, gy) {
    var x = gx * cs, y = gy * cs, u = cs / 10;
    ctx.fillStyle = '#e8d8c0'; ctx.fillRect(x + u * 4, y + u * 5, u * 2, u * 4);                // stem
    ctx.fillStyle = '#d63b2a'; ctx.beginPath(); ctx.arc(x + u * 5, y + u * 5.2, u * 4.2, Math.PI, 0); ctx.closePath(); ctx.fill();   // cap
    ctx.fillStyle = '#f4ece3'; ctx.fillRect(x + u * 3, y + u * 3, u * 1.3, u * 1.3); ctx.fillRect(x + u * 5.8, y + u * 2.2, u * 1.3, u * 1.3);
  }

  function draw(t) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    mushroom(food.x, food.y);
    var n = snake.length, i, s, k, pad = Math.max(1, cs * .08), over = state === 'dead' ? '#b3261a' : state === 'won' ? '#ffd9a8' : null;
    for (i = n - 1; i >= 0; i--) {
      s = snake[i]; k = 1 - i / (n + 4);
      ctx.fillStyle = state === 'won' && shift ? 'hsl(' + Math.round((t / 4 + i * 22) % 360) + ',92%,60%)' : over || 'rgb(' + Math.round(138 + 117 * k) + ',' + Math.round(47 + 75 * k) + ',' + Math.round(15 + 36 * k) + ')';
      ctx.fillRect(s.x * cs + pad, s.y * cs + pad, cs - pad * 2, cs - pad * 2);
    }
    var h = snake[0], e = cs * .14, c = cs / 2, px = dir.y ? cs * .26 : 0, py = dir.x ? cs * .26 : 0;   // eyes
    ctx.fillStyle = '#0d0c0b';
    ctx.fillRect(h.x * cs + c + dir.x * cs * .12 - px - e, h.y * cs + c + dir.y * cs * .12 - py - e, e * 2, e * 2);
    ctx.fillRect(h.x * cs + c + dir.x * cs * .12 + px - e, h.y * cs + c + dir.y * cs * .12 + py - e, e * 2, e * 2);
    if (!started && state === 'play') {   // waiting for the first move: a pulsing chevron ahead of the head
      ctx.fillStyle = 'rgba(255, 122, 51, ' + (.35 + .45 * Math.abs(Math.sin(t / 380))) + ')';
      var bx = (h.x + dir.x * 1.6 + .5) * cs, by = (h.y + dir.y * 1.6 + .5) * cs, a = cs * .45;
      ctx.beginPath();
      ctx.moveTo(bx + dir.x * a, by + dir.y * a);
      ctx.lineTo(bx - dir.x * a * .6 + dir.y * a, by - dir.y * a * .6 + dir.x * a);
      ctx.lineTo(bx - dir.x * a * .6 - dir.y * a, by - dir.y * a * .6 - dir.x * a);
      ctx.closePath(); ctx.fill();
    }
  }

  var last = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (state === 'play') {
      if (started) {
        if (!last || t - last > 1000) last = t;   // after a hidden tab: no catch-up burst
        var moved = false;
        while (t - last >= STEP && state === 'play') { last += STEP; tick(); moved = true; }
        if (moved || state !== 'play') draw(t);
      } else { last = 0; draw(t); }
    } else if (state === 'dead') {
      draw(t);
      if (t - stateAt > 650) { reset(); last = 0; }
    } else if (state === 'won') {
      draw(t);
      if (t - stateAt > (shift ? 2600 : 900)) { state = 'gone'; location.assign(HOME); }
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key, d = null;
    if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'z' || k === 'Z') d = [0, -1];
    else if (k === 'ArrowDown' || k === 's' || k === 'S') d = [0, 1];
    else if (k === 'ArrowLeft' || k === 'a' || k === 'A' || k === 'q' || k === 'Q') d = [-1, 0];
    else if (k === 'ArrowRight' || k === 'd' || k === 'D') d = [1, 0];
    else {   // other layouts (Cyrillic...): the physical WASD position
      var c = e.code;
      if (c === 'KeyW') d = [0, -1]; else if (c === 'KeyS') d = [0, 1]; else if (c === 'KeyA') d = [-1, 0]; else if (c === 'KeyD') d = [1, 0];
    }
    if (!d) return;
    e.preventDefault();
    turn(d[0], d[1]);
  });

  // swipe (touch, pen or a mouse drag): each stroke of 18 px or more along an axis is one turn
  var ax = 0, ay = 0, down = false;
  cv.addEventListener('pointerdown', function (e) { down = true; ax = e.clientX; ay = e.clientY; try { cv.setPointerCapture(e.pointerId); } catch (x) {} cv.focus({ preventScroll: true }); });
  cv.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - ax, dy = e.clientY - ay;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 1 : -1, 0); else turn(0, dy > 0 ? 1 : -1);
    ax = e.clientX; ay = e.clientY;
  });
  function up() { down = false; }
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);

  window.addEventListener('resize', function () { size(); });
  buildPips(); reset(); size();
  requestAnimationFrame(frame);
})();
