# FISTILAND

Public wiki of the FISTILAND SCUM server. Built with MkDocs Material and published with GitHub Pages: https://indforge-studio.github.io/FISTILAND/

Edit pages in `docs/`, navigation in `mkdocs.yml`. A push to `main` rebuilds and publishes the site; any other branch is built and checked only (the built site is kept for 3 days as the `site-preview` artifact).

## How the build protects the site

- Dependencies and GitHub Actions are pinned (`requirements.txt`, commit hashes), updated through Dependabot.
- `mkdocs build --strict`, then `tools/postbuild.py`, which **fails the build** if a page loads anything from another host (no CDN, Google Fonts, analytics or embeds), has an inline event handler or a broken local link, or if a language, the sitemap or the 404 page is missing.
- The same script splits the search index per language and adds a Content-Security-Policy to every page (own files only, inline scripts allowed by hash).
- Fonts, scripts and icons are self-hosted; licences of the fonts are in `docs/assets/fonts/licenses/`.
- New or changed scripts and styles get a new file name (`name-vN.js`) listed in `mkdocs.yml`; superseded versions are removed one release later.

## Licence

Unless stated otherwise, all original content of this website (texts, maps, images and layouts) is © 2026 INDFORGE Studio (FISTILAND) and licensed under [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Non-commercial use only. Credit, link to the licence and indication of changes are required, and adaptations must carry the same licence.

SCUM, its names and its game assets belong to their respective owners and are not covered by this licence. Some map information comes from [scum.wiki.gg](https://scum.wiki.gg/) under CC BY-NC-SA 4.0, adapted for our map. Full notice: https://indforge-studio.github.io/FISTILAND/legal/
