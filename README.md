# Playwright + TypeScript E2E framework (scaffold)

This repository now includes a small Playwright + TypeScript testing framework scaffold for https://practicesoftwaretesting.com.

What I added
- Page Objects: `tests/pages/BasePage.ts`, `tests/pages/HomePage.ts`, `tests/pages/LoginPage.ts`
- Fixtures: `tests/support/testFixtures.ts` — injects page objects into tests
- Sample test: `tests/e2e/navigation.spec.ts`

Quick setup & run (Windows PowerShell)

1. Install dependencies (Playwright already in devDependencies in this repo):

```powershell
npm install
npx playwright install
```

2. Run the smoke tests (chromium):

```powershell
npx playwright test tests/e2e/navigation.spec.ts -p chromium
```

3. Open the HTML report after the run (if reporter is html):

```powershell
npx playwright show-report
```

Notes and next steps
- Add strong, explicit selectors for form fields once you inspect the real login form.
- Add test data and secrets handling (use `.env` + `dotenv` and `process.env` in `playwright.config.ts`).
- Add CI workflow (GitHub Actions) to run tests on push/PR.
