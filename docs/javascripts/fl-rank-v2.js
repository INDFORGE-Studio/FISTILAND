(function () {
  // Easter Eggs and ranks. The rank only depends on HOW MANY eggs were found, never on the order:
  // 1 egg = Rookie, 2 eggs = Iron, 3 eggs = Master. Progress is kept in this browser (localStorage).
  var KEY = 'fl-eggs-2';
  var EGGS = ['fist', 'discord', 'trip'];
  var RANKS = ['', 'rookie', 'iron', 'master'];
  var NAMES = { rookie: 'Rookie', iron: 'Iron', master: 'Master' };
  var ICONS = {
    rookie: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22v-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 14c0-4.5 3.2-7.5 8.5-7.5 0 4.5-3.2 7.5-8.5 7.5z" fill="currentColor"/><path d="M12 16.5c0-3.2-2.2-5.5-6.5-5.5 0 3.2 2.2 5.5 6.5 5.5z" fill="currentColor"/></svg>',
    iron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 6.5h18l-3.2 5H13v2.7h3.5V19H7.5v-4.8H11v-2.7H8.2C5.4 11.5 3.2 9.6 2.5 6.5z" fill="currentColor"/><path d="M5 20.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>',
    master: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 18.5 4 7l5 4.6L12 4l3 7.6L20 7l1.5 11.5z" fill="currentColor"/><path d="M3.5 21h17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>'
  };
  var T = {
    en: { head: 'Easter Egg discovered!', rank: 'Rank unlocked', all: 'All Easter Eggs found! You are a Master.', lbl: 'Rank', eggs: 'Easter Eggs' },
    fr: { head: 'Easter Egg découvert !', rank: 'Grade obtenu', all: 'Tous les Easter Eggs trouvés ! Vous êtes Master.', lbl: 'Grade', eggs: 'Easter Eggs' },
    de: { head: 'Easter Egg entdeckt!', rank: 'Rang erreicht', all: 'Alle Easter Eggs gefunden! Du bist Master.', lbl: 'Rang', eggs: 'Easter Eggs' },
    es: { head: '¡Easter Egg descubierto!', rank: 'Rango desbloqueado', all: '¡Todos los Easter Eggs encontrados! Eres Master.', lbl: 'Rango', eggs: 'Easter Eggs' },
    it: { head: 'Easter Egg scoperto!', rank: 'Grado ottenuto', all: 'Tutti gli Easter Egg trovati! Sei Master.', lbl: 'Grado', eggs: 'Easter Egg' },
    uk: { head: 'Знайдено пасхалку!', rank: 'Отримано ранг', all: 'Усі пасхалки знайдено! Ви — Master.', lbl: 'Ранг', eggs: 'пасхалок' }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var L = T[lang] || T.en;

  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; }
  }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function count(o) { var n = 0; EGGS.forEach(function (k) { if (o[k]) n++; }); return n; }

  try { localStorage.removeItem('fl-eggs'); } catch (e) {}
  var state = load();
  var badge = null;

  function render(isNew) {
    var n = count(state), r = RANKS[n];
    if (!badge) {
      var title = document.querySelector('.md-header__title');
      if (!title) return;
      badge = document.createElement('div');
      badge.className = 'fl-rank';
      title.parentNode.insertBefore(badge, title.nextSibling);
    }
    if (!r) { badge.classList.remove('is-on'); return; }
    badge.setAttribute('data-rank', r);
    badge.innerHTML = ICONS[r] + '<span>' + NAMES[r] + '</span>';
    badge.title = L.lbl + ' ' + NAMES[r] + ' - ' + n + '/3 ' + L.eggs;
    badge.classList.add('is-on');
    if (isNew) { badge.classList.remove('is-new'); void badge.offsetWidth; badge.classList.add('is-new'); }
  }

  var hint = null, hintTimer = 0;
  function showHint(n) {
    var r = RANKS[n];
    if (!hint) { hint = document.createElement('div'); hint.className = 'fl-hint'; hint.setAttribute('role', 'status'); document.body.appendChild(hint); }
    hint.setAttribute('data-rank', r);
    hint.innerHTML = ICONS[r] + '<div><b>' + L.head + ' <i>' + n + '/3</i></b><span>' +
      (n >= 3 ? L.all : L.rank + ' : ' + NAMES[r].toUpperCase()) + '</span></div>';
    hint.classList.remove('is-on'); void hint.offsetWidth; hint.classList.add('is-on');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { hint.classList.remove('is-on'); }, 5200);
  }

  function found(name) {
    if (EGGS.indexOf(name) < 0) return;
    state = load();
    if (state[name]) return;
    state[name] = 1;
    save(state);
    render(true);
    showHint(count(state));
  }

  window.addEventListener('fl-egg', function (e) { found(e.detail); });

  // Discord logos (header, footer, join section): the zombie has to be seen, so the pointer must stay about 2 s on the logo
  var dTimer = 0;
  document.addEventListener('pointerover', function (e) {
    var t = e.target;
    if (t && t.closest && t.closest('.fl-hd-discord, .md-social__link[href*="discord"], a.fl-discord')) {
      clearTimeout(dTimer); dTimer = setTimeout(function () { found('discord'); }, 2000);
    }
  });
  document.addEventListener('pointerout', function (e) {
    var t = e.target;
    if (e.pointerType !== 'touch' && t && t.closest && t.closest('.fl-hd-discord, .md-social__link[href*="discord"], a.fl-discord')) clearTimeout(dTimer);
  });

  window.addEventListener('storage', function (e) { if (e.key === KEY) { state = load(); render(false); } });
  render(false);
})();
