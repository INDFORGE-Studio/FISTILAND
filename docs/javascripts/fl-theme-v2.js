(function () {
  // Veteran skins: a header button (only for the Veteran rank) that restyles the whole site.
  var KEY = 'fl-theme';
  var IDS = ['', 'survivalist', 'forces', 'demonic', 'zombie'];
  var SW = { '': '#e8631c', survivalist: '#a9bb55', forces: '#3be07a', demonic: '#e0241f', zombie: '#a4e23a' };
  var ICON = {
    '': '<path d="M12 2.8 20 5.8v6c0 4.5-3.1 8-8 9.4-4.9-1.4-8-4.9-8-9.4v-6z"/><path d="m8.4 12 2.5 2.6 4.7-5.2"/>',
    survivalist: '<path d="M12 4 3 20h18z"/><path d="M12 11.5 9 20h6z" fill="currentColor" stroke="none"/>',
    forces: '<circle cx="12" cy="12" r="6.5"/><path d="M12 2.5v6M12 15.5v6M2.5 12h6M15.5 12h6"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    demonic: '<path d="M12 2.8c.7 3.2 5 5.2 5 10a5 5 0 0 1-10 0c0-1.8.8-3.2 1.9-4.2.1 1.7.8 2.6 1.8 2.8-.4-2.6.1-5.4 1.3-8.6z" fill="currentColor" stroke="none"/>',
    zombie: '<path fill-rule="evenodd" fill="currentColor" stroke="none" d="M12 3a8 8 0 0 0-8 8c0 2.6 1.2 4.4 3 5.6V20h2.2v-2h1.6v2h2.4v-2h1.6v2H17v-3.4c1.8-1.2 3-3 3-5.6a8 8 0 0 0-8-8zM8.3 9.3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7.4 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>'
  };
  var T = {
    en: { title: 'Veteran skins', names: ['FISTILAND', 'Survivalist', 'Special Forces', 'Demonic', 'Zombie'],
      tags: ['Back to the roots.', "Fire's lit. Stay warm.", 'Night vision on. Radio silence.', 'Welcome to the hot zone.', 'Braaains... and loot.'] },
    fr: { title: 'Habillages Veteran', names: ['FISTILAND', 'Survivaliste', 'Forces spéciales', 'Démoniaque', 'Zombie'],
      tags: ['Retour aux sources.', 'Le feu est allumé. Restez au chaud.', 'Vision nocturne activée. Silence radio.', 'Bienvenue en enfer.', 'Cerveaaaux... et du loot.'] },
    de: { title: 'Veteran-Skins', names: ['FISTILAND', 'Survivalist', 'Spezialeinheit', 'Dämonisch', 'Zombie'],
      tags: ['Zurück zu den Wurzeln.', 'Das Feuer brennt. Bleib warm.', 'Nachtsicht an. Funkstille.', 'Willkommen in der Hölle.', 'Gehiiirne... und Loot.'] },
    es: { title: 'Skins Veteran', names: ['FISTILAND', 'Superviviente', 'Fuerzas especiales', 'Demoníaco', 'Zombi'],
      tags: ['Vuelta a los orígenes.', 'Fuego encendido. Mantente caliente.', 'Visión nocturna activada. Silencio de radio.', 'Bienvenido al infierno.', 'Cerebrooos... y botín.'] },
    it: { title: 'Skin Veteran', names: ['FISTILAND', 'Sopravvivenzista', 'Forze speciali', 'Demoniaco', 'Zombie'],
      tags: ['Ritorno alle origini.', 'Fuoco acceso. Resta al caldo.', 'Visione notturna attiva. Silenzio radio.', "Benvenuto all'inferno.", 'Cervelliii... e bottino.'] },
    uk: { title: 'Скіни Veteran', names: ['FISTILAND', 'Виживальник', 'Спецпідрозділ', 'Демонічний', 'Зомбі'],
      tags: ['Повернення до витоків.', 'Вогонь розпалено. Грійтеся.', 'Нічне бачення ввімкнено. Радіомовчання.', 'Ласкаво просимо в пекло.', 'Мозкииии... і лут.'] }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var L = T[lang] || T.en;
  var root = document.documentElement;
  var btn = null, panel = null, current = '';

  var BASE = (location.pathname.match(/^(.*?\/FISTILAND\/)/) || ['', '/'])[1];
  function svg(id) {
    if (!id) return '<img class="fl-theme-logo" src="' + BASE + 'assets/icon-192-v1.png" alt="" width="28" height="28" draggable="false">';
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[id] + '</svg>';
  }
  function saved() { try { var t = localStorage.getItem(KEY) || ''; return IDS.indexOf(t) > 0 ? t : ''; } catch (e) { return ''; } }
  function isVeteran() { return !!(window.flRank && window.flRank.rank() === 'veteran'); }

  function setTheme(id, fx) {
    current = id;
    if (id) root.setAttribute('data-fl-theme', id); else root.removeAttribute('data-fl-theme');
    try { if (id) localStorage.setItem(KEY, id); else localStorage.removeItem(KEY); } catch (e) {}
    if (btn) {
      btn.innerHTML = svg(id);
      btn.title = L.title + ' : ' + L.names[IDS.indexOf(id)];
    }
    if (panel) {
      var opts = panel.querySelectorAll('.fl-theme-opt');
      for (var i = 0; i < opts.length; i++) opts[i].classList.toggle('is-active', opts[i].getAttribute('data-id') === id);
    }
    if (fx) {
      var f = document.createElement('div');
      f.className = 'fl-theme-flash';
      f.addEventListener('animationend', function () { if (f.parentNode) f.parentNode.removeChild(f); });
      document.body.appendChild(f);
    }
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('is-on');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function build() {
    if (!isVeteran()) {
      if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
      if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
      btn = panel = null;
      setTheme('', false);
      try { localStorage.removeItem(KEY); } catch (e) {}
      return;
    }
    if (btn) return;
    var anchor = document.querySelector('.fl-hd-discord') || document.querySelector('.md-header__option');
    if (!anchor) return;
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'md-header__button fl-hd-theme';
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
    anchor.parentNode.insertBefore(btn, anchor.nextSibling);

    panel = document.createElement('div');
    panel.className = 'fl-theme-panel';
    panel.setAttribute('role', 'menu');
    var h = '<h4>' + L.title + '</h4>';
    for (var i = 0; i < IDS.length; i++) {
      var id = IDS[i];
      h += '<button type="button" role="menuitem" class="fl-theme-opt" data-id="' + id + '" style="--sw:' + SW[id] + '">' +
        svg(id) + '<div><b>' + L.names[i] + '</b><span>' + L.tags[i] + '</span></div></button>';
    }
    panel.innerHTML = h;
    document.body.appendChild(panel);

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.classList.remove('is-new');
      var on = !panel.classList.contains('is-on');
      panel.classList.toggle('is-on', on);
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
    panel.addEventListener('click', function (e) {
      e.stopPropagation();
      var o = e.target.closest ? e.target.closest('.fl-theme-opt') : null;
      if (!o) return;
      var id = o.getAttribute('data-id');
      if (id !== current) setTheme(id, true);
    });
    setTheme(saved(), false);
  }

  document.addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
  document.addEventListener('fl-rank-change', function () {
    var had = !!btn;
    build();
    if (!had && btn) btn.classList.add('is-new');
  });
  build();
})();
