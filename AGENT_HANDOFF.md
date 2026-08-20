# Universal AI Handoff — Flight Counter

> **UNIVERSAL AI NOTICE (Antigravity, Claude, ChatGPT, Gemini, Copilot, Cursor)**
> This file contains the current architecture, storage contract, deployment process, and continuation rules for this application.

## Project Overview

- **App Name**: ORD, Puerto Rico, New York, and Dubai Flight Counter & Tracker
- **Canonical Local Workspace**: `G:\My Drive\Colab\flight-counter-ord-pr`
- **GitHub Repository**: `https://github.com/mainegetmoney-ship-it/flight-counter-ord-pr`
- **Firebase Project**: `ord-pr-flight-counter`
- **Hosting Engine**: Firebase Hosting serving `public/`
- **Current Route Patch Branch**: `chatgpt/add-pr-jfk-dxb-routes`
- **Baseline Version**: 1.0.0
- **Current Candidate**: 1.1.0

## Core Files

| File | Purpose |
| :--- | :--- |
| `public/index.html` | Single-page interface, route filters, manifest, and Add Flight modal |
| `public/app.js` | Flight state, route logic, localStorage persistence, filters, search, counters, and sample schedule |
| `public/styles.css` | Custom styling, animations, and status badges |
| `server/firebase-admin.js` | Firebase Admin SDK initialization for server-side/administrative tasks |
| `firebase.json` | Firebase Hosting configuration serving `public/` with SPA rewrite |
| `.firebaserc` | Firebase project alias for `ord-pr-flight-counter` |
| `.github/workflows/firebase-hosting-pull-request.yml` | Firebase preview deployment for pull requests |
| `.github/workflows/firebase-hosting-merge.yml` | Firebase production deployment for `main` |
| `AGENTS.md` | Repository modification and verification policy |

## Route Set

- ORD → SJU
- SJU → ORD
- ORD → BQN
- BQN → ORD
- ORD → PSE
- PSE → ORD
- SJU → JFK
- BQN → JFK
- PSE → JFK
- JFK → DXB

New York defaults to JFK and Dubai defaults to DXB.

## Storage Contract

Flight entries remain stored under:

`ord_pr_flight_tracker_v1`

Do not rename, replace, or clear this key during code updates.

## Firebase GitHub Deployment Contract

GitHub Actions uses the repository secret:

`FIREBASE_SERVICE_ACCOUNT_ORD_PR_FLIGHT_COUNTER`

The secret must contain the Firebase service account JSON for project `ord-pr-flight-counter`. Never place that JSON in repository files, commits, chat messages, screenshots, or logs.

Once the secret is configured:

1. Pull requests deploy to a temporary Firebase Hosting preview channel.
2. The Firebase action posts the preview URL to the pull request.
3. Pushes to `main` deploy to the live Firebase Hosting channel.
4. A patch is not complete until the deployed commit and Firebase test URL are reported.

## Firebase Admin SDK Contract

`server/firebase-admin.js` initializes the Firebase Admin SDK for server-side and
administrative work. The browser application in `public/` does not use it and must
never import it.

Credentials are resolved at runtime, in this order:

1. `FIREBASE_SERVICE_ACCOUNT` — service account JSON, raw or base64
2. `FIREBASE_SERVICE_ACCOUNT_PATH` — path to a service account JSON file
3. `GOOGLE_APPLICATION_CREDENTIALS` — path to a service account JSON file
4. Application Default Credentials — `gcloud`, Cloud Run, or Cloud Functions

The project id defaults to `ord-pr-flight-counter` and can be overridden with
`FIREBASE_PROJECT_ID`. `initializeFirebaseAdmin()` is idempotent and returns the
existing app when one is already initialized.

Service account JSON must never be committed. The generic Firebase console snippet
that hardcodes `require('path/to/serviceAccountKey.json')` is not permitted in this
repository; use the environment-based resolution above instead.

Confirm which credential source is configured without printing secrets:

```bash
npm run admin:check
```

## Verification Rules

1. Read `AGENTS.md` and this handoff before editing.
2. Preserve `ord_pr_flight_tracker_v1`.
3. Validate JavaScript with `npm run check` (`node --check public/app.js` and `node --check server/firebase-admin.js`).
4. Confirm each route works in sample data, filters, manifest rendering, and Add Flight.
5. Commit and push only when authorized.
6. Deploy only through Firebase Hosting.
7. Always provide the actual Firebase test URL after successful deployment.
