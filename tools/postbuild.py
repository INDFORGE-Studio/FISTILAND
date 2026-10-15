#!/usr/bin/env python3
"""Post-build gate for the FISTILAND wiki.

Runs after `mkdocs build` and before anything is published:
  1. refuses the build if the site loads anything from another host (legal rule: no CDN, no
     Google Fonts, no analytics, no embeds) or if a local file reference is broken;
  2. checks the 8 language trees, the sitemap and the 404 page exist;
  3. adds a Content-Security-Policy <meta> to every page, with the SHA-256 of each inline script,
     so only our own files and those exact inline scripts can run.

Usage: python tools/postbuild.py [site_dir]
"""
import base64
import hashlib
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

SITE = Path(sys.argv[1] if len(sys.argv) > 1 else "site").resolve()
BASE_PATH = "/FISTILAND/"
LANGS = ["es", "fr", "de", "it", "pl", "uk", "hr"]  # English is the root
errors = []
notes = []

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


def main():
    if not SITE.is_dir():
        print(f"site folder not found: {SITE}")
        return 2

    html_files = sorted(SITE.rglob("*.html"))
    css_files = sorted(SITE.rglob("*.css"))
    js_files = sorted(SITE.rglob("*.js"))
    own_js = sorted((SITE / "javascripts").rglob("*.js")) if (SITE / "javascripts").is_dir() else []
    if not html_files:
        print("no html file found")
        return 2

    # ---- structure ----
    for need in ["index.html", "404.html", "sitemap.xml", "search/search_index.json"]:
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
            if typ and typ not in ("text/javascript", "application/javascript", "module"):
                continue  # JSON / speculation rules: data, not executed as script
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
