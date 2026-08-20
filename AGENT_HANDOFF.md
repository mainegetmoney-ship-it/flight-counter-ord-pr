# Universal AI Handoff — Chicago (ORD) ⇄ Puerto Rico Flight Counter

> **UNIVERSAL AI NOTICE (Antigravity, Claude, ChatGPT, Gemini, Copilot, Cursor)**:
> This file contains the complete context, architecture, storage paths, and instructions for this web application.

---

## ✈️ Project Overview
- **App Name**: Chicago (ORD) ⇄ Puerto Rico (SJU/BQN/PSE) Flight Counter & Tracker
- **Canonical Storage Location**: `G:\My Drive\Colab\flight-counter-ord-pr`
- **GitHub Target**: `https://github.com/mainegetmoney-ship-it/flight-counter-ord-pr`
- **Hosting Engine**: Firebase Hosting (`firebase.json` routing to `public/`)
- **Version**: 1.0.0

---

## 📁 Key File Index

| File | Location | Description |
| :--- | :--- | :--- |
| **App Interface** | `public/index.html` | Tailwind CSS single-page UI with counter cards, route map visualizer, and flight log table |
| **Counter Logic** | `public/app.js` | Flight state management, LocalStorage sync (`ord_pr_flight_tracker_v1`), Quick +1 buttons, filtering |
| **Custom Styling** | `public/styles.css` | Status badges, hover cards, animations, custom scrollbars |
| **Firebase Config** | `firebase.json` | Production hosting config with SPA rewrites to `/index.html` and caching |
| **Firebase Alias** | `.firebaserc` | Default Firebase project mapping |
| **Project Manifest** | `package.json` | Manifest with preview and deploy scripts |
| **Documentation** | `README.md` | Quickstart guide and testing commands |

---

## ⚡ Core Operational Features
1. **Interactive Counters**:
   - Total Flights Tracked
   - ORD ➔ Puerto Rico Outbound
   - Puerto Rico ➔ ORD Inbound
   - Active / In Flight Count
2. **Instant Actions**:
   - Quick +1 ORD ➔ PR
   - Quick +1 PR ➔ ORD
   - Load Sample Schedule (Realistic non-stop routes: United UA 1700, American AA 2468, Frontier F9 2024, Spirit NK 1212)
   - Add Flight Modal with Airline, Flight Number, Departure Time, Status, and Aircraft Notes
3. **Data Isolation**:
   - Stored in browser `localStorage` under `ord_pr_flight_tracker_v1` so user flight entries persist independently across sessions and updates.
