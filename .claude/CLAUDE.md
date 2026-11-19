# rottweil-aktiv.de – Arbeitsanleitung für Claude

Website des Gewerbe- und Handelsvereins Rottweil e.V. Statisches HTML/CSS/JS, gehostet über
GitHub Pages aus `main` (Root). **Jeder Push auf `main` ist nach 1–2 Min. live.**
Ausführliche Doku: `README.md` (Achtung: wird live unter rottweil-aktiv.de/README.md ausgeliefert –
dort nichts Internes/Vertrauliches eintragen; diese Datei hier liegt in `.claude/` und ist nicht öffentlich).

## Goldene Regeln

1. **Nur in `_source/` bearbeiten.** Die `*.html` im Root sind Build-Ergebnisse und werden überschrieben.
2. Danach immer bauen: `node _source/tools/build.js` (aus dem Repo-Root, keine Abhängigkeiten).
3. Bilder/PDFs liegen **direkt im Root**; im Quellcode als `assets/img/<datei>` referenzieren
   (Teamfotos: `assets/img/team/<datei>`). Der Build entfernt diese Präfixe.
4. **Nicht committen/pushen ohne ausdrückliche Freigabe des Nutzers** – Push = sofort live.
5. `parkzeit.html` niemals umbenennen (URL steht auf gedruckten QR-Codes).
6. Commit-Messages auf Deutsch, ohne Umlaute, im Stil `Bereich: was geaendert` (siehe `git log`).

## Wo ändere ich was?

| Aufgabe | Datei |
|---|---|
| Meldung/Veranstaltung | `_source/aktuelles.html` (`<article class="ncard" data-bis="…">` kopieren; `js/script.js` sortiert automatisch in „Bevorstehend“/„Rückblick“) **und**, falls bevorstehendes Event, auch auf `_source/index.html` (Startseite zeigt nur Kommendes; vergangene Kacheln werden per JS ausgeblendet und sollten dort gelegentlich gelöscht werden) |
| Stellenanzeige | `_source/js/jobs.js` → Array `JOBS` (`company, title, category, type, location, desc, date, url?`). `category` muss einem Filter-Chip entsprechen: Einzelhandel, Gastronomie, Handwerk, Dienstleistung, Ausbildung |
| Vorstand/Ausschuss | `_source/js/team.js` → Array `TEAM`; Foto als `<vorname-nachname>.jpg` in Root |
| Pop-up Verkaufsoffener Sonntag | `_source/js/vos.js` → `EVENT_END`, `BETRIEBE`, `PROGRAMM`. Öffnet automatisch nur auf `<body data-vos-auto>` (Startseite) bis `EVENT_END`; Buttons mit `data-vos-open` / `data-vos-open="programm"` |
| Impressum/Datenschutz/Satzung | `_source/impressum.html`, `datenschutz.html`, `satzung.html` |
| Navigation/Footer | in **jeder** `_source/*.html` einzeln vorhanden (kein Include-System) → überall gleich ändern |
| Farben/Abstände | `_source/css/style.css`, Tokens in `:root` (Navy `#111d5e`, Blau `#001aa7`, Gold `#f5b800`, Pink `#ec1e8c`) |
| Neue Seite | vorhandene `_source/*.html` kopieren, Title/Description/Canonical/OG anpassen, in `_source/sitemap.xml` eintragen |

Kachel-Muster (Aktuelles/Startseite):
```html
<article class="ncard" data-bis="JJJJ-MM-TT">  <!-- letzter Event-Tag bzw. Meldungsdatum (aktuelles.html + index.html) -->
  <div class="ncard__media"><img src="assets/img/BILD.jpg" alt="…" loading="lazy" onerror="this.parentNode.style.display='none'"></div>  <!-- optional -->
  <div class="ncard__body">
    <p class="ncard__meta">TT. Monat JJJJ &nbsp;•&nbsp; <b>Alle</b></p>
    <h3 class="ncard__title">Titel</h3>
    <p class="ncard__excerpt">Kurztext …</p>
    <a class="btn btn--gold ncard__btn" href="…">Button</a>  <!-- optional -->
    <span class="ncard__rule"></span>
  </div>
</article>
```

## Ablauf für jede Änderung

1. `git pull` (andere arbeiten ggf. direkt über die GitHub-Weboberfläche – „Add files via upload“).
2. In `_source/` ändern → `node _source/tools/build.js`.
3. Prüfen: `git diff --stat` – es sollten nur die erwarteten Root-HTML-Dateien + Quelle geändert sein.
   Lokal ansehen: `node _source/tools/serve.js` → http://localhost:8000 (Python ist auf Rauls Rechner nicht installiert).
   Screenshots zur Selbstkontrolle: Edge headless (`msedge --headless=new --screenshot=… --window-size=1300,2000 URL`);
   für Handy-Ansicht die Seite in ein 390 px breites iframe laden (schmale Fenster rendert headless falsch).
4. Defekte lokale Links prüfen (bekannt fehlend: `rottweilcard.png`, `GHV_Beitrittsformular.pdf`):
   ```bash
   for f in *.html; do grep -oE '(href|src)="[^"#:]+"' "$f" | sed -E 's/^(href|src)="//;s/"$//;s/\?.*//' | sort -u | while read r; do [ -e "$r" ] || echo "$f: $r"; done; done | grep -v "esc("
   ```
5. Dem Nutzer Änderung zusammenfassen, auf Freigabe warten, dann commit + push.

Sync-Check Quelle ↔ Live (Windows: Zeilenenden ignorieren, `core.autocrlf=true`):
```bash
node _source/tools/build.js /tmp/rbuild && for f in /tmp/rbuild/*.html; do diff -q <(tr -d '\r' <"$f") <(tr -d '\r' <"$(basename $f)") >/dev/null || echo "ABWEICHUNG $(basename $f)"; done
```
Abweichung = jemand hat Root-HTML direkt (z. B. per GitHub-Upload) geändert → erst in `_source/` nachziehen, sonst geht es beim nächsten Build verloren.

## Fallstricke

- Build ersetzt das CSS-Link-Tag nur in exakt dieser Form: `<link rel="stylesheet" href="css/style.css?v=1" />`.
- Skripte werden nur eingebettet, wenn exakt `<script src="js/NAME.js"></script>` (ohne weitere Attribute).
- `assets/logo.svg` wird im Build zu `cropped-ghv_header-7-2-1.png`, `assets/img/rottweilcard.jpg` zu `rottweilcard.png`.
- Kontakt- und Jobbörsen-Formular öffnen nur das Mailprogramm (mailto:), kein Server.
- Instagram-Links zeigen noch auf `https://www.instagram.com/` (Platzhalter, auch im JSON-LD auf index.html).
- Repo: `github.com/SavioLD/rottweil-aktiv` (gehört Savio Röckle / Ländle Digital, Übergabe an Raul Checa
  im Nov. 2026; Raul hat Push-Rechte über GitHub-Account `ChecaCon`). Domain/DNS bei Strato
  (Zugangsdaten nicht im Repo). MX-Einträge nie anfassen – Postfach info@rottweil-aktiv.de hängt daran.
- Remote-Branch `claude/analytics-tracker`: Altlast. Der WEBUNDO-Tracker war ab 16.07.2026 in `main`, ist durch
  spätere „Add files via upload“-Commits wieder verschwunden und derzeit **nicht** eingebunden.

## Offene Punkte

Siehe `README.md` → „Offene Punkte“ (Datenschutz- und Satzungs-Platzhalter, fehlendes Beitrittsformular-PDF,
Instagram-Profil, Google Fonts lokal, Parkzeit-FAQ, RottweilCard-Bild, ungenutzte Altdateien im Root).
