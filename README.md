# rottweil-aktiv.de

Website des **Gewerbe- und Handelsvereins Rottweil e.V.** (Rottweil aktiv).

- Statische Website (HTML, CSS, JavaScript). Kein CMS, keine Datenbank, kein Server-Code.
- **Hosting:** GitHub Pages direkt aus diesem Repository (Branch `main`, Root-Ordner).
  Jeder Push auf `main` ist nach ca. 1–2 Minuten live.
- **Domain:** `rottweil-aktiv.de`, registriert bei Strato (dort nur Domain/DNS).

---

## Aufbau des Repositorys

```
/                      ← wird ausgeliefert (= Live-Website)
├── *.html             ← fertig gebaute Seiten (CSS/JS eingebettet) – NICHT direkt bearbeiten
├── *.jpg/png/pdf      ← alle Bilder und PDFs liegen direkt im Root
├── CNAME              ← Custom Domain für GitHub Pages (rottweil-aktiv.de)
├── robots.txt, sitemap.xml
└── _source/           ← Quellcode (wird von GitHub Pages NICHT veröffentlicht)
    ├── *.html         ← Seiten, verweisen auf css/ und js/
    ├── css/style.css  ← gesamtes Styling, Farben/Abstände als Variablen oben in :root
    ├── js/script.js   ← Navigation (Mobil-Menü), Jahreszahl im Footer u. a.
    ├── js/jobs.js     ← Jobbörse: Daten (Array JOBS) + Darstellung
    ├── js/team.js     ← Vorstand & Ausschuss (Array TEAM)
    ├── js/vos.js      ← Pop-up „Verkaufsoffener Sonntag“ (Betriebe + Programm)
    └── tools/build.js ← Build-Skript: erzeugt die Root-HTML aus _source/
```

Ordner, die mit `_` beginnen, werden von GitHub Pages (Jekyll) nicht veröffentlicht.
Sollte jemals eine `.nojekyll`-Datei angelegt werden, wäre `_source/` öffentlich abrufbar
(nicht geheim, aber unschön) – dann den Ordner in einen eigenen Branch verschieben.

### Seiten

| Seite | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, die 3 neuesten Meldungen, „Wer steckt hinter Rottweil aktiv?“ |
| `aktuelles.html` | Alle Meldungen/Veranstaltungen als Kacheln |
| `jobboerse.html` | Stellenbörse der Mitglieder (Firmen-Kacheln → Stellen je Firma) |
| `ueber-uns.html` | Verein, Vorstand & Ausschuss, „Mitglied werden“ |
| `kontakt.html` | Kontaktdaten + Kontaktformular |
| `parkzeit.html` | Kampagne „Rottweil schenkt dir Zeit“ – **URL steht auf gedruckten QR-Codes, nicht umbenennen!** |
| `impressum.html`, `datenschutz.html`, `satzung.html` | Rechtstexte |
| `404.html` | Fehlerseite |

---

## Änderungen vornehmen

**Grundregel:** Immer in `_source/` ändern, dann bauen. Die HTML-Dateien im Root werden
beim Build komplett überschrieben – direkte Änderungen dort gehen sonst verloren.

```bash
# 1. Datei(en) in _source/ bearbeiten
# 2. Bauen (aus dem Repo-Root, benötigt nur Node.js >= 14):
node _source/tools/build.js
# 3. Lokal prüfen:
python3 -m http.server 8000     # dann http://localhost:8000 öffnen
# 4. Veröffentlichen:
git add -A && git commit -m "…" && git push
```

**Bilder & PDFs:** Datei direkt in den Root legen. Im Quellcode wird sie als
`assets/img/<dateiname>` eingebunden – das Build-Skript macht daraus `<dateiname>`.
Bilder vorher sinnvoll verkleinern (Fotos ca. 1200–1600 px breit, JPG).

### Häufige Aufgaben

- **Neue Meldung / Veranstaltung:** In `_source/aktuelles.html` einen bestehenden
  `<article class="ncard">…</article>`-Block kopieren und anpassen (neueste oben).
  Auf der Startseite (`_source/index.html`) stehen die 3 aktuellsten – dort ebenfalls
  austauschen. Optional mit Bild (`ncard__media`) und Button (`btn btn--gold ncard__btn`).
- **Stelle in der Jobbörse:** In `_source/js/jobs.js` ein Objekt im Array `JOBS` ergänzen
  (`company`, `title`, `category`, `type`, `location`, `desc`, `date`, optional `url` –
  Link zur Ausschreibung oder `mailto:`). Firmen-Kacheln entstehen automatisch.
- **Vorstand/Ausschuss:** `_source/js/team.js`, Array `TEAM`. Foto als `<vorname-nachname>.jpg`
  in den Root legen (im Quellcode als `assets/img/team/<datei>` referenziert).
- **Pop-up „Verkaufsoffener Sonntag“:** `_source/js/vos.js`. Enthält die Liste `BETRIEBE`
  (Name, optional Kennzeichnung/Website/Logo), das `PROGRAMM` und `EVENT_END`. Das Pop-up
  öffnet sich automatisch nur auf der Startseite, einmal pro Besuch und nur bis `EVENT_END`.
  Jedes Element mit `data-vos-open` öffnet es manuell (`data-vos-open="programm"` → Reiter Programm).
  Für den nächsten verkaufsoffenen Sonntag: Datum/Texte, Liste und `EVENT_END` anpassen.
- **Rechtstexte:** `_source/impressum.html`, `datenschutz.html`, `satzung.html`.

### Kontaktformular

Es gibt keinen Server: Das Formular (`_source/kontakt.html`, Skript am Seitenende) öffnet
das E-Mail-Programm des Besuchers mit einer vorausgefüllten Nachricht an
`info@rottweil-aktiv.de`. Soll es direkt versenden, braucht es einen Formular-Dienst
(z. B. Web3Forms/Formspree) – Datenschutzerklärung dann entsprechend ergänzen.

---

## Domain, DNS & GitHub Pages

DNS-Einträge bei Strato (für die Website):

| Typ | Name | Wert |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `saviold.github.io` |

- In GitHub unter *Settings → Pages*: Custom domain `rottweil-aktiv.de`, „Enforce HTTPS“ an
  (das Zertifikat erstellt GitHub automatisch).
- **E-Mail (MX-Einträge) für `info@rottweil-aktiv.de` nicht verändern.**
- Wird das Repository auf einen anderen GitHub-Account/eine Organisation übertragen, muss
  der `www`-CNAME auf `<neuer-account>.github.io` zeigen und die Custom Domain in den
  Pages-Einstellungen neu eingetragen werden.

**SEO:** Jede Seite hat Title, Description, Canonical- und Open-Graph-Tags. Sitemap:
`https://rottweil-aktiv.de/sitemap.xml` (bei neuen Seiten ergänzen; in der Google Search
Console einreichen).

---

## Offene Punkte (Stand Übergabe)

1. **Datenschutzerklärung ist ein Platzhalter** – muss durch eine vollständige,
   rechtssichere Fassung ersetzt werden (`_source/datenschutz.html`).
2. **Impressum:** Registergericht und Vereinsregister-Nummer fehlen (`[Amtsgericht]`, `[VR-Nummer]`).
3. **Satzung** ist ein Platzhalter – gültige Satzung einfügen oder als PDF verlinken.
4. **`GHV_Beitrittsformular.pdf`** ist auf „Über uns“ verlinkt, liegt aber nicht im Repo → hochladen.
5. **Instagram-Links** zeigen überall nur auf `https://www.instagram.com/` → echtes Profil eintragen
   (in allen Seiten unter `_source/` per Suchen & Ersetzen, dann bauen).
6. **Google Fonts** (Poppins) werden extern von Google geladen – aus Datenschutzgründen
   (DSGVO) empfehlenswert, die Schrift lokal einzubinden.
7. **Parkzeit-Seite:** Einige FAQ-Antworten stehen noch auf „Antwort folgt“.
8. **RottweilCard-Kachel** (Aktuelles): Bild `rottweilcard.png` fehlt, die Kachel wird ohne Bild angezeigt.
9. **Ungenutzte Altdateien** im Root, können gelöscht werden: `style.css`, `script.js`,
   `jobs.js`, `team.js`, `logo.svg`, `aktuelles_ENTWURF.html`, `Logo_Homepage_200x45_V1.avif`,
   `gutscheinkarte.png`, `Polygon-shape-border.svg`, `Polygon-shape-fill.svg`,
   `hero-img-background-11.svg`, `hero-img-background-22.svg`, `pattern-left.svg`.
