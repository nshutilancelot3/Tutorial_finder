# Tuto Archive

> YouTube study-resource finder tailored for **ALU students** — browse course videos by program and year, search any topic, and bookmark tutorials for later.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started (Local)](#getting-started-local)
- [How It Works](#how-it-works)
- [Programs Supported](#programs-supported)
- [YouTube API Setup](#youtube-api-setup)
- [Data Storage](#data-storage)
- [API Quota](#api-quota)
- [Deployment](#deployment)
- [Credits & Attribution](#credits--attribution)
- [Challenges](#challenges)

---

## Overview

**Tuto Archive** is a lightweight, single-page web app (no frontend framework, no build step) that pulls YouTube videos through the **YouTube Data API v3** and organises them per ALU program and year of study. It uses a small **Node.js/Express** backend to proxy API requests, keeping the YouTube API key secure on the server. Students can select their program and year, browse videos for their enrolled courses, search and filter results, and bookmark videos to a personal saved list.

---

## Features

| Feature | Description |
|---|---|
| **Program Selection** | Pick your ALU program (SE, IBT, or EL) and year (1–4) on the landing screen |
| **Course Catalogue** | Videos fetched from YouTube for each course in your program and year |
| **Global Search** | Header search bar works across all tabs |
| **Topic Search** | Dedicated Search tab with free-text queries |
| **Sort Results** | Sort search results by Most Relevant or Newest First |
| **Filter by Year** | Filter search results by publication year using one-click chips |
| **Quick Chips** | One-click topic shortcuts tailored to each program |
| **In-App Video Player** | Videos play inside a modal — no need to leave the page |
| **Save & Bookmark** | Bookmark any video; persists in localStorage across sessions |
| **Toast Notifications** | Feedback for every user action |
| **Skeleton Loaders** | Smooth loading placeholders while videos are fetched |
| **Offline Detection** | Banner and toast alert when the user loses internet connection |
| **Responsive UI** | Works on desktop and mobile |

---

## Project Structure

```
Tutorial_finder/
├── index.html          # Single-page shell — program selector screen + app screen
├── style.css           # All custom styles (CSS variables, components, animations)
├── app.js              # Core logic: program selection, search, sort/filter, save, render
├── courses.js          # Course catalogue data per program + year
├── server.js           # Express server — proxies YouTube API requests
├── package.json        # Dependencies: express, dotenv
├── .env                # Your YouTube API key — never commit (git-ignored)
└── nginx/
    ├── web-server.conf     # Nginx reverse-proxy config for Web01 and Web02
    └── load-balancer.conf  # Nginx load-balancer config for Lb01
```

---

## Getting Started (Local)

### 1 — Clone the repo

```bash
git clone <repo-url>
cd Tutorial_finder
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Set up your YouTube API key

Create a `.env` file in the project root:

```
YOUTUBE_API_KEY=your_api_key_here
```

> See [YouTube API Setup](#youtube-api-setup) for how to get a free key.

### 4 — Start the server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How It Works

```
User opens http://localhost:3000
        │
        ▼
  ┌───────────┐    no session    ┌──────────────────────┐
  │  Session? │ ───────────────► │  Program Selector     │
  └───────────┘                  │  Pick program + year  │
        │ session found          └──────────┬───────────┘
        │                                   │ confirmed
        ▼ ◄────────────────────────────────┘
  ┌──────────────────────────────────────────┐
  │                 App Screen               │
  │  ┌──────────┐  ┌────────┐  ┌─────────┐  │
  │  │My Courses│  │ Search │  │  Saved  │  │
  │  └──────┬───┘  └───┬────┘  └────┬────┘  │
  │         │           │            │       │
  │   Fetch via    Free-text    Bookmarked   │
  │   /api/search  + sort/filter from any tab│
  └──────────────────────────────────────────┘
                    │
                    ▼
             server.js (Express)
                    │
                    ▼
          YouTube Data API v3
```

### Program Selection
- Users select their ALU **program** (SE, IBT, EL) and **year** (1–4).
- The selection is stored in `localStorage` as `ta_program` and `ta_year` and persists across sessions.

### Course Videos
- On load, `loadCourses()` reads the user's program and year from `courses.js`.
- Each course card fetches videos from the backend `/api/search` endpoint.
- Skeleton loaders are shown while requests are in flight.

### API Proxy
- The browser never calls YouTube directly — all requests go to `/api/search` on the Express server.
- The server attaches the API key from `.env` before forwarding to YouTube, so the key is never exposed to the browser.

### Search, Sort & Filter
- Results can be sorted by **Most Relevant** (default) or **Newest First** — the sort order is passed to the YouTube API.
- After results load, **year filter chips** appear to narrow results by publication year (client-side).
- Quick-chip buttons provide one-click searches for topics relevant to each program.

### In-App Video Player
- Clicking a video opens a Bootstrap modal with an embedded YouTube iframe.
- No redirect to YouTube — playback stays inside the app.

### Save / Unsave
- Clicking the bookmark icon on any video calls `toggleSave()`.
- Saved videos are written to `localStorage` and the bookmark icon updates instantly across all views.

### Error Handling
- Network requests have a **12-second client-side timeout** and a **10-second server-side timeout**.
- Offline detection via the browser's `navigator.onLine` API — a red banner appears at the top and searches are blocked with a toast message.
- API errors (quota exceeded, invalid key, parse failures) are caught and displayed in-line with a styled error box.

---

## Programs Supported

| Code | Program |
|---|---|
| `SE` | Software Engineering |
| `IBT` | International Business & Trade |
| `EL` | Entrepreneurial Leadership |

Each program has **8 courses per year** across **4 years** (32 courses total per program).

---

## YouTube API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project (or select an existing one).
3. Enable **YouTube Data API v3**.
4. Go to **Credentials → Create API Key**.
5. Copy the key into your `.env` file:

```
YOUTUBE_API_KEY=your_key_here
```

> `.env` is listed in `.gitignore` — it will never be accidentally committed.

---

## Data Storage

All user data lives **entirely in the browser**. The server holds no database.

| Key | Contents |
|---|---|
| `ta_program` | Selected program code (SE, IBT, or EL) |
| `ta_year` | Selected year (1–4) |
| `ta_saved_SE` | Bookmarked videos for SE program |
| `ta_saved_IBT` | Bookmarked videos for IBT program |
| `ta_saved_EL` | Bookmarked videos for EL program |

To inspect: open DevTools (`F12`) → **Application** → **Local Storage**.
To reset: clear site data from DevTools or run `localStorage.clear()` in the console.

---

## API Quota

| Action | Units used |
|---|---|
| Search request | ~100 units |
| Free daily quota | 10,000 units |
| Max searches/day | ~100 |

If you hit the limit you will see: *"API quota exceeded or key invalid."*

---

## Deployment

The application is live at **[https://tutoarchive.lancewreal.tech](https://tutoarchive.lancewreal.tech)**

> You can also access each web server directly: [http://44.211.45.35](http://44.211.45.35) and [http://44.211.161.173](http://44.211.161.173)

| Server | Role | IP |
|---|---|---|
| Web01 | App server (Node.js + Nginx) | `44.211.45.35` |
| Web02 | App server (Node.js + Nginx) | `44.211.161.173` |
| Lb01 | Load balancer (HAProxy) | `13.220.156.66` |

### Architecture

```
Internet / tutoarchive.lancewreal.tech
            │
            ▼
    Lb01 — HAProxy (13.220.156.66)
    HTTP → HTTPS redirect
    Round-robin load balancing
            │                  │
            ▼                  ▼
       Web01                Web02
  44.211.45.35         44.211.161.173
  Nginx → Node.js      Nginx → Node.js
  PM2 (port 3000)      PM2 (port 3000)
```

---

### Step 1 — Install Node.js and PM2 on Web01 and Web02

Run the following on **both** Web01 and Web02:

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (keeps the app alive after logout/reboot)
sudo npm install -g pm2
```

---

### Step 2 — Deploy the app on Web01 and Web02

Run the following on **both** Web01 and Web02:

```bash
# Create the app directory
sudo mkdir -p /var/www/tuto-archive
sudo chown ubuntu:ubuntu /var/www/tuto-archive

# Copy project files (or clone from repo)
cd /var/www/tuto-archive

# Install dependencies
npm install --production

# Create the .env file with the YouTube API key
echo "YOUTUBE_API_KEY=your_api_key_here" > .env

# Start the app with PM2
pm2 start server.js --name tuto-archive
pm2 save

# Enable PM2 to start on reboot
pm2 startup systemd -u ubuntu --hp /home/ubuntu
# Run the command PM2 prints
```

Verify:
```bash
pm2 status
curl http://localhost:3000   # should return HTML
```

---

### Step 3 — Configure Nginx as a reverse proxy on Web01 and Web02

Run the following on **both** Web01 and Web02:

```bash
sudo tee /etc/nginx/sites-available/tuto-archive > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/tuto-archive /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

The app is now accessible at `http://44.211.45.35` and `http://44.211.161.173`.

---

### Step 4 — Load balancer on Lb01 (HAProxy)

Lb01 uses **HAProxy** which was pre-installed. The active configuration at `/etc/haproxy/haproxy.cfg` is documented in `nginx/load-balancer.conf`.

Key sections:

```haproxy
# Redirect HTTP → HTTPS
frontend balancer_http_in
    bind *:80
    redirect scheme https code 301 if ! { ssl_fc }

# Accept HTTPS and forward to backend
frontend balancer_https_in
    bind *:443 ssl crt /etc/ssl/certs/ha_proxy_ssl.pem
    option forwardfor
    default_backend balancer_http_out

# Round-robin between Web01 and Web02
backend balancer_http_out
    balance roundrobin
    server web-01 44.211.45.35:80 check
    server web-02 44.211.161.173:80 check
```

To apply changes to HAProxy:
```bash
sudo haproxy -c -f /etc/haproxy/haproxy.cfg   # test config
sudo systemctl reload haproxy
```

---

### Step 5 — Verify load balancing

```bash
# Hit the load balancer 6 times — both servers should serve traffic
for i in $(seq 1 6); do
  curl -sk -o /dev/null -w "Hit $i: %{http_code}\n" https://tutoarchive.lancewreal.tech
done

# Watch each server's nginx access log while hitting the LB
# On Web01:
sudo tail -f /var/log/nginx/access.log
# On Web02:
sudo tail -f /var/log/nginx/access.log
```

---

### Updating the deployment

When you push new code, redeploy on both Web01 and Web02:

```bash
cd /var/www/tuto-archive
# copy updated files, then:
npm install --production
pm2 restart tuto-archive
```

---

## Credits & Attribution

| Resource | Link |
|---|---|
| **YouTube Data API v3** by Google | [developers.google.com/youtube/v3](https://developers.google.com/youtube/v3) |
| **Bootstrap 5.3.2** by The Bootstrap Authors | [getbootstrap.com](https://getbootstrap.com) |
| **Bootstrap Icons 1.11.3** by The Bootstrap Authors | [icons.getbootstrap.com](https://icons.getbootstrap.com) |
| **Express.js** by the OpenJS Foundation | [expressjs.com](https://expressjs.com) |
| **dotenv** by motdotla | [github.com/motdotla/dotenv](https://github.com/motdotla/dotenv) |
| **Google Fonts** — Syne & DM Sans | [fonts.google.com](https://fonts.google.com) |

---

## Challenges

**1. Keeping the API key secure**
The original prototype called the YouTube API directly from the browser, which would have exposed the API key in the JavaScript source. The solution was to add a Node.js/Express backend that acts as a proxy — the browser calls `/api/search` on the server, the server appends the key from `.env`, and the key never reaches the browser.

**2. YouTube API quota limits**
The free YouTube Data API quota is 10,000 units/day, and each search costs ~100 units. Loading all course cards at once would exhaust the quota immediately. The solution was to make course videos **load on demand** (accordion — click to expand), so API calls only happen when a student opens a specific course.

**3. Handling API timeouts and network errors**
YouTube API requests can occasionally time out or fail silently. A 10-second timeout was added server-side using `request.setTimeout()`, and a 12-second `AbortController` timeout was added on the browser side. Errors are caught and shown inline rather than leaving the UI in a loading state.

**4. Sort order and client-side filtering**
Sorting by relevance vs. date requires a different YouTube API `order` parameter, so a re-fetch is triggered when the sort changes. Year filtering is done client-side on the already-fetched results to avoid using extra API quota.

**5. Deployment across two servers**
Both web servers need the same `.env` file with the YouTube API key. Since `.env` is git-ignored, it must be created manually on each server after cloning. PM2 is used to keep the Node process alive across SSH session disconnects and server reboots.
