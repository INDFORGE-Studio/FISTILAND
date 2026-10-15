(function () {
  var B = 'M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0 13 13 0 0 0-.617-1.25.08.08 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.1.1 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10 10 0 0 0 .372-.292.07.07 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03z';
  var SV = '<svg viewBox="0 0 24 24" aria-hidden="true">';
  var uid = 0;

  // One variant per skin; the CSS shows the one matching html[data-fl-theme].
  // Ids are unique per instance so a hidden copy never breaks a visible one.
  function variants() {
    var n = 'fl-d' + (++uid) + '-';
    var FISTILAND = '<span class="fl-dv fl-dv-o">' + SV +
      '<defs><clipPath id="' + n + 'co"><path d="' + B + '"/></clipPath>' +
      '<linearGradient id="' + n + 'go" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f07a2a"/><stop offset="1" stop-color="#9a3d10"/></linearGradient>' +
      '<pattern id="' + n + 'po" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.7" height="3.4" fill="#17110c"/></pattern></defs>' +
      '<path d="' + B + '" fill="url(#' + n + 'go)"/>' +
      '<g clip-path="url(#' + n + 'co)"><ellipse cx="5" cy="9" rx="3.2" ry="2.2" fill="#3a1a08" opacity=".5"/><ellipse cx="18.5" cy="17" rx="3.6" ry="2.4" fill="#3a1a08" opacity=".55"/>' +
      '<ellipse cx="11" cy="20" rx="5" ry="1.8" fill="#2b1a0e" opacity=".6"/><ellipse cx="19" cy="6.5" rx="2.2" ry="1.4" fill="#2b1a0e" opacity=".4"/>' +
      '<rect x="0" y="6.2" width="24" height="2.6" fill="url(#' + n + 'po)" opacity=".85"/><path d="M3 18.5L9 11M15 20l5-5" stroke="#f4d9bc" stroke-opacity=".28" stroke-width=".4" fill="none"/></g>' +
      '<path d="' + B + '" fill="none" stroke="#2b1a0e" stroke-width=".9"/>' +
      '<ellipse cx="8" cy="13.4" rx="2.3" ry="2.5" fill="#17110c"/><ellipse cx="16" cy="13.4" rx="2.3" ry="2.5" fill="#17110c"/>' +
      '<circle cx="8" cy="13.4" r="1.05" fill="#ffb347"/><circle cx="16" cy="13.4" r="1.05" fill="#ffb347"/>' +
      '<circle cx="3.6" cy="6.6" r=".45" fill="#2b1a0e"/><circle cx="20.4" cy="6.6" r=".45" fill="#2b1a0e"/>' +
      '</svg></span>';

    var ZOMBIE = '<span class="fl-dv fl-dv-z"></span>';

    var SURVIVALIST = '<span class="fl-dv fl-dv-s">' + SV +
      '<defs><clipPath id="' + n + 'cs"><path d="' + B + '"/></clipPath></defs>' +
      '<path d="' + B + '" fill="#7b8a3a"/>' +
      '<g clip-path="url(#' + n + 'cs)"><ellipse cx="6" cy="8" rx="3.4" ry="2.1" fill="#4a5a22"/><ellipse cx="17.5" cy="7" rx="3.8" ry="2.3" fill="#5b4a2a"/>' +
      '<ellipse cx="12" cy="18.6" rx="4.4" ry="2.1" fill="#4a5a22"/><ellipse cx="20.5" cy="15" rx="2.8" ry="1.9" fill="#a9bb55" opacity=".65"/>' +
      '<ellipse cx="3.4" cy="16" rx="2.6" ry="1.7" fill="#5b4a2a"/><ellipse cx="12" cy="6" rx="2" ry="1.1" fill="#a9bb55" opacity=".5"/></g>' +
      '<path d="' + B + '" fill="none" stroke="#1d2410" stroke-width=".9"/>' +
      '<path d="M4.6 10.6l6 .9M19.4 10.6l-6 .9" stroke="#10140a" stroke-width="1.5" stroke-linecap="round"/>' +
      '<ellipse cx="8" cy="13.1" rx="2.2" ry="2.4" fill="#10140a"/><ellipse cx="16" cy="13.1" rx="2.2" ry="2.4" fill="#10140a"/>' +
      '<circle cx="8.8" cy="12.3" r=".7" fill="#e8e2c0"/><circle cx="16.8" cy="12.3" r=".7" fill="#e8e2c0"/>' +
      '</svg></span>';

    var FORCES = '<span class="fl-dv fl-dv-f">' + SV +
      '<defs><clipPath id="' + n + 'cf"><path d="' + B + '"/></clipPath></defs>' +
      '<path d="' + B + '" fill="#0b1a10"/>' +
      '<g clip-path="url(#' + n + 'cf)" stroke="#3be07a" stroke-opacity=".22" stroke-width=".45"><path d="M0 5h24M0 7.5h24M0 10h24M0 15h24M0 17.5h24M0 20h24"/></g>' +
      '<path d="' + B + '" fill="none" stroke="#3be07a" stroke-width=".9"/>' +
      '<circle cx="8" cy="12.9" r="2.7" fill="#0a2f1a" stroke="#6dffb0" stroke-width=".9"/><circle cx="16" cy="12.9" r="2.7" fill="#0a2f1a" stroke="#6dffb0" stroke-width=".9"/>' +
      '<circle cx="8" cy="12.9" r="1.2" fill="#3be07a"/><circle cx="16" cy="12.9" r="1.2" fill="#3be07a"/>' +
      '<path d="M8 9.2v7.4M4.3 12.9h7.4M16 9.2v7.4M12.3 12.9h7.4" stroke="#6dffb0" stroke-width=".4" stroke-opacity=".8"/>' +
      '</svg></span>';

    var DEMONIC = '<span class="fl-dv fl-dv-d">' + SV +
      '<defs><linearGradient id="' + n + 'gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4161f"/><stop offset="1" stop-color="#5a0a0f"/></linearGradient></defs>' +
      '<path d="M4.8 5.8C2.6 4.8 1.5 2.4 2 .3c2.4.4 4.8 1.7 5.8 3.7z" fill="#2a0508" stroke="#ff3a2e" stroke-width=".4"/>' +
      '<path d="M19.2 5.8c2.2-1 3.3-3.4 2.8-5.5-2.4.4-4.8 1.7-5.8 3.7z" fill="#2a0508" stroke="#ff3a2e" stroke-width=".4"/>' +
      '<path d="' + B + '" fill="url(#' + n + 'gd)" stroke="#1a0204" stroke-width=".8"/>' +
      '<ellipse cx="8" cy="12.4" rx="2.6" ry="1.4" fill="#ffd23a" transform="rotate(20 8 12.4)"/><ellipse cx="16" cy="12.4" rx="2.6" ry="1.4" fill="#ffd23a" transform="rotate(-20 16 12.4)"/>' +
      '<ellipse cx="8.2" cy="12.5" rx=".5" ry="1.2" fill="#1a0204" transform="rotate(20 8.2 12.5)"/><ellipse cx="15.8" cy="12.5" rx=".5" ry="1.2" fill="#1a0204" transform="rotate(-20 15.8 12.5)"/>' +
      '<path d="M6.4 16.3h11.2l-1.2 1.4-1.3-1.2-1.3 1.6-1.3-1.5-1.3 1.5-1.3-1.5-1.3 1.5-1.3-1.2z" fill="#ffe9d0"/>' +
      '</svg></span>';

    return FISTILAND + ZOMBIE + SURVIVALIST + FORCES + DEMONIC;
  }

  window.flDiscordVariants = variants;   // the 404 page reuses the five characters

  // Header: a new icon next to the language selector
  var opt = document.querySelector('.md-header__option');
  if (opt && !document.querySelector('.fl-hd-discord')) {
    var a = document.createElement('a');
    a.className = 'md-header__button fl-hd-discord fl-dvhost';
    a.href = 'https://discord.gg/RHkNGk6ZQN';
    a.target = '_blank'; a.rel = 'noopener';
    a.title = 'Discord'; a.setAttribute('aria-label', 'Discord');
    a.innerHTML = variants();
    opt.parentNode.insertBefore(a, opt.nextSibling);
  }

  // Server page link and footer icon: same characters, added next to the stock logo (hidden by the CSS)
  var hosts = document.querySelectorAll('a.fl-discord, .md-social__link[href*="discord"]');
  for (var i = 0; i < hosts.length; i++) {
    var h = hosts[i];
    if (h.classList.contains('fl-dvhost')) continue;
    h.classList.add('fl-dvhost');
    var box = h.querySelector('.twemoji') || h;
    box.insertAdjacentHTML('beforeend', variants());
  }
})();
