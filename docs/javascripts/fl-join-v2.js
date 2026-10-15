(function () {
  var M = {
    en: 'IP copied: ', fr: 'IP copiée : ', de: 'IP kopiert: ',
    es: 'IP copiada: ', it: 'IP copiato: ', uk: 'IP скопійовано: ', hr: 'IP adresa kopirana: '
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var msg = M[lang] || M.en;
  var KEY = 'fl-ip-copied';

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, ko) {
      var a = document.createElement('textarea'); a.value = text; a.style.position = 'fixed'; a.style.opacity = '0';
      document.body.appendChild(a); a.select();
      try { document.execCommand('copy') ? ok() : ko(); } catch (e) { ko(e); } a.remove();
    });
  }

  // Home "Join" button: copy the server IP, then go to the join steps
  document.querySelectorAll('a.fl-join').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      if (ev.button || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
      var ip = a.getAttribute('data-copy');
      var href = a.href, gone = false;
      function go() { if (!gone) { gone = true; location.href = href; } }
      ev.preventDefault();
      copy(ip).then(function () { try { sessionStorage.setItem(KEY, ip + '|' + Date.now()); } catch (e) {} go(); }, go);
      setTimeout(go, 400);
    });
  });

  // Join page: confirm the copy with a short toast
  var v = null;
  try { v = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (e) {}
  if (v) {
    var p = v.split('|');
    if (Date.now() - Number(p[1]) < 15000) {
      var t = document.createElement('div');
      t.className = 'fl-toast'; t.setAttribute('role', 'status');
      t.textContent = msg + p[0];
      document.body.appendChild(t);
      requestAnimationFrame(function () { t.classList.add('is-on'); });
      setTimeout(function () { t.classList.remove('is-on'); setTimeout(function () { t.remove(); }, 400); }, 3200);
    }
  }
})();
