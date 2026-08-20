# ✈️ Chicago (ORD) ⇄ Puerto Rico Flight Counter & Tracker

A fast, lightweight, and modern web application to count and track flights traveling between **Chicago O'Hare (ORD)** and **Puerto Rico (San Juan SJU & Aguadilla BQN)** back and forth.

---

## 📁 Project Structure (Google Drive Storage)

```
G:\My Drive\Colab\flight-counter-ord-pr/
├── public/
│   ├── index.html       # Main UI with responsive Tailwind styling & interactive widgets
│   ├── app.js           # Flight counter logic, LocalStorage sync, quick +1 & filters
│   └── styles.css       # Custom styles, animations, and badges
├── firebase.json        # Firebase Hosting configuration (production ready)
├── .firebaserc          # Firebase project alias
├── .gitignore           # Git ignore rules
├── package.json         # Quick commands for running & deploying
└── README.md            # Documentation & setup guide
```

---

## ⚡ How to Open and Test the App

### Option 1: Direct File Open
You can open [`public/index.html`](file:///G:/My%20Drive/Colab/flight-counter-ord-pr/public/index.html) directly in any web browser (Chrome, Edge, Safari, Firefox) on your machine.

### Option 2: Local Server Preview (Port 8080)
From the project folder, run:
```bash
npm start
```
or
```bash
npx -y serve public -p 8080
```
Open [http://localhost:8080](http://localhost:8080).

---

## 💬 How to Edit Directly from This Chat
You never need to struggle in terminal prompts or slow external chats! Simply ask here:
- *"Add a weather widget for San Juan and Chicago"*
- *"Change the color scheme to navy and gold"*
- *"Add a flight duration calculator"*
- *"Add export to CSV button"*

All edits will be made immediately to your files in `G:\My Drive\Colab\flight-counter-ord-pr/`.

---

## 🚀 Firebase Hosting Deployment

1. **Log in to Firebase** (one-time setup if not already authenticated):
   ```bash
   npx -y firebase-tools login
   ```

2. **Select or Set your Firebase Project**:
   ```bash
   npx -y firebase-tools use --add
   ```

3. **Deploy to Firebase Hosting**:
   ```bash
   npm run deploy
   ```
   *(or `npx -y firebase-tools deploy --only hosting`)*

---

## 🐙 Git & GitHub Repository Setup

To initialize this project in Git and push to your GitHub:
```bash
cd "G:\My Drive\Colab\flight-counter-ord-pr"
git init
git add .
git commit -m "Initial commit: Chicago (ORD) to Puerto Rico flight counter web app"
git branch -M main
# Add your GitHub remote repository:
# git remote add origin https://github.com/<your-username>/flight-counter-ord-pr.git
# git push -u origin main
```
