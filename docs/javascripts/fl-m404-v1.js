(function () {
  'use strict';
  // INMATE 404 (MATRICULE 404 in French): a guided search assistant behind a prisoner tag in the header, next to the search.
  // Nothing is sent anywhere and nothing is stored: a small tree of topics written by hand, plus the search index of the
  // page language (the small per-language file built by tools/postbuild.py). Answers never quote a server value: they
  // point to the page that holds the current one. The secrets of the site stay secret.
  var head = document.querySelector('.md-header__inner');
  if (!head || typeof window.HTMLDialogElement !== 'function' || document.querySelector('.fl-m404-btn')) return;

  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var src = document.currentScript && document.currentScript.src;
  var SITE = src && /javascripts\/[^\/]*$/.test(src) ? src.replace(/javascripts\/[^\/]*$/, '') : location.origin + '/FISTILAND/';
  var LP = /^(es|fr|de|it|pl|uk|hr)$/.test(lang) ? lang + '/' : '';

  var T = {
    en: {
      name: 'INMATE 404', role: 'Missing inmate · wiki guide',
      hello: "I'm INMATE 404, the one nobody can find. I know where everything is hidden: how can I help you with your search?",
      open: 'INMATE 404, search assistant', tip: 'Ask INMATE 404', close: 'Close', back: 'Back', restart: 'Start over',
      field: 'Search the wiki', ph: 'Or type a word: raid, flag, respawn…', found: 'Found in the wiki:',
      none: "Nothing. I've turned over every cell, even the one at the back. Try another word, or the full search.",
      loading: 'Going through the files…', err: 'The files are under lock and key right now. Try the full search.',
      full: 'Open the full search with “{q}”', newtab: 'opens in a new tab',
      q_root: 'What are you looking for?', q_server: 'Which wing of the prison?',
      c_join: 'Join the server', c_start: "I'm new here", c_rules: 'The rules', c_server: 'The server in detail',
      c_map: 'Map and mushrooms', c_admin: 'Admin commands and files', c_secrets: "The site's secrets", c_site: 'About this website',
      a_join: 'For once, the gate is open: the steps to get in are on the Server page. Then drop by the Discord to find a squad.',
      a_start: "Start with the guide: your first hour, step by step, with boxes to tick. A word you don't get? The glossary translates the yard slang.",
      a_rules: "Few rules, but they're not up for debate. Read them before you end up in solitary.",
      a_overview: 'The server at a glance, and every setting explained in plain words.',
      a_territory: 'Flags, base size, raid protection, squads: it is all on the Territory page. The calculator tells you how big your base can get.',
      a_respawn: 'Dying is cheap here. The ways back, their prices and the waiting times are on the Respawn page.',
      a_economy: 'Loot, fuel, quests and services: the Economy page tells you what everything is worth today.',
      a_progression: 'How fast your skills grow, and the other progression settings: see the Progression page.',
      a_survival: 'Day and night, body, vehicles, animals: the Survival page tells you what waits for you outside.',
      a_enemies: 'The real danger is other players. Zombies and armed NPCs are described on the Enemies page.',
      a_events: 'Cargo drops and server events: the Events page gives you reasons to leave your base.',
      a_bunkers: 'Access cards, Killbox and Apex: the best loot sleeps underground. It is all on the Bunkers page.',
      a_settings: 'Every value of the server as it runs today, with its own search field.',
      a_map: 'The satellite map of the island: wildlife, mutants, places and bunkers. And before you bite into a mushroom, read the page that goes with it.',
      a_admin: 'Chat commands, running a server, settings files to download: that is the Admin page.',
      a_secrets: "Yes, secrets are hidden on this site. But an inmate who snitches doesn't last long: I'll let you dig.",
      a_site: 'Languages, offline reading, privacy: the answers are in the FAQ. Licence and publisher: the legal notice.',
      p: { guide: 'Guide', overview: 'Overview', join: 'Join', explained: 'Explanations', territory: 'Territory', calculator: 'Base size calculator',
        respawn: 'Respawn', economy: 'Economy', progression: 'Progression', survival: 'Survival', enemies: 'Enemies', events: 'Events',
        bunkers: 'Bunkers', rules: 'Rules', settings: 'All settings', maps: 'Maps', mushrooms: 'Mushrooms', faq: 'FAQ', glossary: 'Glossary',
        admin: 'Admin', eggs: 'Easter Eggs', legal: 'Legal notice & licence' }
    },
    es: {
      name: 'RECLUSO 404', role: 'Preso desaparecido · guía de la wiki',
      hello: 'Soy el RECLUSO 404, el que nadie encuentra. Sé dónde se esconde todo: ¿cómo puedo ayudarte en tu búsqueda?',
      open: 'RECLUSO 404, asistente de búsqueda', tip: 'Pregunta al RECLUSO 404', close: 'Cerrar', back: 'Atrás', restart: 'Empezar de nuevo',
      field: 'Buscar en la wiki', ph: 'O escribe una palabra: asalto, bandera, reaparición…', found: 'Encontrado en la wiki:',
      none: 'Nada. He registrado todas las celdas, hasta la del fondo. Prueba otra palabra, o la búsqueda completa.',
      loading: 'Revisando los expedientes…', err: 'Los expedientes están bajo llave ahora mismo. Prueba la búsqueda completa.',
      full: 'Abrir la búsqueda completa con «{q}»', newtab: 'se abre en una pestaña nueva',
      q_root: '¿Qué buscas?', q_server: '¿Qué ala de la prisión?',
      c_join: 'Unirse al servidor', c_start: 'Soy nuevo', c_rules: 'Las reglas', c_server: 'El servidor en detalle',
      c_map: 'Mapa y setas', c_admin: 'Comandos de admin y archivos', c_secrets: 'Los secretos del sitio', c_site: 'Sobre este sitio',
      a_join: 'Por una vez, la puerta está abierta: los pasos para entrar están en la página del servidor. Luego pásate por el Discord para encontrar escuadra.',
      a_start: 'Empieza por la guía: tu primera hora, paso a paso, con casillas para marcar. ¿Una palabra que no entiendes? El glosario traduce la jerga del patio.',
      a_rules: 'Pocas reglas, pero no se discuten. Léelas antes de acabar en aislamiento.',
      a_overview: 'El servidor de un vistazo, y cada ajuste explicado con palabras sencillas.',
      a_territory: 'Banderas, tamaño de base, protección contra asaltos, escuadras: todo está en la página Territorio. La calculadora te dice hasta dónde puede crecer tu base.',
      a_respawn: 'Aquí morir sale barato. Las formas de volver, sus precios y los tiempos de espera están en la página Reaparición.',
      a_economy: 'Loot, combustible, misiones y servicios: la página Economía te dice lo que vale cada cosa hoy.',
      a_progression: 'A qué ritmo suben tus habilidades y los demás ajustes de progresión: mira la página Progresión.',
      a_survival: 'Día y noche, cuerpo, vehículos, animales: la página Supervivencia te dice lo que te espera fuera.',
      a_enemies: 'El verdadero peligro son los demás jugadores. Los zombis y los NPC armados están descritos en la página Enemigos.',
      a_events: 'Lanzamientos de carga y eventos del servidor: la página Eventos te da motivos para salir de tu base.',
      a_bunkers: 'Tarjetas de acceso, Killbox y Apex: el mejor loot duerme bajo tierra. Todo está en la página Búnkeres.',
      a_settings: 'Todos los valores del servidor tal como funcionan hoy, con su propio buscador.',
      a_map: 'El mapa satelital de la isla: fauna, mutantes, lugares y búnkeres. Y antes de morder una seta, lee la página que le toca.',
      a_admin: 'Comandos del chat, poner en marcha un servidor, archivos de ajustes para descargar: es la página Administración.',
      a_secrets: 'Sí, hay secretos escondidos en este sitio. Pero un recluso que se chiva no dura mucho: te dejo buscar.',
      a_site: 'Idiomas, lectura sin conexión, privacidad: las respuestas están en las preguntas frecuentes. Licencia y editor: el aviso legal.',
      p: { guide: 'Guía', overview: 'Resumen', join: 'Unirse', explained: 'Explicaciones', territory: 'Territorio', calculator: 'Calculadora de tamaño de base',
        respawn: 'Reaparición', economy: 'Economía', progression: 'Progresión', survival: 'Supervivencia', enemies: 'Enemigos', events: 'Eventos',
        bunkers: 'Búnkeres', rules: 'Reglas', settings: 'Todos los ajustes', maps: 'Mapas', mushrooms: 'Setas', faq: 'Preguntas frecuentes', glossary: 'Glosario',
        admin: 'Administración', eggs: 'Easter Eggs', legal: 'Aviso legal y licencia' }
    },
    fr: {
      name: 'MATRICULE 404', role: 'Détenu introuvable · guide du wiki',
      hello: "Je suis le MATRICULE 404, le détenu introuvable. Je sais où tout se cache : comment puis-je t'aider dans ta recherche ?",
      open: 'MATRICULE 404, assistant de recherche', tip: 'Demande au MATRICULE 404', close: 'Fermer', back: 'Retour', restart: 'Recommencer',
      field: 'Chercher dans le wiki', ph: 'Ou tape un mot : raid, drapeau, respawn…', found: 'Trouvé dans le wiki :',
      none: "Rien. J'ai retourné toutes les cellules, même celle du fond. Essaie un autre mot, ou la grande recherche.",
      loading: 'Je fouille les dossiers…', err: "Les dossiers sont sous clé pour l'instant. Tente la grande recherche.",
      full: 'Ouvrir la grande recherche avec « {q} »', newtab: "s'ouvre dans un nouvel onglet",
      q_root: "Qu'est-ce que tu cherches ?", q_server: 'Quelle aile de la prison ?',
      c_join: 'Rejoindre le serveur', c_start: 'Je débute', c_rules: 'Les règles', c_server: 'Le serveur en détail',
      c_map: 'Carte et champignons', c_admin: 'Commandes admin et fichiers', c_secrets: 'Les secrets du site', c_site: 'À propos du site',
      a_join: 'Pour une fois, la porte est ouverte : les étapes pour entrer sont sur la page Serveur. Passe ensuite sur le Discord pour trouver une escouade.',
      a_start: "Commence par le guide : ta première heure, pas à pas, avec des cases à cocher. Un mot t'échappe ? Le glossaire traduit l'argot de la cour.",
      a_rules: 'Peu de règles, mais elles ne se discutent pas. Lis-les avant de finir au mitard.',
      a_overview: "Le serveur en un coup d'œil, et chaque réglage expliqué avec des mots simples.",
      a_territory: "Drapeaux, taille des bases, protection contre les raids, escouades : tout est sur la page Territoire. Le calculateur te dit jusqu'où ta base peut grandir.",
      a_respawn: "Ici, mourir ne coûte pas cher. Les façons de revenir, leurs prix et les temps d'attente sont sur la page Respawn.",
      a_economy: "Loot, carburant, quêtes et services : la page Économie te dit ce que vaut chaque chose aujourd'hui.",
      a_progression: 'La vitesse à laquelle tes compétences montent, et les autres réglages de progression : vois la page Progression.',
      a_survival: "Jour et nuit, corps, véhicules, animaux : la page Survie te dit ce qui t'attend dehors.",
      a_enemies: 'Le vrai danger, ce sont les autres joueurs. Zombies et PNJ armés sont décrits sur la page Ennemis.',
      a_events: 'Largages et événements du serveur : la page Événements te donne des raisons de sortir de ta base.',
      a_bunkers: "Cartes d'accès, Killbox et Apex : le meilleur loot dort sous terre. Tout est sur la page Bunkers.",
      a_settings: "Toutes les valeurs du serveur, telles qu'elles tournent aujourd'hui, avec leur propre champ de recherche.",
      a_map: "La carte satellite de l'île : faune, mutants, lieux et bunkers. Et avant de croquer un champignon, lis la page qui va avec.",
      a_admin: "Commandes du chat, faire tourner un serveur, fichiers de réglages à télécharger : c'est la page Admin.",
      a_secrets: 'Oui, des secrets traînent sur ce site. Mais un détenu qui balance ne fait pas long feu : je te laisse chercher.',
      a_site: 'Langues, lecture hors ligne, vie privée : les réponses sont dans la FAQ. Licence et éditeur : les mentions légales.',
      p: { guide: 'Guide', overview: 'Aperçu', join: 'Rejoindre', explained: 'Explications', territory: 'Territoire', calculator: 'Calculateur de taille de base',
        respawn: 'Respawn', economy: 'Économie', progression: 'Progression', survival: 'Survie', enemies: 'Ennemis', events: 'Événements',
        bunkers: 'Bunkers', rules: 'Règles', settings: 'Tous les réglages', maps: 'Cartes', mushrooms: 'Champignons', faq: 'FAQ', glossary: 'Glossaire',
        admin: 'Admin', eggs: 'Easter Eggs', legal: 'Mentions légales et licence' }
    },
    de: {
      name: 'HÄFTLING 404', role: 'Unauffindbarer Häftling · Wiki-Lotse',
      hello: 'Ich bin HÄFTLING 404, der Unauffindbare. Ich weiß, wo alles versteckt ist: Wie kann ich dir bei deiner Suche helfen?',
      open: 'HÄFTLING 404, Suchassistent', tip: 'Frag HÄFTLING 404', close: 'Schließen', back: 'Zurück', restart: 'Neu anfangen',
      field: 'Im Wiki suchen', ph: 'Oder tipp ein Wort: Raid, Flagge, Respawn…', found: 'Im Wiki gefunden:',
      none: 'Nichts. Ich habe jede Zelle umgedreht, sogar die ganz hinten. Versuch ein anderes Wort oder die große Suche.',
      loading: 'Ich durchsuche die Akten…', err: 'Die Akten sind gerade unter Verschluss. Versuch die große Suche.',
      full: 'Große Suche mit „{q}“ öffnen', newtab: 'öffnet in einem neuen Tab',
      q_root: 'Was suchst du?', q_server: 'Welcher Trakt des Gefängnisses?',
      c_join: 'Dem Server beitreten', c_start: 'Ich bin neu', c_rules: 'Die Regeln', c_server: 'Der Server im Detail',
      c_map: 'Karte und Pilze', c_admin: 'Admin-Befehle und Dateien', c_secrets: 'Die Geheimnisse der Seite', c_site: 'Über diese Website',
      a_join: 'Ausnahmsweise steht das Tor offen: Die Schritte zum Beitreten stehen auf der Serverseite. Schau danach im Discord vorbei, um einen Trupp zu finden.',
      a_start: 'Fang mit dem Leitfaden an: deine erste Stunde, Schritt für Schritt, mit Kästchen zum Abhaken. Ein Wort, das du nicht kennst? Das Glossar übersetzt den Hofjargon.',
      a_rules: 'Wenige Regeln, aber darüber wird nicht verhandelt. Lies sie, bevor du in Einzelhaft landest.',
      a_overview: 'Der Server auf einen Blick, und jede Einstellung in einfachen Worten erklärt.',
      a_territory: 'Flaggen, Basisgröße, Raidschutz, Trupps: Alles steht auf der Seite Gebiet. Der Rechner zeigt dir, wie groß deine Basis werden kann.',
      a_respawn: 'Sterben ist hier billig. Wege zurück, ihre Preise und die Wartezeiten stehen auf der Seite Respawn.',
      a_economy: 'Loot, Treibstoff, Quests und Dienste: Die Seite Wirtschaft sagt dir, was heute was wert ist.',
      a_progression: 'Wie schnell deine Fertigkeiten steigen, und die übrigen Fortschrittseinstellungen: siehe die Seite Fortschritt.',
      a_survival: 'Tag und Nacht, Körper, Fahrzeuge, Tiere: Die Seite Überleben sagt dir, was draußen auf dich wartet.',
      a_enemies: 'Die echte Gefahr sind andere Spieler. Zombies und bewaffnete NPCs stehen auf der Seite Gegner.',
      a_events: 'Cargo-Drops und Server-Events: Die Seite Ereignisse gibt dir Gründe, deine Basis zu verlassen.',
      a_bunkers: 'Zugangskarten, Killbox und Apex: Der beste Loot schläft unter der Erde. Alles steht auf der Seite Bunker.',
      a_settings: 'Alle Werte des Servers, so wie sie heute laufen, mit eigenem Suchfeld.',
      a_map: 'Die Satellitenkarte der Insel: Tiere, Mutanten, Orte und Bunker. Und bevor du in einen Pilz beißt, lies die passende Seite.',
      a_admin: 'Chat-Befehle, einen Server betreiben, Einstellungsdateien zum Herunterladen: Das ist die Admin-Seite.',
      a_secrets: 'Ja, auf dieser Seite sind Geheimnisse versteckt. Aber ein Häftling, der petzt, lebt nicht lange: Such selbst.',
      a_site: 'Sprachen, Offline-Lesen, Datenschutz: Die Antworten stehen in den FAQ. Lizenz und Herausgeber: das Impressum.',
      p: { guide: 'Leitfaden', overview: 'Überblick', join: 'Beitreten', explained: 'Erklärungen', territory: 'Gebiet', calculator: 'Basisgrößen-Rechner',
        respawn: 'Respawn', economy: 'Wirtschaft', progression: 'Fortschritt', survival: 'Überleben', enemies: 'Gegner', events: 'Ereignisse',
        bunkers: 'Bunker', rules: 'Regeln', settings: 'Alle Einstellungen', maps: 'Karten', mushrooms: 'Pilze', faq: 'FAQ', glossary: 'Glossar',
        admin: 'Admin', eggs: 'Easter Eggs', legal: 'Impressum & Lizenz' }
    },
    it: {
      name: 'DETENUTO 404', role: 'Detenuto introvabile · guida del wiki',
      hello: 'Sono il DETENUTO 404, quello che nessuno trova. So dove si nasconde tutto: come posso aiutarti nella tua ricerca?',
      open: 'DETENUTO 404, assistente di ricerca', tip: 'Chiedi al DETENUTO 404', close: 'Chiudi', back: 'Indietro', restart: 'Ricomincia',
      field: 'Cerca nel wiki', ph: 'Oppure scrivi una parola: raid, bandiera, respawn…', found: 'Trovato nel wiki:',
      none: "Niente. Ho rivoltato ogni cella, anche quella in fondo. Prova un'altra parola, o la ricerca completa.",
      loading: 'Sto frugando negli archivi…', err: 'Gli archivi sono sotto chiave in questo momento. Prova la ricerca completa.',
      full: 'Apri la ricerca completa con «{q}»', newtab: 'si apre in una nuova scheda',
      q_root: 'Cosa stai cercando?', q_server: 'Quale braccio del carcere?',
      c_join: 'Entrare nel server', c_start: 'Sono nuovo', c_rules: 'Le regole', c_server: 'Il server nel dettaglio',
      c_map: 'Mappa e funghi', c_admin: 'Comandi admin e file', c_secrets: 'I segreti del sito', c_site: 'Su questo sito',
      a_join: 'Per una volta il cancello è aperto: i passaggi per entrare sono nella pagina del server. Poi fai un salto sul Discord per trovare una squadra.',
      a_start: 'Comincia dalla guida: la tua prima ora, passo dopo passo, con caselle da spuntare. Una parola che non capisci? Il glossario traduce il gergo del cortile.',
      a_rules: 'Poche regole, ma non si discutono. Leggile prima di finire in isolamento.',
      a_overview: "Il server a colpo d'occhio, e ogni impostazione spiegata in parole semplici.",
      a_territory: 'Bandiere, dimensione della base, protezione dai raid, squadre: è tutto nella pagina Territorio. Il calcolatore ti dice fin dove può crescere la tua base.',
      a_respawn: 'Qui morire costa poco. I modi per tornare, i prezzi e i tempi di attesa sono nella pagina Respawn.',
      a_economy: 'Loot, carburante, missioni e servizi: la pagina Economia ti dice quanto vale ogni cosa oggi.',
      a_progression: 'Quanto in fretta salgono le tue abilità, e le altre impostazioni di progressione: guarda la pagina Progressione.',
      a_survival: 'Giorno e notte, corpo, veicoli, animali: la pagina Sopravvivenza ti dice cosa ti aspetta là fuori.',
      a_enemies: 'Il vero pericolo sono gli altri giocatori. Zombie e NPC armati sono descritti nella pagina Nemici.',
      a_events: 'Lanci di carico ed eventi del server: la pagina Eventi ti dà buoni motivi per uscire dalla base.',
      a_bunkers: 'Tessere di accesso, Killbox e Apex: il miglior loot dorme sottoterra. È tutto nella pagina Bunker.',
      a_settings: 'Tutti i valori del server così come girano oggi, con un campo di ricerca tutto suo.',
      a_map: "La mappa satellitare dell'isola: fauna, mutanti, luoghi e bunker. E prima di addentare un fungo, leggi la pagina apposta.",
      a_admin: 'Comandi della chat, far girare un server, file di impostazioni da scaricare: è la pagina Admin.',
      a_secrets: 'Sì, su questo sito ci sono segreti nascosti. Ma un detenuto che fa la spia non dura molto: ti lascio cercare.',
      a_site: 'Lingue, lettura offline, privacy: le risposte sono nelle FAQ. Licenza ed editore: le note legali.',
      p: { guide: 'Guida', overview: 'Panoramica', join: 'Entra', explained: 'Spiegazioni', territory: 'Territorio', calculator: 'Calcolatore della dimensione della base',
        respawn: 'Respawn', economy: 'Economia', progression: 'Progressione', survival: 'Sopravvivenza', enemies: 'Nemici', events: 'Eventi',
        bunkers: 'Bunker', rules: 'Regole', settings: 'Tutte le impostazioni', maps: 'Mappe', mushrooms: 'Funghi', faq: 'FAQ', glossary: 'Glossario',
        admin: 'Admin', eggs: 'Easter Eggs', legal: 'Note legali e licenza' }
    },
    pl: {
      name: 'WIĘZIEŃ 404', role: 'Zaginiony więzień · przewodnik po wiki',
      hello: 'Melduje się WIĘZIEŃ 404, ten, którego nikt nie może znaleźć. Wiem, gdzie wszystko jest ukryte: jak mogę ci pomóc w poszukiwaniach?',
      open: 'WIĘZIEŃ 404, asystent wyszukiwania', tip: 'Zapytaj WIĘŹNIA 404', close: 'Zamknij', back: 'Wstecz', restart: 'Od nowa',
      field: 'Szukaj w wiki', ph: 'Albo wpisz słowo: rajd, flaga, respawn…', found: 'Znalezione w wiki:',
      none: 'Nic. Przetrząsnąłem każdą celę, nawet tę na samym końcu. Spróbuj innego słowa albo pełnej wyszukiwarki.',
      loading: 'Przeglądam akta…', err: 'Akta są teraz pod kluczem. Spróbuj pełnej wyszukiwarki.',
      full: 'Otwórz pełną wyszukiwarkę z „{q}”', newtab: 'otwiera się w nowej karcie',
      q_root: 'Czego szukasz?', q_server: 'Który blok więzienia?',
      c_join: 'Dołącz do serwera', c_start: 'Dopiero zaczynam', c_rules: 'Zasady', c_server: 'Serwer w szczegółach',
      c_map: 'Mapa i grzyby', c_admin: 'Komendy admina i pliki', c_secrets: 'Sekrety strony', c_site: 'O tej stronie',
      a_join: 'Wyjątkowo brama jest otwarta: kroki, jak dołączyć, są na stronie serwera. Potem zajrzyj na Discorda, żeby znaleźć drużynę.',
      a_start: 'Zacznij od poradnika: twoja pierwsza godzina krok po kroku, z polami do odhaczania. Nie znasz jakiegoś słowa? Słowniczek tłumaczy gwarę spacerniaka.',
      a_rules: 'Zasad jest niewiele, ale nie podlegają dyskusji. Przeczytaj je, zanim trafisz do izolatki.',
      a_overview: 'Serwer w pigułce i każde ustawienie wyjaśnione prostymi słowami.',
      a_territory: 'Flagi, rozmiar bazy, ochrona przed rajdami, drużyny: wszystko jest na stronie Terytorium. Kalkulator powie ci, jak bardzo może urosnąć twoja baza.',
      a_respawn: 'Tutaj śmierć kosztuje niewiele. Sposoby powrotu, ich ceny i czasy oczekiwania są na stronie Respawn.',
      a_economy: 'Loot, paliwo, zadania i usługi: strona Ekonomia powie ci, ile co jest dziś warte.',
      a_progression: 'Jak szybko rosną twoje umiejętności i pozostałe ustawienia rozwoju: zajrzyj na stronę Rozwój.',
      a_survival: 'Dzień i noc, ciało, pojazdy, zwierzęta: strona Przetrwanie powie ci, co czeka na zewnątrz.',
      a_enemies: 'Prawdziwe zagrożenie to inni gracze. Zombie i uzbrojone NPC opisuje strona Wrogowie.',
      a_events: 'Zrzuty zaopatrzenia i wydarzenia na serwerze: strona Wydarzenia daje ci powody, by wyjść z bazy.',
      a_bunkers: 'Karty dostępu, Killbox i Apex: najlepszy loot śpi pod ziemią. Wszystko jest na stronie Bunkry.',
      a_settings: 'Wszystkie wartości serwera w obecnym kształcie, z własną wyszukiwarką.',
      a_map: 'Satelitarna mapa wyspy: zwierzęta, mutanty, miejsca i bunkry. A zanim ugryziesz grzyba, przeczytaj stronę o grzybach.',
      a_admin: 'Komendy czatu, prowadzenie serwera, pliki ustawień do pobrania: to strona Administracja.',
      a_secrets: 'Tak, na tej stronie ukryto sekrety. Ale więzień, który kabluje, długo nie pociągnie: poszukiwania zostawiam tobie.',
      a_site: 'Języki, czytanie offline, prywatność: odpowiedzi są w FAQ. Licencja i wydawca: informacje prawne.',
      p: { guide: 'Poradnik', overview: 'Przegląd', join: 'Dołącz', explained: 'Objaśnienia', territory: 'Terytorium', calculator: 'Kalkulator rozmiaru bazy',
        respawn: 'Respawn', economy: 'Ekonomia', progression: 'Rozwój', survival: 'Przetrwanie', enemies: 'Wrogowie', events: 'Wydarzenia',
        bunkers: 'Bunkry', rules: 'Zasady', settings: 'Wszystkie ustawienia', maps: 'Mapy', mushrooms: 'Grzyby', faq: 'FAQ', glossary: 'Słowniczek',
        admin: 'Administracja', eggs: 'Easter Eggs', legal: 'Informacje prawne i licencja' }
    },
    uk: {
      name: 'В’ЯЗЕНЬ 404', role: 'Зниклий в’язень · провідник вікі',
      hello: 'Я — В’ЯЗЕНЬ 404, той, кого ніхто не може знайти. Я знаю, де що сховано: чим тобі допомогти в пошуках?',
      open: 'В’ЯЗЕНЬ 404, помічник із пошуку', tip: 'Запитай В’ЯЗНЯ 404', close: 'Закрити', back: 'Назад', restart: 'Почати знову',
      field: 'Шукати у вікі', ph: 'Або введи слово: рейд, прапор, відродження…', found: 'Знайдено у вікі:',
      none: 'Нічого. Я перевернув кожну камеру, навіть найдальшу. Спробуй інше слово або повний пошук.',
      loading: 'Гортаю справи…', err: 'Справи зараз під замком. Спробуй повний пошук.',
      full: 'Відкрити повний пошук із «{q}»', newtab: 'відкривається в новій вкладці',
      q_root: 'Що ти шукаєш?', q_server: 'Яке крило в’язниці?',
      c_join: 'Приєднатися до сервера', c_start: 'Я новачок', c_rules: 'Правила', c_server: 'Сервер докладно',
      c_map: 'Карта і гриби', c_admin: 'Команди адміна і файли', c_secrets: 'Таємниці сайту', c_site: 'Про цей сайт',
      a_join: 'Цього разу брама відчинена: як зайти, написано на сторінці сервера. Потім зазирни в Discord, щоб знайти загін.',
      a_start: 'Почни з посібника: твоя перша година крок за кроком, з пунктами, які можна позначати. Незнайоме слово? Глосарій перекладає тюремний жаргон.',
      a_rules: 'Правил небагато, але вони не обговорюються. Прочитай їх, щоб не опинитися в карцері.',
      a_overview: 'Сервер з першого погляду і кожне налаштування простими словами.',
      a_territory: 'Прапори, розмір бази, захист від рейдів, загони: усе на сторінці «Територія». Калькулятор підкаже, наскільки може вирости твоя база.',
      a_respawn: 'Смерть тут коштує недорого. Способи повернутися, ціни та час очікування — на сторінці «Відродження».',
      a_economy: 'Лут, пальне, квести та послуги: сторінка «Економіка» скаже, скільки що коштує сьогодні.',
      a_progression: 'Як швидко ростуть твої навички та інші налаштування прогресу: дивись сторінку «Прогрес».',
      a_survival: 'День і ніч, тіло, транспорт, тварини: сторінка «Виживання» розповість, що чекає на тебе назовні.',
      a_enemies: 'Справжня небезпека — інші гравці. Зомбі та озброєних NPC описано на сторінці «Вороги».',
      a_events: 'Вантажні скиди та події сервера: сторінка «Події» дасть тобі привід вийти з бази.',
      a_bunkers: 'Карти доступу, Killbox та Apex: найкращий лут спить під землею. Усе на сторінці «Бункери».',
      a_settings: 'Усі значення сервера в поточному вигляді, з власним пошуком.',
      a_map: 'Супутникова карта острова: тварини, мутанти, місця та бункери. А перш ніж куснути гриб, прочитай відповідну сторінку.',
      a_admin: 'Команди чату, запуск сервера, файли налаштувань для завантаження: це сторінка «Адміністрування».',
      a_secrets: 'Так, на цьому сайті сховано таємниці. Але в’язень, який стукає, довго не живе: пошуки залишаю тобі.',
      a_site: 'Мови, читання офлайн, приватність: відповіді в «Частих запитаннях». Ліцензія та видавець: правова інформація.',
      p: { guide: 'Посібник', overview: 'Огляд', join: 'Приєднатися', explained: 'Пояснення', territory: 'Територія', calculator: 'Калькулятор розміру бази',
        respawn: 'Відродження', economy: 'Економіка', progression: 'Прогрес', survival: 'Виживання', enemies: 'Вороги', events: 'Події',
        bunkers: 'Бункери', rules: 'Правила', settings: 'Усі налаштування', maps: 'Карти', mushrooms: 'Гриби', faq: 'Часті запитання', glossary: 'Глосарій',
        admin: 'Адміністрування', eggs: 'Easter Eggs', legal: 'Правова інформація та ліцензія' }
    },
    hr: {
      name: 'ZATVORENIK 404', role: 'Nestali zatvorenik · vodič kroz wiki',
      hello: 'Ja sam ZATVORENIK 404, onaj kojeg nitko ne može pronaći. Znam gdje se sve skriva: kako ti mogu pomoći u potrazi?',
      open: 'ZATVORENIK 404, pomoćnik za pretragu', tip: 'Pitaj ZATVORENIKA 404', close: 'Zatvori', back: 'Natrag', restart: 'Ispočetka',
      field: 'Pretraži wiki', ph: 'Ili upiši riječ: napad, zastava, respawn…', found: 'Pronađeno u wikiju:',
      none: 'Ništa. Prevrnuo sam svaku ćeliju, čak i onu na samom kraju. Probaj drugu riječ ili punu pretragu.',
      loading: 'Prekapam po dosjeima…', err: 'Dosjei su trenutno pod ključem. Probaj punu pretragu.',
      full: 'Otvori punu pretragu s „{q}“', newtab: 'otvara se u novoj kartici',
      q_root: 'Što tražiš?', q_server: 'Koje krilo zatvora?',
      c_join: 'Pridruži se poslužitelju', c_start: 'Tek počinjem', c_rules: 'Pravila', c_server: 'Poslužitelj detaljno',
      c_map: 'Karta i gljive', c_admin: 'Admin naredbe i datoteke', c_secrets: 'Tajne stranice', c_site: 'O ovoj stranici',
      a_join: 'Ovaj put su vrata otvorena: koraci za ulazak su na stranici poslužitelja. Zatim svrati na Discord i pronađi ekipu.',
      a_start: 'Počni s vodičem: tvoj prvi sat, korak po korak, s kućicama za označavanje. Ne znaš neku riječ? Pojmovnik prevodi zatvorski žargon.',
      a_rules: 'Pravila je malo, ali se o njima ne raspravlja. Pročitaj ih prije nego završiš u samici.',
      a_overview: 'Poslužitelj na prvi pogled i svaka postavka objašnjena jednostavnim riječima.',
      a_territory: 'Zastave, veličina baze, zaštita od napada, ekipe: sve je na stranici Teritorij. Kalkulator ti kaže koliko tvoja baza može narasti.',
      a_respawn: 'Ovdje smrt ne košta puno. Načini povratka, cijene i vremena čekanja su na stranici Respawn.',
      a_economy: 'Loot, gorivo, zadaci i usluge: stranica Ekonomija kaže ti koliko što danas vrijedi.',
      a_progression: 'Koliko brzo rastu tvoje vještine i ostale postavke napretka: pogledaj stranicu Napredak.',
      a_survival: 'Dan i noć, tijelo, vozila, životinje: stranica Preživljavanje kaže ti što te čeka vani.',
      a_enemies: 'Prava opasnost su drugi igrači. Zombiji i naoružani NPC-ovi opisani su na stranici Neprijatelji.',
      a_events: 'Zračni tereti i događaji na poslužitelju: stranica Događaji daje ti razloge da izađeš iz baze.',
      a_bunkers: 'Pristupne kartice, Killbox i Apex: najbolji loot spava pod zemljom. Sve je na stranici Bunkeri.',
      a_settings: 'Sve vrijednosti poslužitelja onako kako trenutno rade, s vlastitom tražilicom.',
      a_map: 'Satelitska karta otoka: životinje, mutanti, mjesta i bunkeri. I prije nego zagrizeš gljivu, pročitaj stranicu o gljivama.',
      a_admin: 'Naredbe u chatu, pokretanje poslužitelja, datoteke postavki za preuzimanje: to je stranica Administracija.',
      a_secrets: 'Da, na ovoj stranici skrivene su tajne. Ali zatvorenik koji cinka ne živi dugo: potragu prepuštam tebi.',
      a_site: 'Jezici, čitanje offline, privatnost: odgovori su u čestim pitanjima. Licenca i izdavač: pravne informacije.',
      p: { guide: 'Vodič', overview: 'Pregled', join: 'Pridruži se', explained: 'Objašnjenja', territory: 'Teritorij', calculator: 'Kalkulator veličine baze',
        respawn: 'Respawn', economy: 'Ekonomija', progression: 'Napredak', survival: 'Preživljavanje', enemies: 'Neprijatelji', events: 'Događaji',
        bunkers: 'Bunkeri', rules: 'Pravila', settings: 'Sve postavke', maps: 'Karte', mushrooms: 'Gljive', faq: 'Česta pitanja', glossary: 'Pojmovnik',
        admin: 'Administracija', eggs: 'Easter Eggs', legal: 'Pravne informacije i licenca' }
    }
  };
  var L = T[lang] || T.en;

  // ---- the topics: real pages of the wiki, in the page language ----
  var PAGES = {
    guide: 'guide/', overview: 'server/overview/', join: 'server/overview/#join', explained: 'server/overview/#every-setting-explained',
    territory: 'server/territory-wars/', calculator: 'server/territory-wars/#calculator', respawn: 'server/respawn/',
    economy: 'server/economy/', progression: 'server/progression/', survival: 'server/survival/', enemies: 'server/enemies/',
    events: 'server/events/', bunkers: 'server/bunkers/', rules: 'server/rules/', settings: 'server/all-settings/',
    maps: 'maps/', mushrooms: 'mushrooms/', faq: 'faq/', glossary: 'glossary/', admin: 'admin/', eggs: 'easter-eggs/', legal: 'legal/'
  };
  var ANSWERS = {
    join: ['join', 'guide', 'discord'], start: ['guide', 'faq', 'glossary'], rules: ['rules'],
    overview: ['overview', 'explained'], territory: ['territory', 'calculator'], respawn: ['respawn'], economy: ['economy'],
    progression: ['progression'], survival: ['survival'], enemies: ['enemies'], events: ['events'], bunkers: ['bunkers'],
    settings: ['settings'], map: ['maps', 'mushrooms'], admin: ['admin'], secrets: ['eggs'], site: ['faq', 'legal']
  };
  var ROOT = ['join', 'start', 'rules', 'server', 'map', 'admin', 'secrets', 'site'];
  var WINGS = ['overview', 'territory', 'respawn', 'economy', 'progression', 'survival', 'enemies', 'events', 'bunkers', 'settings'];
  // the Discord invitation is read from the footer link of the page, so it is written in one place only (mkdocs.yml)
  var dl = document.querySelector('.md-social__link[href^="https://discord.gg/"]');
  var DISCORD = dl ? dl.href : '';

  function step(id) {
    if (id === 'root') return { say: L.q_root, chips: ROOT.map(function (k) { return [L['c_' + k], k]; }) };
    if (id === 'server') return { say: L.q_server, chips: WINGS.map(function (k) { return [L.p[k], k]; }) };
    var links = (ANSWERS[id] || []).map(function (k) {
      if (k === 'discord') return DISCORD ? { label: 'Discord', href: DISCORD, ext: true } : null;
      return { label: L.p[k], href: SITE + LP + PAGES[k] };
    }).filter(Boolean);
    return { say: L['a_' + id] || '', links: links };
  }

  // ---- building blocks ----
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var NS = 'http://www.w3.org/2000/svg';
  function svgIcon(paths, cls) {
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    if (cls) s.setAttribute('class', cls);
    paths.forEach(function (d) { var p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); s.appendChild(p); });
    return s;
  }

  // ---- header button: a prisoner tag stamped 404, right before the search ----
  var btn = el('button', 'md-header__button fl-m404-btn');
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'fl-m404');
  btn.setAttribute('aria-label', L.open);
  var plate = el('span', 'fl-m404-plate');
  plate.setAttribute('aria-hidden', 'true');
  plate.appendChild(el('span', 'fl-m404-plate__n', '404'));
  btn.appendChild(plate);
  var searchLabel = head.querySelector('label.md-header__button[for="__search"]') || head.querySelector('.md-search');
  if (searchLabel) head.insertBefore(btn, searchLabel); else head.appendChild(btn);

  // own tooltip (no title attribute: the theme's tooltip keeps a stale copy of the text it first read)
  var tipEl = el('div', 'fl-hd-tip fl-m404-tip', L.tip);
  tipEl.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tipEl);
  function showTip() {
    if (dlg && dlg.open) return;
    var r = btn.getBoundingClientRect(), w = tipEl.offsetWidth, x = r.left + r.width / 2 - w / 2;
    tipEl.style.left = Math.max(8, Math.min(x, document.documentElement.clientWidth - w - 8)) + 'px';
    tipEl.style.top = (r.bottom + 10) + 'px';
    tipEl.classList.add('is-on');
  }
  function hideTip() { tipEl.classList.remove('is-on'); }
  btn.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') showTip(); });
  btn.addEventListener('pointerleave', hideTip);
  btn.addEventListener('focus', function () { if (btn.matches && btn.matches(':focus-visible')) showTip(); });
  btn.addEventListener('blur', hideTip);

  // ---- the dialog, built on first use ----
  var dlg = null, box, title, field, sayP, chipsBox, linksList, nav, backBtn, newBtn, resBox, resStatus, resList, fullBtn, live;
  var stack = ['root'], typing = false;

  function build() {
    if (dlg) return;
    dlg = el('dialog', 'fl-m404');
    dlg.id = 'fl-m404';
    dlg.setAttribute('aria-labelledby', 'fl-m404-name');
    dlg.setAttribute('aria-describedby', 'fl-m404-hello');
    box = el('div', 'fl-m404__box');

    var top = el('div', 'fl-m404__head');
    var av = document.createElementNS(NS, 'svg');
    av.setAttribute('viewBox', '0 0 48 48'); av.setAttribute('aria-hidden', 'true'); av.setAttribute('focusable', 'false');
    av.setAttribute('class', 'fl-m404__av');
    [8, 16, 24, 32, 40].forEach(function (y) {   // the height chart of a mugshot
      var l = document.createElementNS(NS, 'path'); l.setAttribute('d', 'M0 ' + y + 'h48'); l.setAttribute('class', 'ln'); av.appendChild(l);
    });
    var sil = document.createElementNS(NS, 'path');
    sil.setAttribute('d', 'M24 7.5a8.2 8.2 0 1 1 0 16.4a8.2 8.2 0 1 1 0-16.4zM7 48c0-11 7.6-17 17-17s17 6 17 17z');
    sil.setAttribute('class', 'sil'); av.appendChild(sil);
    var pl = document.createElementNS(NS, 'path'); pl.setAttribute('d', 'M12.5 34h23v9.5h-23z'); pl.setAttribute('class', 'pl'); av.appendChild(pl);
    var tx = document.createElementNS(NS, 'text');
    tx.setAttribute('x', '24'); tx.setAttribute('y', '41.6'); tx.setAttribute('text-anchor', 'middle'); tx.setAttribute('class', 'tx');
    tx.textContent = '404'; av.appendChild(tx);
    top.appendChild(av);

    var id = el('div', 'fl-m404__id');
    title = el('h2', 'fl-m404__name', L.name);
    title.id = 'fl-m404-name'; title.tabIndex = -1;
    id.appendChild(title);
    id.appendChild(el('p', 'fl-m404__role', L.role));
    top.appendChild(id);
    var x = el('button', 'fl-m404__x');
    x.type = 'button'; x.setAttribute('aria-label', L.close);
    x.appendChild(svgIcon(['M6 6l12 12M18 6L6 18']));
    x.addEventListener('click', function () { close(true); });
    top.appendChild(x);
    box.appendChild(top);

    var body = el('div', 'fl-m404__body');
    var hello = el('p', 'fl-m404__hello', L.hello);
    hello.id = 'fl-m404-hello';
    body.appendChild(hello);

    var form = el('form', 'fl-m404__ask');
    form.setAttribute('role', 'search');
    form.setAttribute('action', '#');
    var lab = el('label', 'fl-m404__sr', L.field);
    lab.setAttribute('for', 'fl-m404-q');
    field = el('input', 'fl-m404__q');
    field.id = 'fl-m404-q'; field.type = 'text'; field.placeholder = L.ph;
    field.setAttribute('autocomplete', 'off'); field.setAttribute('autocapitalize', 'off'); field.setAttribute('spellcheck', 'false');
    field.setAttribute('enterkeyhint', 'search');
    form.appendChild(lab);
    form.appendChild(svgIcon(['M9.5 3a6.5 6.5 0 0 1 5.2 10.4l5.4 5.4-1.4 1.4-5.4-5.4A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'], 'fl-m404__lens'));
    form.appendChild(field);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = resList && !resBox.hidden ? resList.querySelector('a') : null;
      if (first) first.click(); else if (field.value.trim()) openFull(field.value.trim());
    });
    body.appendChild(form);

    // guided part
    var say = el('div', 'fl-m404__say');
    sayP = el('p', 'fl-m404__q-say');
    chipsBox = el('div', 'fl-m404__chips');
    linksList = el('ul', 'fl-m404__links');
    say.appendChild(sayP); say.appendChild(chipsBox); say.appendChild(linksList);
    body.appendChild(say);

    // free search part
    resBox = el('div', 'fl-m404__res');
    resBox.hidden = true;
    resStatus = el('p', 'fl-m404__status');
    resList = el('ul', 'fl-m404__hits');
    fullBtn = el('button', 'fl-m404__full');
    fullBtn.type = 'button';
    fullBtn.addEventListener('click', function () { openFull(field.value.trim()); });
    resBox.appendChild(resStatus); resBox.appendChild(resList); resBox.appendChild(fullBtn);
    body.appendChild(resBox);

    nav = el('div', 'fl-m404__nav');
    backBtn = el('button', 'fl-m404__back', L.back); backBtn.type = 'button';
    newBtn = el('button', 'fl-m404__new', L.restart); newBtn.type = 'button';
    backBtn.addEventListener('click', function () {
      if (stack.length > 1) { stack.pop(); render(); focusFirst(); }
    });
    newBtn.addEventListener('click', function () { reset(); field.focus(); });
    nav.appendChild(backBtn); nav.appendChild(newBtn);
    body.appendChild(nav);

    live = el('div', 'fl-m404__sr');
    live.setAttribute('aria-live', 'polite');
    body.appendChild(live);

    box.appendChild(body);
    dlg.appendChild(box);
    document.body.appendChild(dlg);

    say.addEventListener('click', function (e) {
      var c = e.target.closest ? e.target.closest('.fl-m404__chip') : null;
      if (c) { stack.push(c.getAttribute('data-go')); render(); focusFirst(); return; }
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && !a.target) close(false);   // a page of the wiki opens (or scrolls) behind: the dialog leaves the way
    });
    resList.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a) close(false);
    });
    field.addEventListener('input', function () { clearTimeout(qT); qT = setTimeout(typed, 120); });

    dlg.addEventListener('cancel', function (e) { e.preventDefault(); close(true); });
    dlg.addEventListener('close', function () { done(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(true); });   // a click on the dimmed page around it
    dlg.addEventListener('keydown', onKey);
  }

  function announce(t) { live.textContent = ''; setTimeout(function () { live.textContent = t; }, 60); }

  function render() {
    var s = step(stack[stack.length - 1]);
    sayP.textContent = s.say;
    sayP.classList.toggle('is-answer', !(s.chips && s.chips.length));
    chipsBox.textContent = ''; linksList.textContent = '';
    (s.chips || []).forEach(function (c) {
      var b = el('button', 'fl-m404__chip', c[0]);
      b.type = 'button'; b.setAttribute('data-go', c[1]);
      chipsBox.appendChild(b);
    });
    (s.links || []).forEach(function (l) {
      var li = el('li'), a = el('a', null, l.label);
      a.href = l.href;
      if (l.ext) {
        a.target = '_blank'; a.rel = 'noopener';
        a.appendChild(svgIcon(['M14 4h6v6M20 4l-9 9M18 14v6H4V6h6'], 'fl-m404__ext'));
        a.appendChild(el('span', 'fl-m404__sr', ' (' + L.newtab + ')'));
      }
      li.appendChild(a); linksList.appendChild(li);
    });
    chipsBox.hidden = !(s.chips && s.chips.length);
    linksList.hidden = !(s.links && s.links.length);
    backBtn.hidden = stack.length < 2;
    newBtn.hidden = stack.length < 2;
    nav.hidden = backBtn.hidden && newBtn.hidden;
    if (stack.length > 1) announce(s.say);
  }
  // the button just pressed is gone after a step: keep the keyboard inside the dialog, on the first new choice
  function focusFirst() {
    var f = dlg.querySelector('.fl-m404__chip, .fl-m404__links a') || field;
    f.focus({ preventScroll: true });
    var b = dlg.querySelector('.fl-m404__body');
    if (b && f !== field) { var r = f.getBoundingClientRect(), br = b.getBoundingClientRect(); if (r.bottom > br.bottom || r.top < br.top) f.scrollIntoView({ block: 'nearest' }); }
  }
  function reset() {
    stack = ['root']; typing = false;
    if (field) field.value = '';
    showGuided(true); render();
  }
  function showGuided(on) {
    dlg.querySelector('.fl-m404__say').hidden = !on;
    resBox.hidden = on;
    if (on) { nav.hidden = stack.length < 2; } else { nav.hidden = false; backBtn.hidden = true; newBtn.hidden = false; }
  }

  // ---- open / close ----
  var opener = null;
  function open() {
    build();
    hideTip();
    reset();
    opener = document.activeElement;
    dlg.showModal();
    document.documentElement.classList.add('fl-m404-on');
    btn.setAttribute('aria-expanded', 'true');
    // on a touch screen, focusing the field would pull the keyboard over the topics: the name gets the focus there
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    (coarse ? title : field).focus();
    loadIndex().catch(function () {});
  }
  function close(restore) {
    if (!dlg || !dlg.open) return;
    dlg.close();
    done();
    if (restore) btn.focus();
  }
  function done() {
    document.documentElement.classList.remove('fl-m404-on');
    btn.setAttribute('aria-expanded', 'false');
  }
  btn.addEventListener('click', function () { if (dlg && dlg.open) close(true); else open(); });

  // ---- keyboard: Tab stays inside, arrows walk the results, Escape closes (native "cancel") ----
  function focusables() {
    return Array.prototype.slice.call(dlg.querySelectorAll('button, a[href], input')).filter(function (n) {
      return !n.disabled && n.getClientRects().length > 0 && !n.closest('[hidden]');
    });
  }
  function onKey(e) {
    if (e.key === 'Tab') {
      var f = focusables(), i = f.indexOf(document.activeElement);
      if (f.length) {
        e.preventDefault();
        f[(i < 0 ? 0 : i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !resBox.hidden) {
      var hits = Array.prototype.slice.call(resList.querySelectorAll('a'));
      var j = hits.indexOf(document.activeElement);
      if (e.target === field && e.key === 'ArrowDown' && hits.length) { e.preventDefault(); hits[0].focus(); }
      else if (j >= 0) {
        e.preventDefault();
        if (e.key === 'ArrowDown') (hits[j + 1] || fullBtn).focus();
        else (j ? hits[j - 1] : field).focus();
      }
    }
    // the theme's own shortcuts ("/", "s", "f"...) must not fire while typing here
    if (e.key !== 'Escape') e.stopPropagation();
  }

  // ---- free search in the index of the page language ----
  var idx = null, idxP = null, qT = 0;
  var BOOST = { 'guide/': 2, 'faq/': 1.5, 'glossary/': 1.2, 'server/all-settings/': 0.5 };
  var ENT = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };
  function clean(s) {
    return String(s || '').replace(/<[^>]*>/g, ' ').replace(/&(amp|lt|gt|quot|#39|nbsp);/g, function (m, k) { return ENT[k]; }).replace(/\s+/g, ' ').trim();
  }
  function norm1(c) { var n = c.normalize ? c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() : c.toLowerCase(); return n.length === 1 ? n : (c.toLowerCase().charAt(0) || ' '); }
  function norm(s) { var o = ''; for (var i = 0; i < s.length; i++) o += norm1(s.charAt(i)); return o; }   // same length as s: positions stay valid
  var SPLIT = /[^\p{L}\p{N}]+/u, LETTER = /[\p{L}\p{N}]/u;
  function words(s) { return norm(s).split(SPLIT).filter(Boolean); }
  function loadIndex() {
    if (idx) return Promise.resolve(idx);
    if (idxP) return idxP;
    idxP = fetch(SITE + LP + 'search/search_index.json', { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error('index ' + r.status);
      return r.json();
    }).then(function (data) {
      var pages = {}, out = [];
      (data.docs || []).forEach(function (d) {
        var loc = String(d.location || ''), page = loc.split('#')[0], t = clean(d.title), x = clean(d.text);
        if (!pages[page] && t) pages[page] = t;
        if (!t && !x) return;
        var rel = page.replace(/^(es|fr|de|it|pl|uk|hr)\//, '');
        out.push({ loc: loc, page: page, t: t, x: x, nx: norm(x), tw: words(t), xw: words(x), b: BOOST[rel] || 1 });
      });
      out.forEach(function (it) { it.pt = pages[it.page] || ''; });
      idx = out; idxP = null;
      if (typing) typed();
      return idx;
    }, function (err) { idxP = null; throw err; });
    return idxP;
  }
  function hit(w, t) {
    if (w === t) return 2;
    if (w.indexOf(t) === 0) return 1;
    if (t.length >= 5 && w.length >= 4 && w.length >= t.length - 2 && t.indexOf(w) === 0) return 1;   // plural typed, singular on the page
    return 0;
  }
  function search(q) {
    var terms = words(q).filter(function (t, i, a) { return t.length >= 2 && a.indexOf(t) === i; });
    if (!terms.length) return { terms: [], list: [] };
    var scored = [];
    idx.forEach(function (it) {
      var s = 0, got = 0;
      terms.forEach(function (t) {
        var a = 0, b = 0, k;
        for (k = 0; k < it.tw.length; k++) a = Math.max(a, hit(it.tw[k], t));
        for (k = 0; k < it.xw.length && b < 6; k++) if (hit(it.xw[k], t)) b++;
        if (a || b) got++;
        s += (a === 2 ? 12 : a ? 8 : 0) + b * 1.5;
      });
      if (!got) return;
      s *= Math.pow(got / terms.length, 2) * it.b;
      scored.push([s, it]);
    });
    scored.sort(function (p, q2) { return q2[0] - p[0]; });
    var list = [], per = {};
    for (var i = 0; i < scored.length && list.length < 6; i++) {
      var it = scored[i][1];
      per[it.page] = (per[it.page] || 0) + 1;
      if (per[it.page] > 2) continue;   // two places per page at most: more pages, fewer duplicates
      list.push(it);
    }
    return { terms: terms, list: list };
  }
  function snippet(it, terms) {
    var x = it.x, nx = it.nx, pos = -1, len = 0;
    terms.forEach(function (t) {
      var from = 0, p;
      while ((p = nx.indexOf(t, from)) >= 0) {
        if (!p || !LETTER.test(nx.charAt(p - 1))) { if (pos < 0 || p < pos) { pos = p; len = t.length; } break; }
        from = p + 1;
      }
    });
    var frag = document.createDocumentFragment();
    if (!x) return frag;
    if (pos < 0) { frag.appendChild(document.createTextNode(x.length > 120 ? x.slice(0, 118) + '…' : x)); return frag; }
    var a = Math.max(0, pos - 45), b = Math.min(x.length, pos + len + 75);
    if (a > 0) { var sp = x.indexOf(' ', a); if (sp > 0 && sp < pos) a = sp + 1; }
    frag.appendChild(document.createTextNode((a > 0 ? '…' : '') + x.slice(a, pos)));
    frag.appendChild(el('mark', null, x.slice(pos, pos + len)));
    frag.appendChild(document.createTextNode(x.slice(pos + len, b) + (b < x.length ? '…' : '')));
    return frag;
  }
  function typed() {
    var q = field.value.trim();
    if (q.length < 2) {
      if (typing) { typing = false; showGuided(true); render(); }
      return;
    }
    typing = true;
    showGuided(false);
    fullBtn.textContent = L.full.replace('{q}', q.length > 40 ? q.slice(0, 39) + '…' : q);
    resList.textContent = '';
    resBox.removeAttribute('data-q');
    if (!idx) {
      resStatus.textContent = L.loading;
      loadIndex().catch(function () { if (typing) { resStatus.textContent = L.err; announce(L.err); } });
      return;
    }
    var r = search(q);
    r.list.forEach(function (it) {
      var li = el('li'), a = el('a');
      a.href = SITE + it.loc;
      var t = el('span', 'fl-m404__ht');
      t.appendChild(el('b', null, it.t));
      if (it.pt && it.pt !== it.t) t.appendChild(el('small', null, it.pt));
      a.appendChild(t);
      var ex = el('span', 'fl-m404__hx');
      ex.appendChild(snippet(it, r.terms));
      a.appendChild(ex);
      li.appendChild(a); resList.appendChild(li);
    });
    resList.hidden = !r.list.length;
    resStatus.textContent = r.list.length ? L.found : L.none;
    resStatus.classList.toggle('is-none', !r.list.length);
    resBox.setAttribute('data-q', q);   // the words these results answer (read by tools/matricule404_test.mjs)
    announce(resStatus.textContent);
  }

  // ---- hand the words over to the theme's own search (full results, highlighting) ----
  function openFull(q) {
    close(false);
    var tg = document.getElementById('__search');
    var inp = document.querySelector('[data-md-component="search-query"]');
    if (!inp) return;
    if (tg && !tg.checked) { tg.checked = true; tg.dispatchEvent(new Event('change')); }
    inp.value = q || '';
    inp.focus();
    inp.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
  }
})();
