(function () {
  // Whole card is a link: if the tap lands outside the title link, follow it anyway.
  document.querySelectorAll('.fl-card').forEach(function (card) {
    var a = card.querySelector('a[href]');
    if (!a) return;
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      a.click();
    });
  });
})();
