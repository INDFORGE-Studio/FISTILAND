/* Home background: the still image comes alive (clouds, fog, trees, grass, light). WebGL, no video. */
(function () {
  var main = document.querySelector('.md-main');
  if (!main || !document.querySelector('.fl-home')) return;

  var script = document.currentScript;
  if (!script || !script.src) return;
  var imgUrl = script.src.replace(/javascripts\/[^\/]*$/, 'assets/bg-v3.jpg');
  var freeze = /[?&]flt=([\d.]+)/.exec(location.search);

  var canvas = document.createElement('canvas');
  canvas.className = 'fl-bgfx';
  canvas.setAttribute('aria-hidden', 'true');
  var gl = null;
  try {
    gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' }) ||
         canvas.getContext('experimental-webgl');
  } catch (e) { gl = null; }
  if (!gl) return;

  var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  var FS = [
    'precision highp float;',
    'uniform sampler2D uTex;uniform vec2 uRes;uniform vec2 uImg;uniform float uT;',
    'float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' float a=h21(i),b=h21(i+vec2(1.,0.)),c=h21(i+vec2(0.,1.)),d=h21(i+vec2(1.,1.));',
    ' return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*vn(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}',
    'void main(){',
    ' float t=uT;',
    ' vec2 cuv=gl_FragCoord.xy/uRes;',
    ' float ca=uRes.x/uRes.y,ia=uImg.x/uImg.y;',
    ' vec2 s=ca>ia?vec2(1.,ia/ca):vec2(ca/ia,1.);',
    ' vec2 p=(vec2(cuv.x,1.-cuv.y)-.5)*s+.5;',
    ' float zoom=1.04+.008*sin(t*.07);',
    ' p=(p-.5)/zoom+.5+vec2(.004*sin(t*.05),.003*sin(t*.037));',
    ' vec3 base=texture2D(uTex,p).rgb;',
    ' float lum=dot(base,vec3(.299,.587,.114));',
    ' float dark=1.-smoothstep(.10,.40,lum);',
    ' float tdark=1.-smoothstep(.18,.50,lum);',
    ' vec2 d=vec2(0.);',
    /* clouds roll slowly */
    ' float sky=smoothstep(.40,.18,p.y);',
    ' vec2 q=p*vec2(2.2,3.2);',
    ' d+=(vec2(fbm(q+vec2(t*.02,0.)),fbm(q+vec2(5.2,1.3)-vec2(0.,t*.015)))-.5)*.018*sky;',
    /* wind in the trees: tips bend more than the trunk base */
    ' float gust=.65+.35*sin(t*.23);',
    ' float wind=(sin(t*.9+p.y*5.)*.6+sin(t*1.7+p.x*13.)*.4)*gust;',
    ' float tr=smoothstep(.77,.82,p.x)*(1.-smoothstep(.56,.68,p.y));',
    ' float hr=pow(clamp((.66-p.y)/.66,0.,1.),1.4);',
    ' float tl=(1.-smoothstep(.16,.24,p.x))*(1.-smoothstep(.26,.34,p.y));',
    ' float hl=pow(clamp((.32-p.y)/.32,0.,1.),1.4);',
    ' float tm=smoothstep(.60,.63,p.x)*(1.-smoothstep(.70,.73,p.x))*(1.-smoothstep(.50,.58,p.y))*smoothstep(.22,.30,p.y);',
    ' float hm=pow(clamp((.56-p.y)/.30,0.,1.),1.4);',
    ' d.x+=.0042*wind*tdark*(tr*hr+tl*hl*.8+tm*hm*.7);',
    /* grass and brush at the bottom */
    ' float rigid=(1.-smoothstep(.40,.46,p.x))*(1.-smoothstep(.72,.80,p.y));',
    ' float gm=smoothstep(.64,.78,p.y)*dark*(1.-rigid);',
    ' float gh=clamp((1.-p.y)/.34,0.,1.);',
    ' float gs=sin(t*1.3+p.x*22.+p.y*9.)*.5+sin(t*2.1+p.x*37.)*.5;',
    ' d.x+=.0032*gs*gm*(.5+.5*gust)*(.4+.6*gh);',
    ' d.y+=.0008*sin(t*1.6+p.x*29.)*gm;',
    /* ivy on the bunker */
    ' float gr=smoothstep(.02,.07,base.g-max(base.r,base.b));',
    ' float ivy=gr*(1.-smoothstep(.55,.65,p.x))*smoothstep(.10,.20,p.y)*(1.-smoothstep(.65,.75,p.y));',
    ' d+=vec2(sin(t*1.1+p.y*30.+p.x*20.),sin(t*.9+p.x*25.))*.0014*ivy;',
    ' vec3 col=texture2D(uTex,p+d).rgb;',
    /* drifting fog: a mid-height bank and a ground layer */
    ' float cx=1.-smoothstep(.25,.75,abs(p.x-.5));',
    ' vec2 fp=p*vec2(3.,2.2);',
    ' float f1=fbm(fp+vec2(t*.035,0.));',
    ' float f2=fbm(fp*1.7+vec2(-t*.05,t*.01)+7.1);',
    ' float fog=smoothstep(.32,.78,f1*.6+f2*.5);',
    ' float fm=smoothstep(.34,.60,p.y)*(1.-smoothstep(.80,.95,p.y));',
    ' col=mix(col,vec3(.46,.51,.55),fog*fm*(.15+.12*cx));',
    ' float g1=fbm(p*vec2(2.4,4.)+vec2(-t*.045,t*.012)+3.3);',
    ' float gfog=smoothstep(.38,.80,g1)*smoothstep(.62,.78,p.y)*(1.-smoothstep(.93,1.,p.y));',
    ' col=mix(col,vec3(.30,.34,.37),gfog*(.22+.14*cx));',
    /* light rays breathe, clouds change brightness */
    ' float cone=smoothstep(.55,0.,length((p-vec2(.50,.22))*vec2(1.,.9)));',
    ' float ray=fbm(vec2(p.x*9.+t*.03,p.y*1.2));',
    ' col*=1.+cone*(.05*(.5+.5*sin(t*.35))+.10*(ray-.5));',
    ' col*=1.+.10*(fbm(p*vec2(2.5,4.)+vec2(t*.012,0.))-.5)*sky;',
    ' col+=(h21(gl_FragCoord.xy+fract(t))-.5)/255.;',
    ' gl_FragColor=vec4(col,1.);',
    '}'
  ].join('\n');

  function shader(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { if (window.console) console.warn(gl.getShaderInfoLog(sh)); return null; }
    return sh;
  }
  var vs = shader(gl.VERTEX_SHADER, VS), fs = shader(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  var prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, 'uRes'), uImg = gl.getUniformLocation(prog, 'uImg'), uT = gl.getUniformLocation(prog, 'uT');
  var started = false, alive = true, last = 0, t0 = performance.now(), imgW = 1920, imgH = 1072;

  function resize() {
    var w = main.clientWidth, h = main.clientHeight;
    if (!w || !h) return;
    var k = Math.min(1, 1600 / Math.max(w, h));
    var cw = Math.max(2, Math.round(w * k)), ch = Math.max(2, Math.round(h * k));
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function draw(now) {
    var sec = freeze ? parseFloat(freeze[1]) : (now - t0) / 1000;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform2f(uImg, imgW, imgH);
    gl.uniform1f(uT, sec);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!started) { started = true; document.documentElement.classList.add('fl-live'); }
  }

  function loop(now) {
    if (!alive) return;
    window.requestAnimationFrame(loop);
    if (now - last < 33) return;
    last = now;
    draw(now);
  }

  canvas.addEventListener('webglcontextlost', function (e) {
    e.preventDefault(); alive = false; document.documentElement.classList.remove('fl-live');
  });

  var img = new Image();
  img.onload = function () {
    imgW = img.naturalWidth; imgH = img.naturalHeight;
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    main.insertBefore(canvas, main.firstChild);
    resize();
    window.addEventListener('resize', resize);
    if (window.ResizeObserver) new ResizeObserver(resize).observe(main);
    if (freeze) { draw(0); } else { window.requestAnimationFrame(loop); }
  };
  img.src = imgUrl;
})();
