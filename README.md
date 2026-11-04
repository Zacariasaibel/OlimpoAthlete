# OlimpoAthlete

[Live-Demo ausprobieren](https://zacariasaibel.github.io/OlimpoAthlete/)

Die Idee zu OlimpoAthlete entstand aus meinem Interesse am Krafttraining. Ein Trainingsplan soll zur eigenen Erfahrung, zur verfügbaren Zeit und zur Ausstattung passen.

Ich wollte diese Angaben in einer Webanwendung zusammenführen und daraus einen einfachen Wochenplan erstellen. Die aktuelle Version zeigt diesen Ablauf als Frontend-Prototyp.

## So funktioniert die Anwendung

1. „Get Started“ öffnen und mit fiktiven Zugangsdaten eine Registrierung simulieren.
2. Einen der drei Coaches wählen: Ares, Hercules oder Athena.
3. Erfahrung, verfügbare Trainingstage, Trainingsdauer und Ausstattung angeben.
4. Einen Wochenplan mit Übungen, Sätzen, Wiederholungen und Pausen erzeugen.

Zur Auswahl stehen Fitnessstudio, Geräte zu Hause und Training mit dem eigenen Körpergewicht. Möglich sind ein bis fünf ganze Trainingstage pro Woche.

Die Anwendung führt durch die einzelnen Entscheidungen und stellt die Übungen im Wochenplan zusammen. So lässt sich ausprobieren, wie unterschiedliche Angaben den Plan beeinflussen.

## Technischer Aufbau

Die Oberfläche wurde mit Angular, TypeScript, Angular Forms und CSS umgesetzt. Die Trainingspläne entstehen anhand festgelegter Regeln und hinterlegter Übungen. Es wird keine KI zur Planerstellung eingesetzt.

Registrierung und Anmeldung werden mit Local Storage simuliert. Es gibt kein Backend und keine sicheren Benutzerkonten. Bitte ausschließlich fiktive Zugangsdaten und keine echten Passwörter verwenden.

Tarife und Checkout dienen der Demonstration. Es werden keine Abonnements abgeschlossen oder Zahlungen verarbeitet.

## Lokal starten

Das Projekt verwendet Angular 22. Benötigt wird eine unterstützte Node.js-Version, beispielsweise Node.js 24 ab Version 24.15.0.

```sh
git clone https://github.com/Zacariasaibel/OlimpoAthlete.git
cd OlimpoAthlete
npm ci
npm start
```

Anschließend `http://localhost:4200/` öffnen.

## Prüfungen und Build

Tests ausführen:

```sh
npm test -- --watch=false
```

Build für GitHub Pages erstellen:

```sh
npm run build -- --base-href /OlimpoAthlete/
```

Die dokumentierten Ergebnisse stehen unter [Prüfungen und technische Hinweise](docs/verification.md).

## Aktuelle Grenzen

Die Anwendung wechselt ihre Ansichten innerhalb einer Seite. Anmeldung und Trainingsplan haben keine eigenen URL-Routen.

Beim Neuladen erscheint die Startseite. Das fiktive Konto bleibt im Browser gespeichert. Die vorhandenen Abschnittslinks sind direkt erreichbar.