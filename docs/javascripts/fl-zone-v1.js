(function () {
  // Home: the animated layers of THE SILENT ZONE, added once the page has painted. They stay light on purpose:
  // fewer layers on phones and modest machines, none when the data saver is on, paused when the tab is hidden,
  // and switched off by itself if the frame rate proves too low (the poster alone is then shown).
  var root = document.documentElement;
  var main = document.querySelector('.md-main');
  if (!main || !document.querySelector('.fl-home') || main.querySelector('.fl-sz')) return;

  var nav = navigator, conn = nav.connection || {};
  if (conn.saveData) { root.classList.add('fl-sz-save'); return; }
  try { if (sessionStorage.getItem('fl-sz-slow') === '1') { root.classList.add('fl-sz-slow'); return; } } catch (e) { /* storage blocked: carry on */ }

  var small = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
  if (small || (nav.deviceMemory && nav.deviceMemory <= 4) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4)) root.classList.add('fl-sz-lite');

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'fl-sz';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<i class="z-clouds"></i><i class="z-rays"></i><i class="z-far"></i><i class="z-mid"></i><i class="z-front"></i>';
    main.insertBefore(wrap, main.firstChild);
    requestAnimationFrame(function () { requestAnimationFrame(function () { wrap.classList.add('is-on'); }); });
    setTimeout(watch, 2200);
  }

  // Frame-rate check: about 100 frames; under ~28 fps on average the layers are given up
  function watch() {
    if (root.classList.contains('fl-fx-off') || document.hidden) return;
    var n = 0, t0 = 0;
    function tick(ts) {
      if (document.hidden || root.classList.contains('fl-fx-off')) return;
      if (!t0) t0 = ts;
      if (++n < 100) { requestAnimationFrame(tick); return; }
      var avg = (ts - t0) / (n - 1);
      if (avg > 36) {
        root.classList.add('fl-sz-slow');
        try { sessionStorage.setItem('fl-sz-slow', '1'); } catch (e) { /* storage blocked */ }
      }
    }
    requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', function () { root.classList.toggle('fl-sz-pause', document.hidden); });

  if (document.readyState === 'complete') setTimeout(build, 150);
  else window.addEventListener('load', function () { setTimeout(build, 150); }, { once: true });
})();
