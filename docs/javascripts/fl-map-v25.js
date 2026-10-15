(function () {
  var L = {
    en: { zin: 'Zoom in', zout: 'Zoom out', reset: 'Reset view', full: 'Full screen', fail: 'The map could not be loaded.', open: 'Open the image',
      sat: 'Satellite map of the island', guide: 'Wildlife guide', title: 'Island map', info: 'How it works', tip: [
        ['Wildlife habitats', 'the four biomes: Mediterranean, meadow, forest and mountain. Zones are approximate and no exact spawn point is implied.'],
        ['Mutant sightings', 'areas, not exact spots. Positions are accurate to about one sector.'],
        ['Places of interest', 'numbered markers; hover or tap a name in the list to light it up on the map. Dashed marker: approximate position. No marker: only the sector is known.'],
        ['Bunkers', 'one per sector, positions from the community wiki scum.wiki.gg (accurate to about one percent of the map).'],
        ['Sectors', 'from 4 to 0 left to right and from D to Z top to bottom.'],
        ['Zoom', 'buttons, Ctrl + scroll or two fingers. Double-click to zoom in, drag to move.']], hab: 'Wildlife habitats', mut: 'Mutant sightings', openLegend: 'Open the legend as an image', poi: 'Places of interest', bk: 'Bunkers', bk1: 'Bunker', bkNote: 'One bunker per sector.', approx: 'Dashed marker: approximate position. No marker: only the sector is known; hover or tap the name to light it up.',
      sp: { bear: 'Bear', deer: 'Deer', wolf: 'Wolf', boar: 'Boar' } },
    fr: { zin: 'Zoom avant', zout: 'Zoom arrière', reset: 'Réinitialiser la vue', full: 'Plein écran', fail: 'La carte n’a pas pu être chargée.', open: 'Ouvrir l’image',
      sat: 'Carte satellite de l’île', guide: 'Guide de la faune', title: 'Carte de l’île', info: 'Fonctionnement', tip: [
        ['Habitats de la faune', 'les quatre biomes : méditerranéen, prairie, forêt et montagne. Zones approximatives, aucun point d’apparition exact n’est revendiqué.'],
        ['Mutants repérés', 'des zones, pas des points exacts : positions justes à environ un secteur près.'],
        ['Lieux d’intérêt', 'repères numérotés ; survolez ou touchez un nom de la liste pour l’illuminer sur la carte. Repère hachuré : position approximative. Sans repère : seul le secteur est connu.'],
        ['Bunkers', 'un par secteur, positions issues du wiki communautaire scum.wiki.gg (précises à environ un pour cent de la carte).'],
        ['Secteurs', 'de 4 à 0 de gauche à droite et de D à Z de haut en bas.'],
        ['Zoom', 'boutons, Ctrl + molette ou deux doigts. Double-clic pour zoomer, glissez pour déplacer.']], hab: 'Habitats de la faune', mut: 'Mutants repérés', openLegend: 'Ouvrir la légende en image', poi: 'Lieux d’intérêt', bk: 'Bunkers', bk1: 'Bunker', bkNote: 'Un bunker par secteur.', approx: 'Repère hachuré : position approximative. Sans repère : seul le secteur est connu ; survolez ou touchez le nom pour l’illuminer.',
      sp: { bear: 'Ours', deer: 'Cerf', wolf: 'Loup', boar: 'Sanglier' } },
    de: { zin: 'Vergrößern', zout: 'Verkleinern', reset: 'Ansicht zurücksetzen', full: 'Vollbild', fail: 'Die Karte konnte nicht geladen werden.', open: 'Bild öffnen',
      sat: 'Satellitenkarte der Insel', guide: 'Tierführer', title: 'Inselkarte', info: 'So funktioniert es', tip: [
        ['Lebensräume der Tiere', 'die vier Biome: Mediterran, Wiese, Wald und Gebirge. Die Zonen sind ungefähr, genaue Spawnpunkte sind nicht gemeint.'],
        ['Mutanten-Sichtungen', 'Gebiete, keine genauen Punkte: auf etwa einen Sektor genau.'],
        ['Interessante Orte', 'nummerierte Markierungen; einen Namen in der Liste überfahren oder antippen, um ihn auf der Karte hervorzuheben. Gestrichelte Markierung: ungefähre Position. Ohne Markierung: nur der Sektor ist bekannt.'],
        ['Bunker', 'einer pro Sektor, Positionen aus dem Community-Wiki scum.wiki.gg (auf etwa ein Prozent der Karte genau).'],
        ['Sektoren', 'von links nach rechts von 4 bis 0 und von oben nach unten von D bis Z.'],
        ['Zoom', 'Schaltflächen, Strg + Mausrad oder zwei Finger. Doppelklick zum Vergrößern, ziehen zum Verschieben.']], hab: 'Lebensräume der Tiere', mut: 'Mutanten-Sichtungen', openLegend: 'Legende als Bild öffnen', poi: 'Interessante Orte', bk: 'Bunker', bk1: 'Bunker', bkNote: 'Ein Bunker pro Sektor.', approx: 'Gestrichelte Markierung: ungefähre Position. Ohne Markierung: nur der Sektor ist bekannt; Namen überfahren oder antippen, um ihn hervorzuheben.',
      sp: { bear: 'Bär', deer: 'Hirsch', wolf: 'Wolf', boar: 'Wildschwein' } },
    es: { zin: 'Acercar', zout: 'Alejar', reset: 'Restablecer la vista', full: 'Pantalla completa', fail: 'No se pudo cargar el mapa.', open: 'Abrir la imagen',
      sat: 'Mapa satelital de la isla', guide: 'Guía de fauna', title: 'Mapa de la isla', info: 'Cómo funciona', tip: [
        ['Hábitats de la fauna', 'los cuatro biomas: mediterráneo, pradera, bosque y montaña. Las zonas son aproximadas y no se indican puntos de aparición exactos.'],
        ['Mutantes avistados', 'zonas, no puntos exactos: las posiciones tienen un margen de un sector.'],
        ['Lugares de interés', 'marcadores numerados; pase el cursor o toque un nombre de la lista para iluminarlo en el mapa. Marcador discontinuo: posición aproximada. Sin marcador: solo se conoce el sector.'],
        ['Búnkeres', 'uno por sector, posiciones del wiki de la comunidad scum.wiki.gg (precisión de aproximadamente uno por ciento del mapa).'],
        ['Sectores', 'de 4 a 0 de izquierda a derecha y de D a Z de arriba abajo.'],
        ['Zoom', 'botones, Ctrl + rueda o dos dedos. Doble clic para acercar, arrastre para mover.']], hab: 'Hábitats de la fauna', mut: 'Mutantes avistados', openLegend: 'Abrir la leyenda como imagen', poi: 'Lugares de interés', bk: 'Búnkeres', bk1: 'Búnker', bkNote: 'Un búnker por sector.', approx: 'Marcador discontinuo: posición aproximada. Sin marcador: solo se conoce el sector; pase el cursor o toque el nombre para iluminarlo.',
      sp: { bear: 'Oso', deer: 'Ciervo', wolf: 'Lobo', boar: 'Jabalí' } },
    it: { zin: 'Ingrandisci', zout: 'Riduci', reset: 'Reimposta la vista', full: 'Schermo intero', fail: 'Impossibile caricare la mappa.', open: 'Apri l’immagine',
      sat: 'Mappa satellitare dell’isola', guide: 'Guida alla fauna', title: 'Mappa dell’isola', info: 'Come funziona', tip: [
        ['Habitat della fauna', 'i quattro biomi: mediterraneo, prateria, foresta e montagna. Le zone sono approssimative e non si indicano punti di comparsa esatti.'],
        ['Mutanti avvistati', 'aree, non punti esatti: posizioni precise entro circa un settore.'],
        ['Luoghi di interesse', 'segnaposto numerati; passa sopra o tocca un nome dell’elenco per evidenziarlo sulla mappa. Segnaposto tratteggiato: posizione approssimativa. Senza segnaposto: si conosce solo il settore.'],
        ['Bunker', 'uno per settore, posizioni dal wiki della comunità scum.wiki.gg (precise entro circa l’uno per cento della mappa).'],
        ['Settori', 'da 4 a 0 da sinistra a destra e da D a Z dall’alto in basso.'],
        ['Zoom', 'pulsanti, Ctrl + rotella o due dita. Doppio clic per ingrandire, trascina per spostare.']], hab: 'Habitat della fauna', mut: 'Mutanti avvistati', openLegend: 'Apri la legenda come immagine', poi: 'Luoghi di interesse', bk: 'Bunker', bk1: 'Bunker', bkNote: 'Un bunker per settore.', approx: 'Segnaposto tratteggiato: posizione approssimativa. Senza segnaposto: si conosce solo il settore; passa sopra il nome o toccalo per evidenziarlo.',
      sp: { bear: 'Orso', deer: 'Cervo', wolf: 'Lupo', boar: 'Cinghiale' } },
    uk: { zin: 'Збільшити', zout: 'Зменшити', reset: 'Скинути вигляд', full: 'На весь екран', fail: 'Не вдалося завантажити карту.', open: 'Відкрити зображення',
      sat: 'Супутникова карта острова', guide: 'Довідник фауни', title: 'Карта острова', info: 'Як це працює', tip: [
        ['Середовища фауни', 'чотири біоми: середземноморський, луг, ліс і гори. Зони приблизні, точні місця появи не вказано.'],
        ['Мутанти на карті', 'зони, а не точні точки: позиції точні приблизно до одного сектора.'],
        ['Цікаві місця', 'пронумеровані маркери; наведіть курсор або торкніться назви у списку, щоб підсвітити її на карті. Пунктирний маркер: приблизна позиція. Без маркера: відомий лише сектор.'],
        ['Бункери', 'по одному на сектор, позиції з вікі спільноти scum.wiki.gg (точність приблизно один відсоток карти).'],
        ['Сектори', 'від 4 до 0 зліва направо та від D до Z зверху вниз.'],
        ['Масштаб', 'кнопки, Ctrl + коліщатко або два пальці. Подвійний клік — збільшити, перетягніть, щоб зсунути.']], hab: 'Середовища фауни', mut: 'Мутанти на карті', openLegend: 'Відкрити легенду як зображення', poi: 'Цікаві місця', bk: 'Бункери', bk1: 'Бункер', bkNote: 'Один бункер на сектор.', approx: 'Пунктирний маркер: приблизна позиція. Без маркера: відомий лише сектор; наведіть курсор або торкніться назви, щоб підсвітити його.',
      sp: { bear: 'Ведмідь', deer: 'Олень', wolf: 'Вовк', boar: 'Кабан' } },
    hr: { zin: 'Povećaj', zout: 'Smanji', reset: 'Vrati prikaz', full: 'Cijeli zaslon', fail: 'Karta se nije mogla učitati.', open: 'Otvori sliku',
      sat: 'Satelitska karta otoka', guide: 'Vodič kroz faunu', title: 'Karta otoka', info: 'Kako radi', tip: [
        ['Staništa faune', 'četiri bioma: mediteranski, livada, šuma i planina. Zone su približne i ne tvrdimo točna mjesta pojavljivanja.'],
        ['Uočeni mutanti', 'zone, a ne točne točke: položaji su točni otprilike do jednog sektora.'],
        ['Zanimljiva mjesta', 'numerirane oznake; zadrži pokazivač ili dodirni naziv na popisu da ga istakneš na karti. Iscrtkana oznaka: približan položaj. Bez oznake: poznat je samo sektor.'],
        ['Bunkeri', 'jedan po sektoru, položaji s wikija zajednice scum.wiki.gg (točni do otprilike jedan posto karte).'],
        ['Sektori', 'od 4 do 0 slijeva nadesno i od D do Z odozgo prema dolje.'],
        ['Zoom', 'gumbi, Ctrl + kotačić ili dva prsta. Dvoklik za povećanje, povuci za pomicanje.']], hab: 'Staništa faune', mut: 'Uočeni mutanti', openLegend: 'Otvori legendu kao sliku', poi: 'Zanimljiva mjesta', bk: 'Bunkeri', bk1: 'Bunker', bkNote: 'Jedan bunker po sektoru.', approx: 'Iscrtkana oznaka: približan položaj. Bez oznake: poznat je samo sektor; zadrži pokazivač ili dodirni naziv da ga istakneš.',
      sp: { bear: 'Medvjed', deer: 'Jelen', wolf: 'Vuk', boar: 'Divlja svinja' } },
    pl: { zin: 'Przybliż', zout: 'Oddal', reset: 'Resetuj widok', full: 'Pełny ekran', fail: 'Nie udało się wczytać mapy.', open: 'Otwórz obraz',
      sat: 'Satelitarna mapa wyspy', guide: 'Przewodnik po faunie', title: 'Mapa wyspy', info: 'Jak to działa', tip: [
        ['Siedliska fauny', 'cztery biomy: śródziemnomorski, łąka, las i góry. Strefy są przybliżone i nie podajemy dokładnych miejsc pojawiania się.'],
        ['Zauważone mutanty', 'strefy, a nie dokładne punkty: pozycje są trafne mniej więcej do jednego sektora.'],
        ['Ciekawe miejsca', 'ponumerowane znaczniki; najedź kursorem lub dotknij nazwy na liście, aby podświetlić ją na mapie. Znacznik przerywany: pozycja przybliżona. Brak znacznika: znany jest tylko sektor.'],
        ['Bunkry', 'jeden na sektor, pozycje z wiki społeczności scum.wiki.gg (dokładne do około jednego procenta mapy).'],
        ['Sektory', 'od 4 do 0 od lewej do prawej i od D do Z od góry do dołu.'],
        ['Zoom', 'przyciski, Ctrl + kółko lub dwa palce. Podwójne kliknięcie przybliża, przeciągnij, aby przesunąć.']], hab: 'Siedliska fauny', mut: 'Zauważone mutanty', openLegend: 'Otwórz legendę jako obraz', poi: 'Ciekawe miejsca', bk: 'Bunkry', bk1: 'Bunkier', bkNote: 'Jeden bunkier na sektor.', approx: 'Znacznik przerywany: pozycja przybliżona. Brak znacznika: znany jest tylko sektor; najedź kursorem lub dotknij nazwy, aby ją podświetlić.',
      sp: { bear: 'Niedźwiedź', deer: 'Jeleń', wolf: 'Wilk', boar: 'Dzik' } }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var T = L[lang] || L.en;

  // Thanks cards (bottom of the page) and the data licence line shown in the explanations
  var WIKI = '<a href="https://scum.wiki.gg/wiki/Map" target="_blank" rel="noopener">scum.wiki.gg</a>';
  var CCBY = '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>';
  var CR = {
    en: { head: 'Feel free to visit these sites too for even more information: their work is outstanding.', wiki: 'The community wiki: items, places, mechanics.', map: 'Interactive map with even more detail.',
      lic: 'Some information on this map comes from ' + WIKI + ' under the ' + CCBY + ' licence, adapted for our map.', own2: 'All other information comes from our own research, as some of our founding members are veterans of the franchise since “day 1”.', own: 'SCUM and its content belong to their respective owners.' },
    fr: { head: 'N’hésitez pas à consulter aussi ces sites pour encore plus d’infos, leur travail est exceptionnel.', wiki: 'Le wiki communautaire : objets, lieux, mécaniques.', map: 'Carte interactive avec encore plus de détails.',
      lic: 'Certaines informations de cette carte sont issues du site ' + WIKI + ' sous licence ' + CCBY + ', adaptées pour notre carte.', own2: 'Toutes les autres informations sont issues de nos propres recherches, car certains de nos membres fondateurs sont des vétérans de la franchise depuis “day 1”.', own: 'SCUM et son contenu appartiennent à leurs propriétaires respectifs.' },
    de: { head: 'Besuchen Sie gern auch diese Seiten für noch mehr Informationen: Ihre Arbeit ist hervorragend.', wiki: 'Das Community-Wiki: Gegenstände, Orte, Mechaniken.', map: 'Interaktive Karte mit noch mehr Details.',
      lic: 'Einige Informationen dieser Karte stammen von ' + WIKI + ' unter der Lizenz ' + CCBY + ' und wurden für unsere Karte angepasst.', own2: 'Alle anderen Informationen stammen aus unseren eigenen Recherchen, da einige unserer Gründungsmitglieder seit „Day 1“ Veteranen der Reihe sind.', own: 'SCUM und seine Inhalte gehören ihren jeweiligen Eigentümern.' },
    es: { head: 'No dudes en visitar también estos sitios para obtener aún más información: su trabajo es excepcional.', wiki: 'El wiki de la comunidad: objetos, lugares, mecánicas.', map: 'Mapa interactivo con aún más detalle.',
      lic: 'Parte de la información de este mapa procede de ' + WIKI + ' bajo la licencia ' + CCBY + ', adaptada para nuestro mapa.', own2: 'Toda la demás información procede de nuestras propias investigaciones, ya que algunos de nuestros miembros fundadores son veteranos de la franquicia desde el “día 1”.', own: 'SCUM y su contenido pertenecen a sus respectivos propietarios.' },
    it: { head: 'Visita anche questi siti per ancora più informazioni: il loro lavoro è eccezionale.', wiki: 'Il wiki della comunità: oggetti, luoghi, meccaniche.', map: 'Mappa interattiva con ancora più dettagli.',
      lic: 'Alcune informazioni di questa mappa provengono da ' + WIKI + ' con licenza ' + CCBY + ', adattate per la nostra mappa.', own2: 'Tutte le altre informazioni derivano dalle nostre ricerche, perché alcuni dei nostri membri fondatori sono veterani del franchise dal “day 1”.', own: 'SCUM e i suoi contenuti appartengono ai rispettivi proprietari.' },
    uk: { head: 'Завітайте також на ці сайти, щоб дізнатися ще більше: їхня робота чудова.', wiki: 'Вікі спільноти: предмети, місця, механіки.', map: 'Інтерактивна карта з ще більшою кількістю деталей.',
      lic: 'Частина інформації цієї мапи походить із ' + WIKI + ' за ліцензією ' + CCBY + ' і адаптована для нашої мапи.', own2: 'Уся інша інформація — результат наших власних досліджень, адже дехто з наших засновників — ветерани франшизи від «першого дня».', own: 'SCUM та його вміст належать їхнім власникам.' },
    hr: { head: 'Slobodno posjetite i ove stranice za još više informacija: njihov je rad izvanredan.', wiki: 'Wiki zajednice: predmeti, mjesta, mehanike.', map: 'Interaktivna karta s još više detalja.',
      lic: 'Neke informacije na ovoj karti potječu sa stranice ' + WIKI + ' pod licencom ' + CCBY + ', prilagođene za našu kartu.', own2: 'Sve ostale informacije plod su našeg vlastitog istraživanja, jer su neki od naših osnivača veterani serijala od „prvog dana“.', own: 'SCUM i njegov sadržaj pripadaju njihovim vlasnicima.' },
    pl: { head: 'Zajrzyj też na te strony po jeszcze więcej informacji: ich praca jest wybitna.', wiki: 'Wiki społeczności: przedmioty, miejsca, mechaniki.', map: 'Interaktywna mapa z jeszcze większą liczbą szczegółów.',
      lic: 'Niektóre informacje na tej mapie pochodzą ze strony ' + WIKI + ' na licencji ' + CCBY + ' i zostały dostosowane do naszej mapy.', own2: 'Wszystkie pozostałe informacje pochodzą z naszych własnych badań, ponieważ część naszych członków założycieli to weterani serii od „pierwszego dnia”.', own: 'SCUM i jego zawartość należą do ich właścicieli.' }
  };
  var C = CR[lang] || CR.en;

  // Wildlife legend: names, groups, biomes and presence labels
  var LG = {
    en: { an: ['Rabbit', 'Chicken', 'Horse', 'Donkey', 'Deer', 'Bear', 'Goat', 'Wolf', 'Boar'], grp: ['Non-hostile', 'Dangerous'],
      bio: ['Mediterranean', 'Meadow', 'Forest', 'Mountain'], pres: ['Urban areas', 'Villages', 'Day', 'Night'],
      hab: 'Habitats', when: 'Seen', hint: ['- Click an animal to show its info.', '- Click again to remove.'], hintT: ['- Tap an animal to show its info.', '- Tap again to remove.'], img: 'Open the legend as an image' },
    fr: { an: ['Lapin', 'Poule', 'Cheval', 'Âne', 'Cerf', 'Ours', 'Chèvre', 'Loup', 'Sanglier'], grp: ['Non hostiles', 'Dangereux'],
      bio: ['Méditerranéen', 'Prairie', 'Forêt', 'Montagne'], pres: ['Zones urbaines', 'Villages', 'Jour', 'Nuit'],
      hab: 'Habitats', when: 'Présence', hint: ["- Cliquer sur l'animal pour afficher les infos.", '- Cliquer à nouveau pour retirer.'], hintT: ["- Toucher l'animal pour afficher les infos.", '- Toucher à nouveau pour retirer.'], img: 'Ouvrir la légende en image' },
    de: { an: ['Kaninchen', 'Huhn', 'Pferd', 'Esel', 'Hirsch', 'Bär', 'Ziege', 'Wolf', 'Wildschwein'], grp: ['Friedlich', 'Gefährlich'],
      bio: ['Mittelmeer', 'Wiese', 'Wald', 'Gebirge'], pres: ['Städte', 'Dörfer', 'Tag', 'Nacht'],
      hab: 'Lebensräume', when: 'Vorkommen', hint: ['- Tier anklicken, um die Infos anzuzeigen.', '- Erneut anklicken zum Entfernen.'], hintT: ['- Tier antippen, um die Infos anzuzeigen.', '- Erneut antippen zum Entfernen.'], img: 'Legende als Bild öffnen' },
    es: { an: ['Conejo', 'Gallina', 'Caballo', 'Burro', 'Ciervo', 'Oso', 'Cabra', 'Lobo', 'Jabalí'], grp: ['No hostiles', 'Peligrosos'],
      bio: ['Mediterráneo', 'Pradera', 'Bosque', 'Montaña'], pres: ['Zonas urbanas', 'Pueblos', 'Día', 'Noche'],
      hab: 'Hábitats', when: 'Presencia', hint: ['- Haz clic en el animal para ver su info.', '- Haz clic de nuevo para quitarla.'], hintT: ['- Toca el animal para ver su info.', '- Toca de nuevo para quitarla.'], img: 'Abrir la leyenda como imagen' },
    it: { an: ['Coniglio', 'Gallina', 'Cavallo', 'Asino', 'Cervo', 'Orso', 'Capra', 'Lupo', 'Cinghiale'], grp: ['Non ostili', 'Pericolosi'],
      bio: ['Mediterraneo', 'Prateria', 'Foresta', 'Montagna'], pres: ['Aree urbane', 'Villaggi', 'Giorno', 'Notte'],
      hab: 'Habitat', when: 'Presenza', hint: ["- Clicca sull'animale per vedere le info.", '- Clicca di nuovo per rimuovere.'], hintT: ["- Tocca l'animale per vedere le info.", '- Tocca di nuovo per rimuovere.'], img: 'Apri la legenda come immagine' },
    uk: { an: ['Кролик', 'Курка', 'Кінь', 'Осел', 'Олень', 'Ведмідь', 'Коза', 'Вовк', 'Кабан'], grp: ['Не агресивні', 'Небезпечні'],
      bio: ['Середземномор’я', 'Луки', 'Ліс', 'Гори'], pres: ['Міста', 'Села', 'День', 'Ніч'],
      hab: 'Середовища', when: 'Поява', hint: ['- Натисніть на тварину, щоб побачити інформацію.', '- Натисніть ще раз, щоб прибрати.'], hintT: ['- Торкніться тварини, щоб побачити інформацію.', '- Торкніться ще раз, щоб прибрати.'], img: 'Відкрити легенду як зображення' },
    hr: { an: ['Zec', 'Kokoš', 'Konj', 'Magarac', 'Jelen', 'Medvjed', 'Koza', 'Vuk', 'Divlja svinja'], grp: ['Neagresivne', 'Opasne'],
      bio: ['Mediteran', 'Livada', 'Šuma', 'Planina'], pres: ['Urbana područja', 'Sela', 'Dan', 'Noć'],
      hab: 'Staništa', when: 'Viđeno', hint: ['- Klikni na životinju za prikaz informacija.', '- Klikni ponovno za uklanjanje.'], hintT: ['- Dodirni životinju za prikaz informacija.', '- Dodirni ponovno za uklanjanje.'], img: 'Otvori legendu kao sliku' },
    pl: { an: ['Królik', 'Kura', 'Koń', 'Osioł', 'Jeleń', 'Niedźwiedź', 'Koza', 'Wilk', 'Dzik'], grp: ['Nieagresywne', 'Niebezpieczne'],
      bio: ['Śródziemnomorski', 'Łąka', 'Las', 'Góry'], pres: ['Tereny miejskie', 'Wsie', 'Dzień', 'Noc'],
      hab: 'Siedliska', when: 'Występowanie', hint: ['- Kliknij zwierzę, aby zobaczyć informacje.', '- Kliknij ponownie, aby usunąć.'], hintT: ['- Dotknij zwierzę, aby zobaczyć informacje.', '- Dotknij ponownie, aby usunąć.'], img: 'Otwórz legendę jako obraz' }
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
  var I_MAPS = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 12c2.5 0 4.5 2 4.5 4.5 0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5M14 6.11 8 4v11.89l1 .35v.26c0 .64.09 1.26.26 1.84L8 17.9l-5.34 2.07-.16.03a.5.5 0 0 1-.5-.5V4.38c0-.23.15-.41.36-.48L8 2l6 2.1L19.34 2h.16a.5.5 0 0 1 .5.5v9.31A6.48 6.48 0 0 0 15.5 10c-.5 0-1 .06-1.5.17z"/></svg>';
  var I_BOOK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 5c-1.1-.35-2.3-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>';
  var I_PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';
  var I_OUT = '<svg class="fl-card__go" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>';
  var I_BK = '<svg class="fl-island__bi" viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21"/><path d="M12 5.5a5.6 5.6 0 0 0-3.8 9.7v2.3h7.6v-2.3A5.6 5.6 0 0 0 12 5.5z"/><circle cx="9.7" cy="11.3" r="1.5"/><circle cx="14.3" cy="11.3" r="1.5"/></svg>';
  var I_FULL = icon('M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z');

  // Pan and zoom on `box` (the clipping frame) moving `stage`; `fsEl` is the element sent to full screen.
  function zoomer(box, stage, fsEl, onZoom, host, onReset) {
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
      else if (a === 'reset') { s = 1; x = 0; y = 0; apply(); if (onReset) onReset(); }
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
      if (e.target.closest('.fl-map__ctl, .fl-island__cc')) return;
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
    // line icons: biomes (MED, PRA, FOR, MON) then presence (URB, VIL, DAY, NGT)
    var IC = [
      '<path d="M2.5 8.5c2.4 0 2.4-2 4.8-2s2.4 2 4.8 2 2.4-2 4.8-2 2.4 2 4.8 2M2.5 13.5c2.4 0 2.4-2 4.8-2s2.4 2 4.8 2 2.4-2 4.8-2 2.4 2 4.8 2M2.5 18.5c2.4 0 2.4-2 4.8-2s2.4 2 4.8 2 2.4-2 4.8-2 2.4 2 4.8 2"/>',
      '<path d="M4.5 21c0-6 1-10.500 3-14M12 21V4M19.500 21c0-6-1-10.500-3-14"/><path d="M2.500 21h19"/>',
      '<path d="M12 2.500 6.500 10.500h3L4.500 17h5.500v4.500h4V17h5.500l-5-6.500h3z" fill="currentColor" stroke="none"/>',
      '<path d="M1.500 20.500 9 7l4 7 3-4 7.500 10.500z" fill="currentColor" stroke="none"/>',
      '<path d="M4 21V9h6v12M10 21V3h10v18M13.500 7h3M13.500 11h3M13.500 15h3M7 13v0"/>',
      '<path d="M3 11.500 12 3.500l9 8M5.500 10v11h13V10M10 21v-6h4v6"/>',
      '<circle cx="12" cy="12" r="4"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M18.700 5.300l-2.100 2.100M7.400 16.600l-2.100 2.100"/>',
      '<path d="M20.500 14.500A8.500 8.500 0 0 1 9.500 3.500a8.500 8.500 0 1 0 11 11z" fill="currentColor" stroke="none"/>'
    ];
    function ico(i) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + IC[i] + '</svg>'; }
    var NAMES = G.bio.concat(G.pres);
    function marks(a) {
      var m = '';
      a.b.forEach(function (v, i) { m += '<span class="m b' + i + (v ? ' on' : '') + '" title="' + G.bio[i] + '">' + ico(i) + '</span>'; });
      a.p.forEach(function (v, i) { m += '<span class="m p' + (v ? ' on' : '') + '" title="' + G.pres[i] + '">' + ico(4 + i) + '</span>'; });
      return m;
    }
    function detail(a) {
      var hb = a.b.map(function (v, i) { return v ? '<span class="fl-chip b' + i + '">' + ico(i) + G.bio[i] + '</span>' : ''; }).join('');
      var pr = a.p.map(function (v, i) { return '<span class="fl-chip ' + (v ? 'is-yes' : 'is-no') + '">' + ico(4 + i) + G.pres[i] + '</span>'; }).join('');
      return '<div><small>' + G.hab + '</small>' + hb + '</div><div><small>' + G.when + '</small>' + pr + '</div>';
    }
    // top line: title, the four biome filters, usage hint; then one tile per animal, grouped; the info card closes the block
    var h = '<div class="fl-leg__top"><b class="fl-leg__t">' + T.guide + '</b><div class="fl-leg__bio">';
    sw.forEach(function (c, i) {
      h += '<button type="button" class="fl-bio b' + i + '" data-b="' + i + '" aria-pressed="false" title="' + G.bio[i] + '">' + ico(i) + '<span class="nm">' + G.bio[i] + '</span></button>';
    });
    h += '</div></div><div class="fl-leg__cols">';
    G.grp.forEach(function (gname, gi) {
      h += '<div class="fl-leg__g"><h5>' + gname + '</h5><div class="fl-leg__rows">';
      ANIMALS.forEach(function (a, ai) {
        if (a.g !== gi) return;
        var ext = a.k === 'donkey' ? 'svg' : 'png';
        h += '<div class="fl-an" data-a="' + ai + '"><button type="button" class="fl-an__hd" aria-expanded="false" title="' + G.an[ai] + '" aria-label="' + G.an[ai] + '">' +
          '<img src="' + base + a.k + '-v1.' + ext + '" alt="" width="40" height="40" draggable="false">' +
          '<span class="n">' + G.an[ai] + '</span><span class="d">' + marks(a) + '</span></button></div>';
      });
      h += '</div></div>';
    });
    h += '</div><div class="fl-leg__info" aria-live="polite"></div>';
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
      im.src = (root.getAttribute('data-habitats') || '').replace(/wildlife-habitats-overlay-v3.png/, 'wildlife-habitats-1024-v2.png');
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
    // unticking the layer hides the legend and clears the choice
    hab.addEventListener('change', function () {
      if (!hab.checked && (selA >= 0 || selB.indexOf(1) >= 0)) { selA = -1; selB = [0, 0, 0, 0]; apply(); }
    });
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
    var legend = (root.getAttribute('data-legend') || '').replace('{lang}', L[lang] && lang !== 'hr' && lang !== 'pl' ? lang : 'en');

    var habSw = HABITATS.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('');
    // legend rows show the same paw-print icons as the markers on the map
    var iconDir = (root.getAttribute('data-mutants') || '').replace(/[^\/]*$/, '') + 'animals/';
    var mutRows = Object.keys(SPECIES).map(function (k) {
      return '<span class="li"><img class="fl-island__mi" src="' + iconDir + 'mut-' + k + '-v1.png" alt="" width="32" height="32" draggable="false">' + T.sp[k] + '</span>';
    }).join('');
    // every explanation lives in the popup of the logo; usage hints and the data licence sit under their own layer
    function subs(cls, lines) { return lines.map(function (s) { return '<div class="s ' + cls + '">' + s.replace(/^- /, '') + '</div>'; }).join(''); }
    var tipRows = T.tip.map(function (r, i) {
      var more = i === 0 ? subs('c', G.hint) + subs('t', G.hintT) : '';
      return '<div class="l"><b>' + r[0] + '</b> ' + r[1] + more + '</div>';
    }).join('');
    function card(href, name, text, ico) {
      return '<a class="fl-card" href="' + href + '" target="_blank" rel="noopener"><span class="fl-card__ico">' + ico + '</span>' +
        '<span class="fl-card__tx"><b>' + name + '</b><span>' + text + '</span></span>' + I_OUT + '</a>';
    }

    // one bar: the logo (its explanations open on hover) and the layer toggles; legends sit in a strip under it, the map takes the full width
    // licence badge: a sharp vector, fixed in the corner of the frame, whatever the zoom or the layer
    var ccDeed = 'https://creativecommons.org/licenses/by-nc-sa/4.0/' + (lang !== 'en' ? 'deed.' + lang : '');
    var ccImg = base.replace(/maps\/[^?]*/, 'cc-by-nc-sa-v1.svg');
    var ccHtml = '<a class="fl-island__cc" href="' + ccDeed + '" target="_blank" rel="license noopener" aria-label="CC BY-NC-SA 4.0"><img src="' + ccImg + '" alt="CC BY-NC-SA 4.0" width="88" height="31" draggable="false"></a>';
    root.innerHTML =
      '<div class="fl-island__bar">' +
      '<div class="fl-island__ttl"><button type="button" class="fl-island__lg" aria-expanded="false" aria-label="' + T.info + '" title="">' + I_MAPS + '</button>' +
      '<div class="fl-island__tip" role="tooltip">' + tipRows + '<div class="fl-island__src"><span>' + C.lic + '</span><span>' + C.own2 + '</span></div></div></div>' +
      '<div class="fl-island__tgs">' +
      '<label class="fl-island__tg"><input type="checkbox" data-l="habitats">' + T.hab + '</label>' +
      '<label class="fl-island__tg"><input type="checkbox" data-l="mutants">' + T.mut + '</label>' +
      (root.getAttribute('data-poi') ? '<label class="fl-island__tg"><input type="checkbox" data-l="poi">' + T.poi + '</label>' : '') +
      (root.getAttribute('data-bunkers') ? '<label class="fl-island__tg"><input type="checkbox" data-l="bunkers">' + T.bk + '</label>' : '') + '</div></div>' +
      '<div class="fl-island__strip">' +
      '<div class="fl-leg" data-l="habitats"></div>' +
      '<div class="fl-island__mut" data-l="mutants"><b>' + T.mut + '</b><div class="lst">' + mutRows + '</div></div>' +
      (root.getAttribute('data-bunkers') ? '<div class="fl-island__mut" data-l="bunkers"><b>' + T.bk + '</b><div class="lst"><span class="li">' + I_BK + T.bk1 + '</span></div></div>' : '') +
      '<div class="fl-island__mut fl-island__poi" data-l="poi" hidden><b>' + T.poi + '</b><div class="lst"></div></div>' +
      '</div>' +
      '<div class="fl-island__body">' +
      '<div class="fl-island__rail"></div>' +
      '<div class="fl-map fl-island__map"><div class="fl-map__stage">' +
      '<img class="fl-island__base" alt="' + T.sat + '" draggable="false" src="' + preview + '">' +
      '<img class="fl-island__ov" data-l="habitats" alt="" draggable="false" src="' + root.getAttribute('data-habitats') + '">' +
      '<img class="fl-island__ov" data-l="mutants" alt="" draggable="false" src="' + root.getAttribute('data-mutants') + '">' +
      '</div>' + ccHtml + '</div></div>' +
      '<div class="fl-island__foot"><span class="fl-island__thx">' + C.head + '</span>' +
      card('https://scum.wiki.gg/', 'scum.wiki.gg', C.wiki, I_BOOK) +
      card('https://scum-map.com/en', 'scum-map.com', C.map, I_PIN) +
      '</div>';

    // the explanations stay open while the pointer is on the title or on them; a click pins them (touch screens)
    var ttl = root.querySelector('.fl-island__ttl'), ib = ttl.querySelector('.fl-island__lg');
    function tipOpen(on) { ttl.classList.toggle('is-open', on); ib.setAttribute('aria-expanded', on ? 'true' : 'false'); }
    ttl.addEventListener('click', function (e) {
      if (e.target.closest('.fl-island__tip')) return;
      e.stopPropagation();
      tipOpen(!ttl.classList.contains('is-open'));
    });
    document.addEventListener('click', function (e) { if (!ttl.contains(e.target)) tipOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') tipOpen(false); });
    // the legend strip only shows while at least one layer is on
    function syncStrip() {
      var any = false;
      root.querySelectorAll('input[data-l]').forEach(function (c) { if (c.checked) any = true; });
      root.classList.toggle('has-strip', any);
    }
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
    // the reset button also switches every layer off and clears the animal / biome choice and the pinned place
    var poiReset = null;
    function resetAll() {
      root.querySelectorAll('input[data-l]').forEach(function (c) {
        if (c.checked) { c.checked = false; c.dispatchEvent(new Event('change')); }
      });
      if (poiReset) poiReset();
      var pl = root.querySelector('.fl-island__poi .lst'); if (pl) pl.scrollTop = 0;
      tipOpen(false);
    }
    zoomer(box, stage, root, loadFull, root.querySelector('.fl-island__rail'), resetAll);
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
        var list = poiBox.querySelector('.lst');
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
          var li = document.createElement('div');
          li.className = 'li';
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
            li.className = 'li is-sector';
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
        poiReset = function () { pinned = null; showSectors(null); };
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
        syncStrip();
      });
    });
    syncStrip();
  }

  document.querySelectorAll('.fl-map[data-src]').forEach(initSvg);
  document.querySelectorAll('.fl-island[data-base]').forEach(initIsland);
})();
