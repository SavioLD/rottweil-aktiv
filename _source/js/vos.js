/* =====================================================================
   Verkaufsoffener Sonntag – Pop-up „Teilnehmende Betriebe"
   Pflege: Einträge im Array BETRIEBE ergänzen/ändern (Reihenfolge egal,
   die Liste wird automatisch alphabetisch sortiert).
     name  – Pflicht
     tag   – optional, z. B. 'Foodtruck', 'Essensstand', 'in der Markthalle'
     url   – optional, Website des Betriebs (wird verlinkt)
     logo  – optional, Bildpfad (sobald Logos vorliegen)
   Automatisches Öffnen: nur auf Seiten mit <body data-vos-auto>, einmal pro
   Sitzung und nur bis zum Veranstaltungsende.
   ===================================================================== */
(function () {
  var EVENT_END = new Date('2026-10-18T23:59:59+02:00');

  var BETRIEBE = [
    { name: 'Aromio', url: 'https://www.aromio-rottweil.de/' },
    { name: 'Autohaus Schmid', url: 'https://auto-schmid24.de/' },
    { name: 'Betten-Hugger', url: 'https://www.betten-hugger.de/' },
    { name: 'BIKE BOX', url: 'https://www.bikebox-shop.de/' },
    { name: 'Bunte Truhe', url: 'https://www.buntetruhe.de/' },
    { name: 'Casa-Cappelli', url: 'http://casa-cappelli.de/' },
    { name: 'CafeBar', tag: 'in der Markthalle', url: 'https://www.markthalle-rottweil.de/die-staende/cafebar/' },
    { name: 'Culjak-Sax', tag: 'Foodtruck', url: 'https://www.die-foodtrucker.de/' },
    { name: 'Dapaluga – Döneluxe', tag: 'Foodtruck', url: 'https://doeneluxe.de/' },
    { name: 'Die Blumenbinderei', tag: 'in der Markthalle', url: 'https://www.markthalle-rottweil.de/die-staende/blumenbinderei/' },
    { name: 'DRK Kleiderlädle', url: 'https://www.kv-rottweil.drk.de/angebote/existenzsichernde-hilfe/kleiderlaeden.html' },
    { name: 'E-Center Maier – Culinara', url: 'https://www.culinara-rottweil.de/' },
    { name: 'Elektro Wiest', url: 'https://elektro-wiest.de/' },
    { name: 'Fundschatz' },
    { name: 'Gent', url: 'https://gent-man.de/' },
    { name: 'Gomair', tag: 'Foodtruck' },
    { name: 'Gradmann Parfümerie', url: 'https://www.gradmann1864.de/' },
    { name: 'Graner Photodesign', url: 'https://www.ralfgraner.de/' },
    { name: 'Hoffmeyer men’s loft & Modeneck', url: 'https://hoffmeyer-mode.de/' },
    { name: 'Hofgut Neckarburg', tag: 'Foodtruck', url: 'https://www.hofgut-neckarburg.de/' },
    { name: 'Hüpfburgenverleih Rottweil', url: 'https://www.huepfburgen-verleih-rottweil.de/' },
    { name: 'Intersport Kirsner', url: 'https://kirsner-sport.de/' },
    { name: 'Käse Caduff', url: 'https://www.kaese-caduff.de/' },
    { name: 'Madison & CECIL Store', url: 'https://www.hosenshop-madison.de/standorte/madison-rottweil' },
    { name: 'myEngele', url: 'https://www.myengele.de/' },
    { name: 'Nirvana', url: 'https://nirvanarottweil.com/' },
    { name: 'Platz Flammkuchen', tag: 'Foodtruck' },
    { name: 'PME Legend' },
    { name: 'Quick Schuh', url: 'https://www.quick-schuh.com/stores/rottweil/' },
    { name: 'Qunaj Mazllum', tag: 'Foodtruck' },
    { name: 'Rupprecht Buchhandlung', url: 'https://www.rupprecht.de/shop/magazine/155299/filiale_rottweil.html' },
    { name: 'Sinneskontor', tag: 'in der Markthalle', url: 'https://sinneskontor.de/' },
    { name: 'Spitznagel', url: 'https://www.spitznagel-das-lederhaus.de/' },
    { name: 'Stauss Uhren & Schmuck', url: 'https://stauss-uhren-schmuck.de/' },
    { name: 'SW Holding' },
    { name: 'Telekom', url: 'https://shopseite.telekom.de/sued-west/rottweil/hauptstr-26' },
    { name: 'TSV 1862 Rottweil', url: 'https://www.tsv-rottweil.de/' },
    { name: 'VIOLAS’', url: 'https://www.violas.de/nuetzliche-links/violas-stores/violas-rottweil/' },
    { name: 'Vodafone', url: 'https://www.kessler-verbindet.de/' },
    { name: 'Volksbank Rottweil', url: 'https://www.volksbank-rottweil.de/' },
    { name: 'Waldorfschule', tag: 'Essensstand', url: 'https://www.waldorfschule-rottweil.de/' },
    { name: 'Wavez Entertainment', tag: 'Cocktailstand', url: 'https://wavez-entertainment.de/' },
    { name: 'Wohn Schick / K-Markt', url: 'https://www.wohn-schick.de/' },
    { name: 'Yummy Chips', tag: 'Foodtruck' }
  ];

  // Programm des Tages (chronologisch, wird so angezeigt)
  var PROGRAMM = [
    { zeit: '10:30 Uhr', titel: 'Volksbank-Stadtlauf' },
    { zeit: '12–17 Uhr', titel: 'Geschäfte geöffnet', info: 'Einkaufen und Bummeln bei den teilnehmenden Betrieben', ort: 'Rottweiler Innenstadt & Saline' },
    { zeit: '14:00 Uhr', titel: 'Kinderführung am Schwarzen Tor', info: 'ca. 30 Minuten · kostenlos · mit Anmeldung', ort: 'Treffpunkt: vor dem Schwarzen Tor',
      link: { href: 'https://www.tourismus-rottweil.de/das-erlebnis/fuehrungen/oeffentliche-fuehrungen?re-product-id=320492&rwstep=product', text: 'Zur Anmeldung' } },
    { zeit: '14:00 & 15:30 Uhr', titel: 'Baustellenführung „Heute Baustelle. Morgen Lieblingsplatz.“', info: 'Mit Mobilitätsbeauftragtem Horst Bisinger zu den Bauprojekten am Friedrichsplatz, am Kriegsdamm und am Nägelesgraben · jeweils ca. 45 Minuten · kostenlos · ohne Anmeldung · max. ca. 50 Personen', ort: 'Treffpunkt: Hauptkreuz auf dem Friedrichsplatz' },
    { zeit: '14:30–17 Uhr', titel: 'Kurzführungen am Schwarzen Tor', info: 'max. 30 Minuten · kostenlos · ohne Anmeldung', ort: 'Treffpunkt: vor dem Schwarzen Tor' },
    { zeit: 'Außerdem', titel: 'Tag der offenen Tür im LGS-Büro', info: 'Das Team der Landesgartenschau Rottweil 2028 informiert über die laufenden LGS-Themen und lädt zum Austausch ein', ort: 'LGS-Büro, Hochbrücktorstraße' }
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  BETRIEBE.sort(function (a, b) {
    return a.name.localeCompare(b.name, 'de', { sensitivity: 'base' });
  });

  var ICON_EXT = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>';

  function card(b) {
    var inner =
      (b.logo ? '<span class="vos-logo"><img src="' + esc(b.logo) + '" alt="" loading="lazy"></span>' : '') +
      '<span class="vos-name">' + esc(b.name) + '</span>' +
      ((b.tag || b.url)
        ? '<span class="vos-meta">' +
            (b.tag ? '<span class="vos-tag">' + esc(b.tag) + '</span>' : '') +
            (b.url ? '<span class="vos-link">Website ' + ICON_EXT + '</span>' : '') +
          '</span>'
        : '');
    var body = b.url
      ? '<a class="vos-card" href="' + esc(b.url) + '" target="_blank" rel="noopener" aria-label="' + esc(b.name) + ' – Website öffnen">' + inner + '</a>'
      : '<div class="vos-card">' + inner + '</div>';
    return '<li class="vos-item" data-q="' + esc((b.name + ' ' + (b.tag || '')).toLowerCase()) + '">' + body + '</li>';
  }

  var ICON_PIN = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';

  function progItem(p) {
    return '<li class="vos-prog-item">' +
      '<span class="vos-prog-time">' + esc(p.zeit) + '</span>' +
      '<span class="vos-prog-main">' +
        '<span class="vos-prog-title">' + esc(p.titel) + '</span>' +
        (p.info ? '<span class="vos-prog-info">' + esc(p.info) + '</span>' : '') +
        (p.ort ? '<span class="vos-prog-place">' + ICON_PIN + esc(p.ort) + '</span>' : '') +
        (p.link ? '<a class="vos-prog-link" href="' + esc(p.link.href) + '" target="_blank" rel="noopener">' + esc(p.link.text) + ' ' + ICON_EXT + '</a>' : '') +
      '</span>' +
    '</li>';
  }

  var html =
    '<div class="vos-overlay" id="vosOverlay" hidden>' +
      '<div class="vos-dialog" role="dialog" aria-modal="true" aria-labelledby="vosTitle">' +
        '<div class="vos-head">' +
          '<p class="vos-kicker"><span>Sonntag, 18. Oktober 2026</span> · <span>12–17 Uhr</span></p>' +
          '<h2 class="vos-title" id="vosTitle">Verkaufsoffener Sonntag</h2>' +
          '<p class="vos-sub">In der Rottweiler Innenstadt und an der Saline.</p>' +
          '<div class="vos-tabs" role="tablist" aria-label="Inhalt">' +
            '<button type="button" class="vos-tab is-active" role="tab" id="vosTabBetriebe" aria-selected="true" aria-controls="vosPanelBetriebe" data-vos-tab="betriebe"><span class="vos-tab-long">Teilnehmende </span>Betriebe</button>' +
            '<button type="button" class="vos-tab" role="tab" id="vosTabProgramm" aria-selected="false" aria-controls="vosPanelProgramm" data-vos-tab="programm">Programm</button>' +
          '</div>' +
          '<button type="button" class="vos-close" data-vos-close aria-label="Schließen">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="vos-panel" id="vosPanelBetriebe" role="tabpanel" aria-labelledby="vosTabBetriebe">' +
        '<div class="vos-tools">' +
          '<input class="vos-search" id="vosSearch" type="search" placeholder="Betrieb suchen …" aria-label="Betrieb suchen" autocomplete="off">' +
          '<span class="vos-count" id="vosCount"></span>' +
        '</div>' +
        '<div class="vos-body">' +
          '<ul class="vos-grid" id="vosGrid">' + BETRIEBE.map(card).join('') + '</ul>' +
          '<p class="vos-empty" id="vosEmpty" hidden>Kein Betrieb gefunden.</p>' +
        '</div>' +
        '</div>' +
        '<div class="vos-panel" id="vosPanelProgramm" role="tabpanel" aria-labelledby="vosTabProgramm" hidden>' +
          '<div class="vos-body"><ol class="vos-prog">' + PROGRAMM.map(progItem).join('') + '</ol></div>' +
        '</div>' +
        '<div class="vos-foot">' +
          '<button type="button" class="btn btn--navy vos-done" data-vos-close>Schließen</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  function init() {
    document.body.insertAdjacentHTML('beforeend', html);
    var overlay = document.getElementById('vosOverlay');
    var search = document.getElementById('vosSearch');
    var count = document.getElementById('vosCount');
    var empty = document.getElementById('vosEmpty');
    var items = Array.prototype.slice.call(overlay.querySelectorAll('.vos-item'));
    var lastFocus = null;

    function setCount(n) {
      count.textContent = n + (n === 1 ? ' teilnehmender Betrieb' : ' teilnehmende Betriebe');
    }
    setCount(items.length);

    var tabs = Array.prototype.slice.call(overlay.querySelectorAll('[data-vos-tab]'));
    function showTab(name) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-vos-tab') === name;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      document.getElementById('vosPanelBetriebe').hidden = name !== 'betriebe';
      document.getElementById('vosPanelProgramm').hidden = name !== 'programm';
    }

    function open(tab) {
      showTab(tab === 'programm' ? 'programm' : 'betriebe');
      lastFocus = document.activeElement;
      overlay.hidden = false;
      document.body.classList.add('vos-lock');
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
      overlay.querySelector('.vos-close').focus();
    }
    function close() {
      overlay.classList.remove('is-open');
      document.body.classList.remove('vos-lock');
      try { sessionStorage.setItem('vos-dismissed', '1'); } catch (e) {}
      setTimeout(function () { overlay.hidden = true; }, 200);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    overlay.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-vos-tab]');
      if (tab) { showTab(tab.getAttribute('data-vos-tab')); return; }
      if (e.target === overlay || e.target.closest('[data-vos-close]')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) close();
    });
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-vos-open]');
      if (t) { e.preventDefault(); open(t.getAttribute('data-vos-open')); }
    });

    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var n = 0;
      items.forEach(function (li) {
        var hit = !q || li.getAttribute('data-q').indexOf(q) !== -1;
        li.hidden = !hit;
        if (hit) n++;
      });
      empty.hidden = n !== 0;
      setCount(n);
    });

    var dismissed = false;
    try { dismissed = sessionStorage.getItem('vos-dismissed') === '1'; } catch (e) {}
    if (document.body.hasAttribute('data-vos-auto') && !dismissed && new Date() <= EVENT_END) {
      setTimeout(function () { open('betriebe'); }, 700);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
