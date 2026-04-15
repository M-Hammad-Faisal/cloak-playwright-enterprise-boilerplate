# 🕵️‍♂️ Cloak Browser Playwright Boilerplate

A professional, production-ready boilerplate for building stealthy web scrapers and automation scripts using [Cloak Browser](https://cloakbrowser.dev) and [Playwright](https://playwright.dev).

## 🚀 Features

- **🛡️ Stealth by Design**: Integrated with Cloak Browser for undetectable automation.
- **🏗️ Modular Architecture**: Decoupled Page Object Model (POM) and script entries.
- **📁 Organized Outputs**: Dedicated directories for extracted data (CSV) and screenshots.
- **⚙️ Config Driven**: Centralized configuration using environment variables.
- **💎 Professional Tooling**: Pre-configured with TypeScript, ESLint, and Prettier.
- **📊 Data Persistence**: Built-in CSV utility for structured data extraction.

## 🛠️ Setup

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment**:
   Copy the example environment file and fill in your details:
   ```bash
   cp .env.example .env
   ```

## 📋 Available Commands

| Command                  | Description                                                             |
| :----------------------- | :---------------------------------------------------------------------- |
| `npm run start:extract`  | Extract all items from Sauce Demo to `output/data/extracted_items.csv`. |
| `npm run start:checkout` | Complete the full E2E checkout flow and save a confirmation screenshot. |
| `npm run format`         | Automatically format code using Prettier.                               |
| `npm run lint`           | Check for code quality issues using ESLint.                             |
| `npm run clean`          | Remove all generated artifacts in the `output/` directory.              |

## 📐 Architecture

```text
src/
├── config/      # System configuration (Env variables)
├── pages/       # Page Object Models (POM)
├── scripts/     # Automation entry points (Scripts)
├── utils/       # Shared utilities (Logger, CSV, etc.)
└── types/       # Global TypeScript types
output/          # Artifacts (CSVs, Screenshots)
```

## 🤝 Contributing

This boilerplate is designed to be easily extendable. To add a new automation:

1. Create necessary components in `src/pages/`.
2. Add a new entry point in `src/scripts/`.
3. Add a corresponding script in `package.json`.

---

_Built for stealth and scale._
