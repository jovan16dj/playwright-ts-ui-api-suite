[![codecov](https://codecov.io/gh/jovan16dj/playwright-ts-ui-api-suite/branch/main/graph/badge.svg)](https://codecov.io/gh/jovan16dj/playwright-ts-ui-api-suite)

# UI and API Automation Suite with Playwright

This project contains automated functional UI and API tests for demo applications using Playwright and TypeScript.

## Table of Contents

- [Project Overview](#project-overview)  
- [Technologies Used](#technologies-used)  
- [Project Structure](#project-structure)  
- [Setup Instructions](#setup-instructions)  
- [Running the Tests](#running-the-tests)  
- [Known Limitations](#known-limitations)  
- [Future Improvements](#future-improvements)  

---

## Project Overview

This test suite covers critical user flows for:

- **UI Tests:** Interactions with [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com/)  
- **API Tests:** CRUD operations and flows against the [Swagger Petstore API](https://petstore.swagger.io/)  

The goal was to demonstrate clean architecture, reusable code, and best practices in Playwright and TypeScript.

---

## Technologies Used

- [Playwright](https://playwright.dev/) for UI and API automation  
- TypeScript for type safety and maintainability  
- Node.js for scripting and test execution  

---

## Project Structure

```
tests/
├── ui/
│   ├── authentication/
│   ├── pim/
│   ├── recruitment/
│   └── e2e/
└── api/
    ├── pet/
    ├── store/
    └── user/
helpers/
pages/
fixtures/
utils/
playwright.config.ts
tsconfig.json
package.json
...
```

- UI tests are organized by feature/module  
- API tests are grouped by API resource category  
- Helpers contain reusable functions for API calls and test data  
- Pages contain Page Object Model classes for UI  

---

## Setup Instructions

1. Playwright installation guide:
   https://playwright.dev/docs/intro<br/>

2. Clone the repo:

```bash
git clone https://github.com/jovan16dj/playwright-ts-ui-api-suite.git
```

3. Install dependencies:

```bash
npm install
```

---

## Running the Tests

- Run all tests (UI + API):

```bash
npx playwright test
```

- Run UI tests only:

```bash
npx playwright test tests/ui
```

- Run API tests only:

```bash
npx playwright test tests/api
```

- Run with Playwright Test Runner UI:

```bash
npx playwright test --ui
```

---

## Known Limitations

- The Swagger Petstore API is a public demo and is **flaky**, especially for `GET /pet/{petId}` after creation.  
  - Some tests include retries or increased timeouts to mitigate this.  
  - Occasionally, tests may fail due to backend instability.  

---

## Future Improvements

- Implement CI/CD pipeline integration (GitHub Actions or similar)  
- Add test tagging and parallelization strategies  
- Enhance API helpers with retry utilities and mocks  
- Introduce better environment/config management  
- Expand UI test coverage and add visual regression testing  

---

If you have any questions or feedback, feel free to reach out!
