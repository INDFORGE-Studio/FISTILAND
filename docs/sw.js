/* FISTILAND offline copy. Pages you open are kept in your browser and open again without a connection.
   The build (tools/postbuild.py) fills in VERSION and PRECACHE; nothing here talks to another site. */
'use strict';

var VERSION = 'dev'; /* @version */
var PRECACHE = []; /* @precache */
var CACHE = 'fl-' + VERSION;
var ROOT = new URL(self.registration.scope).pathname;   // '/FISTILAND/'
var SKIP = /(\/downloads\/|\/assets\/maps\/SatMap_SCUM\.jpg$)/;
// files whose name changes when their content does (-v12.css, main.3f9a1c2e.min.js) or that never change (fonts, theme assets)
var STATIC = /(-v\d+\.[a-z0-9]+$|\.[0-9a-f]{8,}\.min\.(js|css)$|\.woff2$|\/assets\/(javascripts|stylesheets)\/)/i;

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(PRECACHE.map(function (u) {
        return c.add(new Request(ROOT + u, { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k.indexOf('fl-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function keep(req, res) {
  if (res && res.ok && res.type === 'basic') {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { return c.put(req, copy); }).catch(function () {});
  }
  return res;
}

function timed(req, ms) {
  return new Promise(function (ok, ko) {
    var t = setTimeout(function () { ko(new Error('slow')); }, ms);
    fetch(req).then(function (r) { clearTimeout(t); ok(r); }, function (x) { clearTimeout(t); ko(x); });
  });
}

// pages: the network first (always fresh), the saved copy when the network is down or too slow
function page(req) {
  return timed(req, 4500).then(function (res) { return keep(req, res); }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) {
      return hit || caches.match(ROOT) || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    });
  });
}

// files with a version in their name never change: the saved copy first
function cacheFirst(req) {
  return caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (res) { return keep(req, res); });
  });
}

// data that can change (search index, manifest): the network first
function networkFirst(req) {
  return fetch(req).then(function (res) { return keep(req, res); }).catch(function () { return caches.match(req); });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.indexOf(ROOT) !== 0 || SKIP.test(url.pathname)) return;
  if (req.mode === 'navigate') e.respondWith(page(req));
  else if (STATIC.test(url.pathname)) e.respondWith(cacheFirst(req));
  else e.respondWith(networkFirst(req));
});
