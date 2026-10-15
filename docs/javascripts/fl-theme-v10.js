(function () {
  'use strict';
  // Veteran skins: header button + panel (radio menu, keyboard, view transition) and the effects switch.
  var KEY = 'fl-theme', FXKEY = 'fl-fx';
  // 'morph' is the secret fifth skin of the last rank: it walks through the four others on its own
  var IDS = ['', 'survivalist', 'forces', 'demonic', 'zombie', 'morph'];
  var CYCLE = ['survivalist', 'forces', 'demonic', 'zombie'], MORPH_MS = 16000;
  var ICON = {
    survivalist: '<path d="M12 4 3 20h18z"/><path d="M12 11.5 9 20h6z" fill="currentColor" stroke="none"/>',
    forces: '<circle cx="12" cy="12" r="6.5"/><path d="M12 2.5v6M12 15.5v6M2.5 12h6M15.5 12h6"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    demonic: '<path d="M12 2.8c.7 3.2 5 5.2 5 10a5 5 0 0 1-10 0c0-1.8.8-3.2 1.9-4.2.1 1.7.8 2.6 1.8 2.8-.4-2.6.1-5.4 1.3-8.6z" fill="currentColor" stroke="none"/>',
    morph: '<path d="M2 12c3-5 6.4-7.5 10-7.5s7 2.5 10 7.5c-3 5-6.4 7.5-10 7.5S5 17 2 12z"/><circle cx="12" cy="12" r="3.1" fill="currentColor" stroke="none"/>',
    zombie: '<path fill-rule="evenodd" fill="currentColor" stroke="none" d="M12 3a8 8 0 0 0-8 8c0 2.6 1.2 4.4 3 5.6V20h2.2v-2h1.6v2h2.4v-2h1.6v2H17v-3.4c1.8-1.2 3-3 3-5.6a8 8 0 0 0-8-8zM8.3 9.3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7.4 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>'
  };
  var T = {
    en: { title: 'Veteran skins', tip: 'Skin', fx: 'Effects', on: 'On', off: 'Off', names: ['FISTILAND', 'Survivalist', 'Special Forces', 'Demonic', 'Zombie', 'Métamorphe'],
      tags: ['Back to the roots.', "Fire's lit. Stay warm.", 'Night vision on. Radio silence.', 'Welcome to the hot zone.', 'Braaains... and loot.', 'Never the same twice.'] },
    fr: { title: 'Habillages Veteran', tip: 'Habillage', fx: 'Effets', on: 'Activé', off: 'Désactivé', names: ['FISTILAND', 'Survivaliste', 'Forces spéciales', 'Démoniaque', 'Zombie', 'Métamorphe'],
      tags: ['Retour aux sources.', 'Le feu est allumé. Restez au chaud.', 'Vision nocturne activée. Silence radio.', 'Bienvenue en enfer.', 'Cerveaaaux... et du loot.', 'Jamais deux fois pareil.'] },
    de: { title: 'Veteran-Skins', tip: 'Skin', fx: 'Effekte', on: 'An', off: 'Aus', names: ['FISTILAND', 'Survivalist', 'Spezialeinheit', 'Dämonisch', 'Zombie', 'Métamorphe'],
      tags: ['Zurück zu den Wurzeln.', 'Das Feuer brennt. Bleib warm.', 'Nachtsicht an. Funkstille.', 'Willkommen in der Hölle.', 'Gehiiirne... und Loot.', 'Nie zweimal gleich.'] },
    es: { title: 'Skins Veteran', tip: 'Skin', fx: 'Efectos', on: 'Activado', off: 'Desactivado', names: ['FISTILAND', 'Superviviente', 'Fuerzas especiales', 'Demoníaco', 'Zombi', 'Métamorphe'],
      tags: ['Vuelta a los orígenes.', 'Fuego encendido. Mantente caliente.', 'Visión nocturna activada. Silencio de radio.', 'Bienvenido al infierno.', 'Cerebrooos... y botín.', 'Nunca dos veces igual.'] },
    it: { title: 'Skin Veteran', tip: 'Skin', fx: 'Effetti', on: 'Attivo', off: 'Disattivato', names: ['FISTILAND', 'Sopravvivenzista', 'Forze speciali', 'Demoniaco', 'Zombie', 'Métamorphe'],
      tags: ['Ritorno alle origini.', 'Fuoco acceso. Resta al caldo.', 'Visione notturna attiva. Silenzio radio.', "Benvenuto all'inferno.", 'Cervelliii... e bottino.', 'Mai due volte uguale.'] },
    uk: { title: 'Скіни Veteran', tip: 'Скін', fx: 'Ефекти', on: 'Увімк.', off: 'Вимк.', names: ['FISTILAND', 'Виживальник', 'Спецпідрозділ', 'Демонічний', 'Зомбі', 'Métamorphe'],
      tags: ['Повернення до витоків.', 'Вогонь розпалено. Грійтеся.', 'Нічне бачення ввімкнено. Радіомовчання.', 'Ласкаво просимо в пекло.', 'Мозкииии... і лут.', 'Ніколи двічі однаковий.'] },
    hr: { title: 'Veteran skinovi', tip: 'Skin', fx: 'Efekti', on: 'Uključeno', off: 'Isključeno', names: ['FISTILAND', 'Survivalist', 'Specijalne snage', 'Demonski', 'Zombi', 'Métamorphe'],
      tags: ['Povratak korijenima.', 'Vatra je zapaljena. Ostani na toplom.', 'Noćni vid uključen. Radio šutnja.', 'Dobrodošao u pakao.', 'Mozgooove... i loot.', 'Nikad dvaput isti.'] },
    pl: { title: 'Skórki Veteran', tip: 'Skórka', fx: 'Efekty', on: 'Włączone', off: 'Wyłączone', names: ['FISTILAND', 'Survivalista', 'Siły specjalne', 'Demoniczny', 'Zombie', 'Métamorphe'],
      tags: ['Powrót do korzeni.', 'Ognisko płonie. Trzymaj się w cieple.', 'Noktowizor włączony. Cisza radiowa.', 'Witaj w piekle.', 'Mózgiiii... i loot.', 'Nigdy dwa razy taki sam.'] }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var L = T[lang] || T.en;
  var root = document.documentElement;
  var btn = null, panel = null, fxSw = null, tipEl = null, current = '', tip = '', shown = '', morphTimer = 0, builtMeta = false;
  var BASE = (location.pathname.match(/^(.*?\/FISTILAND\/)/) || ['', '/'])[1];
  var rmq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function reduced() { return !!(rmq && rmq.matches); }
  function get(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function put(k, v) { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); } catch (e) {} }
  function saved() { var t = get(KEY); return IDS.indexOf(t) > 0 && (t !== 'morph' || isMeta()) ? t : ''; }
  function isVeteran() { var r = window.flRank ? window.flRank.rank() : ''; return r === 'veteran' || r === 'metamorph'; }
  function isMeta() { return !!(window.flRank && window.flRank.rank() === 'metamorph'); }
  function pickShape() {
    var pool = CYCLE.filter(function (x) { return x !== shown; });
    return pool[Math.floor(Math.random() * pool.length)];
  }
  // effects: on unless the visitor switched them off (a skin is an explicit choice); the panel mentions the system's reduced-motion request
  function fxOn() { return get(FXKEY) !== 'off'; }

  function svg(id) {
    if (!id) return '<img class="fl-theme-logo" src="' + BASE + 'assets/icon-192-v1.png" alt="" width="28" height="28" draggable="false">';
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[id] + '</svg>';
  }

  function paintFx() {
    root.classList.toggle('fl-fx-off', !fxOn());
    if (fxSw) {
      fxSw.setAttribute('aria-checked', fxOn() ? 'true' : 'false');
      var row = fxSw.parentNode, w = row.querySelector('.w');
      row.setAttribute('data-on', fxOn() ? 'true' : 'false');
      if (w) w.textContent = fxOn() ? L.on : L.off;
    }
  }
  function announce() {
    try { document.dispatchEvent(new CustomEvent('fl-skin-change', { detail: { skin: shown, fx: fxOn() } })); } catch (e) {}
  }

  // Métamorphe skin: every MORPH_MS the site takes the shape of another skin (only while the page is visible, effects on and no reduced-motion request)
  function morphStep() {
    if (current !== 'morph' || document.hidden) return;
    var next = pickShape();
    transition(function () { shown = next; root.setAttribute('data-fl-theme', shown); announce(); });
  }
  function armMorph() {
    clearInterval(morphTimer); morphTimer = 0;
    if (current === 'morph' && fxOn() && !reduced()) morphTimer = setInterval(morphStep, MORPH_MS);
  }

  function commit(id) {
    current = id;
    var early = root.getAttribute('data-fl-theme');   // set before the first paint by the inline script of main.html
    shown = id === 'morph' ? (!shown && CYCLE.indexOf(early) >= 0 ? early : pickShape()) : id;
    if (shown) root.setAttribute('data-fl-theme', shown); else root.removeAttribute('data-fl-theme');
    put(KEY, id);
    if (btn) {
      btn.innerHTML = svg(id);
      tip = L.tip + ' : ' + L.names[IDS.indexOf(id)];
      btn.setAttribute('aria-label', tip);
      if (tipEl && tipEl.classList.contains('is-on')) showTip();
    }
    if (panel) {
      var opts = panel.querySelectorAll('.fl-theme-opt');
      for (var i = 0; i < opts.length; i++) {
        var on = opts[i].getAttribute('data-id') === id;
        opts[i].setAttribute('aria-checked', on ? 'true' : 'false');
        opts[i].tabIndex = on ? 0 : -1;
      }
    }
    paintFx();
    armMorph();
    announce();
  }

  function flash() {
    var f = document.createElement('div');
    f.className = 'fl-theme-flash';
    f.addEventListener('animationend', function () { if (f.parentNode) f.parentNode.removeChild(f); });
    document.body.appendChild(f);
  }

  // animated switch: circular reveal from the button where the browser supports View Transitions
  function transition(change) {
    if (document.startViewTransition && fxOn()) {
      var r = btn ? btn.getBoundingClientRect() : null;
      root.style.setProperty('--vt-x', (r ? r.left + r.width / 2 : window.innerWidth - 40) + 'px');
      root.style.setProperty('--vt-y', (r ? r.top + r.height / 2 : 32) + 'px');
      root.classList.add('fl-vt-skin');
      var vt = document.startViewTransition(change);
      var done = function () { root.classList.remove('fl-vt-skin'); };
      if (vt && vt.finished) vt.finished.then(done, done); else done();
    } else {
      change();
      if (fxOn()) flash();
    }
  }
  function setTheme(id, animate) {
    if (!animate) { commit(id); return; }
    transition(function () { commit(id); });
  }

  function showTip() {
    if (!btn || !tipEl || !tip || (panel && panel.classList.contains('is-on'))) return;
    tipEl.textContent = tip;
    var r = btn.getBoundingClientRect(), w = tipEl.offsetWidth, x = r.left + r.width / 2 - w / 2;
    tipEl.style.left = Math.max(8, Math.min(x, document.documentElement.clientWidth - w - 8)) + 'px';
    tipEl.style.top = (r.bottom + 10) + 'px';
    tipEl.classList.add('is-on');
  }
  function hideTip() { if (tipEl) tipEl.classList.remove('is-on'); }

  function opts() { return panel ? Array.prototype.slice.call(panel.querySelectorAll('.fl-theme-opt')) : []; }
  function openPanel() {
    if (!panel) return;
    hideTip();
    panel.classList.add('is-on');
    btn.setAttribute('aria-expanded', 'true');
    var o = opts().filter(function (x) { return x.getAttribute('aria-checked') === 'true'; })[0] || opts()[0];
    if (o) o.focus({ preventScroll: true });
  }
  function closePanel(refocus) {
    if (!panel || !panel.classList.contains('is-on')) return;
    panel.classList.remove('is-on');
    if (btn) { btn.setAttribute('aria-expanded', 'false'); if (refocus) btn.focus(); }
  }

  function teardown() {
    if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
    if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
    btn = panel = fxSw = null;
  }

  function build() {
    if (!isVeteran()) {
      teardown();
      commit('');
      put(KEY, '');
      return;
    }
    if (btn && builtMeta !== isMeta()) {   // the last rank was gained or lost: rebuild the panel with / without the secret skin
      var keep = saved();
      teardown();
      if (!isMeta() && keep === 'morph') keep = '';
      current = keep;
    }
    if (btn) return;
    builtMeta = isMeta();
    var anchor = document.querySelector('.fl-hd-discord') || document.querySelector('.md-header__option');
    if (!anchor) return;
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'md-header__button fl-hd-theme';
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'fl-theme-panel');
    // Own tooltip (no title attribute: the theme's tooltip keeps a stale copy of the text it first read)
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'fl-hd-tip'; tipEl.setAttribute('aria-hidden', 'true'); document.body.appendChild(tipEl); }
    btn.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') showTip(); });
    btn.addEventListener('pointerleave', hideTip);
    btn.addEventListener('focus', function () { if (btn.matches && btn.matches(':focus-visible')) showTip(); });
    btn.addEventListener('blur', hideTip);
    anchor.parentNode.insertBefore(btn, anchor.nextSibling);

    panel = document.createElement('div');
    panel.className = 'fl-theme-panel';
    panel.id = 'fl-theme-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', L.title);
    var h = '<h4>' + L.title + '</h4><div role="radiogroup" aria-label="' + L.title + '">';
    for (var i = 0; i < IDS.length; i++) {
      var id = IDS[i];
      if (id === 'morph' && !builtMeta) continue;
      h += '<button type="button" role="radio" aria-checked="false" tabindex="-1" class="fl-theme-opt" data-id="' + id + '">' +
        '<span class="pv">' + svg(id) + '</span><span class="tx"><b>' + L.names[i] + '</b><span>' + L.tags[i] + '</span></span><span class="ck"></span></button>';
    }
    h += '</div><div class="fl-fx-row"><b>' + L.fx + '</b><span class="fl-fx-st" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/><path class="sl" d="M4 4l16 16"/></svg><span class="w"></span></span>' +
      '<button type="button" role="switch" aria-checked="true" aria-label="' + L.fx + '" class="fl-fx-sw"></button></div>';
    panel.innerHTML = h;
    document.body.appendChild(panel);
    fxSw = panel.querySelector('.fl-fx-sw');
    paintFx();

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.classList.remove('is-new');
      if (panel.classList.contains('is-on')) closePanel(false); else openPanel();
    });
    panel.addEventListener('click', function (e) {
      e.stopPropagation();
      var t = e.target.closest ? e.target.closest('.fl-theme-opt, .fl-fx-sw') : null;
      if (!t) return;
      if (t === fxSw) { put(FXKEY, fxOn() ? 'off' : 'on'); paintFx(); armMorph(); announce(); return; }
      var id = t.getAttribute('data-id');
      if (id !== current) setTheme(id, true);
    });
    panel.addEventListener('keydown', function (e) {
      var list = opts().concat(fxSw ? [fxSw] : []), i = list.indexOf(document.activeElement);
      var k = e.key;
      if (k === 'ArrowDown' || k === 'ArrowRight') i = (i + 1) % list.length;
      else if (k === 'ArrowUp' || k === 'ArrowLeft') i = (i - 1 + list.length) % list.length;
      else if (k === 'Home') i = 0;
      else if (k === 'End') i = list.length - 1;
      else if (k === 'Tab') { closePanel(false); return; }
      else return;
      e.preventDefault();
      list[i].focus();
    });
    commit(saved());
  }

  document.addEventListener('click', function () { closePanel(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(true); });
  document.addEventListener('fl-rank-change', function () {
    var had = !!btn;
    build();
    if (!had && btn) btn.classList.add('is-new');
  });
  if (rmq && rmq.addEventListener) rmq.addEventListener('change', function () { paintFx(); armMorph(); announce(); });

  window.flSkin = { get: function () { return shown; }, fx: fxOn };
  paintFx();
  build();
})();
