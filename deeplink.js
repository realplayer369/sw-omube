// Widget taps open the site with a #section (voice notes, to-do, etc.).
// Wait for the page to finish laying out, then scroll that card into view.
(function () {
  function go() {
    var id = location.hash.slice(1);
    var el = id && document.getElementById(id);
    if (!el) return;
    var card = el.closest('.vmemo-shell, .todo-card, .myspace-card, .conv-card') || el;
    card.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('load', function () { setTimeout(go, 700); });
  window.addEventListener('hashchange', go);
})();
