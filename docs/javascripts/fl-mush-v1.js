(function () {
  // Touch screens: tap a mushroom to show its values, tap again (or elsewhere) to hide them.
  if (!window.matchMedia || !window.matchMedia('(hover: none)').matches) return;
  var cards = document.querySelectorAll('.fl-mush');
  if (!cards.length) return;
  function closeAll(except) {
    cards.forEach(function (c) { if (c !== except) c.classList.remove('is-open'); });
  }
  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAll(card);
      card.classList.toggle('is-open');
      card.blur();
    });
  });
  document.addEventListener('click', function () { closeAll(null); });
})();
