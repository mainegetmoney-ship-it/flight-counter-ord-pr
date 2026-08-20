# ORD, Puerto Rico, New York, and Dubai Flight Counter

A lightweight browser-based application for logging and filtering flights across Chicago O'Hare, Puerto Rico, New York, and Dubai routes.

## Project Structure

```text
flight-counter-ord-pr/
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
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

## Persistent Browser Data

Flight records remain stored under:

```text
ord_pr_flight_tracker_v1
```

Code deployments must not rename or clear this key.
