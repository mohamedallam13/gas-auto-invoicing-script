# AGENT.md — gas-auto-invoicing-script

## Purpose
A Google Apps Script automation that generates HTML-based invoices from Google Sheet entries, applying business logic and sending them via email. Triggered by Drive events and form submissions.

## Structure
```
gas-auto-invoicing-script/
├── README.md
├── AGENT.md
├── .gitignore
├── screenshots/
└── src/
    ├── appsscript.json      ← GAS manifest (triggers, scopes)
    ├── Menu Code.js         ← custom menu registration
    ├── Imp.js               ← imports / shared constants
    ├── Lodash.js            ← Lodash utility library (bundled)
    ├── Utils.js             ← pure utility functions
    ├── y-Sheets.js          ← Sheets read/write layer
    ├── y-Sheets UI.js       ← Sheets UI helpers (sidebars, dialogs)
    ├── y-Files.js           ← Drive file operations
    ├── y-Forms.js           ← Forms integration
    ├── y-Emails.js          ← email composition and sending
    ├── y-Templates.js       ← HTML invoice template rendering
    ├── l-Trigger-Drive.js   ← Drive-based trigger logic
    ├── z-Trigger-Drive.js   ← alternative trigger entry point
    ├── z--Invoicing-Logic.js ← core invoicing business logic
    ├── z--On Form.js        ← onFormSubmit trigger handler
    └── z-Main.js            ← main orchestration
```

## Key Facts
- **Platform:** Google Apps Script (standalone script with triggers)
- **Integrations:** Google Sheets, Google Drive, Google Forms, Gmail
- **Pattern:** Trigger-driven automation; `y-` = integration layer, `z-` = orchestration
- **Triggers:** Drive onChange, Form onSubmit
- **Lodash** is bundled directly in `Lodash.js` (no npm)

## Development Notes
- All source files live under `src/` — push with clasp from that directory
- No Node/npm at runtime; ES5-compatible GAS code only
