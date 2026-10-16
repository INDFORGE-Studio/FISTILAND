(function () {
  // Shared end-of-run screen for the 404 mini games (pong, blocks): title, fame score, optional top 3 kept in this browser
  // (8-character name) and a HOME button (no replay: a run always ends back home, Enter goes there too).
  // window.flArcade.finish({ title, line, score, top: { key, level }, home })
  var NAME_MAX = 8, TOPN = 3;

  function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; }
  function loadTop(key) {
    try {
      var a = JSON.parse(localStorage.getItem(key) || '[]');
      if (Array.isArray(a)) return a.filter(function (r) { return r && typeof r.n === 'string' && typeof r.s === 'number' && typeof r.l === 'number'; }).map(function (r) { return { n: r.n.slice(0, NAME_MAX), s: r.s, l: r.l }; }).slice(0, TOPN);
    } catch (e) {}
    return [];
  }
  function saveTop(key, list) { try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) {} }
  function clean(v) {
    try { v = v.replace(new RegExp('[^\\p{L}\\p{N} _.\\-]', 'gu'), ''); } catch (e) { v = v.replace(/[^A-Za-z0-9 _.\-]/g, ''); }
    return v.toUpperCase().slice(0, NAME_MAX);
  }

  function finish(o) {
    var ov = el('div', 'ov'), bx = el('div', 'bx'), acts = el('div', 'acts'), form = null, input = null, board = null, mine = null;
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', o.title);
    bx.appendChild(el('h2', '', o.title));
    var sc = el('p', 'sc');
    if (o.score != null) { sc.appendChild(document.createTextNode('FAME ')); sc.appendChild(el('b', '', String(o.score))); }
    if (o.line) sc.appendChild(document.createTextNode((o.score != null ? '  ·  ' : '') + o.line));
    bx.appendChild(sc);

    if (o.top) {
      var key = o.top.key;
      board = el('ol', 'top');
      var paint = function (list) {
        board.textContent = '';
        for (var i = 0; i < TOPN; i++) {
          var r = list[i], li = el('li', r && r === mine ? 'me' : '');
          li.appendChild(el('i', '', String(i + 1)));
          li.appendChild(el('span', '', r ? r.n : '- - -'));
          li.appendChild(el('b', '', r ? String(r.s) : ''));
          li.appendChild(el('em', '', r ? 'L' + r.l : ''));
          board.appendChild(li);
        }
      };
      if (o.score > 0) {
        form = el('form', 'nm'); input = el('input'); input.type = 'text'; input.maxLength = NAME_MAX; input.placeholder = 'NAME';
        input.setAttribute('autocomplete', 'off'); input.setAttribute('autocapitalize', 'characters'); input.setAttribute('spellcheck', 'false'); input.setAttribute('aria-label', 'Name');
        var ok = el('button', '', 'OK'); ok.type = 'submit';
        form.appendChild(input); form.appendChild(ok);
        input.addEventListener('input', function () { var c = clean(input.value); if (c !== input.value) input.value = c; });
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var n = clean(input.value).replace(/\s+/g, ' ').trim();
          if (!n) { input.focus(); return; }
          var list = loadTop(key); mine = { n: n, s: o.score, l: o.top.level || 1 };
          list.push(mine); list.sort(function (a, b) { return b.s - a.s; }); list = list.slice(0, TOPN);
          saveTop(key, list); paint(list);
          form.parentNode.removeChild(form); form = null;
          home.focus();
        });
        bx.appendChild(form);
      }
      bx.appendChild(el('h3', '', 'Top 3'));
      paint(loadTop(key));
      bx.appendChild(board);
    }

    var home = el('a', 'hm', 'Home'); home.href = o.home || '/';
    acts.appendChild(home);
    bx.appendChild(acts);
    ov.appendChild(bx); document.body.appendChild(ov);
    document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !form && e.target === document.body) location.assign(o.home || '/'); });
    try { (input || home).focus({ preventScroll: true }); } catch (e) {}
  }

  window.flArcade = { finish: finish };
})();
