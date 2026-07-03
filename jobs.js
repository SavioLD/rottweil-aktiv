/* =====================================================================
   Jobbörse – Rottweil aktiv
   Stellen der GHV-Mitglieder. Neue Inserate einfach hier ergänzen.
   ===================================================================== */

const JOBS = [
  {
    company: 'Modehaus Rottweil',
    title: 'Verkäufer:in im Einzelhandel (m/w/d)',
    category: 'Einzelhandel',
    type: 'Teilzeit',
    location: 'Innenstadt Rottweil',
    desc: 'Zur Verstärkung unseres Teams suchen wir eine freundliche Verkaufskraft mit Gespür für Mode und Beratung. Erfahrung im Einzelhandel von Vorteil.',
    date: '2026-06-02'
  },
  {
    company: 'Café am Marktplatz',
    title: 'Servicekraft (m/w/d)',
    category: 'Gastronomie',
    type: 'Minijob',
    location: 'Hauptstraße, Rottweil',
    desc: 'Du liebst guten Kaffee und den Kontakt mit Gästen? Wir suchen Unterstützung für Service und Theke an Wochenenden. Quereinsteiger willkommen.',
    date: '2026-05-28'
  },
  {
    company: 'Elektro Maier GmbH',
    title: 'Elektroniker:in für Energie- & Gebäudetechnik (m/w/d)',
    category: 'Handwerk',
    type: 'Vollzeit',
    location: 'Rottweil & Umgebung',
    desc: 'Festanstellung in einem familiären Handwerksbetrieb. Installation, Wartung und Instandsetzung von Elektroanlagen. Führerschein Klasse B erforderlich.',
    date: '2026-05-20'
  },
  {
    company: 'Bäckerei Zimmermann',
    title: 'Ausbildung Bäckereifachverkäufer:in (m/w/d)',
    category: 'Ausbildung',
    type: 'Ausbildung',
    location: 'Rottweil',
    desc: 'Starte 2026 deine Ausbildung in unserer Traditionsbäckerei. Wir bieten ein junges Team, gute Übernahmechancen und beste Backwaren.',
    date: '2026-05-15'
  },
  {
    company: 'Steuerkanzlei Rottweil',
    title: 'Steuerfachangestellte:r (m/w/d)',
    category: 'Dienstleistung',
    type: 'Vollzeit',
    location: 'Innenstadt Rottweil',
    desc: 'Wir suchen eine:n erfahrene:n Steuerfachangestellte:n für unser wachsendes Team. Moderne Arbeitsplätze, flexible Zeiten und Weiterbildung.',
    date: '2026-05-10'
  },
  {
    company: 'Buchhandlung am Tor',
    title: 'Aushilfe Buchverkauf (m/w/d)',
    category: 'Einzelhandel',
    type: 'Aushilfe',
    location: 'Hochbrücktorstraße, Rottweil',
    desc: 'Für die Vorweihnachtszeit und darüber hinaus suchen wir lesebegeisterte Unterstützung im Verkauf und bei der Warenpräsentation.',
    date: '2026-05-04'
  }
];

(function () {
  const list = document.getElementById('jobList');
  const search = document.getElementById('jobSearch');
  const filters = document.getElementById('jobFilters');
  if (!list) return;

  let activeCat = 'alle';

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { return iso; }
  }

  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  function render() {
    const q = (search.value || '').trim().toLowerCase();
    const matches = JOBS.filter(function (j) {
      const catOk = activeCat === 'alle' || j.category === activeCat;
      const text = (j.title + ' ' + j.company + ' ' + j.desc + ' ' + j.location).toLowerCase();
      const qOk = !q || text.indexOf(q) !== -1;
      return catOk && qOk;
    });

    if (!matches.length) {
      list.innerHTML = '<div class="jobs-empty">Aktuell keine passenden Stellen. Schau bald wieder vorbei – oder inseriere als Mitglied weiter unten.</div>';
      return;
    }

    list.innerHTML = matches.map(function (j) {
      return '' +
        '<article class="jcard">' +
          '<div class="jcard__top">' +
            '<div><p class="jcard__company">' + esc(j.company) + '</p>' +
            '<h3 class="jcard__title">' + esc(j.title) + '</h3></div>' +
            '<div class="jcard__logo" aria-hidden="true">' + initials(j.company) + '</div>' +
          '</div>' +
          '<div class="jcard__tags">' +
            '<span class="tag tag--type">' + esc(j.type) + '</span>' +
            '<span class="tag tag--cat">' + esc(j.category) + '</span>' +
          '</div>' +
          '<p class="jcard__desc">' + esc(j.desc) + '</p>' +
          '<div class="jcard__foot">' +
            '<span class="jcard__loc">' +
              '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
              esc(j.location) +
            '</span>' +
            '<span class="jcard__loc">' + fmtDate(j.date) + '</span>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  if (search) search.addEventListener('input', render);
  if (filters) {
    filters.addEventListener('click', function (e) {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      filters.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCat = btn.dataset.cat;
      render();
    });
  }

  render();

  /* ---- Inserat-Formular: per mailto an den GHV ---- */
  const form = document.getElementById('jobForm');
  const notice = document.getElementById('formNotice');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const d = new FormData(form);
      const subject = 'Jobbörse-Inserat: ' + (d.get('title') || '') + ' – ' + (d.get('company') || '');
      const body =
        'Neues Stelleninserat für die Rottweil-aktiv-Jobbörse:\n\n' +
        'Unternehmen: ' + d.get('company') + '\n' +
        'Ansprechpartner:in: ' + d.get('contact') + '\n' +
        'E-Mail: ' + d.get('email') + '\n' +
        'Stellenbezeichnung: ' + d.get('title') + '\n' +
        'Branche: ' + d.get('category') + '\n' +
        'Beschäftigungsart: ' + d.get('type') + '\n\n' +
        'Beschreibung:\n' + d.get('description') + '\n';
      window.location.href = 'mailto:info@rottweil-aktiv.de'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      if (notice) notice.classList.add('is-on');
      form.reset();
    });
  }
})();
