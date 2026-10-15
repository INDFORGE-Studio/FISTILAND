(function () {
  // Site-wide licence badge (top right of the tabs bar, footer on narrow screens) with the legal notice as a tooltip, plus the legal page link (scales icon).
  var T = {
    en: { h: 'Licence CC BY-NC-SA 4.0', go: 'Click for the full licence text.',
      t: 'Unless stated otherwise, all original content of this website (texts, maps, images and layouts) is © FISTILAND and licensed under Creative Commons BY-NC-SA 4.0. Any sharing or reuse, including screenshots and visuals, requires clear credit: “FISTILAND”, a link to this website and to the licence, and an indication of any changes made. Non-commercial use only; adaptations must carry the same licence. No endorsement by FISTILAND may be implied. SCUM, its names and its game assets belong to their respective owners and are not covered by this licence.' },
    fr: { h: 'Licence CC BY-NC-SA 4.0', go: 'Cliquez pour le texte complet de la licence.',
      t: 'Sauf mention contraire, tout le contenu original de ce site (textes, cartes, images, mises en page) est © FISTILAND et placé sous licence Creative Commons BY-NC-SA 4.0. Tout partage ou toute réutilisation, y compris des captures d’écran et visuels, impose de citer clairement la source : « FISTILAND », un lien vers ce site et vers la licence, et l’indication des modifications effectuées. Usage non commercial uniquement ; toute adaptation doit être diffusée sous la même licence. Aucun soutien de FISTILAND ne doit être suggéré. SCUM, ses noms et ses éléments de jeu appartiennent à leurs propriétaires respectifs et ne sont pas couverts par cette licence.' },
    de: { h: 'Lizenz CC BY-NC-SA 4.0', go: 'Klicken für den vollständigen Lizenztext.',
      t: 'Sofern nicht anders angegeben, sind alle Originalinhalte dieser Website (Texte, Karten, Bilder und Layouts) © FISTILAND und stehen unter der Creative-Commons-Lizenz BY-NC-SA 4.0. Jede Weitergabe oder Wiederverwendung, auch von Screenshots und Grafiken, setzt eine klare Namensnennung voraus: „FISTILAND“, ein Link zu dieser Website und zur Lizenz sowie ein Hinweis auf vorgenommene Änderungen. Nur nicht-kommerzielle Nutzung; Bearbeitungen müssen unter derselben Lizenz stehen. Eine Billigung durch FISTILAND darf nicht suggeriert werden. SCUM, seine Namen und seine Spielinhalte gehören ihren jeweiligen Eigentümern und sind von dieser Lizenz nicht erfasst.' },
    es: { h: 'Licencia CC BY-NC-SA 4.0', go: 'Haz clic para ver el texto completo de la licencia.',
      t: 'Salvo indicación en contrario, todo el contenido original de este sitio (textos, mapas, imágenes y diseños) es © FISTILAND y está bajo licencia Creative Commons BY-NC-SA 4.0. Cualquier uso compartido o reutilización, incluidas capturas de pantalla e imágenes, exige citar claramente la fuente: «FISTILAND», un enlace a este sitio y a la licencia, y la indicación de los cambios realizados. Solo uso no comercial; las adaptaciones deben llevar la misma licencia. No debe sugerirse ningún respaldo de FISTILAND. SCUM, sus nombres y sus elementos de juego pertenecen a sus respectivos propietarios y no están cubiertos por esta licencia.' },
    it: { h: 'Licenza CC BY-NC-SA 4.0', go: 'Clicca per il testo completo della licenza.',
      t: 'Salvo diversa indicazione, tutti i contenuti originali di questo sito (testi, mappe, immagini e layout) sono © FISTILAND e distribuiti con licenza Creative Commons BY-NC-SA 4.0. Qualsiasi condivisione o riutilizzo, compresi screenshot e immagini, richiede un’attribuzione chiara: «FISTILAND», un link a questo sito e alla licenza e l’indicazione delle modifiche effettuate. Solo uso non commerciale; gli adattamenti devono avere la stessa licenza. Non deve essere suggerito alcun avallo da parte di FISTILAND. SCUM, i suoi nomi e i suoi elementi di gioco appartengono ai rispettivi proprietari e non sono coperti da questa licenza.' },
    uk: { h: 'Ліцензія CC BY-NC-SA 4.0', go: 'Натисніть, щоб побачити повний текст ліцензії.',
      t: 'Якщо не вказано інше, увесь оригінальний вміст цього сайту (тексти, мапи, зображення та макети) є © FISTILAND і поширюється за ліцензією Creative Commons BY-NC-SA 4.0. Будь-яке поширення чи повторне використання, зокрема знімків екрана й візуальних матеріалів, вимагає чіткого зазначення авторства: «FISTILAND», посилання на цей сайт і на ліцензію та вказівка на внесені зміни. Лише некомерційне використання; адаптації мають поширюватися за тією ж ліцензією. Не можна натякати на схвалення з боку FISTILAND. SCUM, його назви та ігрові матеріали належать відповідним власникам і не охоплюються цією ліцензією.' }
    ,hr: { h: 'Licenca CC BY-NC-SA 4.0', go: 'Kliknite za puni tekst licence.',
      t: 'Osim ako je drukčije navedeno, sav izvorni sadržaj ove web stranice (tekstovi, karte, slike i rasporedi) je © FISTILAND i licenciran je pod licencom Creative Commons BY-NC-SA 4.0. Svako dijeljenje ili ponovno korištenje, uključujući snimke zaslona i vizuale, zahtijeva jasno navođenje izvora: „FISTILAND“, poveznicu na ovu web stranicu i na licencu te naznaku svih učinjenih izmjena. Samo nekomercijalna uporaba; prilagodbe moraju nositi istu licencu. Ne smije se sugerirati da FISTILAND podržava korisnika. SCUM, njegovi nazivi i elementi igre pripadaju svojim vlasnicima i nisu obuhvaćeni ovom licencom.' }
    ,pl: { h: 'Licencja CC BY-NC-SA 4.0', go: 'Kliknij, aby zobaczyć pełny tekst licencji.',
      t: 'O ile nie zaznaczono inaczej, cała oryginalna zawartość tej strony (teksty, mapy, obrazy i układy) jest © FISTILAND i objęta licencją Creative Commons BY-NC-SA 4.0. Każde udostępnienie lub ponowne wykorzystanie, w tym zrzutów ekranu i grafik, wymaga wyraźnego wskazania źródła: „FISTILAND”, odnośnika do tej strony i do licencji oraz informacji o wprowadzonych zmianach. Wyłącznie użytek niekomercyjny; adaptacje muszą być objęte tą samą licencją. Nie wolno sugerować poparcia ze strony FISTILAND. SCUM, jego nazwy i elementy gry należą do ich właścicieli i nie są objęte tą licencją.' }
  };
  var LEG = {
    en: 'Legal notice & licence', fr: 'Mentions légales et licence', de: 'Impressum & Lizenz',
    es: 'Aviso legal y licencia', it: 'Note legali e licenza', uk: 'Правова інформація та ліцензія', hr: 'Pravne informacije i licenca', pl: 'Informacje prawne i licencja'
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var L = T[lang] || T.en;
  var deed = 'https://creativecommons.org/licenses/by-nc-sa/4.0/' + (T[lang] && lang !== 'en' ? 'deed.' + lang : '');
  var img = (location.pathname.match(/^(.*?\/FISTILAND\/)/) || ['', '/'])[1] + 'assets/cc-by-nc-sa-v1.svg';

  function build() {
    if (document.querySelector('.fl-cc-site')) return;
    var w = document.createElement('div');
    w.className = 'fl-cc-site';
    var a = document.createElement('a');
    a.href = deed; a.target = '_blank'; a.rel = 'license noopener';
    a.setAttribute('aria-label', L.h);
    a.innerHTML = '<img src="' + img + '" alt="CC BY-NC-SA 4.0" width="88" height="31" draggable="false">';
    var tip = document.createElement('div');
    tip.className = 'fl-cc-tip';
    tip.setAttribute('role', 'tooltip');
    var b = document.createElement('b'); b.textContent = L.h;
    var p = document.createElement('p'); p.textContent = L.t;
    var g = document.createElement('span'); g.textContent = L.go;
    tip.appendChild(b); tip.appendChild(p); tip.appendChild(g);
    w.appendChild(a); w.appendChild(tip);

    // touch screens have no hover: the first tap shows the notice, the second follows the link
    a.addEventListener('click', function (e) {
      if (window.matchMedia && window.matchMedia('(hover: none)').matches && !w.classList.contains('is-open')) {
        e.preventDefault();
        w.classList.add('is-open');
      }
    });
    document.addEventListener('click', function (e) { if (!w.contains(e.target)) w.classList.remove('is-open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') w.classList.remove('is-open'); });

    // legal page link: scales icon, centre of the footer (home page has no footer: next to the badge instead)
    var base = (location.pathname.match(/^(.*?\/FISTILAND\/)/) || ['', '/'])[1];
    function legalLink() {
      var k = document.createElement('a');
      k.className = 'fl-legal-ico';
      k.href = base + (T[lang] && lang !== 'en' ? lang + '/' : '') + 'legal/';
      k.title = LEG[lang] || LEG.en;
      k.setAttribute('aria-label', LEG[lang] || LEG.en);
      k.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12,3C10.73,3 9.6,3.8 9.18,5H3V7H4.95L2,14C1.53,16 3,17 5.5,17C8,17 9.56,16 9,14L6.05,7H9.17C9.5,7.85 10.15,8.5 11,8.83V20H2V22H22V20H13V8.82C13.85,8.5 14.5,7.85 14.82,7H17.95L15,14C14.53,16 16,17 18.5,17C21,17 22.56,16 22,14L19.05,7H21V5H14.83C14.4,3.8 13.27,3 12,3M12,5A1,1 0 0,1 13,6A1,1 0 0,1 12,7A1,1 0 0,1 11,6A1,1 0 0,1 12,5M5.5,10.25L7,14H4L5.5,10.25M18.5,10.25L20,14H17L18.5,10.25Z"/></svg>';
      return k;
    }
    var home = document.querySelector('.fl-home') ? legalLink() : null;
    function foot(meta) {
      var f = meta.querySelector('.fl-foot-c');
      if (!f) {
        f = document.createElement('div');
        f.className = 'fl-foot-c';
        f.appendChild(legalLink());
        meta.appendChild(f);
      }
      return f;
    }

    // wide screens: top right of the tabs bar; narrow screens (no tabs): footer, or bottom of the home page
    function place() {
      var tabs = document.querySelector('.md-tabs');
      var meta = document.querySelector('.md-footer-meta__inner');
      if (meta) foot(meta);
      if (home) { home.classList.remove('is-home', 'in-tabs'); home.style.right = ''; }
      w.classList.remove('is-home', 'in-tabs');
      w.style.right = '';
      if (tabs && tabs.offsetParent !== null) {
        w.classList.add('in-tabs'); tabs.appendChild(w);
        // right edge aligned with the end of the search box above
        var s = document.querySelector('.md-search');
        var off = s && s.offsetParent !== null ? tabs.getBoundingClientRect().right - s.getBoundingClientRect().right : 0;
        w.style.right = (off > 0 ? off : 13) + 'px';
        if (home) { home.classList.add('in-tabs'); tabs.appendChild(home); home.style.right = ((off > 0 ? off : 13) + 100) + 'px'; }
      }
      else if (meta && meta.offsetParent !== null) foot(meta).insertBefore(w, foot(meta).firstChild);
      else {
        w.classList.add('is-home'); (document.querySelector('.md-main') || document.body).appendChild(w);
        if (home) { home.classList.add('is-home'); (document.querySelector('.md-main') || document.body).appendChild(home); }
      }
    }
    place();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(place, 150); });
  }
  build();
})();
