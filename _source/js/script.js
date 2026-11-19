/* Rottweil aktiv – Navigation, Jahr, Jobbörse-Filter */
(function () {
  // Mobile-Navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      const open = nav.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  // Aktuelles Jahr im Footer
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // News-Kacheln nach data-bis (letzter Tag, JJJJ-MM-TT) einordnen:
  // ab heute = bevorstehend (nächstes zuerst), sonst Rückblick (neuestes zuerst)
  const d = new Date();
  const today = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const byDate = function (a, b) { return a.dataset.bis < b.dataset.bis ? -1 : a.dataset.bis > b.dataset.bis ? 1 : 0; };
  function split(cards) {
    return {
      up: cards.filter(function (c) { return c.dataset.bis >= today; }).sort(byDate),
      past: cards.filter(function (c) { return c.dataset.bis < today; }).sort(function (a, b) { return byDate(b, a); })
    };
  }

  // Aktuelles: zwei Bereiche "Bevorstehende Events" / "Rückblick"
  const upcoming = document.querySelector('[data-news="upcoming"]');
  const past = document.querySelector('[data-news="past"]');
  if (upcoming && past) {
    const s = split(Array.prototype.slice.call(document.querySelectorAll('.ncard[data-bis]')));
    s.up.forEach(function (c) { upcoming.appendChild(c); });
    s.past.forEach(function (c) { past.appendChild(c); });
    const empty = document.querySelector('[data-news-empty]');
    if (empty) empty.hidden = upcoming.children.length > 0;
    upcoming.hidden = upcoming.children.length === 0;
  }

  // Startseite: nur bevorstehende Events zeigen (nächstes zuerst), vergangene ausblenden
  const teaser = document.querySelector('[data-news="teaser"]');
  if (teaser) {
    const s = split(Array.prototype.slice.call(teaser.querySelectorAll('.ncard[data-bis]')));
    s.up.forEach(function (c) { teaser.appendChild(c); });
    s.past.forEach(function (c) { c.remove(); });
    const empty = teaser.parentNode.querySelector('[data-news-empty]');
    if (empty) empty.hidden = s.up.length > 0;
    teaser.hidden = s.up.length === 0;
  }
})();
