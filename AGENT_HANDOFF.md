# Universal AI Handoff — Multi Route Flight Counter

> **UNIVERSAL AI NOTICE (Antigravity, Claude, ChatGPT, Gemini, Copilot, Cursor)**:
> This file contains the current context, architecture, storage paths, and operating instructions for this web application.

---

## ✈️ Project Overview
- **App Name**: Multi Route Flight Counter & Tracker
- **Canonical Storage Location**: `G:\My Drive\Colab\flight-counter-ord-pr`
- **GitHub Target**: `https://github.com/mainegetmoney-ship-it/flight-counter-ord-pr`
- **Hosting Engine**: Firebase Hosting (`firebase.json` routing to `public/`)
- **Version**: 1.1.0
- **Current Route Set**:
  - Chicago (ORD) ⇄ Puerto Rico (SJU/BQN/PSE)
  - Puerto Rico (SJU) ➔ New York (JFK)
  - New York (JFK) ➔ Dubai (DXB)

---

## 📁 Key File Index

| File | Location | Description |
| :--- | :--- | :--- |
| **App Interface** | `public/index.html` | Tailwind CSS single-page UI with KPI cards, route filters, flight manifest, and Add Flight modal |
| **Counter Logic** | `public/app.js` | Flight state management, localStorage sync (`ord_pr_flight_tracker_v1`), Quick +1 actions, route grouping, filtering, and rendering |
| **Custom Styling** | `public/styles.css` | Status badges, hover cards, animations, and custom scrollbars |
| **Firebase Config** | `firebase.json` | Firebase Hosting config with SPA rewrite to `/index.html` |
| **Firebase Alias** | `.firebaserc` | Default Firebase project mapping |
| **Project Manifest** | `package.json` | Preview and deploy commands |
| **Documentation** | `README.md` | Quickstart guide and testing commands |
| **Repository Policy** | `AGENTS.md` | Rules for AI agents working on this repository |

---

## ⚡ Core Operational Features
1. **Interactive Counters**
   - Total Flights Tracked across all routes
   - ORD ➔ Puerto Rico outbound count
   - Puerto Rico ➔ ORD inbound count
   - Active / In Flight count across all routes

2. **Instant Actions**
   - Quick +1 ORD ➔ PR
   - Quick +1 PR ➔ ORD
   - Load Sample Schedule
   - Add Flight modal with route, airline, flight number, departure time, status, and aircraft/notes

3. **Supported Route Filters**
   - All Flights
   - ORD ⇄ PR
   - PR ➔ NYC
   - NYC ➔ DXB

4. **New Version 1.1.0 Route Expansion**
   - Added `SJU-JFK` for Puerto Rico ➔ New York
   - Added `JFK-DXB` for New York ➔ Dubai
   - Added JetBlue/Delta/Emirates choices where useful for manual logging
   - Added sample entries for the new routes
   - Updated filtering so new routes do not incorrectly count as Puerto Rico ➔ ORD traffic
   - Kept the existing browser data key unchanged to preserve user flight history

5. **Data Isolation**
   - Browser data remains stored under `ord_pr_flight_tracker_v1`.
   - Do not rename or clear this key during code-only updates unless the user explicitly requests a data migration.

---

## 🔧 Universal Agent Workflow
1. Read `AGENT_HANDOFF.md` and `AGENTS.md` first.
2. Inspect current repository files before editing.
3. Preserve the `ord_pr_flight_tracker_v1` storage contract.
4. Make focused changes only to the requested behavior.
5. Validate `public/app.js` syntax and inspect the rendered page before handoff when execution access is available.
6. Do not commit, push, deploy, delete, merge, or overwrite production without explicit user authorization.
7. When deployment is authorized, provide the actual Firebase test URL and the deployed commit/version before calling the work complete.
