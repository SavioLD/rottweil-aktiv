/* =====================================================================
   Jobbörse – Rottweil aktiv
   Ansicht 1: Unternehmen als Kacheln.  Klick → Ansicht 2: Stellen der Firma.
   Neue Stelle: einfach unten im JOBS-Array ergänzen (company = Firmenname).
   ===================================================================== */

const JOBS = [
  {
    company: 'Georg Köbele GmbH & Co. KG',
    title: 'Buchhalter (m/w/d) – Finanzen',
    category: 'Dienstleistung', type: 'Teilzeit/Vollzeit (30–40 Std.)',
    location: 'Nagold',
    desc: 'Für unsere Finanzabteilung suchen wir Verstärkung in der Buchhaltung (30–40 Std./Woche). Alle Aufgaben, Anforderungen und die Bewerbung findest du über den Stellen-Link.',
    url: 'https://koebele.de/karriere/detail/buchhaltung/#stellenangebot',
    date: '2026-09-07'
  },
  {
    company: 'Georg Köbele GmbH & Co. KG',
    title: 'IT-Systemadministrator (m/w/d) – Infrastruktur & IT-Service',
    category: 'Dienstleistung', type: 'Vollzeit',
    location: 'Nagold',
    desc: 'Für Infrastruktur & IT-Service suchen wir eine:n IT-Systemadministrator:in. Aufgaben, Anforderungen und Bewerbung über den Stellen-Link.',
    url: 'https://koebele.de/karriere/detail/it-infrastruktur-service-idad-ng/#stellenangebot',
    date: '2026-09-07'
  },
  {
    company: 'Georg Köbele GmbH & Co. KG',
    title: 'IT-Servicetechniker (m/w/d) im Außendienst',
    category: 'Dienstleistung', type: 'Vollzeit',
    location: 'Außendienst – Region Nagold',
    desc: 'IT-Servicetechniker:in im Außendienst (Region Nagold). Aufgaben, Anforderungen und Bewerbung über den Stellen-Link.',
    url: 'https://koebele.de/karriere/detail/it-servicetechnik-ad-ng/#stellenangebot',
    date: '2026-09-07'
  },
  {
    company: 'Georg Köbele GmbH & Co. KG',
    title: 'IT-Servicetechniker (m/w/d) im Außendienst',
    category: 'Dienstleistung', type: 'Vollzeit',
    location: 'Außendienst – Region Rottweil',
    desc: 'IT-Servicetechniker:in im Außendienst (Region Rottweil). Aufgaben, Anforderungen und Bewerbung über den Stellen-Link.',
    url: 'https://koebele.de/karriere/detail/it-servicetechnik-ad-rw/#stellenangebot',
    date: '2026-09-07'
  },
  {
    company: 'Volksbank Rottweil eG',
    title: 'Berater Privatkunden mit Geschäftsstellenverantwortung (m/w/d)',
    category: 'Dienstleistung', type: 'Vollzeit',
    location: 'Zimmern o.R.',
    desc: 'Ganzheitliche Beratung vermögender Privatkunden im Kredit- und Wertpapierbereich, Leitung der Geschäftsstelle in Zimmern sowie regionale Netzwerkpflege. Für Bewerber:innen mit langjähriger Erfahrung in der Privatkundenbetreuung – bei einer TOP-Genossenschaftsbank, inkl. mobilem Arbeiten.',
    date: '2026-08-13'
  },
  {
    company: 'Intersport Kirsner',
    title: 'Ausbildung Einzelhandelskaufmann/-frau (m/w/d)',
    category: 'Ausbildung', type: 'Ausbildung',
    location: 'Rottweil',
    desc: 'Ausbildung im Sportfachhandel für sportbegeisterte Schulabgänger:innen: Beratung, Verkauf und ansprechende Warenpräsentation in einem jungen, dynamischen Team – mit strukturiertem Ausbildungsplan. Bewirb dich und schreib uns, welcher dein Lieblingssport ist!',
    url: 'mailto:dorothee@kirsner-sport.de?subject=Bewerbung Ausbildung Einzelhandelskaufmann/-frau (m/w/d)',
    date: '2026-09-15'
  },
  {
    company: 'Intersport Kirsner',
    title: 'Verkäufer/in (m/w/d) – Sporttextilien',
    category: 'Einzelhandel', type: 'Vollzeit',
    location: 'Rottweil',
    desc: 'Fachkundige Beratung und aktiver Verkauf im Bereich Sporttextilien (Outdoor, Ski, Fitness), Aufbau attraktiver Warenpräsentationen und Mitgestaltung eines positiven Einkaufserlebnisses – in einem eingespielten Team, ohne Verkaufsdruck durch Provisionen.',
    url: 'mailto:m.frank@kirsner-sport.de?subject=Bewerbung Verkäufer/in (m/w/d) Sporttextilien',
    date: '2026-09-15'
  }
];

(function () {
  const list = document.getElementById('jobList');
  const search = document.getElementById('jobSearch');
  const filters = document.getElementById('jobFilters');
  if (!list) return;

  let activeCat = 'alle';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (e) { return iso; }
  }
  function initials(name) {
    return name.replace(/GmbH|Co\.?|KG|eG|&/gi, ' ').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  // Firmen gruppieren (Reihenfolge des ersten Auftretens)
  function grouped() {
    const map = new Map();
    JOBS.forEach(function (j) {
      if (!map.has(j.company)) map.set(j.company, []);
      map.get(j.company).push(j);
    });
    return map;
  }

  function jobCard(j) {
    const isMail = j.url && j.url.indexOf('mailto:') === 0;
    const label = isMail ? 'Per E-Mail bewerben →' : 'Zur Stelle &amp; Bewerbung →';
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
        (j.url ? '<a class="jcard__link" href="' + esc(j.url) + '"' + (isMail ? '' : ' target="_blank" rel="noopener"') + '>' + label + '</a>' : '') +
        '<div class="jcard__foot">' +
          '<span class="jcard__loc">' +
            '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
            esc(j.location) +
          '</span>' +
          '<span class="jcard__loc">' + fmtDate(j.date) + '</span>' +
        '</div>' +
      '</article>';
  }

  function renderCompanies() {
    const q = (search && search.value || '').trim().toLowerCase();
    const map = grouped();
    const entries = [];
    map.forEach(function (jobs, company) {
      const jf = jobs.filter(function (j) { return activeCat === 'alle' || j.category === activeCat; });
      if (!jf.length) return;
      if (q) {
        const text = (company + ' ' + jf.map(function (j) { return j.title + ' ' + j.desc + ' ' + j.location; }).join(' ')).toLowerCase();
        if (text.indexOf(q) === -1) return;
      }
      entries.push([company, jf]);
    });

    list.className = '';
    if (!entries.length) {
      list.innerHTML = '<div class="jobs-empty">Aktuell keine passenden Unternehmen. Schau bald wieder vorbei – oder inseriere als Mitglied weiter unten.</div>';
      return;
    }
    list.innerHTML = '<div class="companies">' + entries.map(function (e) {
      const company = e[0], jf = e[1];
      return '<button class="ccard" type="button" data-company="' + esc(company) + '">' +
        '<span class="ccard__logo" aria-hidden="true">' + initials(company) + '</span>' +
        '<span class="ccard__name">' + esc(company) + '</span>' +
        '<span class="ccard__count">' + jf.length + ' offene ' + (jf.length === 1 ? 'Stelle' : 'Stellen') + '</span>' +
        '<span class="ccard__go">Stellen ansehen →</span>' +
      '</button>';
    }).join('') + '</div>';
  }

  function renderCompany(company) {
    const map = grouped();
    const jobs = map.get(company);
    if (!jobs) { location.hash = ''; return; }
    list.className = '';
    list.innerHTML =
      '<div class="jobs-back"><button class="backlink" type="button">← Alle Unternehmen</button></div>' +
      '<h2 class="jobs-company-head">' + esc(company) + '</h2>' +
      '<div class="jobs">' + jobs.map(jobCard).join('') + '</div>';
  }

  function route() {
    const h = location.hash || '';
    const m = h.match(/^#u=(.+)$/);
    if (m) {
      var name;
      try { name = decodeURIComponent(m[1]); } catch (e) { name = ''; }
      if (grouped().has(name)) { renderCompany(name); window.scrollTo({ top: 0, behavior: 'auto' }); return; }
    }
    renderCompanies();
  }

  // Klick auf Firmen-Kachel bzw. Zurück-Link
  list.addEventListener('click', function (e) {
    const card = e.target.closest('.ccard');
    if (card) { location.hash = '#u=' + encodeURIComponent(card.dataset.company); return; }
    if (e.target.closest('.backlink')) { location.hash = ''; }
  });

  window.addEventListener('hashchange', route);

  if (search) search.addEventListener('input', function () { if (location.hash) location.hash = ''; else renderCompanies(); });
  if (filters) {
    filters.addEventListener('click', function (e) {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      filters.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
      btn.classList.add('is-active');
      activeCat = btn.dataset.cat;
      if (location.hash) location.hash = ''; else renderCompanies();
    });
  }

  route();
})();
