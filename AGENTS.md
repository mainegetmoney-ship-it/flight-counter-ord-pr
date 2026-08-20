# Flight Counter Workspace Agent Policy

**Read first:** `AGENT_HANDOFF.md`

Mandatory rules:
1. Follow the user's current instruction and inspect the repository before changing files.
2. Preserve unrelated files, user data in `localStorage`, and secrets.
3. Keep `ord_pr_flight_tracker_v1` unchanged unless the user explicitly approves a migration.
4. Verify JavaScript changes using `node --check public/app.js` before deployment.
5. Do not delete, merge, or overwrite production data without explicit authorization.
6. Keep `AGENT_HANDOFF.md` updated whenever features, routes, architecture, or deployment behavior change.
7. Use GitHub for source control and Firebase Hosting for preview and production deployment.
8. Never commit Firebase service account JSON, Firebase tokens, or other credentials.
9. A patch is not complete merely because code was committed. Completion requires the deployed commit, deployment status, and the actual Firebase test URL.
10. Firebase preview deployments must use `.github/workflows/firebase-hosting-pull-request.yml`; production uses `.github/workflows/firebase-hosting-merge.yml`.
