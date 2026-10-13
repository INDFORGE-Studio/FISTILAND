(function () {
  var L = {
    en: { zin: 'Zoom in', zout: 'Zoom out', reset: 'Reset view', full: 'Full screen', fail: 'The map could not be loaded.', open: 'Open the image',
      sat: 'Satellite map of the island', guide: 'Wildlife guide', layers: 'Layers', hab: 'Wildlife habitats', mut: 'Mutant sightings', openLegend: 'Open the legend as an image', poi: 'Places of interest', bk: 'Bunkers', bk1: 'Bunker', bkNote: 'One bunker per sector.', approx: 'Dashed marker: approximate position. No marker: only the sector is known; hover or tap the name to light it up.',
      sp: { bear: 'Bear', deer: 'Deer', wolf: 'Wolf', boar: 'Boar' } },
    fr: { zin: 'Zoom avant', zout: 'Zoom arrière', reset: 'Réinitialiser la vue', full: 'Plein écran', fail: 'La carte n’a pas pu être chargée.', open: 'Ouvrir l’image',
      sat: 'Carte satellite de l’île', guide: 'Guide de la faune', layers: 'Calques', hab: 'Habitats de la faune', mut: 'Mutants repérés', openLegend: 'Ouvrir la légende en image', poi: 'Lieux d’intérêt', bk: 'Bunkers', bk1: 'Bunker', bkNote: 'Un bunker par secteur.', approx: 'Repère hachuré : position approximative. Sans repère : seul le secteur est connu ; survolez ou touchez le nom pour l’illuminer.',
      sp: { bear: 'Ours', deer: 'Cerf', wolf: 'Loup', boar: 'Sanglier' } },
    de: { zin: 'Vergrößern', zout: 'Verkleinern', reset: 'Ansicht zurücksetzen', full: 'Vollbild', fail: 'Die Karte konnte nicht geladen werden.', open: 'Bild öffnen',
      sat: 'Satellitenkarte der Insel', guide: 'Tierführer', layers: 'Ebenen', hab: 'Lebensräume der Tiere', mut: 'Mutanten-Sichtungen', openLegend: 'Legende als Bild öffnen', poi: 'Interessante Orte', bk: 'Bunker', bk1: 'Bunker', bkNote: 'Ein Bunker pro Sektor.', approx: 'Gestrichelte Markierung: ungefähre Position. Ohne Markierung: nur der Sektor ist bekannt; Namen überfahren oder antippen, um ihn hervorzuheben.',
      sp: { bear: 'Bär', deer: 'Hirsch', wolf: 'Wolf', boar: 'Wildschwein' } },
    es: { zin: 'Acercar', zout: 'Alejar', reset: 'Restablecer la vista', full: 'Pantalla completa', fail: 'No se pudo cargar el mapa.', open: 'Abrir la imagen',
      sat: 'Mapa satelital de la isla', guide: 'Guía de fauna', layers: 'Capas', hab: 'Hábitats de la fauna', mut: 'Mutantes avistados', openLegend: 'Abrir la leyenda como imagen', poi: 'Lugares de interés', bk: 'Búnkeres', bk1: 'Búnker', bkNote: 'Un búnker por sector.', approx: 'Marcador discontinuo: posición aproximada. Sin marcador: solo se conoce el sector; pase el cursor o toque el nombre para iluminarlo.',
      sp: { bear: 'Oso', deer: 'Ciervo', wolf: 'Lobo', boar: 'Jabalí' } },
    it: { zin: 'Ingrandisci', zout: 'Riduci', reset: 'Reimposta la vista', full: 'Schermo intero', fail: 'Impossibile caricare la mappa.', open: 'Apri l’immagine',
      sat: 'Mappa satellitare dell’isola', guide: 'Guida alla fauna', layers: 'Livelli', hab: 'Habitat della fauna', mut: 'Mutanti avvistati', openLegend: 'Apri la legenda come immagine', poi: 'Luoghi di interesse', bk: 'Bunker', bk1: 'Bunker', bkNote: 'Un bunker per settore.', approx: 'Segnaposto tratteggiato: posizione approssimativa. Senza segnaposto: si conosce solo il settore; passa sopra il nome o toccalo per evidenziarlo.',
      sp: { bear: 'Orso', deer: 'Cervo', wolf: 'Lupo', boar: 'Cinghiale' } },
    uk: { zin: 'Збільшити', zout: 'Зменшити', reset: 'Скинути вигляд', full: 'На весь екран', fail: 'Не вдалося завантажити карту.', open: 'Відкрити зображення',
      sat: 'Супутникова карта острова', guide: 'Довідник фауни', layers: 'Шари', hab: 'Середовища фауни', mut: 'Мутанти на карті', openLegend: 'Відкрити легенду як зображення', poi: 'Цікаві місця', bk: 'Бункери', bk1: 'Бункер', bkNote: 'Один бункер на сектор.', approx: 'Пунктирний маркер: приблизна позиція. Без маркера: відомий лише сектор; наведіть курсор або торкніться назви, щоб підсвітити його.',
      sp: { bear: 'Ведмідь', deer: 'Олень', wolf: 'Вовк', boar: 'Кабан' } }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var T = L[lang] || L.en;

  // Wildlife legend: names, groups, biomes and presence labels
  var LG = {
    en: { an: ['Rabbit', 'Chicken', 'Horse', 'Donkey', 'Deer', 'Bear', 'Goat', 'Wolf', 'Boar'], grp: ['Non-hostile', 'Dangerous'],
      bio: ['Mediterranean', 'Meadow', 'Forest', 'Mountain'], pres: ['Urban areas', 'Villages', 'Day', 'Night'],
      hab: 'Habitats', when: 'Seen', hint: 'Tap an animal to see where it lives on the map. Tap again to clear.', img: 'Open the legend as an image' },
    fr: { an: ['Lapin', 'Poule', 'Cheval', 'Âne', 'Cerf', 'Ours', 'Chèvre', 'Loup', 'Sanglier'], grp: ['Non hostiles', 'Dangereux'],
      bio: ['Méditerranéen', 'Prairie', 'Forêt', 'Montagne'], pres: ['Zones urbaines', 'Villages', 'Jour', 'Nuit'],
      hab: 'Habitats', when: 'Présence', hint: 'Touchez un animal pour voir où il vit sur la carte. Touchez-le à nouveau pour effacer.', img: 'Ouvrir la légende en image' },
    de: { an: ['Kaninchen', 'Huhn', 'Pferd', 'Esel', 'Hirsch', 'Bär', 'Ziege', 'Wolf', 'Wildschwein'], grp: ['Friedlich', 'Gefährlich'],
      bio: ['Mittelmeer', 'Wiese', 'Wald', 'Gebirge'], pres: ['Städte', 'Dörfer', 'Tag', 'Nacht'],
      hab: 'Lebensräume', when: 'Vorkommen', hint: 'Tippe auf ein Tier, um seinen Lebensraum auf der Karte zu sehen. Erneut tippen zum Löschen.', img: 'Legende als Bild öffnen' },
    es: { an: ['Conejo', 'Gallina', 'Caballo', 'Burro', 'Ciervo', 'Oso', 'Cabra', 'Lobo', 'Jabalí'], grp: ['No hostiles', 'Peligrosos'],
      bio: ['Mediterráneo', 'Pradera', 'Bosque', 'Montaña'], pres: ['Zonas urbanas', 'Pueblos', 'Día', 'Noche'],
      hab: 'Hábitats', when: 'Presencia', hint: 'Toca un animal para ver dónde vive en el mapa. Tócalo de nuevo para borrar.', img: 'Abrir la leyenda como imagen' },
    it: { an: ['Coniglio', 'Gallina', 'Cavallo', 'Asino', 'Cervo', 'Orso', 'Capra', 'Lupo', 'Cinghiale'], grp: ['Non ostili', 'Pericolosi'],
      bio: ['Mediterraneo', 'Prateria', 'Foresta', 'Montagna'], pres: ['Aree urbane', 'Villaggi', 'Giorno', 'Notte'],
      hab: 'Habitat', when: 'Presenza', hint: 'Tocca un animale per vedere dove vive sulla mappa. Toccalo di nuovo per cancellare.', img: 'Apri la legenda come immagine' },
    uk: { an: ['Кролик', 'Курка', 'Кінь', 'Осел', 'Олень', 'Ведмідь', 'Коза', 'Вовк', 'Кабан'], grp: ['Не агресивні', 'Небезпечні'],
      bio: ['Середземномор’я', 'Луки', 'Ліс', 'Гори'], pres: ['Міста', 'Села', 'День', 'Ніч'],
      hab: 'Середовища', when: 'Поява', hint: 'Торкніться тварини, щоб побачити, де вона живе на карті. Торкніться ще раз, щоб прибрати.', img: 'Відкрити легенду як зображення' }
  };
  var G = LG[lang] || LG.en;
  // k: icon file, g: group, b: MED PRA FOR MON, p: URB VIL DAY NGT
  var ANIMALS = [
    { k: 'rabbit', g: 0, b: [1, 1, 1, 1], p: [1, 1, 1, 1] },
    { k: 'chicken', g: 0, b: [1, 0, 0, 0], p: [1, 1, 1, 0] },
    { k: 'horse', g: 0, b: [0, 1, 0, 0], p: [1, 1, 1, 0] },
    { k: 'donkey', g: 0, b: [1, 0, 0, 0], p: [0, 1, 1, 0] },
    { k: 'deer', g: 0, b: [0, 1, 1, 1], p: [0, 0, 1, 1] },
    { k: 'bear', g: 1, b: [0, 1, 1, 1], p: [0, 0, 0, 1] },
    { k: 'goat', g: 1, b: [1, 0, 0, 1], p: [1, 1, 1, 0] },
    { k: 'wolf', g: 1, b: [0, 1, 1, 1], p: [0, 0, 0, 1] },
    { k: 'boar', g: 1, b: [1, 1, 1, 0], p: [1, 1, 1, 1] }
  ];
  // overlay colour of each biome (MED, PRA, FOR, MON)
  var BIOME_RGB = [[0, 255, 248], [255, 174, 0], [105, 212, 0], [255, 255, 255]];
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
  function zoomer(box, stage, fsEl, onZoom, host) {
    var ctl = document.createElement('div');
    ctl.className = 'fl-map__ctl';
    ctl.innerHTML =
      '<button type="button" data-a="in" title="' + T.zin + '" aria-label="' + T.zin + '">' + I_PLUS + '</button>' +
      '<button type="button" data-a="out" title="' + T.zout + '" aria-label="' + T.zout + '">' + I_MINUS + '</button>' +
      '<button type="button" data-a="reset" title="' + T.reset + '" aria-label="' + T.reset + '">' + I_RESET + '</button>' +
      '<button type="button" data-a="full" title="' + T.full + '" aria-label="' + T.full + '">' + I_FULL + '</button>';
    // the buttons live outside the picture: in the given bar, or in a bar just above the frame
    if (!host) {
      host = document.createElement("div");
      host.className = "fl-map__tools";
      box.parentNode.insertBefore(host, box);
    }
    host.appendChild(ctl);

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

  // Wildlife legend: one row per animal. Tapping an animal shows where it lives (habitat overlay kept only for its biomes).
  function initLegend(root, stage, legendUrl) {
    var box = root.querySelector('.fl-leg');
    var base = (root.getAttribute('data-habitats') || '').split('?')[0].replace(/[^\/]*$/, '') + 'animals/';
    var sw = HABITATS;
    function dots(b) {
      return b.map(function (v, i) { return '<i' + (v ? ' class="on" style="background:' + sw[i] + '"' : '') + '></i>'; }).join('');
    }
    function detail(a) {
      var hb = a.b.map(function (v, i) { return v ? '<span class="fl-chip"><i style="background:' + sw[i] + '"></i>' + G.bio[i] + '</span>' : ''; }).join('');
      var pr = a.p.map(function (v, i) { return '<span class="fl-chip ' + (v ? 'is-yes' : 'is-no') + '">' + (v ? '✓ ' : '– ') + G.pres[i] + '</span>'; }).join('');
      return '<div><small>' + G.hab + '</small>' + hb + '</div><div><small>' + G.when + '</small>' + pr + '</div>';
    }
    var h = '<b class="fl-leg__t">' + T.guide + '</b><p class="fl-leg__hint">' + G.hint + '</p><div class="fl-leg__bio">';
    sw.forEach(function (c, i) {
      h += '<button type="button" class="fl-bio" data-b="' + i + '" aria-pressed="false"><i style="background:' + c + '"></i>' + G.bio[i] + '</button>';
    });
    h += '</div><div class="fl-leg__info" aria-live="polite"></div>';
    G.grp.forEach(function (gname, gi) {
      h += '<div class="fl-leg__g"><h5>' + gname + '</h5><div class="fl-leg__rows">';
      ANIMALS.forEach(function (a, ai) {
        if (a.g !== gi) return;
        var ext = a.k === 'donkey' ? 'svg' : 'png';
        h += '<div class="fl-an" data-a="' + ai + '"><button type="button" class="fl-an__hd" aria-expanded="false">' +
          '<img src="' + base + a.k + '-v1.' + ext + '" alt="" width="40" height="40" draggable="false">' +
          '<span class="n">' + G.an[ai] + '</span><span class="d">' + dots(a.b) + '</span></button>' +
          '<div class="fl-an__bd">' + detail(a) + '</div></div>';
      });
      h += '</div></div>';
    });
    h += '<a class="fl-leg__img" href="' + legendUrl + '" target="_blank" rel="noopener">' + G.img + '</a>';
    box.innerHTML = h;

    var info = box.querySelector('.fl-leg__info');
    var hab = root.querySelector('input[data-l="habitats"]');
    var selA = -1, selB = [0, 0, 0, 0], auto = false;
    var CW = 1024, cls = null, src = null, cv = null, ctx = null, failed = false, loading = false;

    function ensureLayer(on) {
      if (on && !hab.checked) { hab.checked = true; hab.dispatchEvent(new Event('change')); auto = true; }
      else if (!on && auto && hab.checked) { hab.checked = false; hab.dispatchEvent(new Event('change')); auto = false; }
      else if (!on) { auto = false; }
    }
    // Reads the habitat picture once, at reduced size, and tags every pixel with its biome.
    function prepare(done) {
      if (cls) { done(); return; }
      if (failed || loading) return;
      var holder = root.querySelector('img.fl-island__ov[data-l="habitats"]');
      var im = new Image();
      loading = true;
      function run() {
        try {
          var c = document.createElement('canvas');
          c.width = c.height = CW;
          var x = c.getContext('2d', { willReadFrequently: true });
          x.drawImage(im, 0, 0, CW, CW);
          src = x.getImageData(0, 0, CW, CW);
          var d = src.data, n = CW * CW, t = new Uint8Array(n);
          for (var p = 0; p < n; p++) {
            var q = p * 4;
            if (d[q + 3] < 6) continue;
            var best = 0, bd = 1e9;
            for (var k = 0; k < 4; k++) {
              var dr = d[q] - BIOME_RGB[k][0], dg = d[q + 1] - BIOME_RGB[k][1], db = d[q + 2] - BIOME_RGB[k][2];
              var dd = dr * dr + dg * dg + db * db;
              if (dd < bd) { bd = dd; best = k; }
            }
            t[p] = best + 1;
          }
          cls = t;
          cv = document.createElement('canvas');
          cv.width = cv.height = CW;
          cv.className = 'fl-island__ov';
          cv.setAttribute('data-l', 'habitats');
          if (!hab.checked) cv.classList.add('is-off');
          ctx = cv.getContext('2d');
          holder.parentNode.insertBefore(cv, holder.nextSibling);
          loading = false;
          done();
        } catch (e) { failed = true; loading = false; }
      }
      im.onload = run;
      im.onerror = function () { failed = true; loading = false; };
      im.src = (root.getAttribute('data-habitats') || '').replace(/wildlife-habitats-overlay.png/, 'wildlife-habitats-1024-v1.png');
    }
    function paint() {
      var any = selB.indexOf(1) >= 0;
      root.classList.toggle('is-hab-filter', any && !!cls);
      if (!any || !cls) return;
      var out = ctx.createImageData(CW, CW), o = out.data, s = src.data, n = CW * CW;
      for (var p = 0; p < n; p++) {
        var c = cls[p];
        if (c && selB[c - 1]) {
          var q = p * 4;
          o[q] = s[q]; o[q + 1] = s[q + 1]; o[q + 2] = s[q + 2];
          o[q + 3] = Math.min(255, s[q + 3] * 1.9 + 25);
        }
      }
      ctx.putImageData(out, 0, 0);
    }
    function render() {
      box.querySelectorAll('.fl-an').forEach(function (r) {
        var on = (+r.getAttribute('data-a')) === selA;
        r.classList.toggle('is-sel', on);
        r.classList.toggle('is-dim', selA >= 0 && !on);
        r.querySelector('.fl-an__hd').setAttribute('aria-expanded', on ? 'true' : 'false');
      });
      box.querySelectorAll('.fl-bio').forEach(function (b) {
        var on = !!selB[+b.getAttribute('data-b')];
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      info.innerHTML = selA >= 0 ? '<b>' + G.an[selA] + '</b>' + detail(ANIMALS[selA]) : '';
      box.classList.toggle('has-sel', selA >= 0);
    }
    function apply() {
      render();
      if (selB.indexOf(1) < 0) { root.classList.remove('is-hab-filter'); ensureLayer(false); return; }
      ensureLayer(true);
      prepare(paint);
    }
    box.addEventListener('click', function (e) {
      var hd = e.target.closest('.fl-an__hd');
      if (hd) {
        var ai = +hd.parentNode.getAttribute('data-a');
        if (selA === ai) { selA = -1; selB = [0, 0, 0, 0]; } else { selA = ai; selB = ANIMALS[ai].b.slice(); }
        apply();
        return;
      }
      var bi = e.target.closest('.fl-bio');
      if (bi) {
        var i = +bi.getAttribute('data-b');
        selA = -1;
        selB[i] = selB[i] ? 0 : 1;
        apply();
      }
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
      '<label class="fl-island__tg"><input type="checkbox" data-l="habitats">' + T.hab + '</label>' +
      '<label class="fl-island__tg"><input type="checkbox" data-l="mutants">' + T.mut + '</label>' +
      (root.getAttribute('data-poi') ? '<label class="fl-island__tg"><input type="checkbox" data-l="poi">' + T.poi + '</label>' : '') +
      (root.getAttribute('data-bunkers') ? '<label class="fl-island__tg"><input type="checkbox" data-l="bunkers">' + T.bk + '</label>' : '') + '</div>' +
      '<div class="fl-island__body">' +
      '<div class="fl-map fl-island__map"><div class="fl-map__stage">' +
      '<img class="fl-island__base" alt="' + T.sat + '" draggable="false" src="' + preview + '">' +
      '<img class="fl-island__ov" data-l="habitats" alt="" draggable="false" src="' + root.getAttribute('data-habitats') + '">' +
      '<img class="fl-island__ov" data-l="mutants" alt="" draggable="false" src="' + root.getAttribute('data-mutants') + '">' +
      '</div></div>' +
      '<aside class="fl-island__side">' +
      '<div class="fl-leg"></div>' +
      '<div class="fl-island__mut" data-l="mutants"><b>' + T.mut + '</b><ul>' + mutRows + '</ul></div>' +
      (root.getAttribute('data-bunkers') ? '<div class="fl-island__mut" data-l="bunkers"><b>' + T.bk + '</b><p class="fl-island__note">' + T.bkNote + '</p></div>' : '') +
      '<div class="fl-island__mut fl-island__poi" data-l="poi" hidden><b>' + T.poi + '</b><ul></ul><p>' + T.approx + '</p></div>' +
      '</aside></div>';
    // every layer starts switched off
    root.querySelectorAll('input[data-l]').forEach(function (c) {
      root.querySelectorAll('[data-l="' + c.getAttribute('data-l') + '"]').forEach(function (el) { if (el !== c) el.classList.toggle('is-off', !c.checked); });
    });

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
    zoomer(box, stage, root, loadFull, root.querySelector(".fl-island__bar"));
    initLegend(root, stage, legend);

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
