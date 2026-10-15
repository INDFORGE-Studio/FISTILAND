(function () {
  // Home: the animated layers of THE SILENT ZONE, added once the page has painted. They stay light on purpose:
  // none when the data saver is on, fewer on phones and modest machines, paused when the tab is hidden, and the frame
  // rate is watched: a machine that struggles first gets two layers, then none (the poster alone is shown).
  // What a machine can bear is remembered for two days, so the test is not repeated at every visit.
  var root = document.documentElement;
  var main = document.querySelector('.md-main');
  if (!main || !document.querySelector('.fl-home') || main.querySelector('.fl-sz')) return;

  var nav = navigator, conn = nav.connection || {};
  if (conn.saveData) { root.classList.add('fl-sz-save'); return; }

  var KEY = 'fl-sz-tier', KEEP = 2 * 864e5;
  function remember(tier) { try { localStorage.setItem(KEY, tier + ':' + Date.now()); } catch (e) { /* storage blocked: carry on */ } }
  var known = '';
  try {
    var kv = (localStorage.getItem(KEY) || '').split(':');
    if ((kv[0] === 'lite' || kv[0] === 'slow') && Date.now() - Number(kv[1]) < KEEP) known = kv[0];
  } catch (e) { /* storage blocked: carry on */ }
  if (known === 'slow') { root.classList.add('fl-sz-slow'); return; }

  var small = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
  if (known === 'lite' || small || (nav.deviceMemory && nav.deviceMemory <= 4) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4)) root.classList.add('fl-sz-lite');

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'fl-sz';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<i class="z-clouds"></i><i class="z-rays"></i><i class="z-far"></i><i class="z-mid"></i><i class="z-front"></i>';
    main.insertBefore(wrap, main.firstChild);
    requestAnimationFrame(function () { requestAnimationFrame(function () { wrap.classList.add('is-on'); }); });
    setTimeout(watch, 2200);
  }

  // Frame-rate check over about 90 frames: slower than ~45 fps means fewer layers; slower than ~28 fps means none
  function watch() {
    if (root.classList.contains('fl-fx-off') || root.classList.contains('fl-sz-slow') || document.hidden) return;
    var n = 0, t0 = 0;
    function tick(ts) {
      if (document.hidden || root.classList.contains('fl-fx-off')) return;
      if (!t0) t0 = ts;
      if (++n < 90) { requestAnimationFrame(tick); return; }
      var avg = (ts - t0) / (n - 1), lite = root.classList.contains('fl-sz-lite');
      if (avg > 36) {
        root.classList.add('fl-sz-slow'); remember('slow');
      } else if (avg > 22 && !lite) {
        root.classList.add('fl-sz-lite'); remember('lite');
        setTimeout(watch, 1500);
      }
    }
    requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', function () { root.classList.toggle('fl-sz-pause', document.hidden); });

  if (document.readyState === 'complete') setTimeout(build, 150);
  else window.addEventListener('load', function () { setTimeout(build, 150); }, { once: true });
})();
