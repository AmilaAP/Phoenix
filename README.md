# Phonex Institute Management System

[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-blue)](https://pages.github.com)
[![Firebase](https://img.shields.io/badge/backend-Firebase%20Firestore-orange)](https://firebase.google.com)

A complete institute management system with student records, QR attendance scanning, and fee payment tracking — runs entirely in the browser with Firebase as the cloud database.

## Features

- 📊 **Dashboard** — Live overview of students, attendance & payments
- 👨‍🎓 **Students** — Add/edit/delete students with full details
- 📷 **QR Scanner** — Mobile camera scanner for attendance (first scan per day only)
- 🔲 **QR Codes** — Generate & download individual QR cards
- 📋 **Attendance** — View present/absent by date with filters
- 💳 **Payments** — Monthly fee tracking per student

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add project** → give it a name (e.g., "phonex-institute")
3. Disable Google Analytics (optional) → **Create project**
4. In the left sidebar → **Build → Firestore Database**
5. Click **Create database** → choose **Start in test mode** → select your region → **Enable**
6. Back in Project Overview → click the **web icon** (`</>`) → Register your app
7. Copy the `firebaseConfig` object values

### 2. Add Credentials

Open `js/firebase-config.js` and replace the placeholder values:

```js
export const firebaseConfig = {
  apiKey:            "AIza...",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
```

### 3. Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push all project files to the `main` branch
3. In GitHub repo → **Settings → Pages**
4. Under **Source**: select `main` branch, root folder (`/`)
5. Click **Save** — your site will be live at `https://yourusername.github.io/repo-name/`

### 4. Using the QR Scanner on Mobile

- Open the hosted GitHub Pages URL on your phone
- Navigate to **QR Scanner** in the sidebar
- Tap **Start Camera** and point at a student's QR code
- The system automatically handles duplicate scans (only first scan per day is recorded)

## Firestore Collections

| Collection    | Purpose |
|---------------|---------|
| `students`    | Student profiles (name, school, grade, subject, parent info) |
| `attendance`  | One document per student per day scan |
| `payments`    | Monthly fee payment records per student |

## File Structure

```
/
├── index.html              ← Dashboard
├── css/
│   └── style.css           ← Global styles
├── js/
│   ├── firebase-config.js  ← ⚠️ Your Firebase credentials here
│   └── app.js              ← Shared utilities
└── pages/
    ├── students.html       ← Student management
    ├── scanner.html        ← QR camera scanner
    ├── qr-codes.html       ← Generate/print QR codes
    ├── attendance.html     ← Attendance records
    └── payments.html       ← Monthly fee tracking
```
