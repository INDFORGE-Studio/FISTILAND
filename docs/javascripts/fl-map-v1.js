(function () {
  var L = {
    en: { zin: 'Zoom in', zout: 'Zoom out', reset: 'Reset view', full: 'Full screen', fail: 'The map could not be loaded.', open: 'Open the image' },
    fr: { zin: 'Zoom avant', zout: 'Zoom arrière', reset: 'Réinitialiser la vue', full: 'Plein écran', fail: 'La carte n’a pas pu être chargée.', open: 'Ouvrir l’image' },
    de: { zin: 'Vergrößern', zout: 'Verkleinern', reset: 'Ansicht zurücksetzen', full: 'Vollbild', fail: 'Die Karte konnte nicht geladen werden.', open: 'Bild öffnen' },
    es: { zin: 'Acercar', zout: 'Alejar', reset: 'Restablecer la vista', full: 'Pantalla completa', fail: 'No se pudo cargar el mapa.', open: 'Abrir la imagen' },
    it: { zin: 'Ingrandisci', zout: 'Riduci', reset: 'Reimposta la vista', full: 'Schermo intero', fail: 'Impossibile caricare la mappa.', open: 'Apri l’immagine' },
    uk: { zin: 'Збільшити', zout: 'Зменшити', reset: 'Скинути вигляд', full: 'На весь екран', fail: 'Не вдалося завантажити карту.', open: 'Відкрити зображення' }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var T = L[lang] || L.en;
  var MAX = 8;

  function icon(path) {
    return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="' + path + '"/></svg>';
  }
  var I_PLUS = icon('M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z');
  var I_MINUS = icon('M19 13H5v-2h14z');
  var I_RESET = icon('M12 5V1L7 6l5 5V7a6 6 0 0 1 0 12 6 6 0 0 1-6-6H4a8 8 0 0 0 8 8 8 8 0 0 0 0-16z');
  var I_FULL = icon('M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z');

  function init(box) {
    var src = box.getAttribute('data-src');
    var stage = document.createElement('div');
    stage.className = 'fl-map__stage';
    var ctl = document.createElement('div');
    ctl.className = 'fl-map__ctl';
    ctl.innerHTML =
      '<button type="button" data-a="in" title="' + T.zin + '" aria-label="' + T.zin + '">' + I_PLUS + '</button>' +
      '<button type="button" data-a="out" title="' + T.zout + '" aria-label="' + T.zout + '">' + I_MINUS + '</button>' +
      '<button type="button" data-a="reset" title="' + T.reset + '" aria-label="' + T.reset + '">' + I_RESET + '</button>' +
      '<button type="button" data-a="full" title="' + T.full + '" aria-label="' + T.full + '">' + I_FULL + '</button>';
    box.appendChild(stage);
    box.appendChild(ctl);

    var s = 1, x = 0, y = 0;
    function size() { return { w: box.clientWidth, h: box.clientHeight }; }
    function clamp() {
      var d = size();
      s = Math.max(1, Math.min(MAX, s));
      x = Math.min(0, Math.max(d.w - d.w * s, x));
      y = Math.min(0, Math.max(d.h - d.h * s, y));
    }
    function apply() {
      clamp();
      stage.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
      box.classList.toggle('is-zoomed', s > 1.001);
    }
    function zoomAt(px, py, f) {
      var ns = Math.max(1, Math.min(MAX, s * f));
      x = px - (px - x) * ns / s;
      y = py - (py - y) * ns / s;
      s = ns;
      apply();
    }
    function centre() { var d = size(); return { x: d.w / 2, y: d.h / 2 }; }

    ctl.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var a = b.getAttribute('data-a'), c = centre();
      if (a === 'in') zoomAt(c.x, c.y, 1.6);
      else if (a === 'out') zoomAt(c.x, c.y, 1 / 1.6);
      else if (a === 'reset') { s = 1; x = 0; y = 0; apply(); }
      else if (a === 'full') {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (box.requestFullscreen) box.requestFullscreen();
      }
    });
    box.addEventListener('wheel', function (e) {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      var r = box.getBoundingClientRect();
      zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.25 : 0.8);
    }, { passive: false });
    box.addEventListener('dblclick', function (e) {
      var r = box.getBoundingClientRect();
      zoomAt(e.clientX - r.left, e.clientY - r.top, 2);
    });

    var ptrs = {}, lastDist = 0;
    box.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.fl-map__ctl')) return;
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
      try { box.setPointerCapture(e.pointerId); } catch (err) {}
      lastDist = 0;
    });
    box.addEventListener('pointermove', function (e) {
      var p = ptrs[e.pointerId]; if (!p) return;
      var ids = Object.keys(ptrs);
      if (ids.length === 2) {
        ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
        var a = ptrs[ids[0]], b = ptrs[ids[1]];
        var dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (lastDist) {
          var r = box.getBoundingClientRect();
          zoomAt((a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top, dist / lastDist);
        }
        lastDist = dist;
        return;
      }
      if (s > 1.001) {
        x += e.clientX - p.x; y += e.clientY - p.y; apply();
      }
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
    });
    function up(e) { delete ptrs[e.pointerId]; lastDist = 0; }
    box.addEventListener('pointerup', up);
    box.addEventListener('pointercancel', up);
    document.addEventListener('fullscreenchange', function () { s = 1; x = 0; y = 0; apply(); });
    window.addEventListener('resize', apply);

    fetch(src).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (t) {
      stage.innerHTML = t;
      var svg = stage.querySelector('svg');
      if (svg) { svg.removeAttribute('width'); svg.removeAttribute('height'); svg.setAttribute('focusable', 'false'); }
    }).catch(function () {
      stage.innerHTML = '<p class="fl-map__fail">' + T.fail + ' <a href="' + src + '">' + T.open + '</a></p>';
    });
  }

  document.querySelectorAll('.fl-map[data-src]').forEach(init);
})();
