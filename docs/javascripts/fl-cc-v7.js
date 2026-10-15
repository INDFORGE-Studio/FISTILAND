(function () {
  // Site-wide licence badge (top right of the tabs bar, footer on narrow screens), with the legal notice as a tooltip.
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
  };
  var OWN = {
    en: 'SCUM and its content belong to their respective owners.',
    fr: 'SCUM et son contenu appartiennent à leurs propriétaires respectifs.',
    de: 'SCUM und seine Inhalte gehören ihren jeweiligen Eigentümern.',
    es: 'SCUM y su contenido pertenecen a sus respectivos propietarios.',
    it: 'SCUM e i suoi contenuti appartengono ai rispettivi proprietari.',
    uk: 'SCUM та його вміст належать їхнім власникам.',
    hr: 'SCUM i njegov sadržaj pripadaju njihovim vlasnicima.'
  };
  var LEG = {
    en: 'Legal notice & licence', fr: 'Mentions légales et licence', de: 'Impressum & Lizenz',
    es: 'Aviso legal y licencia', it: 'Note legali e licenza', uk: 'Правова інформація та ліцензія', hr: 'Pravne informacije i licenca'
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

    // centre of the footer: the ownership notice, with the badge above it when the badge sits there
    function foot(meta) {
      var f = meta.querySelector('.fl-foot-c');
      if (!f) {
        f = document.createElement('div');
        f.className = 'fl-foot-c';
        var n = document.createElement('p');
        var l = document.createElement('a');
        l.href = 'https://scumgame.com/index.php/legal/terms-conditions/'; l.target = '_blank'; l.rel = 'noopener';
        l.textContent = OWN[lang] || OWN.en;
        n.appendChild(l);
        f.appendChild(n);
        var m = document.createElement('p');
        var k = document.createElement('a');
        k.href = (location.pathname.match(/^(.*?\/FISTILAND\/)/) || ['', '/'])[1] + (T[lang] && lang !== 'en' ? lang + '/' : '') + 'legal/';
        k.textContent = LEG[lang] || LEG.en;
        m.appendChild(k);
        f.appendChild(m);
        meta.appendChild(f);
      }
      return f;
    }

    // wide screens: top right of the tabs bar; narrow screens (no tabs): footer, or bottom of the home page
    function place() {
      var tabs = document.querySelector('.md-tabs');
      var meta = document.querySelector('.md-footer-meta__inner');
      if (meta) foot(meta);
      w.classList.remove('is-home', 'in-tabs');
      w.style.right = '';
      if (tabs && tabs.offsetParent !== null) {
        w.classList.add('in-tabs'); tabs.appendChild(w);
        // right edge aligned with the end of the search box above
        var s = document.querySelector('.md-search');
        var off = s && s.offsetParent !== null ? tabs.getBoundingClientRect().right - s.getBoundingClientRect().right : 0;
        w.style.right = (off > 0 ? off : 13) + 'px';
      }
      else if (meta && meta.offsetParent !== null) foot(meta).insertBefore(w, foot(meta).firstChild);
      else { w.classList.add('is-home'); (document.querySelector('.md-main') || document.body).appendChild(w); }
    }
    place();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(place, 150); });
  }
  build();
})();
