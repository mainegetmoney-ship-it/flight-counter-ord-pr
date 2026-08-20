# ORD, Puerto Rico, New York, and Dubai Flight Counter

A lightweight browser-based application for logging and filtering flights across Chicago O'Hare, Puerto Rico, New York, and Dubai routes.

## Project Structure

```text
flight-counter-ord-pr/
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── server/
│   └── firebase-admin.js
├── .github/workflows/
│   ├── firebase-hosting-pull-request.yml
│   └── firebase-hosting-merge.yml
├── firebase.json
├── .firebaserc
├── AGENT_HANDOFF.md
├── AGENTS.md
└── package.json
```

## Local Preview

```bash
npm start
```

Then open `http://localhost:8080`.

## Validation

```bash
npm run check
```

## Firebase Project

```text
ord-pr-flight-counter
```

Firebase Hosting serves `public/` according to `firebase.json`.

## GitHub to Firebase Deployment

GitHub Actions expects this repository secret:

```text
FIREBASE_SERVICE_ACCOUNT_ORD_PR_FLIGHT_COUNTER
```

The value must be the Firebase service account JSON for the `ord-pr-flight-counter` project. Never commit that JSON to the repository.

After the secret is configured:

- Pull requests create temporary Firebase Hosting preview deployments.
- Pushes to `main` deploy to the live Firebase Hosting channel.
- A patch is complete only after Firebase deploys it and the test URL is provided.

The one-time official Firebase setup command is:

```bash
firebase init hosting:github
```

Select repository `mainegetmoney-ship-it/flight-counter-ord-pr` and Firebase project `ord-pr-flight-counter`.

## Firebase Admin SDK

`server/firebase-admin.js` initializes the Firebase Admin SDK for server-side and
administrative tasks. It is Node-only — the browser app in `public/` never imports it.

```bash
npm install
```

```js
const { initializeFirebaseAdmin } = require('./server/firebase-admin');

const app = initializeFirebaseAdmin();
```

Credentials are read from the environment, never from a file in this repository:

| Variable | Purpose |
| :--- | :--- |
| `FIREBASE_SERVICE_ACCOUNT` | Service account JSON, raw or base64 |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Path to a service account JSON file |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to a service account JSON file |
| `FIREBASE_PROJECT_ID` | Overrides the default `ord-pr-flight-counter` |

If none are set, Application Default Credentials are used (`gcloud auth
application-default login`, Cloud Run, or Cloud Functions).

Verify which source is configured, without printing any secret:

```bash
npm run admin:check
```

Service account JSON must never be committed. `.gitignore` blocks the common
filenames, and the Firebase console snippet that hardcodes
`require('path/to/serviceAccountKey.json')` should not be used here.

## Persistent Browser Data

Flight records remain stored under:

```text
ord_pr_flight_tracker_v1
```

Code deployments must not rename or clear this key.
