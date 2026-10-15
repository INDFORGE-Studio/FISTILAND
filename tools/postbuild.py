#!/usr/bin/env python3
"""Post-build gate for the FISTILAND wiki.

Runs after `mkdocs build` and before anything is published:
  1. refuses the build if the site loads anything from another host (legal rule: no CDN, no
     Google Fonts, no analytics, no embeds) or if a local file reference is broken;
  2. checks the 8 language trees, the sitemap and the 404 page exist;
  3. adds a "last updated" line to every page and a real lastmod to the sitemap (date of the last commit
     that touched the page's source file), FAQPage structured data to the FAQ pages, and the file list and
     version of the offline cache to sw.js;
  4. adds a Content-Security-Policy <meta> to every page, with the SHA-256 of each inline script,
     so only our own files and those exact inline scripts can run.

Usage: python tools/postbuild.py [site_dir]
"""
import base64
import hashlib
import html as htmllib
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

SITE = Path(sys.argv[1] if len(sys.argv) > 1 else "site").resolve()
ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
BASE_PATH = "/FISTILAND/"
LANGS = ["es", "fr", "de", "it", "pl", "uk", "hr"]  # English is the root
errors = []
notes = []

UPDATED = {
    "en": "Last updated", "fr": "Dernière mise à jour", "de": "Zuletzt aktualisiert", "es": "Última actualización",
    "it": "Ultimo aggiornamento", "pl": "Ostatnia aktualizacja", "uk": "Останнє оновлення", "hr": "Zadnje ažuriranje",
}

TAG_RE = re.compile(r"<(script|link|img|source|video|audio|iframe|embed|object|input|track)\b([^>]*)>", re.I | re.S)
ATTR_RE = re.compile(r"""([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))""")
SCRIPT_RE = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.I | re.S)
CHARSET_RE = re.compile(r"<meta\s+charset=[^>]*>", re.I)
CSS_URL_RE = re.compile(r"url\(\s*['\"]?([^'\")\s]+)['\"]?\s*\)", re.I)
CSS_IMPORT_RE = re.compile(r"@import\s+(?:url\(\s*)?['\"]?([^'\")\s;]+)", re.I)
INLINE_HANDLER_RE = re.compile(r"""<[a-zA-Z][^>]*\son[a-z]+\s*=""", re.S)
BAD_HOSTS = re.compile(
    r"fonts\.googleapis|fonts\.gstatic|gstatic\.com|googletagmanager|google-analytics|googleadservices|doubleclick|"
    r"cdn\.jsdelivr|unpkg\.com|cdnjs\.cloudflare|code\.jquery|ajax\.googleapis|polyfill\.io|facebook\.net|"
    r"connect\.facebook|platform\.twitter|youtube\.com/embed|youtube-nocookie|player\.vimeo|plausible\.io|matomo",
    re.I,
)
# <link rel=...> values that only describe the page (never loaded), allowed to point elsewhere
LINK_NAV_RELS = {"canonical", "alternate", "license", "prev", "next", "help", "author", "me", "search", "up", "first", "last"}


def attrs(raw):
    out = {}
    for m in ATTR_RE.finditer(raw):
        out[m.group(1).lower()] = m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else m.group(4))
    return out


def is_external(u):
    u = u.strip()
    return u.startswith("//") or re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", u) is not None and not u.lower().startswith(("data:", "blob:", "mailto:", "tel:", "javascript:", "about:"))


def resolve(page, ref):
    """Local file a reference points to (None when it is not a local file reference)."""
    ref = ref.strip()
    if not ref or ref.startswith("#") or is_external(ref) or ref.lower().startswith(("data:", "blob:", "mailto:", "tel:", "javascript:", "about:")):
        return None
    path = unquote(urlparse(ref).path)
    if not path:
        return None
    if path.startswith(BASE_PATH):
        target = SITE / path[len(BASE_PATH):]
    elif path.startswith("/"):
        return None  # outside the project path (other site on the same host): not ours to check
    else:
        target = (page.parent / path)
    return target


def exists(target, ref):
    if target.is_file():
        return True
    if target.is_dir() and (target / "index.html").is_file():
        return True
    if str(ref).split("?")[0].split("#")[0].endswith("/") and (target / "index.html").is_file():
        return True
    return False


def check_ref(page, ref, what):
    t = resolve(page, ref)
    if t is None:
        return
    try:
        t = t.resolve()
        t.relative_to(SITE)
    except (ValueError, OSError):
        errors.append(f"{page.relative_to(SITE)}: {what} leaves the site folder: {ref}")
        return
    if not exists(t, ref):
        errors.append(f"{page.relative_to(SITE)}: broken {what}: {ref}")


def split_search_index():
    """search/search_index.json holds every language; write one index per language (en stays at the root)."""
    src = SITE / "search" / "search_index.json"
    data = json.loads(src.read_text(encoding="utf-8"))
    buckets = {lang: [] for lang in ["en"] + LANGS}
    for d in data["docs"]:
        first = d["location"].split("/", 1)[0]
        buckets[first if first in LANGS else "en"].append(d)
    # languages the search library has a stemmer for; the others use the English one
    stem = {"en": ["en"], "es": ["es"], "fr": ["fr"], "de": ["de"], "it": ["it"], "pl": ["en"], "uk": ["en"], "hr": ["en"]}
    sizes = []
    for lang, docs in buckets.items():
        if len(docs) < 20:
            errors.append(f"search index for '{lang}' has only {len(docs)} entries")
            continue
        cfg = dict(data["config"])
        cfg["lang"] = stem[lang]
        target = src if lang == "en" else SITE / lang / "search" / "search_index.json"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps({"config": cfg, "docs": docs}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        sizes.append(f"{lang}:{len(docs)}")
    notes.append("search indexes " + " ".join(sizes))


def source_of(page):
    """docs/ source file a built page comes from (None for pages that are not built from a source file)."""
    rel = page.relative_to(SITE)
    if rel.name != "index.html":
        return None, None
    parts = list(rel.parts[:-1])
    lang = "en"
    if parts and parts[0] in LANGS:
        lang, parts = parts[0], parts[1:]
    if parts and parts[0] in ("assets", "search", "javascripts", "stylesheets", "downloads"):
        return None, None
    stem = "/".join(parts) if parts else "index"
    cand = DOCS / (stem + (".md" if lang == "en" else f".{lang}.md"))
    return (cand if cand.is_file() else None), lang


def git_date(path):
    try:
        out = subprocess.run(["git", "log", "-1", "--format=%cs", "--", str(path)], cwd=ROOT, capture_output=True, text=True, timeout=30).stdout.strip()
    except Exception:
        return None
    return out if re.fullmatch(r"\d{4}-\d{2}-\d{2}", out) else None


def is_shallow():
    try:
        return subprocess.run(["git", "rev-parse", "--is-shallow-repository"], cwd=ROOT, capture_output=True, text=True, timeout=30).stdout.strip() != "false"
    except Exception:
        return True


def add_updated_dates(html_files):
    """'Last updated' line at the bottom of each content page, real lastmod in the sitemap."""
    if is_shallow():
        notes.append("updated dates skipped (no full git history)")
        return
    site_url = "https://indforge-studio.github.io" + BASE_PATH
    dates, added = {}, 0
    for page in html_files:
        src, lang = source_of(page)
        if src is None:
            continue
        d = git_date(src)
        if not d:
            continue
        rel = page.relative_to(SITE).parent.as_posix()
        dates[site_url + ("" if rel == "." else rel + "/")] = d
        if src.stem.split(".")[0] in ("index", "legal"):
            continue  # the home page is a single screen, the legal page carries its own date
        txt = page.read_bytes().decode("utf-8")
        i = txt.rfind("</article>")
        if i < 0 or "fl-updated" in txt:
            continue
        line = f'<p class="fl-updated">{UPDATED[lang]}: <time datetime="{d}">{d}</time></p>'
        page.write_bytes((txt[:i] + line + txt[i:]).encode("utf-8"))
        added += 1
    sm = SITE / "sitemap.xml"
    if sm.is_file() and dates:
        def fix(m):
            block = m.group(1)
            loc = re.search(r"<loc>(.*?)</loc>", block)
            d = dates.get(loc.group(1).strip()) if loc else None
            if not d:
                return m.group(0)
            if "<lastmod>" in block:
                block = re.sub(r"<lastmod>.*?</lastmod>", f"<lastmod>{d}</lastmod>", block)
            else:
                block = block.replace(loc.group(0), loc.group(0) + f"<lastmod>{d}</lastmod>", 1)
            return "<url>" + block + "</url>"
        sm.write_text(re.sub(r"<url>(.*?)</url>", fix, sm.read_text(encoding="utf-8"), flags=re.S), encoding="utf-8")
    notes.append(f"updated line on {added} pages, lastmod for {len(dates)} urls")


def add_faq_data(html_files):
    """FAQPage structured data built from the question/answer blocks of the FAQ pages."""
    n = 0
    for page in html_files:
        if page.parent.name != "faq":
            continue
        txt = page.read_bytes().decode("utf-8")
        items = []
        for m in re.finditer(r"<details\b[^>]*>\s*<summary\b[^>]*>(.*?)</summary>(.*?)</details>", txt, re.S):
            q = re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<[^>]+>", " ", m.group(1)))).strip()
            a = re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<[^>]+>", " ", m.group(2)))).strip()
            if q and a:
                items.append({"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}})
        if len(items) < 5:
            errors.append(f"{page.relative_to(SITE)}: only {len(items)} questions found for the FAQ data")
            continue
        lang = (re.search(r'<html[^>]*\blang="([a-zA-Z-]+)"', txt) or [None, "en"])[1][:2]
        data = {"@context": "https://schema.org", "@type": "FAQPage", "inLanguage": lang, "mainEntity": items}
        blob = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
        j = txt.find("</head>")
        if j < 0:
            errors.append(f"{page.relative_to(SITE)}: no </head> for the FAQ data")
            continue
        page.write_bytes((txt[:j] + f'<script type="application/ld+json">{blob}</script>' + txt[j:]).encode("utf-8"))
        n += 1
    if n < 8:
        errors.append(f"FAQ data added to {n} pages, expected 8")
    notes.append(f"FAQ data on {n} pages")


def fill_service_worker():
    """sw.js gets the list of files to keep at install time and a version that changes when any of them does."""
    sw = SITE / "sw.js"
    if not sw.is_file():
        errors.append("missing sw.js")
        return
    pats = [
        "assets/stylesheets/main.*.min.css", "assets/stylesheets/palette.*.min.css", "assets/javascripts/bundle.*.min.js",
        "assets/javascripts/workers/search.*.min.js", "stylesheets/*.css", "javascripts/*.js",
        "assets/fonts/inter-normal-latin.woff2", "assets/fonts/oswald-normal-latin.woff2", "assets/fonts/roboto-mono-normal-latin.woff2",
        "assets/icon-192-v1.png", "assets/icon-32-v1.png", "assets/favicon-v10.ico", "manifest.webmanifest",
    ]
    only_404 = re.compile(r"(invaders|snake|logo404)")
    files = []
    for p in pats:
        for f in sorted(SITE.glob(p)):
            if f.is_file() and not only_404.search(f.name):
                files.append(f.relative_to(SITE).as_posix())
    pages = [""] + [lang + "/" for lang in LANGS] + ["guide/", "faq/"]
    for pg in pages:
        if not (SITE / pg / "index.html").is_file():
            errors.append(f"sw.js: page to keep is missing: {pg or '/'}")
    h = hashlib.sha1()
    for f in files:
        h.update(f.encode()); h.update((SITE / f).read_bytes())
    h.update(sw.read_bytes())
    version = h.hexdigest()[:10]
    txt = sw.read_text(encoding="utf-8")
    if "/* @version */" not in txt or "/* @precache */" not in txt:
        errors.append("sw.js: markers for the version and file list not found")
        return
    txt = re.sub(r"var VERSION = '[^']*'; /\* @version \*/", f"var VERSION = '{version}'; /* @version */", txt)
    txt = re.sub(r"var PRECACHE = \[.*?\]; /\* @precache \*/", lambda m: "var PRECACHE = " + json.dumps(files + pages) + "; /* @precache */", txt, flags=re.S)
    sw.write_text(txt, encoding="utf-8")
    notes.append(f"offline cache {version}: {len(files)} files + {len(pages)} pages")


def main():
    if not SITE.is_dir():
        print(f"site folder not found: {SITE}")
        return 2

    html_files = sorted(SITE.rglob("*.html"))
    css_files = sorted(SITE.rglob("*.css"))
    js_files = sorted(SITE.rglob("*.js"))
    own_js = sorted((SITE / "javascripts").rglob("*.js")) if (SITE / "javascripts").is_dir() else []
    if (SITE / "sw.js").is_file():
        own_js.append(SITE / "sw.js")
    if not html_files:
        print("no html file found")
        return 2

    # ---- structure ----
    for need in ["index.html", "404.html", "sitemap.xml", "search/search_index.json", "sw.js", "manifest.webmanifest", "llms.txt", "assets/og-banner-v1.jpg"]:
        if not (SITE / need).exists():
            errors.append(f"missing {need}")
    for lang in LANGS:
        if not (SITE / lang / "index.html").is_file():
            errors.append(f"missing language home: {lang}/index.html")
    sm = SITE / "sitemap.xml"
    if sm.is_file():
        urls = sm.read_text(encoding="utf-8").count("<loc>")
        notes.append(f"sitemap: {urls} urls")
        if urls < 100:
            errors.append(f"sitemap has only {urls} urls (expected the 8 language trees)")

    # ---- html: external loads, handlers, local references ----
    for page in html_files:
        txt = page.read_bytes().decode("utf-8")
        if INLINE_HANDLER_RE.search(txt):
            errors.append(f"{page.relative_to(SITE)}: inline event handler (blocked by the CSP)")
        jm = re.search(r"""<[^<>]*\b(?:href|src|action)\s*=\s*["']\s*javascript:[^<>]*>""", txt, re.I)
        if jm:
            errors.append(f"{page.relative_to(SITE)}: javascript: URL in {jm.group(0)[:160]}")
        for m in TAG_RE.finditer(txt):
            tag, raw = m.group(1).lower(), m.group(2)
            a = attrs(raw)
            ref = a.get("src") or (a.get("href") if tag == "link" else None) or (a.get("data") if tag == "object" else None)
            if tag == "link":
                rels = set((a.get("rel") or "").lower().split())
                if rels and rels <= LINK_NAV_RELS:
                    continue  # describes the page, nothing is loaded
            if tag == "input":
                ref = a.get("src")
            if ref:
                if is_external(ref):
                    errors.append(f"{page.relative_to(SITE)}: loads an external resource: <{tag}> {ref}")
                else:
                    check_ref(page, ref, f"<{tag}> reference")
            if a.get("srcset"):
                for part in a["srcset"].split(","):
                    u = part.strip().split(" ")[0]
                    if u:
                        (errors.append(f"{page.relative_to(SITE)}: external srcset: {u}") if is_external(u) else check_ref(page, u, "srcset"))
        for m in re.finditer(r"<a\b([^>]*)>", txt, re.I):
            href = attrs(m.group(1)).get("href")
            if href:
                check_ref(page, href, "link")

    # ---- css: no external url(), no @import of another host ----
    for css in css_files:
        txt = css.read_text(encoding="utf-8", errors="replace")
        # inline data: images (SVG textures) may contain their own url(#id) references: not file references
        txt = re.sub(r"""url\(\s*(["'])data:.*?\1\s*\)""", "url()", txt, flags=re.S)
        txt = re.sub(r"url\(\s*data:[^)]*\)", "url()", txt)
        for m in CSS_IMPORT_RE.finditer(txt):
            if is_external(m.group(1)):
                errors.append(f"{css.relative_to(SITE)}: external @import {m.group(1)}")
        for m in CSS_URL_RE.finditer(txt):
            u = m.group(1)
            if is_external(u):
                errors.append(f"{css.relative_to(SITE)}: external url() {u}")
            else:
                t = resolve(css, u)
                if t is not None and not t.exists():
                    errors.append(f"{css.relative_to(SITE)}: broken url() {u}")

    # ---- our own js: no known third-party service (the theme's bundle is the vendor's, scanned by the page checks) ----
    for js in own_js:
        txt = js.read_text(encoding="utf-8", errors="replace")
        m = BAD_HOSTS.search(txt)
        if m:
            errors.append(f"{js.relative_to(SITE)}: mentions a third-party service ({m.group(0)})")

    if errors:
        print(f"\nPOST-BUILD CHECK FAILED ({len(errors)} problem(s)):")
        for e in errors[:80]:
            print("  - " + e)
        if len(errors) > 80:
            print(f"  ... and {len(errors) - 80} more")
        return 1

    # ---- one small search index per language (the theme's single index mixes the 8 languages) ----
    split_search_index()
    if errors:
        print("search index split failed:")
        for e in errors:
            print("  - " + e)
        return 1

    # ---- last-updated dates, FAQ structured data, offline cache list ----
    add_updated_dates(html_files)
    add_faq_data(html_files)
    fill_service_worker()
    if errors:
        print("page extras failed:")
        for e in errors:
            print("  - " + e)
        return 1

    # ---- Content-Security-Policy, one per page, with the hashes of its inline scripts ----
    total_hashes = 0
    for page in html_files:
        txt = page.read_bytes().decode("utf-8")
        hashes = []
        for m in SCRIPT_RE.finditer(txt):
            a = attrs(m.group(1))
            if "src" in a:
                continue
            typ = (a.get("type") or "").lower()
            if typ and typ not in ("text/javascript", "application/javascript", "module", "speculationrules"):
                continue  # JSON data blocks are not executed; speculation rules are allowed by hash like a script
            code = m.group(2)
            if not code.strip():
                continue
            h = "sha256-" + base64.b64encode(hashlib.sha256(code.encode("utf-8")).digest()).decode()
            if h not in hashes:
                hashes.append(h)
        total_hashes += len(hashes)
        script_src = "'self' 'inline-speculation-rules'" + "".join(f" '{h}'" for h in hashes)
        csp = (
            "default-src 'self'; "
            f"script-src {script_src}; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: blob:; "
            "font-src 'self'; "
            "connect-src 'self'; "
            "worker-src 'self' blob:; "
            "manifest-src 'self'; "
            "media-src 'self'; "
            "object-src 'none'; "
            "base-uri 'self'; "
            "form-action 'self'; "
            "frame-src 'none'"
        )
        meta = f'<meta http-equiv="Content-Security-Policy" content="{csp}">'
        if "Content-Security-Policy" in txt:
            continue
        m = CHARSET_RE.search(txt)
        if not m and re.fullmatch(r"google[0-9a-f]+\.html", page.name):
            continue  # Search Console ownership file: a bare text file, not a page
        if not m:
            errors.append(f"{page.relative_to(SITE)}: no <meta charset> to anchor the CSP")
            continue
        txt = txt[: m.end()] + meta + txt[m.end():]
        page.write_bytes(txt.encode("utf-8"))

    if errors:
        print("CSP injection failed:")
        for e in errors:
            print("  - " + e)
        return 1

    print(f"post-build OK: {len(html_files)} pages, {len(css_files)} css, {len(js_files)} js, {total_hashes} inline-script hashes; " + "; ".join(notes))
    return 0


if __name__ == "__main__":
    sys.exit(main())
