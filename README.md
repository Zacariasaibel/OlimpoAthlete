# OlimpoAthlete

Frontend-Prototyp für regelbasierte Trainingspläne. Nach einer simulierten Registrierung wählst du Ares, Hercules oder Athena. Erfahrung, verfügbare Tage, Trainingsdauer und Ausstattung bestimmen den Wochenplan mit Übungen, Sätzen, Wiederholungen und Pausen.

[Live-Demo öffnen](https://zacariasaibel.github.io/OlimpoAthlete/)

## Ausprobieren

„Get Started“ öffnen und fiktive Zugangsdaten eingeben. Einen Coach wählen, das Profil ausfüllen und den Plan erzeugen. Es gibt drei Ausstattungen: Fitnessstudio, Geräte zu Hause und Eigengewicht. Ein bis fünf ganze Trainingstage sind möglich.

Registrierung und Anmeldung werden ausschließlich mit Local Storage simuliert. Keine echten Passwörter eingeben. Es gibt kein Backend, keine echte KI und keine sicheren Benutzerkonten. Tarife und Checkout sind nur Demonstrationen; es werden weder Abos abgeschlossen noch Zahlungen verarbeitet.

## Lokal starten

Angular 22, TypeScript, Angular Forms und CSS. Benötigt wird eine von Angular 22 unterstützte Node-Version, beispielsweise Node 24 ab 24.15.0.

```sh
git clone https://github.com/Zacariasaibel/OlimpoAthlete.git
cd OlimpoAthlete
npm ci
npm start
```

Danach `http://localhost:4200/` öffnen. `npm test -- --watch=false` führt die Tests aus. `npm run build -- --base-href /OlimpoAthlete/` erstellt den GitHub-Pages-Build.

Die Anwendung wechselt ihre Ansichten innerhalb einer Seite. Es gibt keine eigenen URL-Routen für Anmeldung oder Trainingsplan. Beim Neuladen erscheint die Startseite; das fiktive Konto bleibt im Browser gespeichert. Die vorhandenen Abschnittslinks bleiben direkt erreichbar.

[Prüfungen und technische Hinweise](docs/verification.md)
