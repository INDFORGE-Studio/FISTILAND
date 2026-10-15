(function () {
  // Easter Eggs and ranks.
  //  Rookie    : first hover of a Discord logo OR of a toxic mushroom (whichever comes first)
  //  Iron      : the other one of the two
  //  Master    : the hallucination of the home logo, which only exists once Iron is reached
  //  Veteran   : treating yourself (click on one of the two remedy boxes of the Mushrooms page), only possible once Master
  //  Metamorph : clearing the level of the snake game hidden on the 404 page; it grants every rank at once (the 404 page
  //              writes the `meta` flags below, the next page load announces the rank)
  // Progress is kept in this browser (localStorage).
  var KEY = 'fl-eggs-5';
  var RANKS = ['', 'rookie', 'iron', 'master', 'veteran', 'metamorph'];
  var NAMES = { rookie: 'Rookie', iron: 'Iron', master: 'Master', veteran: 'Veteran', metamorph: 'Métamorphe' };
  var ICONS = {
    rookie: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22v-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 14c0-4.5 3.2-7.5 8.5-7.5 0 4.5-3.2 7.5-8.5 7.5z" fill="currentColor"/><path d="M12 16.5c0-3.2-2.2-5.5-6.5-5.5 0 3.2 2.2 5.5 6.5 5.5z" fill="currentColor"/></svg>',
    iron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 6.5h18l-3.2 5H13v2.7h3.5V19H7.5v-4.8H11v-2.7H8.2C5.4 11.5 3.2 9.6 2.5 6.5z" fill="currentColor"/><path d="M5 20.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>',
    master: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 18.5 4 7l5 4.6L12 4l3 7.6L20 7l1.5 11.5z" fill="currentColor"/><path d="M3.5 21h17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>',
    veteran: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h4l3 8.5-3.4 1.2zM18 2h-4l-3 8.5 3.4 1.2z" fill="currentColor" opacity=".7"/><path fill-rule="evenodd" fill="currentColor" d="M12 9.3a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 1 0 0-12.4zM12 12.1l.82 2.27 2.41.08-1.9 1.48.67 2.32L12 16.9l-2 1.35.67-2.32-1.9-1.48 2.41-.08z"/></svg>',
    metamorph: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1.8 12C5 6.9 8.5 4.4 12 4.4s7 2.5 10.2 7.6c-3.2 5.1-6.7 7.6-10.2 7.6S5 17.1 1.8 12z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="12" r="4.7" fill="currentColor"/><path d="M12 9.2v5.6" stroke="#0d0c0b" stroke-width="1.8" stroke-linecap="round"/><circle cx="10.5" cy="10.4" r="1" fill="#fff" opacity=".85"/></svg>'
  };
  var T = {
    en: { title: 'RANK {R} UNLOCKED', rookie: 'Will the adventure lead you to the right places?', iron: 'Oh! You have awakened something on the home page', master: "You're mad... You really need treatment!", veteran: 'Every victory has its reward! A new button is at the top of the page.', metamorph: 'You slipped through the wrong door and shed your skin. A new form awaits among the skins.', card: 'Found where nothing was meant to be found.', got: 'Unlocked', lock: 'Locked' },
    fr: { title: 'GRADE {R} OBTENU', rookie: "L'aventure va-t-elle vous mener aux bons endroits ?", iron: "Oh ! Vous avez réveillé quelque chose sur la page d'accueil", master: 'Vous êtes dingue... Il faut vraiment vous soigner !', veteran: 'Chaque victoire a sa récompense ! Un nouveau bouton est sur le haut de page.', metamorph: 'Vous avez franchi la mauvaise porte et changé de peau. Une nouvelle forme vous attend parmi les habillages.', card: "Trouvé là où il n'y avait rien à trouver.", got: 'Obtenu', lock: 'Verrouillé' },
    de: { title: 'RANG {R} ERREICHT', rookie: 'Wird dich das Abenteuer an die richtigen Orte führen?', iron: 'Oh! Du hast auf der Startseite etwas geweckt', master: 'Du bist verrückt ... Du brauchst wirklich eine Behandlung!', veteran: 'Jeder Sieg hat seine Belohnung! Oben auf der Seite ist ein neuer Button.', metamorph: 'Du bist durch die falsche Tür geschlüpft und hast deine Haut gewechselt. Unter den Skins wartet eine neue Gestalt.', card: 'Gefunden, wo nichts zu finden war.', got: 'Erreicht', lock: 'Gesperrt' },
    es: { title: 'RANGO {R} DESBLOQUEADO', rookie: '¿Te llevará la aventura a los lugares correctos?', iron: '¡Oh! Has despertado algo en la página de inicio', master: 'Estás loco... ¡De verdad necesitas curarte!', veteran: '¡Cada victoria tiene su recompensa! Hay un nuevo botón en la parte superior de la página.', metamorph: 'Cruzaste la puerta equivocada y cambiaste de piel. Una nueva forma te espera entre los skins.', card: 'Encontrado donde no había nada que encontrar.', got: 'Desbloqueado', lock: 'Bloqueado' },
    it: { title: 'GRADO {R} OTTENUTO', rookie: "L'avventura ti porterà nei posti giusti?", iron: 'Oh! Hai risvegliato qualcosa nella pagina iniziale', master: 'Sei pazzo... Hai davvero bisogno di curarti!', veteran: 'Ogni vittoria ha la sua ricompensa! Un nuovo pulsante è in cima alla pagina.', metamorph: 'Hai varcato la porta sbagliata e cambiato pelle. Una nuova forma ti attende tra le skin.', card: "Trovato dove non c'era nulla da trovare.", got: 'Ottenuto', lock: 'Bloccato' },
    uk: { title: 'РАНГ {R} ОТРИМАНО', rookie: 'Чи приведе вас пригода в потрібні місця?', iron: 'О! Ви щось розбудили на головній сторінці', master: 'Ви божевільні... Вам справді потрібне лікування!', veteran: 'Кожна перемога має свою нагороду! Нова кнопка з’явилася у верхній частині сторінки.', metamorph: 'Ви пройшли не тими дверима й змінили шкіру. Серед скінів на вас чекає нова форма.', card: 'Знайдено там, де нічого не було що знаходити.', got: 'Отримано', lock: 'Закрито' },
    hr: { title: 'RANG {R} OTKLJUČAN', rookie: 'Hoće li te avantura odvesti na prava mjesta?', iron: 'Oh! Probudio si nešto na početnoj stranici', master: 'Ti si lud... Stvarno ti treba liječenje!', veteran: 'Svaka pobjeda ima svoju nagradu! Novi gumb je na vrhu stranice.', metamorph: 'Prošao si kroz krive vrata i promijenio kožu. Među skinovima te čeka novi oblik.', card: 'Pronađeno ondje gdje nije bilo ničega za pronaći.', got: 'Otključano', lock: 'Zaključano' },
    pl: { title: 'RANGA {R} ODBLOKOWANA', rookie: 'Czy przygoda zaprowadzi cię we właściwe miejsca?', iron: 'Oh! Coś się obudziło na stronie głównej', master: 'To szaleństwo... Naprawdę potrzebujesz leczenia!', veteran: 'Każde zwycięstwo ma swoją nagrodę! Nowy przycisk jest na górze strony.', metamorph: 'Złe drzwi zmieniły wszystko. Wśród skórek czeka nowa forma.', card: 'Znalezione tam, gdzie nie było nic do znalezienia.', got: 'Odblokowano', lock: 'Zablokowano' }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var L = T[lang] || T.en;

  function load() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; }
  }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function rankIndex(o) {
    var n = (o.discord ? 1 : 0) + (o.mushroom ? 1 : 0);
    if (n === 2 && o.master) return o.veteran ? (o.meta ? 5 : 4) : 3;
    return n;
  }

  try { localStorage.removeItem('fl-eggs'); localStorage.removeItem('fl-eggs-2'); localStorage.removeItem('fl-eggs-3'); localStorage.removeItem('fl-eggs-4'); } catch (e) {}
  var state = load();
  var badge = null;

  window.flRank = {
    hasIron: function () { return rankIndex(load()) >= 2; },
    rank: function () { return RANKS[rankIndex(load())]; }
  };

  // Easter Eggs page: fill the rank cards and light up the ones already earned.
  // The last rank has no card: once earned, it is a frame built here around the four others (a living eye on top, the border walking
  // through the colours of every rank, the details in a tooltip that follows the pointer), so the public page never mentions it.
  var ALMOND = 'M1.8 12C5 6.9 8.5 4.4 12 4.4s7 2.5 10.2 7.6c-3.2 5.1-6.7 7.6-10.2 7.6S5 17.1 1.8 12z';
  var EYE = '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><clipPath id="fl-eg-eyeclip"><path d="' + ALMOND + '"/></clipPath></defs>' +
    '<g clip-path="url(#fl-eg-eyeclip)"><g class="fl-eg-iris"><circle cx="12" cy="12" r="5" fill="currentColor"/>' +
    '<g class="fl-eg-pup"><path d="M12 8.9v6.2" stroke="#0d0c0b" stroke-width="2.2" stroke-linecap="round"/><circle cx="10.3" cy="10.3" r="1.1" fill="#fff" opacity=".85"/></g></g></g>' +
    '<path d="' + ALMOND + '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  var tip = null, eyeTimer = 0, blinkTimer = 0;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function eyeLive(eye) {
    return eye.isConnected && !document.hidden && !document.documentElement.classList.contains('fl-fx-off') &&
      !document.documentElement.classList.contains('fl-tripping') && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  // The eye looks around at random (sometimes straight ahead) and blinks now and then, sometimes twice in a row.
  function eyeLoop(eye) {
    var svg = eye.firstChild;
    function look() {
      if (!eye.isConnected) return;
      if (eyeLive(eye)) {
        var c = Math.random() < .15;
        svg.style.setProperty('--dx', c ? 0 : rnd(-4.4, 4.4).toFixed(2));
        svg.style.setProperty('--dy', c ? 0 : rnd(-2.2, 2.2).toFixed(2));
      }
      eyeTimer = setTimeout(look, rnd(500, 2200));
    }
    function blink(again) {
      if (!eye.isConnected) return;
      if (eyeLive(eye)) {
        eye.classList.add('is-blink');
        setTimeout(function () { eye.classList.remove('is-blink'); }, 140);
        if (again !== false && Math.random() < .25) { blinkTimer = setTimeout(function () { blink(false); }, 300); return; }
      }
      blinkTimer = setTimeout(blink, rnd(1800, 6000));
    }
    look();
    blinkTimer = setTimeout(blink, rnd(1200, 3000));
  }

  // Tooltip that follows the pointer while it is inside the frame (a tap shows it on touch screens).
  function buildTip(frame) {
    tip = document.createElement('div'); tip.className = 'fl-eg-tip'; tip.setAttribute('role', 'status');
    var b = document.createElement('b'); b.textContent = NAMES.metamorph;
    var p = document.createElement('p'); p.textContent = L.card;
    var s = document.createElement('small'); s.textContent = L.got;
    tip.appendChild(b); tip.appendChild(p); tip.appendChild(s);
    document.body.appendChild(tip);
    var hideT = 0;
    function place(e) {
      tip.style.setProperty('--tc', getComputedStyle(frame).color);
      var w = tip.offsetWidth, h = tip.offsetHeight, vw = document.documentElement.clientWidth, vh = window.innerHeight;
      var x = e.clientX + 16, y = e.clientY + 20;
      if (x + w > vw - 8) x = Math.max(8, e.clientX - w - 12);
      if (y + h > vh - 8) y = Math.max(8, e.clientY - h - 14);
      tip.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
    }
    function show(e) { place(e); tip.classList.add('is-on'); }
    function hide() { clearTimeout(hideT); tip.classList.remove('is-on'); }
    frame.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') show(e); });
    frame.addEventListener('pointermove', function (e) { if (e.pointerType !== 'touch' || tip.classList.contains('is-on')) show(e); });
    frame.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') hide(); });
    frame.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch') return;
      show(e); clearTimeout(hideT); hideT = setTimeout(hide, 3500);
    });
  }
  function buildFrame(wrap) {
    var f = document.createElement('div'); f.className = 'fl-eg-meta';
    var eye = document.createElement('span'); eye.className = 'fl-eg-ico'; eye.innerHTML = EYE;
    wrap.parentNode.insertBefore(f, wrap);
    f.appendChild(eye); f.appendChild(wrap);
    buildTip(f); eyeLoop(eye);
  }
  function dropFrame(frame, wrap) {
    clearTimeout(eyeTimer); clearTimeout(blinkTimer);
    if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
    tip = null;
    frame.parentNode.insertBefore(wrap, frame); frame.parentNode.removeChild(frame);
  }
  function paintPage() {
    var wrap = document.querySelector('.fl-eg-ranks');
    if (!wrap) return;
    var idx = rankIndex(state), frame = wrap.parentNode.classList.contains('fl-eg-meta') ? wrap.parentNode : null;
    if (idx >= 5 && !frame) buildFrame(wrap);
    else if (idx < 5 && frame) dropFrame(frame, wrap);
    var cards = wrap.querySelectorAll('.fl-eg-rank');
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i], n = +c.getAttribute('data-r'), got = n <= idx;
      var ico = c.querySelector('.fl-eg-ico'), st = c.querySelector('.fl-eg-st');
      if (ico && !ico.firstChild) ico.innerHTML = ICONS[RANKS[n]];
      if (st) st.textContent = got ? L.got : L.lock;
      c.classList.toggle('is-got', got);
    }
  }

  function render(isNew) {
    paintPage();
    var r = RANKS[rankIndex(state)];
    if (!badge) {
      var title = document.querySelector('.md-header__title');
      if (!title) return;
      badge = document.createElement('div');
      badge.className = 'fl-rank';
      title.parentNode.insertBefore(badge, title.nextSibling);
      // hover (or tap) the badge to see the message again
      // mouse: shown while the pointer is on the badge, gone as soon as it leaves; touch: timed (no "leave")
      badge.addEventListener('pointerenter', function (e) { var i = rankIndex(state); if (i) showHint(i, e.pointerType === 'touch' ? 'tap' : 'hover'); });
      badge.addEventListener('pointerleave', function (e) {
        if (e.pointerType === 'touch') return;
        clearTimeout(hintTimer);
        if (hint) hint.classList.remove('is-on');
      });
      // double-click (or double-tap) the badge: start again from zero
      badge.addEventListener('dblclick', function () {
        try { localStorage.removeItem(KEY); localStorage.removeItem('fl-lang'); } catch (e) {}
        state = {};
        clearTimeout(hintTimer);
        if (hint) hint.classList.remove('is-on');
        render(false);
      });
    }
    document.documentElement.setAttribute('data-fl-rank', r);
    document.dispatchEvent(new Event('fl-rank-change'));
    if (!r) { badge.classList.remove('is-on'); return; }
    badge.setAttribute('data-rank', r);
    badge.innerHTML = ICONS[r] + '<span>' + NAMES[r] + '</span>';
        badge.classList.add('is-on');
    if (isNew) { badge.classList.remove('is-new'); void badge.offsetWidth; badge.classList.add('is-new'); }
  }

  var hint = null, hintTimer = 0;
  function showHint(idx, again) {
    var r = RANKS[idx];
    if (!hint) { hint = document.createElement('div'); hint.className = 'fl-hint'; hint.setAttribute('role', 'status'); document.body.appendChild(hint); }
    hint.setAttribute('data-rank', r);
    hint.innerHTML = ICONS[r] + '<div><b>' + L.title.replace('{R}', NAMES[r].toUpperCase()) + '</b><span>' + L[r] + '</span></div>';
    hint.classList.remove('is-on'); void hint.offsetWidth; hint.classList.add('is-on');
    clearTimeout(hintTimer);
    if (again !== 'hover') hintTimer = setTimeout(function () { hint.classList.remove('is-on'); }, again ? 7000 : (idx >= 5 ? 14000 : 10000));
  }

  function found(name) {
    if (name !== 'discord' && name !== 'mushroom' && name !== 'master' && name !== 'veteran') return;
    state = load();
    if (state[name]) return;
    if (name === 'master' && rankIndex(state) < 2) return;     // the hallucination only counts once Iron is reached
    if (name === 'veteran' && rankIndex(state) < 3) return;      // the remedy boxes only work once Master is reached
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

  // Mushrooms page: the two remedy boxes become clickable once Master is reached
  document.addEventListener('click', function (e) {
    var box = e.target && e.target.closest ? e.target.closest('.fl-mush-fix p') : null;
    if (!box || rankIndex(load()) < 3) return;
    box.classList.remove('is-healed'); void box.offsetWidth; box.classList.add('is-healed');
    found('veteran');
  });

  window.addEventListener('storage', function (e) { if (e.key === KEY) { state = load(); render(false); } });
  render(false);

  // Metamorph: the 404 page leaves a `metaNew` flag; the first page that loads afterwards announces the rank.
  // A visitor whose saved language differs from this page is about to be redirected: the destination page announces it.
  function announceMeta() {
    state = load();
    if (!state.metaNew) return;
    if (rankIndex(state) < 5) { delete state.metaNew; save(state); return; }
    try { var want = localStorage.getItem('fl-lang'); if (want && want !== lang && /^(en|fr|de|es|it|uk|hr|pl)$/.test(want)) return; } catch (e) {}
    delete state.metaNew;
    save(state);
    render(true);
    showHint(5);
  }
  announceMeta();
})();
