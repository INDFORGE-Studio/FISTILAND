(function () {
  // Extras: tickable checklist, base size calculator, Ctrl+K search, localised "updated" dates, offline cache + notice.
  var lang = (document.documentElement.lang || 'en').slice(0, 2);

  // ---- Checklist (guide): each box is remembered in this browser, with a progress bar on top ----
  (function () {
    var box = document.querySelector('.fl-checks');
    if (!box) return;
    var items = box.querySelectorAll('.task-list-item');
    if (!items.length) return;
    var key = 'fl-checks:' + location.pathname.replace(/\/+$/, '');
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || '[]') || []; } catch (e) { saved = []; }
    var bar = document.createElement('div'), fill = document.createElement('i'), txt = document.createElement('span');
    bar.className = 'fl-checks__bar'; bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-valuemin', '0'); bar.setAttribute('aria-valuemax', String(items.length));
    bar.appendChild(fill); bar.appendChild(txt); box.insertBefore(bar, box.firstChild);

    function paint() {
      var n = 0, out = [];
      items.forEach(function (li, i) {
        var c = li.querySelector('input[type="checkbox"]');
        if (c && c.checked) { n++; out.push(i); }
        li.classList.toggle('fl-done', !!(c && c.checked));
      });
      fill.style.width = (n / items.length * 100) + '%';
      txt.textContent = n + ' / ' + items.length;
      bar.setAttribute('aria-valuenow', String(n));
      try { localStorage.setItem(key, JSON.stringify(out)); } catch (e) {}
    }
    items.forEach(function (li, i) {
      var c = li.querySelector('input[type="checkbox"]');
      if (!c) return;
      c.disabled = false;
      c.checked = saved.indexOf(i) !== -1;
      c.addEventListener('change', paint);
      li.addEventListener('click', function (e) {
        if (e.target.closest('a, button, label, input')) return;   // links, the IP button and the box itself keep their own behaviour
        c.click();
      });
    });
    paint();
  })();

  // ---- Base size calculator (territory page): numbers come from the data-* attributes ----
  document.querySelectorAll('.fl-calc').forEach(function (c) {
    var base = +c.getAttribute('data-base'), extra = +c.getAttribute('data-extra'), exp = +c.getAttribute('data-exp'), max = +c.getAttribute('data-max') || 10;
    var row = c.querySelector('.fl-calc__row'), r = c.querySelector('input[type="range"]'), n = c.querySelector('.fl-calc__n');
    var f = c.querySelector('[data-out="flag"]'), e = c.querySelector('[data-out="exp"]');
    if (!row || !r || !n || !f || !e || !(base > 0)) return;
    row.hidden = false;
    function up() {
      var m = Math.min(max, Math.max(1, parseInt(r.value, 10) || 1)), v = base + extra * (m - 1);
      n.textContent = m; f.textContent = v; e.textContent = v + exp;
    }
    r.addEventListener('input', up); up();
  });

  // ---- Ctrl+K (or Cmd+K) opens the search, like the "/" and "F" keys of the theme ----
  document.addEventListener('keydown', function (e) {
    if (!(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey || (e.key !== 'k' && e.key !== 'K')) return;
    var q = document.querySelector('[data-md-component="search-query"]');
    if (!q) return;
    e.preventDefault();
    q.focus(); q.select();
  });

  // ---- "Last updated" dates are written as ISO dates at build time; show them in the page language ----
  document.querySelectorAll('.fl-updated time[datetime]').forEach(function (t) {
    try {
      var d = new Date(t.getAttribute('datetime') + 'T12:00:00');
      if (!isNaN(d.getTime())) t.textContent = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(d);
    } catch (e) {}
  });

  // ---- Offline notice + service worker (offline copy of the pages already visited) ----
  var OFFLINE = {
    en: 'You are offline: showing the saved wiki.',
    fr: "Vous êtes hors ligne : le wiki enregistré s'affiche.",
    de: 'Du bist offline: das gespeicherte Wiki wird angezeigt.',
    es: 'Estás sin conexión: se muestra la wiki guardada.',
    it: 'Sei offline: viene mostrata la wiki salvata.',
    pl: 'Jesteś offline: wyświetlana jest zapisana wiki.',
    uk: 'Ви офлайн: показано збережену вікі.',
    hr: 'Offline si: prikazuje se spremljeni wiki.'
  };
  var toast = null, hideT = 0;
  function note(on) {
    if (on && !toast) {
      toast = document.createElement('div');
      toast.className = 'fl-offline-toast'; toast.setAttribute('role', 'status');
      toast.textContent = OFFLINE[lang] || OFFLINE.en;
      document.body.appendChild(toast);
    }
    if (!toast) return;
    clearTimeout(hideT);
    requestAnimationFrame(function () { toast.classList.toggle('is-on', on); });
    if (on) hideT = setTimeout(function () { toast.classList.remove('is-on'); }, 6000);
  }
  window.addEventListener('offline', function () { note(true); });
  window.addEventListener('online', function () { note(false); });
  if (navigator.onLine === false) note(true);

  if ('serviceWorker' in navigator) {
    var src = document.currentScript && document.currentScript.src, sw = null, scope = null;
    if (src && /javascripts\/[^\/]*$/.test(src)) { sw = src.replace(/javascripts\/[^\/]*$/, 'sw.js'); scope = sw.replace(/sw\.js$/, ''); }
    if (sw) {
      var reg = function () {
        navigator.serviceWorker.register(sw, { scope: scope }).catch(function () {});
        navigator.serviceWorker.ready.then(function (r) {   // hand the worker the list of what this page used, so it is kept for offline use
          var list = [location.origin + location.pathname + location.search];
          try { performance.getEntriesByType('resource').forEach(function (e) { if (e.name.indexOf(scope) === 0) list.push(e.name); }); } catch (x) {}
          if (r.active) r.active.postMessage({ keep: list.slice(0, 120) });
        }).catch(function () {});
      };
      var go = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 1500); })(reg); };
      if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
    }
  }
})();
