(function () {
  // Home page: slow looping fog video behind the content. The still image stays as the fallback.
  var home = document.querySelector('.fl-home');
  var main = document.querySelector('.md-main');
  if (!home || !main) return;
  var conn = navigator.connection || {};
  if (conn.saveData) return;

  var base = (location.pathname.match(/^(.*?\/FISTILAND\/)/) || ['', '/'])[1] + 'assets/home-loop-v1';
  var box = document.createElement('div');
  box.className = 'fl-bgvid';
  box.setAttribute('aria-hidden', 'true');
  var v = document.createElement('video');
  v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
  v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('disablepictureinpicture', '');
  v.setAttribute('tabindex', '-1');
  v.preload = 'auto';
  v.innerHTML = '<source src="' + base + '.webm" type="video/webm"><source src="' + base + '.mp4" type="video/mp4">';
  v.addEventListener('playing', function () { box.classList.add('is-on'); });
  box.appendChild(v);
  main.insertBefore(box, main.firstChild);
  var p = v.play();
  if (p && p.catch) p.catch(function () {});
})();
