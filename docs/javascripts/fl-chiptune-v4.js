(function () {
  // Original music for the 404 games, synthesised live with the Web Audio API: no audio file, no sample, no third-party tune.
  // Everything (melodies, chords, bass lines, drum patterns) is written from scratch, so there is nothing to license.
  //   'snake'    : retro-synthwave in D minor, 16 bars (pumping 16th bass, four on the floor, detuned saws, dotted echo).
  //   'invaders' : dark "Killbox" industrial in E phrygian, 16 bars (countdown ticks, gritty chugging riff, sub bass, siren, drone).
  // Both speed up with the level they are given. window.flMusic: start(getLevel, song), stop(), sfx(kind), volume(v), mute(m),
  // bar(container) which adds the speaker button and the volume slider (the choice is kept in this browser).
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { window.flMusic = { start: function () {}, stop: function () {}, sfx: function () {}, volume: function () {}, mute: function () {}, bar: function () {} }; return; }

  var ctx = null, master = null, comp = null, pump = null, grit = null, dly = null, verb = null, noise = null;
  var timer = 0, step = 0, nextT = 0, getLevel = null, cur = 'invaders', vol = .7, muted = false, running = false;
  var N = null;

  function hz(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function level() { var l = 1; try { l = getLevel ? getLevel() : 1; } catch (e) {} return Math.max(1, Math.min(10, l | 0 || 1)); }
  function level2gain() { return muted ? 0 : vol * vol * .5; }

  // ---- voices -----------------------------------------------------------------------------------------------------------
  // one or several detuned oscillators, lowpass, attack / hold / release; `bus` defaults to the pumped mix, `echo` adds a send
  // to the delay, `sweep` closes the filter during the note, `to` glides the pitch to that frequency
  function voice(type, f, t, dur, peak, lp, o) {
    o = o || {};
    var g = ctx.createGain(), fl = ctx.createBiquadFilter(), det = o.det || [0], atk = o.atk || .008, rel = o.rel || .06;
    fl.type = 'lowpass'; fl.frequency.value = lp || 3000; fl.Q.value = o.q || .5;
    if (o.sweep) { fl.frequency.setValueAtTime(lp * 2.2, t); fl.frequency.exponentialRampToValueAtTime(lp * .6, t + dur); }
    for (var i = 0; i < det.length; i++) {
      var os = ctx.createOscillator(); os.type = type; os.frequency.setValueAtTime(f, t); os.detune.value = det[i];
      if (o.to) os.frequency.exponentialRampToValueAtTime(o.to, t + dur);
      os.connect(fl); os.start(t); os.stop(t + dur + rel + .03);
    }
    var p = peak / det.length;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(p, t + atk);
    g.gain.setValueAtTime(p * (o.sus == null ? 1 : o.sus), t + Math.max(atk, dur - rel)); g.gain.linearRampToValueAtTime(0, t + dur + rel);
    fl.connect(g);
    g.connect(o.bus || pump);
    if (o.echo) { var s = ctx.createGain(); s.gain.value = o.echo; g.connect(s); s.connect(dly); }
  }
  function kick(t, deep) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(deep ? 130 : 165, t); o.frequency.exponentialRampToValueAtTime(deep ? 38 : 44, t + (deep ? .15 : .11));
    g.gain.setValueAtTime(.62, t); g.gain.exponentialRampToValueAtTime(.001, t + (deep ? .3 : .2));
    o.connect(g); g.connect(comp); o.start(t); o.stop(t + .34);
  }
  function tom(t, f) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * .45, t + .16);
    g.gain.setValueAtTime(.4, t); g.gain.exponentialRampToValueAtTime(.001, t + .2);
    o.connect(g); g.connect(comp); o.start(t); o.stop(t + .24);
  }
  function hit(t, dur, peak, type, f, send, q) {
    var s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise; fl.type = type; fl.frequency.value = f; if (q) fl.Q.value = q;
    g.gain.setValueAtTime(peak, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    s.connect(fl); fl.connect(g); g.connect(comp);
    if (send) { var v = ctx.createGain(); v.gain.value = send; g.connect(v); v.connect(verb); }
    s.start(t); s.stop(t + dur + .02);
  }
  function snare(t, hard) {
    hit(t, hard ? .26 : .2, hard ? .36 : .3, 'bandpass', hard ? 1700 : 2100, .9);
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(hard ? 190 : 230, t); o.frequency.exponentialRampToValueAtTime(110, t + .08);
    g.gain.setValueAtTime(.22, t); g.gain.exponentialRampToValueAtTime(.001, t + .12);
    o.connect(g); g.connect(comp); o.start(t); o.stop(t + .15);
  }
  // sidechain-style pump: the pad, arp and lead duck on every kick
  function duck(t, sd) {
    pump.gain.cancelScheduledValues(t); pump.gain.setValueAtTime(.38, t); pump.gain.linearRampToValueAtTime(1, t + sd * 3.2);
  }

  // ---- song 1: snake, retro-synthwave in D minor --------------------------------------------------------------------------
  // sixteen bars: bass root (MIDI), minor flag, and the lead as [step, semitones above D5, length in steps]
  var SYNTH = [
    { r: 38, m: 1, l: [[0, 7, 3], [3, 5, 1], [4, 3, 4], [8, 0, 2], [10, 3, 2], [12, 5, 4]] },
    { r: 34, m: 0, l: [[0, 3, 3], [3, 0, 1], [4, -2, 4], [8, 0, 2], [10, 3, 2], [12, 5, 4]] },
    { r: 41, m: 0, l: [[0, 7, 3], [3, 10, 1], [4, 12, 4], [8, 10, 2], [10, 7, 2], [12, 3, 4]] },
    { r: 36, m: 0, l: [[0, 10, 3], [3, 7, 1], [4, 5, 4], [8, 2, 2], [10, 5, 2], [12, 7, 4]] },
    { r: 38, m: 1, l: [[0, 12, 3], [3, 10, 1], [4, 7, 4], [8, 10, 2], [10, 12, 2], [12, 14, 4]] },
    { r: 34, m: 0, l: [[0, 15, 3], [3, 12, 1], [4, 10, 4], [8, 8, 2], [10, 10, 2], [12, 12, 4]] },
    { r: 43, m: 1, l: [[0, 12, 3], [3, 8, 1], [4, 5, 4], [8, 8, 2], [10, 12, 2], [12, 15, 4]] },
    { r: 45, m: 0, l: [[0, 14, 3], [3, 11, 1], [4, 7, 4], [8, 11, 2], [10, 14, 2], [12, 19, 2], [14, 17, 2]] },
    { r: 38, m: 1, l: [[0, 14, 2], [2, 12, 2], [4, 14, 2], [6, 17, 2], [8, 19, 4], [12, 17, 2], [14, 14, 2]] },
    { r: 34, m: 0, l: [[0, 15, 2], [2, 12, 2], [4, 15, 2], [6, 17, 2], [8, 20, 4], [12, 17, 2], [14, 15, 2]] },
    { r: 43, m: 1, l: [[0, 17, 2], [2, 15, 2], [4, 12, 2], [6, 15, 2], [8, 17, 4], [12, 20, 4]] },
    { r: 45, m: 0, l: [[0, 19, 2], [2, 17, 2], [4, 14, 2], [6, 11, 2], [8, 14, 8]] },
    { r: 38, m: 1, l: [[0, 19, 4], [4, 17, 2], [6, 14, 2], [8, 17, 4], [12, 14, 4]] },
    { r: 34, m: 0, l: [[0, 15, 4], [4, 12, 2], [6, 10, 2], [8, 12, 4], [12, 15, 4]] },
    { r: 36, m: 0, l: [[0, 14, 4], [4, 10, 2], [6, 14, 2], [8, 17, 4], [12, 14, 2], [14, 12, 2]] },
    { r: 45, m: 0, l: [[0, 11, 2], [2, 14, 2], [4, 17, 2], [6, 19, 2], [8, 19, 4], [12, 17, 2], [14, 11, 2]] }
  ];
  var ARP = [0, 1, 2, 3, 2, 1, 2, 3];

  function playSynth(i, t, sd) {
    var bi = (i >> 4) & 15, bar = SYNTH[bi], s = i & 15, chorus = bi >= 8, ln = bar.lead && bar.lead[s];
    var iv = bar.m ? [0, 3, 7, 12] : [0, 4, 7, 12];
    if (!bar.lead) { bar.lead = []; bar.l.forEach(function (n) { bar.lead[n[0]] = [n[1], n[2]]; }); ln = bar.lead[s]; }

    // drums: four on the floor, snare on 2 and 4, open hats on the off-beats, a tom fill closing each half
    if (s % 4 === 0) { kick(t); duck(t, sd); }
    if (s === 4 || s === 12) snare(t);
    if (s % 4 === 2) hit(t, .09, .09, 'highpass', 8000);
    else if (s % 2 === 1) hit(t, .03, .03, 'highpass', 9000);
    if ((bi === 7 || bi === 15) && s >= 12) tom(t, [220, 180, 150, 120][s - 12]);

    // bass: pumping 16ths, octave pop on the off-beat, accent on the beat
    voice('sawtooth', hz(bar.r + (s % 4 === 2 ? 12 : 0)), t, sd * .85, s % 4 === 0 ? .3 : .21, 650, { atk: .004, rel: .03, bus: comp });

    // pad: a detuned saw chord held for the whole bar, opening up in the chorus
    if (s === 0) for (var k = 0; k < 3; k++) voice('sawtooth', hz(bar.r + 24 + iv[k]), t, sd * 15, chorus ? .1 : .07, chorus ? 1700 : 1100, { det: [-9, 9], atk: .18, rel: .35 });

    // arpeggio on top (halfway through the first half, all through the chorus), with the echo
    if (chorus || bi >= 4) voice('sawtooth', hz(bar.r + 36 + iv[ARP[(s >> 1) & 7]]), t, sd * .9, .05, 2400, { atk: .004, rel: .04, echo: .45, sweep: true });

    // lead: two detuned saws, soft echo
    if (ln) voice('sawtooth', hz(74 + ln[0]), t, sd * ln[1] * .96, chorus ? .15 : .12, 3600, { det: [-8, 8], atk: .012, rel: .09, echo: .5, sus: .8, q: 1.2 });
  }

  // ---- song 2: invaders, "Killbox" ----------------------------------------------------------------------------------------
  // The arena countdown: a ticking timer that speeds up, a heavy syncopated kick, a gritty palm-muted riff on the root, a sub
  // bass, a cold dissonant drone (root against its minor second) and a two-tone siren. E phrygian. Bars 0-7 build, 8-15 hit hard.
  // r = bass root (MIDI); l = lead as [step, semitones above E5, length in steps]
  var KILL = [
    { r: 40 }, { r: 40 }, { r: 41 }, { r: 40 },
    { r: 40, l: [[0, 0, 8], [8, 1, 8]] }, { r: 40, l: [[0, 0, 8], [8, 3, 8]] }, { r: 38, l: [[0, -2, 8], [8, -4, 8]] }, { r: 41, l: [[0, 1, 8], [8, 0, 4], [12, -5, 4]] },
    { r: 40, l: [[0, 0, 2], [2, 1, 2], [4, 0, 2], [6, -2, 2], [8, 0, 4], [12, -4, 2], [14, -5, 2]] },
    { r: 36, l: [[0, -4, 2], [2, -2, 2], [4, -4, 2], [6, -5, 2], [8, -4, 6], [14, -2, 2]] },
    { r: 38, l: [[0, -2, 2], [2, 0, 2], [4, -2, 2], [6, -4, 2], [8, -5, 4], [12, -2, 4]] },
    { r: 41, l: [[0, 1, 2], [2, 3, 2], [4, 1, 2], [6, 0, 2], [8, -4, 4], [12, 0, 2], [14, 1, 2]] },
    { r: 40, l: [[0, 7, 4], [4, 5, 2], [6, 3, 2], [8, 1, 4], [12, 0, 4]] },
    { r: 36, l: [[0, 8, 4], [4, 7, 2], [6, 5, 2], [8, 3, 4], [12, 0, 4]] },
    { r: 41, l: [[0, 8, 2], [2, 7, 2], [4, 5, 2], [6, 3, 2], [8, 1, 4], [12, 3, 2], [14, 5, 2]] },
    { r: 35, l: [[0, 7, 2], [2, 3, 2], [4, 0, 2], [6, -5, 2], [8, -5, 2], [10, -2, 2], [12, 0, 2], [14, 7, 2]] }
  ];
  var RIFF1 = [0, N, 0, 0, N, 0, 0, N, 0, N, 0, 0, N, 0, N, N];
  var RIFF2 = [0, N, 0, 0, N, 0, N, 0, 12, N, 12, N, 10, N, 7, N];
  var KICK_A = [0, 6, 8, 11], KICK_B = [0, 3, 6, 8, 11, 14];

  function playKill(i, t, sd) {
    var bi = (i >> 4) & 15, s = i & 15, bar = KILL[bi], r = bar.r, hard = bi >= 8, last = bi === 15, k;
    if (bar.l && !bar.lead) { bar.lead = []; bar.l.forEach(function (n) { bar.lead[n[0]] = [n[1], n[2]]; }); }

    // drums: heavy syncopated kick, hard snare on 2 and 4, dry metallic ticks, a clang off the beat, a snare roll into the loop
    if ((hard ? KICK_B : KICK_A).indexOf(s) >= 0) { kick(t, true); duck(t, sd); }
    if (s === 4 || s === 12) snare(t, true);
    if (last && s >= 9 && s !== 12) hit(t, .07, .1 + .016 * (s - 9), 'bandpass', 2400, .4);
    if (s % 2 === 0) hit(t, .03, .05, 'highpass', 7500);
    if (s === 10 || (hard && s === 2)) hit(t, .16, .08, 'bandpass', 4300, .3, 6);
    // the countdown: a tick every beat, every half beat in the second half, every step in the last bar
    if (s % (last ? 1 : hard ? 2 : 4) === 0) voice('sine', 1900 + (last ? s * 40 : 0), t, .02, .05, 6000, { atk: .002, rel: .02, bus: comp });

    // sub bass on the root, plus a darker saw underneath for small speakers
    if (s % 2 === 0) {
      voice('triangle', hz(r + (s % 8 === 6 ? 12 : 0)), t, sd * 1.7, .36, 420, { atk: .005, rel: .05, bus: comp });
      voice('sawtooth', hz(r), t, sd * 1.7, .14, 280, { atk: .005, rel: .05, bus: comp });
    }
    // the riff: palm-muted, distorted saws one octave over the root
    var rv = ((bi & 3) === 3 ? RIFF2 : RIFF1)[s];
    if (rv !== N) voice('sawtooth', hz(r + 12 + rv), t, sd * .72, .16, 1000, { det: [-7, 7], atk: .003, rel: .03, bus: grit, sweep: true });

    // cold drone, a minor second apart; opens up in the second half
    if (s === 0) [24, 25, 31].forEach(function (x) { voice('sawtooth', hz(r + x), t, sd * 15, hard ? .06 : .045, hard ? 1100 : 700, { det: [-10, 10], atk: .5, rel: .5 }); });
    // siren: two notes a tritone apart, every fourth bar
    if (s === 0 && (bi & 3) === 2) {
      voice('square', hz(r + 48), t, sd * 7, .05, 2600, { atk: .01, rel: .06, echo: .4, to: hz(r + 54) });
      voice('square', hz(r + 54), t + sd * 8, sd * 7, .05, 2600, { atk: .01, rel: .06, echo: .4, to: hz(r + 48) });
    }
    // lead: a held, cold square in the build-up, a biting detuned saw once it hits
    var ln = bar.lead && bar.lead[s];
    if (ln) voice(hard ? 'sawtooth' : 'square', hz(76 + ln[0]), t, sd * ln[1] * .96, hard ? .13 : .08, hard ? 3200 : 2200, { det: [-10, 10], atk: hard ? .012 : .08, rel: .12, echo: .5, sus: .8, q: 1.5 });
  }

  var SONGS = {
    snake: { play: playSynth, bpm: function (l) { return Math.min(158, 118 + 4 * (l - 1)); } },
    invaders: { play: playKill, bpm: function (l) { return Math.min(162, 126 + 4 * (l - 1)); } }
  };

  // ---- engine -----------------------------------------------------------------------------------------------------------
  function tick() {
    if (!running || !ctx) return;
    var song = SONGS[cur], sd = 60 / song.bpm(level()) / 4;
    dly.delayTime.setTargetAtTime(sd * 3, ctx.currentTime, .1); // dotted eighth
    while (nextT < ctx.currentTime + .22) { song.play(step, nextT, sd); nextT += sd; step = (step + 1) & 255; }
  }

  function setGain() { if (master && ctx) master.gain.setTargetAtTime(level2gain(), ctx.currentTime, .03); }
  function resume() { if (ctx && ctx.state === 'suspended' && !document.hidden) { try { ctx.resume(); } catch (e) {} } }

  function build() {
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = level2gain();
    comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 5; comp.connect(master); master.connect(ctx.destination);
    pump = ctx.createGain(); pump.connect(comp);
    // grit: soft-clipping for the industrial riff
    var curve = new Float32Array(1024), gk;
    for (gk = 0; gk < 1024; gk++) curve[gk] = Math.tanh((gk / 511.5 - 1) * 5);
    var shaper = ctx.createWaveShaper(), gg = ctx.createGain(); shaper.curve = curve; shaper.oversample = '2x'; gg.gain.value = .55;
    grit = ctx.createGain(); grit.connect(shaper); shaper.connect(gg); gg.connect(comp);
    // echo: dotted eighth, darkening on every repeat
    dly = ctx.createDelay(1.5); dly.delayTime.value = .36;
    var fb = ctx.createGain(), lp = ctx.createBiquadFilter(), wet = ctx.createGain();
    fb.gain.value = .38; lp.type = 'lowpass'; lp.frequency.value = 2300; wet.gain.value = .5;
    dly.connect(lp); lp.connect(fb); fb.connect(dly); lp.connect(wet); wet.connect(comp);
    noise = ctx.createBuffer(1, ctx.sampleRate >> 1, ctx.sampleRate);
    var d = noise.getChannelData(0); for (var k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1;
    // short bright room for the snares (decaying noise)
    var n = Math.floor(ctx.sampleRate * .5), ir = ctx.createBuffer(2, n, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var x = ir.getChannelData(c); for (var q = 0; q < n; q++) x[q] = (Math.random() * 2 - 1) * Math.pow(1 - q / n, 3); }
    verb = ctx.createConvolver(); verb.buffer = ir;
    var vg = ctx.createGain(); vg.gain.value = .7; verb.connect(vg); vg.connect(comp);
  }

  // starts a song; asking for another one while one plays switches straight to it
  function start(lv, song) {
    song = SONGS[song] ? song : 'invaders';
    if (running && song === cur) return;
    getLevel = lv || null; cur = song;
    try {
      if (!ctx) build();
      resume();
    } catch (e) { ctx = null; return; }
    if (!running) { running = true; timer = setInterval(tick, 40); }
    step = 0; nextT = ctx.currentTime + .08; setGain();
    tick();
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

  // short jingles: 'eat' = two quick notes (a mushroom), default = rising four (airdrop and pick-up)
  function sfx(kind) {
    if (!running || !ctx || ctx.state !== 'running') return;
    var t = ctx.currentTime + .02, notes = kind === 'eat' ? [88, 95] : [76, 81, 88, 93];
    notes.forEach(function (m, i) { voice('square', hz(m), t + i * .07, .1, kind === 'eat' ? .1 : .16, 3200, { atk: .004, rel: .06, bus: comp }); });
  }

  // ---- speaker button + volume slider ----------------------------------------------------------------------------------
  var SND_KEY = 'fl-snd', ICON_ON = 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
    ICON_OFF = 'M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z';
  function bar(container) {
    var st = { v: .7, m: 0 };
    try { var o = JSON.parse(localStorage.getItem(SND_KEY) || '{}'); if (typeof o.v === 'number' && o.v >= 0 && o.v <= 1) st.v = o.v; st.m = o.m ? 1 : 0; } catch (e) {}
    var box = document.createElement('div'), btn = document.createElement('button'), rng = document.createElement('input');
    box.className = 'snd';
    btn.type = 'button'; btn.setAttribute('aria-label', 'Sound');
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d=""/></svg>';
    rng.type = 'range'; rng.min = '0'; rng.max = '100'; rng.step = '1'; rng.setAttribute('aria-label', 'Volume');
    var path = btn.querySelector('path');
    function sync() {
      var off = st.m || st.v === 0;
      path.setAttribute('d', off ? ICON_OFF : ICON_ON);
      btn.setAttribute('aria-pressed', off ? 'true' : 'false'); btn.classList.toggle('off', off);
      rng.value = String(Math.round((st.m ? 0 : st.v) * 100));
      vol = st.v; muted = !!off; setGain();
      try { localStorage.setItem(SND_KEY, JSON.stringify(st)); } catch (e) {}
    }
    btn.addEventListener('click', function () {
      if (st.v === 0) { st.v = .5; st.m = 0; } else st.m = st.m ? 0 : 1;
      sync(); if (btn.matches(':focus-visible') === false) btn.blur();
    });
    rng.addEventListener('input', function () { st.v = rng.value / 100; st.m = 0; sync(); });
    rng.addEventListener('change', function () { rng.blur(); });
    box.appendChild(btn); box.appendChild(rng);
    container.appendChild(box);
    sync();
    return box;
  }

  window.flMusic = {
    start: start, stop: stop, sfx: sfx, bar: bar,
    volume: function (v) { vol = Math.max(0, Math.min(1, v)); setGain(); },
    mute: function (m) { muted = !!m; setGain(); }
  };
})();
