(function () {
  'use strict';
  // Veteran skins: header button + panel (radio menu, keyboard, view transition) and the effects switch.
  var KEY = 'fl-theme', FXKEY = 'fl-fx';
  var IDS = ['', 'survivalist', 'forces', 'demonic', 'zombie'];
  var ICON = {
    survivalist: '<path d="M12 4 3 20h18z"/><path d="M12 11.5 9 20h6z" fill="currentColor" stroke="none"/>',
    forces: '<circle cx="12" cy="12" r="6.5"/><path d="M12 2.5v6M12 15.5v6M2.5 12h6M15.5 12h6"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    demonic: '<path d="M12 2.8c.7 3.2 5 5.2 5 10a5 5 0 0 1-10 0c0-1.8.8-3.2 1.9-4.2.1 1.7.8 2.6 1.8 2.8-.4-2.6.1-5.4 1.3-8.6z" fill="currentColor" stroke="none"/>',
    zombie: '<path fill-rule="evenodd" fill="currentColor" stroke="none" d="M12 3a8 8 0 0 0-8 8c0 2.6 1.2 4.4 3 5.6V20h2.2v-2h1.6v2h2.4v-2h1.6v2H17v-3.4c1.8-1.2 3-3 3-5.6a8 8 0 0 0-8-8zM8.3 9.3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7.4 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>'
  };
  var T = {
    en: { title: 'Veteran skins', fx: 'Effects', on: 'On', off: 'Off', names: ['FISTILAND', 'Survivalist', 'Special Forces', 'Demonic', 'Zombie'],
      tags: ['Back to the roots.', "Fire's lit. Stay warm.", 'Night vision on. Radio silence.', 'Welcome to the hot zone.', 'Braaains... and loot.'] },
    fr: { title: 'Habillages Veteran', fx: 'Effets', on: 'Activé', off: 'Désactivé', names: ['FISTILAND', 'Survivaliste', 'Forces spéciales', 'Démoniaque', 'Zombie'],
      tags: ['Retour aux sources.', 'Le feu est allumé. Restez au chaud.', 'Vision nocturne activée. Silence radio.', 'Bienvenue en enfer.', 'Cerveaaaux... et du loot.'] },
    de: { title: 'Veteran-Skins', fx: 'Effekte', on: 'An', off: 'Aus', names: ['FISTILAND', 'Survivalist', 'Spezialeinheit', 'Dämonisch', 'Zombie'],
      tags: ['Zurück zu den Wurzeln.', 'Das Feuer brennt. Bleib warm.', 'Nachtsicht an. Funkstille.', 'Willkommen in der Hölle.', 'Gehiiirne... und Loot.'] },
    es: { title: 'Skins Veteran', fx: 'Efectos', on: 'Activado', off: 'Desactivado', names: ['FISTILAND', 'Superviviente', 'Fuerzas especiales', 'Demoníaco', 'Zombi'],
      tags: ['Vuelta a los orígenes.', 'Fuego encendido. Mantente caliente.', 'Visión nocturna activada. Silencio de radio.', 'Bienvenido al infierno.', 'Cerebrooos... y botín.'] },
    it: { title: 'Skin Veteran', fx: 'Effetti', on: 'Attivo', off: 'Disattivato', names: ['FISTILAND', 'Sopravvivenzista', 'Forze speciali', 'Demoniaco', 'Zombie'],
      tags: ['Ritorno alle origini.', 'Fuoco acceso. Resta al caldo.', 'Visione notturna attiva. Silenzio radio.', "Benvenuto all'inferno.", 'Cervelliii... e bottino.'] },
    uk: { title: 'Скіни Veteran', fx: 'Ефекти', on: 'Увімк.', off: 'Вимк.', names: ['FISTILAND', 'Виживальник', 'Спецпідрозділ', 'Демонічний', 'Зомбі'],
      tags: ['Повернення до витоків.', 'Вогонь розпалено. Грійтеся.', 'Нічне бачення ввімкнено. Радіомовчання.', 'Ласкаво просимо в пекло.', 'Мозкииии... і лут.'] },
    hr: { title: 'Veteran skinovi', fx: 'Efekti', on: 'Uključeno', off: 'Isključeno', names: ['FISTILAND', 'Survivalist', 'Specijalne snage', 'Demonski', 'Zombi'],
      tags: ['Povratak korijenima.', 'Vatra je zapaljena. Ostani na toplom.', 'Noćni vid uključen. Radio šutnja.', 'Dobrodošao u pakao.', 'Mozgooove... i loot.'] },
    pl: { title: 'Skórki Veteran', fx: 'Efekty', on: 'Włączone', off: 'Wyłączone', names: ['FISTILAND', 'Survivalista', 'Siły specjalne', 'Demoniczny', 'Zombie'],
      tags: ['Powrót do korzeni.', 'Ognisko płonie. Trzymaj się w cieple.', 'Noktowizor włączony. Cisza radiowa.', 'Witaj w piekle.', 'Mózgiiii... i loot.'] }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var L = T[lang] || T.en;
  var root = document.documentElement;
  var btn = null, panel = null, fxSw = null, current = '';
  var BASE = (location.pathname.match(/^(.*?\/FISTILAND\/)/) || ['', '/'])[1];
  var rmq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function reduced() { return !!(rmq && rmq.matches); }
  function get(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function put(k, v) { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); } catch (e) {} }
  function saved() { var t = get(KEY); return IDS.indexOf(t) > 0 ? t : ''; }
  function isVeteran() { return !!(window.flRank && window.flRank.rank() === 'veteran'); }
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
    try { document.dispatchEvent(new CustomEvent('fl-skin-change', { detail: { skin: current, fx: fxOn() } })); } catch (e) {}
  }

  function commit(id) {
    current = id;
    if (id) root.setAttribute('data-fl-theme', id); else root.removeAttribute('data-fl-theme');
    put(KEY, id);
    if (btn) {
      btn.innerHTML = svg(id);
      btn.setAttribute('aria-label', L.title + ' : ' + L.names[IDS.indexOf(id)]);
      btn.title = L.title + ' : ' + L.names[IDS.indexOf(id)];
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
    announce();
  }

  function flash() {
    var f = document.createElement('div');
    f.className = 'fl-theme-flash';
    f.addEventListener('animationend', function () { if (f.parentNode) f.parentNode.removeChild(f); });
    document.body.appendChild(f);
  }

  // animated switch: circular reveal from the button where the browser supports View Transitions
  function setTheme(id, animate) {
    if (!animate) { commit(id); return; }
    if (document.startViewTransition && fxOn()) {
      var r = btn ? btn.getBoundingClientRect() : null;
      root.style.setProperty('--vt-x', (r ? r.left + r.width / 2 : window.innerWidth - 40) + 'px');
      root.style.setProperty('--vt-y', (r ? r.top + r.height / 2 : 32) + 'px');
      root.classList.add('fl-vt-skin');
      var vt = document.startViewTransition(function () { commit(id); });
      var done = function () { root.classList.remove('fl-vt-skin'); };
      if (vt && vt.finished) vt.finished.then(done, done); else done();
    } else {
      commit(id);
      if (fxOn()) flash();
    }
  }

  function opts() { return panel ? Array.prototype.slice.call(panel.querySelectorAll('.fl-theme-opt')) : []; }
  function openPanel() {
    if (!panel) return;
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

  function build() {
    if (!isVeteran()) {
      if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
      if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
      btn = panel = fxSw = null;
      commit('');
      put(KEY, '');
      return;
    }
    if (btn) return;
    var anchor = document.querySelector('.fl-hd-discord') || document.querySelector('.md-header__option');
    if (!anchor) return;
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'md-header__button fl-hd-theme';
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'fl-theme-panel');
    anchor.parentNode.insertBefore(btn, anchor.nextSibling);

    panel = document.createElement('div');
    panel.className = 'fl-theme-panel';
    panel.id = 'fl-theme-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', L.title);
    var h = '<h4>' + L.title + '</h4><div role="radiogroup" aria-label="' + L.title + '">';
    for (var i = 0; i < IDS.length; i++) {
      var id = IDS[i];
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
      if (t === fxSw) { put(FXKEY, fxOn() ? 'off' : 'on'); paintFx(); announce(); return; }
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
  if (rmq && rmq.addEventListener) rmq.addEventListener('change', function () { paintFx(); announce(); });

  window.flSkin = { get: function () { return current; }, fx: fxOn };
  paintFx();
  build();
})();
