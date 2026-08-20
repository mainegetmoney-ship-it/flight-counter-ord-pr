# ORD, Puerto Rico, New York, and Dubai Flight Counter

A lightweight browser-based application for logging and filtering flights across Chicago O'Hare, Puerto Rico, New York, and Dubai routes.

## Current Route Patch

The current feature branch adds:

- Puerto Rico to New York using SJU, BQN, or PSE to JFK
- New York to Dubai using JFK to DXB
- Route filters for ORD and Puerto Rico, Puerto Rico and New York, and New York and Dubai
- Sample flights for SJU to JFK and JFK to DXB
- Add Flight modal options for all supported routes

The existing browser data key remains:

```text
ord_pr_flight_tracker_v1
```

## Local Preview

```bash
npm start
```

Then open `http://localhost:8080`.

## Validation

```bash
node --check public/app.js
```

## Firebase Project

```text
ord-pr-flight-counter
```

Firebase Hosting serves the `public/` directory according to `firebase.json`.

## GitHub to Firebase Deployment

GitHub Actions expects the repository secret:

```text
FIREBASE_SERVICE_ACCOUNT_ORD_PR_FLIGHT_COUNTER
```

The value must be the Firebase service account JSON for the `ord-pr-flight-counter` project. Never commit that JSON to the repository.

After the secret is configured:

- Pull requests create temporary Firebase Hosting preview deployments.
- Pushes to `main` deploy to the live Firebase Hosting channel.
- A patch is complete only after Firebase deploys it and the test URL is provided.
