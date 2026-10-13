(function () {
  var L = { en: 'Copied', fr: 'Copié', de: 'Kopiert', es: 'Copiado', it: 'Copiato', uk: 'Скопійовано' };
  var T = { en: 'Click to copy', fr: 'Cliquer pour copier', de: 'Zum Kopieren klicken', es: 'Clic para copiar', it: 'Clicca per copiare', uk: 'Натисніть, щоб скопіювати' };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var done = L[lang] || L.en, tip = T[lang] || T.en;

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, ko) {
      var a = document.createElement('textarea'); a.value = text; a.style.position = 'fixed'; a.style.opacity = '0';
      document.body.appendChild(a); a.select();
      try { document.execCommand('copy') ? ok() : ko(); } catch (e) { ko(e); } a.remove();
    });
  }

  document.querySelectorAll('.fl-ip').forEach(function (b) {
    var txt = b.getAttribute('data-copy') || b.textContent.trim();
    b.title = tip;
    b.addEventListener('click', function () {
      copy(txt).then(function () {
        b.classList.add('is-done'); b.textContent = done;
        setTimeout(function () { b.classList.remove('is-done'); b.textContent = txt; }, 1500);
      });
    });
  });
})();
