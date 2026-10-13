(function () {
  // Easter Eggs and ranks.
  //  Rookie : first hover of a Discord logo OR of a toxic mushroom (whichever comes first)
  //  Iron   : the other one of the two
  //  Master : the hallucination of the home logo, which only exists once Iron is reached
  // Progress is kept in this browser (localStorage).
  var KEY = 'fl-eggs-3';
  var RANKS = ['', 'rookie', 'iron', 'master'];
  var NAMES = { rookie: 'Rookie', iron: 'Iron', master: 'Master' };
  var ICONS = {
    rookie: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22v-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 14c0-4.5 3.2-7.5 8.5-7.5 0 4.5-3.2 7.5-8.5 7.5z" fill="currentColor"/><path d="M12 16.5c0-3.2-2.2-5.5-6.5-5.5 0 3.2 2.2 5.5 6.5 5.5z" fill="currentColor"/></svg>',
    iron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 6.5h18l-3.2 5H13v2.7h3.5V19H7.5v-4.8H11v-2.7H8.2C5.4 11.5 3.2 9.6 2.5 6.5z" fill="currentColor"/><path d="M5 20.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>',
    master: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 18.5 4 7l5 4.6L12 4l3 7.6L20 7l1.5 11.5z" fill="currentColor"/><path d="M3.5 21h17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>'
  };
  var T = {
    en: { head: 'Easter Egg discovered!', rank: 'Rank unlocked', iron: 'Something stirs on the home page logo...', master: 'You have reached the Master rank.', lbl: 'Rank' },
    fr: { head: 'Easter Egg découvert !', rank: 'Grade obtenu', iron: "Quelque chose s'éveille sur le logo de l'accueil...", master: 'Vous avez atteint le grade Master.', lbl: 'Grade' },
    de: { head: 'Easter Egg entdeckt!', rank: 'Rang erreicht', iron: 'Auf dem Logo der Startseite regt sich etwas ...', master: 'Du hast den Rang Master erreicht.', lbl: 'Rang' },
    es: { head: '¡Easter Egg descubierto!', rank: 'Rango desbloqueado', iron: 'Algo se mueve en el logo de la portada...', master: 'Has alcanzado el rango Master.', lbl: 'Rango' },
    it: { head: 'Easter Egg scoperto!', rank: 'Grado ottenuto', iron: 'Qualcosa si muove nel logo della home...', master: 'Hai raggiunto il grado Master.', lbl: 'Grado' },
    uk: { head: 'Знайдено пасхалку!', rank: 'Отримано ранг', iron: 'Щось ворушиться в логотипі на головній...', master: 'Ви досягли рангу Master.', lbl: 'Ранг' }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var L = T[lang] || T.en;

  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; }
  }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function rankIndex(o) {
    var n = (o.discord ? 1 : 0) + (o.mushroom ? 1 : 0);
    return n === 2 && o.master ? 3 : n;
  }

  try { localStorage.removeItem('fl-eggs'); localStorage.removeItem('fl-eggs-2'); } catch (e) {}
  var state = load();
  var badge = null;

  window.flRank = {
    hasIron: function () { return rankIndex(load()) >= 2; },
    rank: function () { return RANKS[rankIndex(load())]; }
  };

  function render(isNew) {
    var r = RANKS[rankIndex(state)];
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
    badge.title = L.lbl + ' ' + NAMES[r];
    badge.classList.add('is-on');
    if (isNew) { badge.classList.remove('is-new'); void badge.offsetWidth; badge.classList.add('is-new'); }
  }

  var hint = null, hintTimer = 0;
  function showHint(idx) {
    var r = RANKS[idx];
    if (!hint) { hint = document.createElement('div'); hint.className = 'fl-hint'; hint.setAttribute('role', 'status'); document.body.appendChild(hint); }
    hint.setAttribute('data-rank', r);
    var sub = idx === 3 ? L.master : L.rank + ' : ' + NAMES[r].toUpperCase() + (idx === 2 ? '<br>' + L.iron : '');
    hint.innerHTML = ICONS[r] + '<div><b>' + L.head + '</b><span>' + sub + '</span></div>';
    hint.classList.remove('is-on'); void hint.offsetWidth; hint.classList.add('is-on');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { hint.classList.remove('is-on'); }, 6000);
  }

  function found(name) {
    if (name !== 'discord' && name !== 'mushroom' && name !== 'master') return;
    state = load();
    if (state[name]) return;
    if (name === 'master' && rankIndex(state) < 2) return;     // the hallucination only counts once Iron is reached
    var before = rankIndex(state);
    state[name] = 1;
    save(state);
    var after = rankIndex(state);
    render(after > before);
    if (after > before) showHint(after);
  }

  window.addEventListener('fl-egg', function (e) { found(e.detail); });

  // any interaction (hover, keyboard focus, tap) with a Discord logo or a toxic mushroom
  var DISCORD = '.fl-hd-discord, .md-social__link[href*="discord"], a.fl-discord';
  function hit(e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest(DISCORD)) found('discord');
    else if (t.closest('.fl-mush.is-tox')) found('mushroom');
  }
  document.addEventListener('pointerover', hit);
  document.addEventListener('focusin', hit);

  window.addEventListener('storage', function (e) { if (e.key === KEY) { state = load(); render(false); } });
  render(false);
})();
