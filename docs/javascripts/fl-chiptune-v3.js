(function () {
  // Original retro-synthwave loop for the 404 invaders game, synthesised live with the Web Audio API: no audio file, no sample,
  // no third-party tune. Melody, chords, bass line and drum pattern are written from scratch in the 80s action-game style
  // (pumping 16th-note bass, four-on-the-floor kick, gated-reverb snare, detuned saw pad and lead, dotted echo, sidechain
  // pump), so there is nothing to license. D minor, sixteen bars (verse + chorus), looping; it speeds up with every level.
  // window.flMusic: start(getLevel), stop(), sfx(), volume(v), mute(m).
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { window.flMusic = { start: function () {}, stop: function () {}, sfx: function () {}, volume: function () {}, mute: function () {} }; return; }

  var ctx = null, master = null, comp = null, pump = null, dly = null, verb = null, noise = null, timer = 0, step = 0, nextT = 0, getLevel = null;
  var vol = .5, muted = false, running = false;

  // sixteen bars: bass root (MIDI), minor flag, and the lead as [step, semitones above D5, length in steps]
  var BARS = [
    // verse
    { r: 38, m: 1, l: [[0, 7, 3], [3, 5, 1], [4, 3, 4], [8, 0, 2], [10, 3, 2], [12, 5, 4]] },
    { r: 34, m: 0, l: [[0, 3, 3], [3, 0, 1], [4, -2, 4], [8, 0, 2], [10, 3, 2], [12, 5, 4]] },
    { r: 41, m: 0, l: [[0, 7, 3], [3, 10, 1], [4, 12, 4], [8, 10, 2], [10, 7, 2], [12, 3, 4]] },
    { r: 36, m: 0, l: [[0, 10, 3], [3, 7, 1], [4, 5, 4], [8, 2, 2], [10, 5, 2], [12, 7, 4]] },
    { r: 38, m: 1, l: [[0, 12, 3], [3, 10, 1], [4, 7, 4], [8, 10, 2], [10, 12, 2], [12, 14, 4]] },
    { r: 34, m: 0, l: [[0, 15, 3], [3, 12, 1], [4, 10, 4], [8, 8, 2], [10, 10, 2], [12, 12, 4]] },
    { r: 43, m: 1, l: [[0, 12, 3], [3, 8, 1], [4, 5, 4], [8, 8, 2], [10, 12, 2], [12, 15, 4]] },
    { r: 45, m: 0, l: [[0, 14, 3], [3, 11, 1], [4, 7, 4], [8, 11, 2], [10, 14, 2], [12, 19, 2], [14, 17, 2]] },
    // chorus
    { r: 38, m: 1, l: [[0, 14, 2], [2, 12, 2], [4, 14, 2], [6, 17, 2], [8, 19, 4], [12, 17, 2], [14, 14, 2]] },
    { r: 34, m: 0, l: [[0, 15, 2], [2, 12, 2], [4, 15, 2], [6, 17, 2], [8, 20, 4], [12, 17, 2], [14, 15, 2]] },
    { r: 43, m: 1, l: [[0, 17, 2], [2, 15, 2], [4, 12, 2], [6, 15, 2], [8, 17, 4], [12, 20, 4]] },
    { r: 45, m: 0, l: [[0, 19, 2], [2, 17, 2], [4, 14, 2], [6, 11, 2], [8, 14, 8]] },
    { r: 38, m: 1, l: [[0, 19, 4], [4, 17, 2], [6, 14, 2], [8, 17, 4], [12, 14, 4]] },
    { r: 34, m: 0, l: [[0, 15, 4], [4, 12, 2], [6, 10, 2], [8, 12, 4], [12, 15, 4]] },
    { r: 36, m: 0, l: [[0, 14, 4], [4, 10, 2], [6, 14, 2], [8, 17, 4], [12, 14, 2], [14, 12, 2]] },
    { r: 45, m: 0, l: [[0, 11, 2], [2, 14, 2], [4, 17, 2], [6, 19, 2], [8, 19, 4], [12, 17, 2], [14, 11, 2]] }
  ];
  var LEAD = []; // per bar, per step: [semitones, length] or undefined
  BARS.forEach(function (b, i) { LEAD[i] = []; b.l.forEach(function (n) { LEAD[i][n[0]] = [n[1], n[2]]; }); });
  var ARP = [0, 1, 2, 3, 2, 1, 2, 3];

  function hz(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function level() { var l = 1; try { l = getLevel ? getLevel() : 1; } catch (e) {} return Math.max(1, Math.min(10, l | 0 || 1)); }
  function bpm() { return Math.min(158, 118 + 4 * (level() - 1)); }

  function level2gain() { return muted ? 0 : vol * vol * .6; }

  // generic voice: one or several detuned oscillators, lowpass, attack / hold / release, sent to `bus` (default: the pumped mix)
  function voice(type, f, t, dur, peak, lp, o) {
    o = o || {};
    var g = ctx.createGain(), fl = ctx.createBiquadFilter(), det = o.det || [0], atk = o.atk || .008, rel = o.rel || .06;
    fl.type = 'lowpass'; fl.frequency.value = lp || 3000; fl.Q.value = o.q || .5;
    if (o.sweep) { fl.frequency.setValueAtTime(lp * 2.2, t); fl.frequency.exponentialRampToValueAtTime(lp * .6, t + dur); }
    for (var i = 0; i < det.length; i++) {
      var os = ctx.createOscillator(); os.type = type; os.frequency.setValueAtTime(f, t); os.detune.value = det[i];
      os.connect(fl); os.start(t); os.stop(t + dur + rel + .03);
    }
    var p = peak / det.length;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(p, t + atk);
    g.gain.setValueAtTime(p * (o.sus == null ? 1 : o.sus), t + Math.max(atk, dur - rel)); g.gain.linearRampToValueAtTime(0, t + dur + rel);
    fl.connect(g);
    g.connect(o.bus || pump);
    if (o.echo) { var s = ctx.createGain(); s.gain.value = o.echo; g.connect(s); s.connect(dly); }
    return g;
  }
  function kick(t) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(165, t); o.frequency.exponentialRampToValueAtTime(44, t + .11);
    g.gain.setValueAtTime(.62, t); g.gain.exponentialRampToValueAtTime(.001, t + .2);
    o.connect(g); g.connect(comp); o.start(t); o.stop(t + .24);
  }
  function tom(t, f) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * .45, t + .16);
    g.gain.setValueAtTime(.4, t); g.gain.exponentialRampToValueAtTime(.001, t + .2);
    o.connect(g); g.connect(comp); o.start(t); o.stop(t + .24);
  }
  function hit(t, dur, peak, type, f, send) {
    var s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise; fl.type = type; fl.frequency.value = f;
    g.gain.setValueAtTime(peak, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    s.connect(fl); fl.connect(g); g.connect(comp);
    if (send) { var v = ctx.createGain(); v.gain.value = send; g.connect(v); v.connect(verb); }
    s.start(t); s.stop(t + dur + .02);
  }
  function snare(t) {
    hit(t, .2, .3, 'bandpass', 2100, .9);
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(230, t); o.frequency.exponentialRampToValueAtTime(130, t + .08);
    g.gain.setValueAtTime(.22, t); g.gain.exponentialRampToValueAtTime(.001, t + .12);
    o.connect(g); g.connect(comp); o.start(t); o.stop(t + .15);
  }
  // sidechain-style pump: the pad, arp and lead duck on every kick
  function duck(t, sd) {
    pump.gain.cancelScheduledValues(t); pump.gain.setValueAtTime(.38, t); pump.gain.linearRampToValueAtTime(1, t + sd * 3.2);
  }

  function play(i, t, sd) {
    var bi = (i >> 4) & 15, bar = BARS[bi], s = i & 15, chorus = bi >= 8;
    var iv = bar.m ? [0, 3, 7, 12] : [0, 4, 7, 12];

    // drums: four on the floor, snare on 2 and 4, open hats on the off-beats, a tom fill closing each half
    if (s % 4 === 0) { kick(t); duck(t, sd); }
    if (s === 4 || s === 12) snare(t);
    if (s % 4 === 2) hit(t, .09, .09, 'highpass', 8000);
    else if (s % 2 === 1) hit(t, .03, .03, 'highpass', 9000);
    if ((bi === 7 || bi === 15) && s >= 12) tom(t, [220, 180, 150, 120][s - 12]);

    // bass: pumping 16ths, octave pop on the off-beat, accent on the beat
    var bn = bar.r + (s % 4 === 2 ? 12 : 0);
    voice('sawtooth', hz(bn), t, sd * .85, s % 4 === 0 ? .3 : .21, 650, { atk: .004, rel: .03, bus: comp });

    // pad: a detuned saw chord held for the whole bar, opening up in the chorus
    if (s === 0) {
      for (var k = 0; k < 3; k++) voice('sawtooth', hz(bar.r + 24 + iv[k]), t, sd * 15, chorus ? .1 : .07, chorus ? 1700 : 1100, { det: [-9, 9], atk: .18, rel: .35 });
    }

    // arpeggio on top (halfway through the verse, all through the chorus), with the echo
    if (chorus || bi >= 4) voice('sawtooth', hz(bar.r + 36 + iv[ARP[s >> 1 & 7] ]), t, sd * .9, .05, 2400, { atk: .004, rel: .04, echo: .45, sweep: true });

    // lead: two detuned saws, soft echo
    var ln = LEAD[bi][s];
    if (ln) voice('sawtooth', hz(74 + ln[0]), t, sd * ln[1] * .96, chorus ? .15 : .12, 3600, { det: [-8, 8], atk: .012, rel: .09, echo: .5, sus: .8, q: 1.2 });
  }

  function tick() {
    if (!running || !ctx) return;
    var sd = 60 / bpm() / 4;
    dly.delayTime.setTargetAtTime(sd * 3, ctx.currentTime, .1); // dotted eighth
    while (nextT < ctx.currentTime + .22) { play(step, nextT, sd); nextT += sd; step = (step + 1) & 255; }
  }

  function setGain() { if (master && ctx) master.gain.setTargetAtTime(level2gain(), ctx.currentTime, .03); }

  function resume() { if (ctx && ctx.state === 'suspended' && !document.hidden) { try { ctx.resume(); } catch (e) {} } }

  function build() {
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = level2gain();
    comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 5; comp.connect(master); master.connect(ctx.destination);
    pump = ctx.createGain(); pump.connect(comp);
    // echo: dotted eighth, darkening on every repeat
    dly = ctx.createDelay(1.5); dly.delayTime.value = .36;
    var fb = ctx.createGain(), lp = ctx.createBiquadFilter(), wet = ctx.createGain();
    fb.gain.value = .38;
    lp.type = 'lowpass'; lp.frequency.value = 2300; wet.gain.value = .5;
    dly.connect(lp); lp.connect(fb); fb.connect(dly); lp.connect(wet); wet.connect(comp);
    noise = ctx.createBuffer(1, ctx.sampleRate >> 1, ctx.sampleRate);
    var d = noise.getChannelData(0); for (var k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1;
    // short bright room for the snare (decaying noise)
    var n = Math.floor(ctx.sampleRate * .5), ir = ctx.createBuffer(2, n, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var x = ir.getChannelData(c); for (var q = 0; q < n; q++) x[q] = (Math.random() * 2 - 1) * Math.pow(1 - q / n, 3); }
    verb = ctx.createConvolver(); verb.buffer = ir;
    var vg = ctx.createGain(); vg.gain.value = .7; verb.connect(vg); vg.connect(comp);
  }

  function start(lv) {
    if (running) return;
    getLevel = lv || null;
    try {
      if (!ctx) build();
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
    [76, 81, 88, 93].forEach(function (m, i) { voice('square', hz(m), t + i * .07, .1, .16, 3200, { atk: .004, rel: .06, bus: comp }); });
  }

  window.flMusic = {
    start: start, stop: stop, sfx: sfx,
    volume: function (v) { vol = Math.max(0, Math.min(1, v)); setGain(); },
    mute: function (m) { muted = !!m; setGain(); }
  };
})();
