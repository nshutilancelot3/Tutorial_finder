# Tuto Archive 📚

> YouTube study-resource finder tailored for **ALU students** — browse course videos, search any topic, and bookmark tutorials for later.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Programs Supported](#programs-supported)
- [YouTube API Setup](#youtube-api-setup)
- [Data Storage](#data-storage)
- [API Quota](#api-quota)

---

## Overview

**Tuto Archive** is a lightweight, single-page web app (no framework, no build step) that pulls YouTube videos through the **YouTube Data API v3** and organises them per ALU program and year of study. Students can create a local account, browse videos for their enrolled courses, search freely for any topic, and save videos to a personal bookmark list.

---

## Features

| Feature | Description |
|---|---|
| 🔐 **Auth (localStorage)** | Sign up / log in with name, year, and program — no server needed |
| 📖 **Course catalogue** | Videos fetched from YouTube for each enrolled course |
| 🔍 **Global search** | Search bar in the header works across all tabs |
| 💡 **Quick chips** | One-click topic shortcuts tailored to your program |
| 🔖 **Save & bookmark** | Bookmark any video; persists across sessions |
| 💬 **Toast notifications** | Feedback for every user action |
| 💀 **Skeleton loaders** | Smooth loading placeholders while videos are fetched |

---

## Project Structure

```
Tutorial_finder/
├── index.html          # Single-page shell — auth screen + app screen
├── style.css           # All custom styles (CSS variables, components, animations)
├── app.js              # Core logic: auth, search, save, render, YouTube API calls
├── courses.js          # Course catalogue data per program + year
├── config.js           # ⚠️ YOUR API KEY — never commit (git-ignored)
└── config.template.js  # Safe template to copy → config.js
```

---

## Getting Started

### 1 — Clone the repo

```bash
git clone <repo-url>
cd Tutorial_finder
```

### 2 — Set up your YouTube API key

```bash
cp config.template.js config.js
```

Open `config.js` and replace the placeholder:

```js
const CONFIG = {
  YOUTUBE_API_KEY: 'YOUR_YOUTUBE_API_KEY_HERE',   // ← paste your key here
};
```

> See [YouTube API Setup](#youtube-api-setup) for how to get a free key.

### 3 — Open in browser

```bash
# Just open the file directly — no server or build step needed
open index.html        # macOS
xdg-open index.html    # Linux
```

Or serve it locally:

```bash
npx serve .
```

---

## How It Works

```
User opens index.html
        │
        ▼
  ┌───────────┐    no session    ┌───────────────────┐
  │  Session? │ ───────────────► │  Auth Screen       │
  └───────────┘                  │  Log In / Sign Up  │
        │ session found          └────────┬──────────┘
        │                                 │ success
        ▼ ◄──────────────────────────────┘
  ┌──────────────────────────────────────────┐
  │                 App Screen               │
  │  ┌──────────┐  ┌────────┐  ┌─────────┐  │
  │  │ My Courses│  │ Search │  │  Saved  │  │
  │  └──────┬───┘  └───┬────┘  └────┬────┘  │
  │         │           │            │       │
  │   Fetch from   Free-text    Bookmarked   │
  │   YouTube API   search      from any tab │
  └──────────────────────────────────────────┘
```

### Authentication
- Accounts are identified by **name + year** (no password).
- All data lives in **browser `localStorage`** — nothing is sent to a server.
- The active session is stored under the key `ta_session`.
- The full user database is stored under `ta_db`.

### Course Videos
- On login, `loadCourses()` reads the user's program and year from `courses.js`.
- Each course card fetches videos from YouTube via `fetchVideos()` with a 500 ms stagger to respect API rate limits.
- Skeleton loaders are shown while requests are in flight.

### Search
- The header search bar and the **Search** tab both call `ytSearch()`.
- Results are shown as a responsive grid of video cards.
- Quick-chip buttons provide one-click searches for topics common to each program.

### Save / Unsave
- Clicking the bookmark icon on any video calls `toggleSave()`.
- Saved videos are written back to `localStorage` through `persistSaved()`.
- The bookmark icon updates instantly across all views via `refreshSaveBtns()`.

---

## Programs Supported

| Code | Program |
|---|---|
| `SE` | Software Engineering |
| `IBT` | International Business & Trade |
| `EL` | Entrepreneurial Leadership |

---

## YouTube API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project (or select an existing one).
3. Enable **YouTube Data API v3**.
4. Go to **Credentials → Create API Key**.
5. Copy the key into `config.js`.

> `config.js` is listed in `.gitignore` — it will never be accidentally committed.

---

## Data Storage

All data lives **entirely in your browser**. No backend, no database.

| Key | Contents |
|---|---|
| `ta_db` | All user accounts and their saved video lists |
| `ta_session` | Currently logged-in user (name, year, program) |

To inspect: open DevTools (`F12`) → **Application** → **Local Storage**.  
To reset: clear site data from DevTools or call `localStorage.clear()` in the console.

---

## API Quota

| Action | Units used |
|---|---|
| Search request | ~100 units |
| Free daily quota | 10,000 units |
| Max searches/day | ~100 |

If you hit the limit you will see: *"API quota exceeded or key invalid."*
