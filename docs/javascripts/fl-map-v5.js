(function () {
  var L = {
    en: { zin: 'Zoom in', zout: 'Zoom out', reset: 'Reset view', full: 'Full screen', fail: 'The map could not be loaded.', open: 'Open the image',
      sat: 'Satellite map of the island', guide: 'Wildlife guide', layers: 'Layers', hab: 'Habitats', mut: 'Mutant sightings', openLegend: 'Open the legend as an image', poi: 'Places of interest', bk: 'Bunkers', bk1: 'Bunker', bkNote: 'One bunker per sector.', approx: 'Dashed marker: approximate position. No marker: only the sector is known; hover or tap the name to light it up.',
      sp: { bear: 'Bear', deer: 'Deer', wolf: 'Wolf', boar: 'Boar' } },
    fr: { zin: 'Zoom avant', zout: 'Zoom arrière', reset: 'Réinitialiser la vue', full: 'Plein écran', fail: 'La carte n’a pas pu être chargée.', open: 'Ouvrir l’image',
      sat: 'Carte satellite de l’île', guide: 'Guide de la faune', layers: 'Calques', hab: 'Habitats', mut: 'Mutants repérés', openLegend: 'Ouvrir la légende en image', poi: 'Lieux d’intérêt', bk: 'Bunkers', bk1: 'Bunker', bkNote: 'Un bunker par secteur.', approx: 'Repère hachuré : position approximative. Sans repère : seul le secteur est connu ; survolez ou touchez le nom pour l’illuminer.',
      sp: { bear: 'Ours', deer: 'Cerf', wolf: 'Loup', boar: 'Sanglier' } },
    de: { zin: 'Vergrößern', zout: 'Verkleinern', reset: 'Ansicht zurücksetzen', full: 'Vollbild', fail: 'Die Karte konnte nicht geladen werden.', open: 'Bild öffnen',
      sat: 'Satellitenkarte der Insel', guide: 'Tierführer', layers: 'Ebenen', hab: 'Lebensräume', mut: 'Mutanten-Sichtungen', openLegend: 'Legende als Bild öffnen', poi: 'Interessante Orte', bk: 'Bunker', bk1: 'Bunker', bkNote: 'Ein Bunker pro Sektor.', approx: 'Gestrichelte Markierung: ungefähre Position. Ohne Markierung: nur der Sektor ist bekannt; Namen überfahren oder antippen, um ihn hervorzuheben.',
      sp: { bear: 'Bär', deer: 'Hirsch', wolf: 'Wolf', boar: 'Wildschwein' } },
    es: { zin: 'Acercar', zout: 'Alejar', reset: 'Restablecer la vista', full: 'Pantalla completa', fail: 'No se pudo cargar el mapa.', open: 'Abrir la imagen',
      sat: 'Mapa satelital de la isla', guide: 'Guía de fauna', layers: 'Capas', hab: 'Hábitats', mut: 'Mutantes avistados', openLegend: 'Abrir la leyenda como imagen', poi: 'Lugares de interés', bk: 'Búnkeres', bk1: 'Búnker', bkNote: 'Un búnker por sector.', approx: 'Marcador discontinuo: posición aproximada. Sin marcador: solo se conoce el sector; pase el cursor o toque el nombre para iluminarlo.',
      sp: { bear: 'Oso', deer: 'Ciervo', wolf: 'Lobo', boar: 'Jabalí' } },
    it: { zin: 'Ingrandisci', zout: 'Riduci', reset: 'Reimposta la vista', full: 'Schermo intero', fail: 'Impossibile caricare la mappa.', open: 'Apri l’immagine',
      sat: 'Mappa satellitare dell’isola', guide: 'Guida alla fauna', layers: 'Livelli', hab: 'Habitat', mut: 'Mutanti avvistati', openLegend: 'Apri la legenda come immagine', poi: 'Luoghi di interesse', bk: 'Bunker', bk1: 'Bunker', bkNote: 'Un bunker per settore.', approx: 'Segnaposto tratteggiato: posizione approssimativa. Senza segnaposto: si conosce solo il settore; passa sopra il nome o toccalo per evidenziarlo.',
      sp: { bear: 'Orso', deer: 'Cervo', wolf: 'Lupo', boar: 'Cinghiale' } },
    uk: { zin: 'Збільшити', zout: 'Зменшити', reset: 'Скинути вигляд', full: 'На весь екран', fail: 'Не вдалося завантажити карту.', open: 'Відкрити зображення',
      sat: 'Супутникова карта острова', guide: 'Довідник фауни', layers: 'Шари', hab: 'Середовища', mut: 'Мутанти на карті', openLegend: 'Відкрити легенду як зображення', poi: 'Цікаві місця', bk: 'Бункери', bk1: 'Бункер', bkNote: 'Один бункер на сектор.', approx: 'Пунктирний маркер: приблизна позиція. Без маркера: відомий лише сектор; наведіть курсор або торкніться назви, щоб підсвітити його.',
      sp: { bear: 'Ведмідь', deer: 'Олень', wolf: 'Вовк', boar: 'Кабан' } }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var T = L[lang] || L.en;
  var MAX = 8;
  var SPECIES = { bear: '#a82a1c', deer: '#c9892a', wolf: '#4f6f8f', boar: '#6a8a3a' };
  var HABITATS = ['#5d7a78', '#b0752a', '#55672f', '#a89d8a'];

  function icon(path) {
    return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="' + path + '"/></svg>';
  }
  var I_PLUS = icon('M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z');
  var I_MINUS = icon('M19 13H5v-2h14z');
  var I_RESET = icon('M12 5V1L7 6l5 5V7a6 6 0 0 1 0 12 6 6 0 0 1-6-6H4a8 8 0 0 0 8 8 8 8 0 0 0 0-16z');
  var I_FULL = icon('M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z');

  // Pan and zoom on `box` (the clipping frame) moving `stage`; `fsEl` is the element sent to full screen.
  function zoomer(box, stage, fsEl, onZoom) {
    var ctl = document.createElement('div');
    ctl.className = 'fl-map__ctl';
    ctl.innerHTML =
      '<button type="button" data-a="in" title="' + T.zin + '" aria-label="' + T.zin + '">' + I_PLUS + '</button>' +
      '<button type="button" data-a="out" title="' + T.zout + '" aria-label="' + T.zout + '">' + I_MINUS + '</button>' +
      '<button type="button" data-a="reset" title="' + T.reset + '" aria-label="' + T.reset + '">' + I_RESET + '</button>' +
      '<button type="button" data-a="full" title="' + T.full + '" aria-label="' + T.full + '">' + I_FULL + '</button>';
    box.appendChild(ctl);

    var s = 1, x = 0, y = 0, notified = false;
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
      if (!notified && s > 1.05 && onZoom) { notified = true; onZoom(); }
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
        else if (fsEl.requestFullscreen) { if (onZoom) onZoom(); fsEl.requestFullscreen(); }
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
  }

  // One SVG drawing, fetched and inlined.
  function initSvg(box) {
    var src = box.getAttribute('data-src');
    var stage = document.createElement('div');
    stage.className = 'fl-map__stage';
    box.appendChild(stage);
    zoomer(box, stage, box);
    fetch(src).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (t) {
      stage.innerHTML = t;
      var svg = stage.querySelector('svg');
      if (svg) { svg.removeAttribute('width'); svg.removeAttribute('height'); svg.setAttribute('focusable', 'false'); }
    }).catch(function () {
      stage.innerHTML = '<p class="fl-map__fail">' + T.fail + ' <a href="' + src + '">' + T.open + '</a></p>';
    });
  }

  // The island map: satellite base picture, two switchable overlays and the wildlife legend.
  function initIsland(root) {
    var base = root.getAttribute('data-base');
    var preview = root.getAttribute('data-preview') || base;
    var legend = (root.getAttribute('data-legend') || '').replace('{lang}', L[lang] ? lang : 'en');

    var habSw = HABITATS.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('');
    var mutSw = Object.keys(SPECIES).map(function (k) { return '<i style="background:' + SPECIES[k] + '"></i>'; }).join('');
    var mutRows = Object.keys(SPECIES).map(function (k) {
      return '<li><i style="background:' + SPECIES[k] + '"></i>' + T.sp[k] + '</li>';
    }).join('');

    root.innerHTML =
      '<div class="fl-island__bar"><span class="fl-island__cap">' + T.layers + '</span>' +
      '<label class="fl-island__tg"><input type="checkbox" data-l="habitats" checked><span class="fl-island__sw">' + habSw + '</span>' + T.hab + '</label>' +
      '<label class="fl-island__tg"><input type="checkbox" data-l="mutants" checked><span class="fl-island__sw">' + mutSw + '</span>' + T.mut + '</label>' +
      (root.getAttribute('data-poi') ? '<label class="fl-island__tg"><input type="checkbox" data-l="poi" checked><span class="fl-island__sw"><i style="background:#e8631c"></i></span>' + T.poi + '</label>' : '') +
      (root.getAttribute('data-bunkers') ? '<label class="fl-island__tg"><input type="checkbox" data-l="bunkers" checked><span class="fl-island__sw"><i style="background:#8a2f0f"></i></span>' + T.bk + '</label>' : '') + '</div>' +
      '<div class="fl-island__body">' +
      '<div class="fl-map fl-island__map"><div class="fl-map__stage">' +
      '<img class="fl-island__base" alt="' + T.sat + '" draggable="false" src="' + preview + '">' +
      '<img class="fl-island__ov" data-l="habitats" alt="" draggable="false" src="' + root.getAttribute('data-habitats') + '">' +
      '<img class="fl-island__ov" data-l="mutants" alt="" draggable="false" src="' + root.getAttribute('data-mutants') + '">' +
      '</div></div>' +
      '<aside class="fl-island__side">' +
      '<a href="' + legend + '" target="_blank" rel="noopener" title="' + T.openLegend + '"><img class="fl-island__legend" alt="' + T.guide + '" src="' + legend + '"></a>' +
      '<div class="fl-island__mut" data-l="mutants"><b>' + T.mut + '</b><ul>' + mutRows + '</ul></div>' +
      (root.getAttribute('data-bunkers') ? '<div class="fl-island__mut" data-l="bunkers"><b>' + T.bk + '</b><p class="fl-island__note">' + T.bkNote + '</p></div>' : '') +
      '<div class="fl-island__mut fl-island__poi" data-l="poi" hidden><b>' + T.poi + '</b><ul></ul><p>' + T.approx + '</p></div>' +
      '</aside></div>';

    var box = root.querySelector('.fl-island__map');
    var stage = box.querySelector('.fl-map__stage');
    var baseImg = box.querySelector('.fl-island__base');
    var fullLoaded = false;
    function loadFull() {
      if (fullLoaded || preview === base) return;
      fullLoaded = true;
      var im = new Image();
      im.onload = function () { baseImg.src = base; };
      im.src = base;
    }
    zoomer(box, stage, root, loadFull);

    var poiUrl = root.getAttribute('data-poi');
    if (poiUrl) {
      var ROWS = 'DCBAZ';
      var poiBox = root.querySelector('.fl-island__poi');
      fetch(poiUrl).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (data) {
        function key(p) { var c = p.sectors.split(' ')[0]; return ROWS.indexOf(c.charAt(0)) * 10 + (4 - parseInt(c.charAt(1), 10)); }
        var places = data.places.slice().sort(function (a, b) {
          return key(a) - key(b) || (a.name[lang] || a.name.en).localeCompare(b.name[lang] || b.name.en, lang);
        });
        var layer = document.createElement('div');
        layer.className = 'fl-island__pois';
        layer.setAttribute('data-l', 'poi');
        var list = poiBox.querySelector('ul');
        var secs = document.createElement('div');
        secs.className = 'fl-island__pois';
        secs.setAttribute('data-l', 'poi');
        var pinned = null;
        function showSectors(str) {
          secs.innerHTML = '';
          if (!str) return;
          str.split(' ').forEach(function (c) {
            var d = document.createElement('div');
            d.className = 'fl-sec';
            d.style.left = ((4 - parseInt(c.charAt(1), 10)) * 20) + '%';
            d.style.top = (ROWS.indexOf(c.charAt(0)) * 20) + '%';
            secs.appendChild(d);
          });
        }
        var n = 0;
        places.forEach(function (p) {
          var name = p.name[lang] || p.name.en;
          var li = document.createElement('li');
          var marker = null;
          var num = '·';
          if (p.prec !== 'sector') {
            n += 1; num = String(n);
            marker = document.createElement('span');
            marker.className = 'fl-poi' + (p.prec === 'exact' ? '' : ' is-approx');
            marker.style.left = (p.x * 100) + '%';
            marker.style.top = (p.y * 100) + '%';
            marker.title = num + '. ' + name;
            marker.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5L22.5 12 12 22.5 1.5 12z"/><text x="12" y="15.6" text-anchor="middle">' + num + '</text></svg>';
            layer.appendChild(marker);
          } else {
            li.className = 'is-sector';
          }
          li.tabIndex = 0;
          li.innerHTML = '<span class="n">' + num + '</span><span class="t"></span><span class="s">' + p.sectors.replace(' ', ' / ') + '</span>';
          li.querySelector('.t').textContent = name;
          function on() { if (marker) marker.classList.add('is-hot'); showSectors(p.sectors); }
          function off() { if (marker) marker.classList.remove('is-hot'); showSectors(pinned); }
          li.addEventListener('mouseenter', on);
          li.addEventListener('mouseleave', off);
          li.addEventListener('focus', on);
          li.addEventListener('blur', off);
          li.addEventListener('click', function () { pinned = (pinned === p.sectors) ? null : p.sectors; showSectors(pinned || p.sectors); });
          list.appendChild(li);
        });
        stage.appendChild(secs);
        stage.appendChild(layer);
        poiBox.hidden = false;
        var cb = root.querySelector('input[data-l="poi"]');
        if (cb && !cb.checked) { layer.classList.add('is-off'); secs.classList.add('is-off'); poiBox.classList.add('is-off'); }
      }).catch(function () {});
    }

    var bkUrl = root.getAttribute('data-bunkers');
    if (bkUrl) {
      fetch(bkUrl).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (data) {
        var layer = document.createElement('div');
        layer.className = 'fl-island__pois';
        layer.setAttribute('data-l', 'bunkers');
        data.bunkers.forEach(function (b) {
          var m = document.createElement('span');
          m.className = 'fl-bk';
          m.style.left = (b.x * 100) + '%';
          m.style.top = (b.y * 100) + '%';
          m.title = T.bk1 + ' ' + b.sector;
          m.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21"/><path d="M12 5.5a5.6 5.6 0 0 0-3.8 9.7v2.3h7.6v-2.3A5.6 5.6 0 0 0 12 5.5z"/><circle cx="9.7" cy="11.3" r="1.5"/><circle cx="14.3" cy="11.3" r="1.5"/></svg>';
          layer.appendChild(m);
        });
        stage.appendChild(layer);
        var cb = root.querySelector('input[data-l="bunkers"]');
        if (cb && !cb.checked) { layer.classList.add('is-off'); }
      }).catch(function () {});
    }

    root.querySelectorAll('input[data-l]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var k = cb.getAttribute('data-l');
        root.querySelectorAll('[data-l="' + k + '"]').forEach(function (el) {
          if (el !== cb) el.classList.toggle('is-off', !cb.checked);
        });
      });
    });
  }

  document.querySelectorAll('.fl-map[data-src]').forEach(initSvg);
  document.querySelectorAll('.fl-island[data-base]').forEach(initIsland);
})();
