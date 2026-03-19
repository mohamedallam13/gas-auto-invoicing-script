# GAS Auto Invoicing Script

A Google Apps Script automation that generates HTML-based invoices from Google Sheet entries, applies business logic per client/freelancer, and emails PDFs automatically. Triggered by Drive events and form submissions.

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Sheets%20Automation-blue)

---

## Features

- Fetches billing data from Google Sheets to generate monthly invoices automatically
- Builds invoices from HTML templates using the Lodash template engine (bundled — no npm)
- Custom business logic to conditionally add or remove line items per invoice type
- Sends emails to clients and freelancers with PDF invoices attached
- Writes confirmation and PDF links back to the source Sheet
- Saves generated invoice PDFs to Google Drive
- Triggered by Drive file changes and Google Form submissions

---

## Tech Stack

| Layer        | Technology                             |
|--------------|----------------------------------------|
| Platform     | Google Apps Script                     |
| Templating   | Lodash (bundled in `Lodash.js`)        |
| Integrations | Google Sheets, Drive, Forms, Gmail     |
| Triggers     | Drive onChange, Form onSubmit          |
| Deploy       | clasp CLI                              |

---

## Project Structure

```
gas-auto-invoicing-script/
├── README.md
├── AGENT.md
├── .gitignore
├── screenshots/
└── src/
    ├── appsscript.json       # GAS manifest (triggers, scopes)
    ├── Menu Code.js          # Custom menu registration
    ├── Imp.js                # Shared imports / constants
    ├── Lodash.js             # Lodash utility library (bundled)
    ├── Utils.js              # Pure utility functions
    ├── y-Sheets.js           # Sheets read/write layer
    ├── y-Sheets UI.js        # Sheets UI helpers (sidebars, dialogs)
    ├── y-Files.js            # Drive file operations
    ├── y-Forms.js            # Forms integration
    ├── y-Emails.js           # Email composition and sending
    ├── y-Templates.js        # HTML invoice template rendering
    ├── l-Trigger-Drive.js    # Drive trigger logic
    ├── z-Trigger-Drive.js    # Alternative Drive trigger entry
    ├── z--Invoicing-Logic.js # Core invoicing business logic
    ├── z--On Form.js         # onFormSubmit trigger handler
    └── z-Main.js             # Main orchestration entry point
```

**Naming convention:** `y-` = integration/service layer · `z-` = orchestration/main logic · `l-` = listener/trigger

---

## Getting Started

### Prerequisites

- A Google account with Google Apps Script access
- [clasp](https://github.com/google/clasp) installed globally

```bash
npm install -g @google/clasp
clasp login
```

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedallam13/gas-auto-invoicing-script.git
   cd gas-auto-invoicing-script
   ```

2. Link to your Apps Script project:
   ```bash
   clasp create --type standalone --title "Auto Invoicing" --rootDir src
   ```

3. Push source files:
   ```bash
   clasp push
   ```

4. In the Apps Script editor, set up triggers:
   - **Form onSubmit** → `z--On Form.js`
   - **Drive onChange** → `l-Trigger-Drive.js`

---

## Author

**Mohamed Allam** — [GitHub](https://github.com/mohamedallam13) · [Email](mailto:mohamedallam.tu@gmail.com)
