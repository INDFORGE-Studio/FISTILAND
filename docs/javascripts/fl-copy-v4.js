(function () {
  var L = {
    en: ['Copy the command', 'Copied'],
    fr: ['Copier la commande', 'Copié'],
    de: ['Befehl kopieren', 'Kopiert'],
    es: ['Copiar el comando', 'Copiado'],
    it: ['Copia il comando', 'Copiato'],
    uk: ['Копіювати команду', 'Скопійовано']
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var T = L[lang] || L.en;
  var ICON_COPY = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"/></svg>';
  var ICON_OK = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z"/></svg>';

  var css = '.fl-cmd{display:inline-flex;align-items:center;white-space:nowrap}' + '.fl-copy{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;margin:0 .55rem 0 0;padding:.2rem;width:1.55rem;height:1.55rem;' +
    'background:rgba(232,99,28,.12);color:#e8631c;border:1px solid rgba(232,99,28,.45);border-radius:4px;cursor:pointer;line-height:1;transition:background .15s,color .15s}' +
    '.fl-copy:hover{background:#e8631c;color:#0d0c0b}.fl-copy.fl-done{background:#3f9d5a;border-color:#3f9d5a;color:#fff}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, ko) {
      var a = document.createElement('textarea'); a.value = text; a.style.position = 'fixed'; a.style.opacity = '0';
      document.body.appendChild(a); a.select();
      try { document.execCommand('copy') ? ok() : ko(); } catch (e) { ko(e); } a.remove();
    });
  }

  document.querySelectorAll('.md-typeset table tbody tr td:first-child code').forEach(function (code) {
    var txt = code.textContent.trim();
    if (txt.charAt(0) !== '#') return;
    if (code.closest('tr').querySelector('.fl-st-no')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'fl-copy'; b.innerHTML = ICON_COPY;
    b.title = T[0]; b.setAttribute('aria-label', T[0]);
    b.addEventListener('click', function () {
      copy(txt).then(function () {
        b.classList.add('fl-done'); b.innerHTML = ICON_OK; b.title = T[1];
        setTimeout(function () { b.classList.remove('fl-done'); b.innerHTML = ICON_COPY; b.title = T[0]; }, 1500);
      });
    });
    var row = document.createElement('span'); row.className = 'fl-cmd';
    code.parentNode.insertBefore(row, code); row.appendChild(b); row.appendChild(code);
  });
})();
