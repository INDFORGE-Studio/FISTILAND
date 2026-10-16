(function () {
  // Shared end-of-run card for the 404 mini games (invaders, pong, blocks). Nothing is saved: the visitor gets a fun result card
  // (game, fame score counting up, a grade stamp, a few stats), a copy button in the top-right corner that puts a ready-made
  // text on the clipboard to paste in Discord or any chat, and a HOME button (Enter goes home too).
  // window.flArcade.finish({ game, icon, title, win, score, stats: [[label, value], ...], tiers: [t1, t2, t3, t4], home })
  var GRADES = [
    ['FRESH SPAWN', 'Everybody starts somewhere.'],
    ['SCAVENGER', 'Picking the bones clean.'],
    ['LOOTER', 'The crates fear you.'],
    ['RAIDER', 'Whole bunkers fall to you.'],
    ['WARLORD', 'FISTILAND bows to you.']
  ];
  var SVGNS = 'http://www.w3.org/2000/svg';
  var ICON_COPY = 'M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z';
  var ICON_OK = 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z';

  function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; }
  function icon(d) {
    var s = document.createElementNS(SVGNS, 'svg'), p = document.createElementNS(SVGNS, 'path');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); p.setAttribute('d', d); s.appendChild(p);
    return s;
  }
  function grade(score, tiers) {
    var g = 0;
    for (var i = 0; i < tiers.length; i++) if (score >= tiers[i]) g = i + 1;
    return GRADES[Math.min(g, GRADES.length - 1)];
  }
  function absHome(home) { try { return new URL(home || '/', location.href).href; } catch (e) { return location.origin + '/'; } }

  function shareText(o, g) {
    var lines = [
      '☣️ FISTILAND · SCUM SERVER ☣️',
      (o.icon || '🎮') + ' ' + o.game + ' — ' + o.title.toUpperCase(),
      '🏆 FAME ' + o.score + ' · ' + g[0]
    ];
    if (o.stats && o.stats.length) lines.push('📊 ' + o.stats.map(function (s) { return s[0] + ' ' + s[1]; }).join(' · '));
    lines.push('👉 Beat that: ' + absHome(o.home));
    return lines.join('\n');
  }

  function copyText(text, done) {
    function legacy() {
      var ta = el('textarea'), ok = false;
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, legacy);
    else legacy();
  }

  function finish(o) {
    var g = grade(o.score, o.tiers || [300, 1000, 2500, 6000]), text = shareText(o, g), still = false;
    try { still = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var ov = el('div', 'ov'), bx = el('div', 'bx');
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', o.title);

    bx.appendChild(el('div', 'tape'));
    var hd = el('div', 'hd'), cp = el('button', 'cp'), say = el('span', 'say', '');
    hd.appendChild(el('span', 'brand', 'FISTILAND'));
    say.setAttribute('aria-live', 'polite'); hd.appendChild(say);
    cp.type = 'button'; cp.setAttribute('aria-label', 'Copy my score'); cp.title = 'Copy my score'; cp.appendChild(icon(ICON_COPY));
    hd.appendChild(cp); bx.appendChild(hd);

    var body = el('div', 'in');
    body.appendChild(el('p', 'gm', o.game));
    body.appendChild(el('h2', '', o.title));
    body.appendChild(el('p', 'fl', 'FAME'));
    var big = el('p', 'big', still ? String(o.score) : '0'); body.appendChild(big);
    var stamp = el('div', 'stamp', g[0]); body.appendChild(stamp);
    body.appendChild(el('p', 'quip', g[1]));
    if (o.stats && o.stats.length) {
      var st = el('div', 'stats');
      o.stats.forEach(function (s) { var d = el('div'); d.appendChild(el('i', '', s[0])); d.appendChild(el('b', '', String(s[1]))); st.appendChild(d); });
      body.appendChild(st);
    }
    var acts = el('div', 'acts'), home = el('a', 'hm', 'Home'); home.href = o.home || '/';
    acts.appendChild(home); body.appendChild(acts);
    bx.appendChild(body); ov.appendChild(bx); document.body.appendChild(ov);

    var timer = 0;
    cp.addEventListener('click', function () {
      copyText(text, function (ok) {
        clearTimeout(timer);
        say.textContent = ok ? 'COPIED, PASTE IT!' : 'COPY BLOCKED';
        cp.classList.toggle('ok', ok);
        cp.replaceChild(icon(ok ? ICON_OK : ICON_COPY), cp.firstChild);
        timer = setTimeout(function () { say.textContent = ''; cp.classList.remove('ok'); cp.replaceChild(icon(ICON_COPY), cp.firstChild); }, 2200);
      });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target === document.body) location.assign(o.home || '/'); });

    if (!still && o.score > 0) {
      var t0 = 0, dur = 900;
      var step = function (t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / dur);
        big.textContent = String(Math.round(o.score * (1 - Math.pow(1 - k, 3))));
        if (k < 1 && big.isConnected) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    try { home.focus({ preventScroll: true }); } catch (e) {}
  }

  window.flArcade = { finish: finish };
})();
