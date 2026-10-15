(function () {
  // Original chiptune loop for the 404 invaders game, synthesised live with the Web Audio API: no audio file, no sample, no
  // third-party tune, so there is nothing to license. A minor, eight bars (Am F C G Am F Dm E), looping; it speeds up a little
  // with every level. window.flMusic: start(getLevel), stop(), volume(v), mute(m).
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { window.flMusic = { start: function () {}, stop: function () {}, sfx: function () {}, volume: function () {}, mute: function () {} }; return; }

  var ctx = null, master = null, comp = null, noise = null, timer = 0, step = 0, nextT = 0, getLevel = null;
  var vol = .5, muted = false, running = false;

  // eight bars: bass root (MIDI), chord (minor / major) and the lead as semitones above A4 (null = rest)
  var N = null;
  var BARS = [
    { r: 45, m: 1, l: [7, N, N, 7, N, 3, N, 7, 12, N, N, 10, N, 7, N, N] },
    { r: 41, m: 0, l: [3, N, N, 3, N, 0, N, 3, 8, N, N, 7, N, 3, N, N] },
    { r: 48, m: 0, l: [7, N, N, 7, N, 10, N, 7, 10, N, N, 7, N, 3, N, N] },
    { r: 43, m: 0, l: [5, N, N, 5, N, 2, N, 5, 10, N, N, 5, N, 2, N, N] },
    { r: 45, m: 1, l: [7, N, 10, 12, N, 10, 7, N, 12, N, 10, N, 7, N, 3, N] },
    { r: 41, m: 0, l: [8, N, 12, N, 8, N, 3, N, 0, N, 3, N, 8, N, N, N] },
    { r: 38, m: 1, l: [5, N, 8, N, 12, N, 8, N, 5, N, 0, N, 5, N, N, N] },
    { r: 40, m: 0, l: [7, N, 11, N, 14, N, 11, N, 7, N, 11, N, 7, N, N, N] }
  ];
  var BASS_PAT = [0, N, N, 0, N, N, 0, N, 12, N, N, 0, N, N, 0, N];
  var ARP_PAT = [0, 1, 2, 1];

  function hz(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function level() { var l = 1; try { l = getLevel ? getLevel() : 1; } catch (e) {} return Math.max(1, Math.min(10, l | 0 || 1)); }
  function bpm() { return Math.min(160, 116 + 5 * (level() - 1)); }

  function level2gain() { return muted ? 0 : vol * vol * .55; }

  function tone(type, f, t, dur, peak, lp) {
    var o = ctx.createOscillator(), g = ctx.createGain(), out = g;
    o.type = type; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + .008);
    g.gain.exponentialRampToValueAtTime(.0008, t + dur);
    if (lp) { var fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); fl.connect(g); } else o.connect(g);
    g.connect(comp);
    o.start(t); o.stop(t + dur + .03);
  }
  function kick(t) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + .12);
    g.gain.setValueAtTime(.5, t); g.gain.exponentialRampToValueAtTime(.001, t + .16);
    o.connect(g); g.connect(comp); o.start(t); o.stop(t + .2);
  }
  function hit(t, dur, peak, type, f) {
    var s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise; fl.type = type; fl.frequency.value = f;
    g.gain.setValueAtTime(peak, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    s.connect(fl); fl.connect(g); g.connect(comp); s.start(t); s.stop(t + dur + .02);
  }

  function play(i, t, sd) {
    var bar = BARS[(i >> 4) & 7], s = i & 15;
    if (BASS_PAT[s] !== N) tone('triangle', hz(bar.r + BASS_PAT[s]), t, sd * 2.6, .5, 700);
    var iv = bar.m ? [0, 3, 7] : [0, 4, 7];
    if (s % 2 === 0 || s % 4 === 3) tone('square', hz(bar.r + 12 + iv[ARP_PAT[(s >> 1) % 4] % 3] + (s % 4 === 3 ? 12 : 0)), t, sd * 1.5, .06, 2400);
    var ln = bar.l[s];
    if (ln !== N) tone('square', hz(69 + ln), t, sd * 3, .13, 2800);
    if (s === 0 || s === 8) kick(t);
    if (s === 4 || s === 12) hit(t, .12, .22, 'bandpass', 1800);
    if (s % 2 === 0) hit(t, .04, .07, 'highpass', 7000);
  }

  function tick() {
    if (!running || !ctx) return;
    var sd = 60 / bpm() / 4;
    while (nextT < ctx.currentTime + .22) { play(step, nextT, sd); nextT += sd; step = (step + 1) & 127; }
  }

  function setGain() { if (master && ctx) master.gain.setTargetAtTime(level2gain(), ctx.currentTime, .03); }

  function resume() { if (ctx && ctx.state === 'suspended' && !document.hidden) { try { ctx.resume(); } catch (e) {} } }

  function start(lv) {
    if (running) return;
    getLevel = lv || null;
    try {
      if (!ctx) {
        ctx = new AC();
        master = ctx.createGain(); master.gain.value = level2gain();
        comp = ctx.createDynamicsCompressor(); comp.connect(master); master.connect(ctx.destination);
        noise = ctx.createBuffer(1, ctx.sampleRate >> 1, ctx.sampleRate);
        var d = noise.getChannelData(0); for (var k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1;
      }
      resume();
    } catch (e) { ctx = null; return; }
    running = true; step = 0; nextT = ctx.currentTime + .08; setGain();
    tick(); timer = setInterval(tick, 40);
  }
  function stop() {
    if (!running) return;
    running = false; clearInterval(timer);
    if (master && ctx) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setTargetAtTime(0, ctx.currentTime, .25); }
  }

  document.addEventListener('visibilitychange', function () {
    if (!ctx || !running) return;
    if (document.hidden) { try { ctx.suspend(); } catch (e) {} } else { nextT = Math.max(nextT, ctx.currentTime + .05); resume(); }
  });
  // a browser may keep the context suspended until the first touch / key press after the game has started
  ['pointerdown', 'keydown'].forEach(function (n) { document.addEventListener(n, function () { if (running) resume(); }, true); });

  // short rising jingle (airdrop and pick-up)
  function sfx() {
    if (!running || !ctx || ctx.state !== 'running') return;
    var t = ctx.currentTime + .02;
    [76, 81, 88, 93].forEach(function (m, i) { tone('square', hz(m), t + i * .07, .16, .16, 3200); });
  }

  window.flMusic = {
    start: start, stop: stop, sfx: sfx,
    volume: function (v) { vol = Math.max(0, Math.min(1, v)); setGain(); },
    mute: function (m) { muted = !!m; setGain(); }
  };
})();
