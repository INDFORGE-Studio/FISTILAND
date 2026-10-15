# Security

FISTILAND is a static wiki: no accounts, no forms, no cookies, no analytics and no third-party requests.
Everything it loads (scripts, styles, fonts, images) is served from the site itself, and the build
refuses to publish a page that would load anything else (see `tools/postbuild.py`).

## Reporting a problem

If you find a security or privacy problem on https://indforge-studio.github.io/FISTILAND/, please tell us
privately first:

- on our Discord server (link on the site), by messaging a moderator, or
- by opening a GitHub issue **without technical details** and asking for a private contact.

We answer as soon as we can and fix confirmed problems quickly.

## What is in place

- Content-Security-Policy on every page (own files only, inline scripts allowed by hash).
- Fonts, icons and scripts self-hosted; no CDN, no Google Fonts, no tracker.
- Pinned build dependencies and GitHub Actions pinned by commit, updated through Dependabot.
- Build fails on any external resource, inline event handler or broken local reference.
