/* =====================================================================
   Vorstand & Ausschuss – Rottweil aktiv
   Neue Personen einfach als Objekt ergänzen. Foto unter
   assets/img/team/<slug>.jpg ablegen (siehe assets/img/team/README.md).
   Felder ohne Wert ("") werden automatisch ausgeblendet.
   ===================================================================== */

const TEAM = [
  {
    name: 'Tobias Rützel', role: '1. Vorstand',
    org: 'Gent. Männermode', address: 'Hochbrücktorstraße 23',
    phone: '0741 94 10 93 10', email: 'ruetzel@gent-man.de',
    img: 'assets/img/team/tobias-ruetzel.jpg'
  },
  {
    name: 'Marcus Frank', role: '2. Vorstand',
    org: 'Intersport Kirsner', address: 'Kriegsdamm 5',
    phone: '0741 44393', email: 'info@kirsner-sport.de',
    img: 'assets/img/team/marcus-frank.jpg'
  },
  {
    name: 'Ralf Graner', role: 'Handwerk & Dienstleistung',
    org: 'Graner Photodesign', address: 'Hauptstraße 55',
    phone: '0171 236 96 81', email: 'info@ralfgraner.de',
    img: 'assets/img/team/ralf-graner.jpg'
  },
  {
    name: 'Savio Röckle', role: 'Marketing & Kommunikation',
    org: 'Ländle Digital', address: 'Königstr. 26',
    phone: '0151 101 88436', email: 'info@laendle-digital.de',
    img: 'assets/img/team/savio-roeckle.jpg'
  },
  {
    name: 'Thomas Makosch', role: 'Gastronomie',
    org: 'Beach0741', address: 'Kriegsdamm 5, Parkdeck 4',
    phone: '0741 34 85 58 91', email: 'info@beach0741.de',
    img: 'assets/img/team/thomas-makosch.jpg'
  },
  {
    name: 'Monica Ribeiro', role: 'Geschäftsstelle',
    org: 'Monica Ribeiro', address: 'Durschstr. 91',
    phone: '0175 84 94 468', email: 'info@rottweil-aktiv.de',
    img: 'assets/img/team/monica-ribeiro.jpg'
  }
];

(function () {
  const wrap = document.getElementById('teamList');
  if (!wrap) return;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  wrap.innerHTML = TEAM.map(function (m) {
    const photo = m.img
      ? '<img class="member__img" src="' + esc(m.img) + '" alt="' + esc(m.name) + '" ' +
        'onerror="this.outerHTML=\'<div class=&quot;member__ph&quot; aria-hidden=&quot;true&quot;>' + initials(m.name) + '</div>\'">'
      : '<div class="member__ph" aria-hidden="true">' + initials(m.name) + '</div>';

    const lines = [];
    if (m.org) lines.push('<p class="member__org">' + esc(m.org) + '</p>');
    if (m.address) lines.push('<p class="member__line">' + esc(m.address) + '</p>');
    if (m.phone) lines.push('<p class="member__line"><a href="tel:' + esc(m.phone.replace(/\s+/g, '')) + '">' + esc(m.phone) + '</a></p>');
    if (m.email) lines.push('<p class="member__line"><a href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a></p>');

    return '<article class="member">' +
      photo +
      '<h3 class="member__name">' + esc(m.name) + '</h3>' +
      (m.role ? '<p class="member__role">' + esc(m.role) + '</p>' : '') +
      lines.join('') +
    '</article>';
  }).join('');
})();
