# Tuto Archive

> A YouTube study-resource finder built for **ALU students** — browse curated course videos by program and year, search any topic, filter results, and bookmark tutorials for later.

**Live:** [https://tutoarchive.lancewreal.tech](https://tutoarchive.lancewreal.tech)

---

## Table of Contents

- [Overview](#overview)
- [Demo](#demo)
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

**Tuto Archive** is a lightweight, single-page web application that helps African Leadership University (ALU) Software Engineering students find relevant YouTube tutorials for their enrolled courses. It uses the **YouTube Data API v3** to fetch videos, organised by year of study.

The app uses a **Node.js/Express** backend to proxy all YouTube API requests, ensuring the API key is never exposed to the browser. Students pick their program and year on a selector screen, then browse accordion-style course cards, search freely, sort and filter results, and bookmark videos across sessions using `localStorage`.

---

## Demo

> Watch the 2-minute demo: **[YouTube Demo Link]**

The demo walks through:
- Selecting a program and year on the selector screen
- Browsing course video cards
- Searching a topic, sorting by Newest First, filtering by year
- Bookmarking a video and viewing it in the Saved tab
- Accessing the live deployment via the load balancer

---

## Features

| Feature | Description |
|---|---|
| **Program Selector** | Choose your ALU program (SE, IBT, or EL) and year (1–4) on the landing screen |
| **Course Catalogue** | Accordion cards for each course — click to load YouTube videos on demand |
| **Global Search** | Header search bar accessible from any tab |
| **Topic Search** | Dedicated Search tab with free-text queries and quick-chip shortcuts |
| **Sort Results** | Sort by Most Relevant or Newest First — passed directly to the YouTube API |
| **Filter by Year** | One-click year filter chips narrow results client-side after fetching |
| **Shorts Filtering** | YouTube Shorts are excluded via duration filter, query exclusion, and title matching |
| **In-App Video Player** | Videos open in a Bootstrap modal — no redirect to YouTube |
| **Save & Bookmark** | Bookmark any video; persists in `localStorage` across browser sessions |
| **Toast Notifications** | Contextual feedback for every user action |
| **Skeleton Loaders** | Animated placeholders while videos are being fetched |
| **Offline Detection** | Red banner and blocked searches when internet connection is lost |
| **Error Handling** | Inline styled error messages for API failures, timeouts, and quota exhaustion |
| **Responsive UI** | Works on desktop and mobile browsers |

---

## Project Structure

```
Tutorial_finder/
├── index.html          # Single-page shell — selector screen + app screen + modal
├── style.css           # All styles: CSS variables, components, animations, responsive layout
├── app.js              # Core logic: program selection, search, sort/filter, save, render
├── courses.js          # Course catalogue — 3 programs × 4 years × 8 courses each
├── server.js           # Express server — proxies YouTube API requests securely
├── package.json        # Node.js dependencies: express, dotenv
├── .env                # YouTube API key (git-ignored — never committed)
├── .gitignore          # Excludes .env, node_modules, .DS_Store, logs
└── nginx/
    ├── web-server.conf     # Nginx reverse-proxy config used on Web01 and Web02
    └── load-balancer.conf  # HAProxy config reference for Lb01
```

---

## Getting Started (Local)

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- A YouTube Data API v3 key (see [YouTube API Setup](#youtube-api-setup))

### 1 — Clone the repository

```bash
git clone <repo-url>
cd Tutorial_finder
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Add your YouTube API key

Create a `.env` file in the project root:

```
YOUTUBE_API_KEY=your_api_key_here
```

> See [YouTube API Setup](#youtube-api-setup) for how to get a free key.
> The `.env` file is listed in `.gitignore` and will never be accidentally committed.

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
  │   /api/search  + sort/filter from any   │
  └──────────────────────────────────────────┘
                    │
                    ▼
             server.js (Express)
                    │
                    ▼
          YouTube Data API v3
```

### Program Selection
Users select their ALU **program** (SE, IBT, EL) and **year** (1–4) on the selector screen. The selection is saved to `localStorage` (`ta_program`, `ta_year`) and restored on every subsequent visit.

### Course Videos
Each course card in the My Courses tab fetches videos lazily — only when a student clicks to expand it. This preserves API quota by avoiding bulk fetches on page load.

### API Proxy (Security)
The browser never calls YouTube directly. All requests go to `/api/search` on the Express server, which attaches the API key from `.env` before forwarding to YouTube. The key is never visible in the browser's network tab or JavaScript source.

### Shorts Filtering
YouTube Shorts (vertical videos ≤60 seconds) are excluded using three layers:
1. `videoDuration=medium` — YouTube API only returns videos between 4 and 20 minutes
2. `-#shorts -shorts` appended to every query — instructs YouTube's algorithm to deprioritise shorts content
3. Client-side title filter — drops any result whose title contains "shorts"

### Search, Sort & Filter
- **Sort** by Most Relevant (default) or Newest First — the `order` parameter is passed to the YouTube API, triggering a fresh fetch.
- **Year filter chips** appear after results load and filter client-side to avoid extra API calls.
- **Quick-chip shortcuts** provide one-click searches for topics relevant to each program.

### In-App Video Player
Clicking a video thumbnail opens a Bootstrap modal with an embedded YouTube `<iframe>`. Playback stays inside the app.

### Save / Unsave
Clicking the bookmark icon calls `toggleSave()`, which writes the video object to `localStorage` under a program-specific key. The bookmark icon updates immediately across all tabs.

### Error Handling
- **12-second client-side timeout** via `AbortController`
- **10-second server-side timeout** via `request.setTimeout()`
- **Offline detection** via `navigator.onLine` — a red banner appears and all searches are blocked with a descriptive toast
- **API errors** (quota exceeded, invalid key, YouTube outage) are caught and shown inline with a styled error block

---

## Programs Supported

| Code | Program | Years |
|---|---|---|
| `SE` | Software Engineering | 1 – 4 |

**8 courses per year** across **4 years** — 32 courses total.

---

## YouTube API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select an existing one
3. Navigate to **APIs & Services → Library**
4. Search for and enable **YouTube Data API v3**
5. Go to **APIs & Services → Credentials → Create Credentials → API Key**
6. Copy the key into your `.env` file:

```
YOUTUBE_API_KEY=your_key_here
```

---

## Data Storage

All user data lives **entirely in the browser**. The server has no database.

| localStorage Key | Contents |
|---|---|
| `ta_program` | Selected program code (`SE`, `IBT`, or `EL`) |
| `ta_year` | Selected year (`1`–`4`) |
| `ta_saved_SE` | JSON array of bookmarked videos for Software Engineering |

To inspect: open DevTools (`F12`) → **Application** → **Local Storage**.
To reset: run `localStorage.clear()` in the DevTools console.

---

## API Quota

| Action | Units consumed |
|---|---|
| One search request | ~100 units |
| Free daily quota | 10,000 units |
| Approx. searches per day | ~100 |

If the daily quota is exhausted you will see: *"API quota exceeded or key invalid."*
The quota resets every day at midnight Pacific Time.

---

## Deployment

The application is live at **[https://tutoarchive.lancewreal.tech](https://tutoarchive.lancewreal.tech)**

| Server | Role | IP |
|---|---|---|
| Web01 | App server — Node.js + Nginx | `44.211.45.35` |
| Web02 | App server — Node.js + Nginx | `44.211.161.173` |
| Lb01 | Load balancer — HAProxy | `13.220.156.66` |

### Architecture

```
         Internet — tutoarchive.lancewreal.tech
                          │
                          ▼
              Lb01 — HAProxy (13.220.156.66)
              ┌──────────────────────────────┐
              │  HTTP → HTTPS (301 redirect) │
              │  Round-robin load balancing  │
              └──────────┬───────────────────┘
                         │
           ┌─────────────┘─────────────┐
           ▼                           ▼
         Web01                       Web02
    44.211.45.35               44.211.161.173
    Nginx (port 80)            Nginx (port 80)
         │                           │
         ▼                           ▼
    Node.js/PM2                 Node.js/PM2
      (port 3000)                 (port 3000)
```

---

### Step 1 — Install Node.js and PM2 on Web01 and Web02

Run on **both** Web01 and Web02:

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

---

### Step 2 — Deploy the application

Run on **both** Web01 and Web02:

```bash
# Create the app directory
sudo mkdir -p /var/www/tuto-archive
sudo chown ubuntu:ubuntu /var/www/tuto-archive

# Copy project files to the server
# (scp or clone from the repository)

cd /var/www/tuto-archive
npm install --production

# Create the .env file with the YouTube API key
echo "YOUTUBE_API_KEY=your_api_key_here" > .env

# Start the app with PM2
pm2 start server.js --name tuto-archive
pm2 save

# Enable PM2 to restart automatically on reboot
pm2 startup systemd -u ubuntu --hp /home/ubuntu
# Run the command PM2 prints
```

Verify the app is running:

```bash
pm2 status
curl http://localhost:3000   # should return HTML
```

---

### Step 3 — Configure Nginx as a reverse proxy

Run on **both** Web01 and Web02:

```bash
sudo tee /etc/nginx/sites-available/tuto-archive > /dev/null << 'EOF'
server {
    listen 80 default_server;
    server_name tutoarchive.lancewreal.tech;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/tuto-archive /etc/nginx/sites-enabled/tuto-archive
sudo nginx -t && sudo systemctl reload nginx
```

---

### Step 4 — Configure the load balancer (Lb01)

Lb01 uses **HAProxy** (pre-installed). The configuration at `/etc/haproxy/haproxy.cfg` handles:
- HTTP → HTTPS redirect (301)
- SSL termination using a Let's Encrypt certificate
- Round-robin distribution between Web01 and Web02

Key configuration sections:

```haproxy
# Redirect HTTP to HTTPS
frontend balancer_http_in
    bind *:80
    redirect scheme https code 301 if !{ ssl_fc }

# Accept HTTPS — terminate SSL at the load balancer
frontend balancer_https_in
    bind *:443 ssl crt /etc/ssl/certs/ha_proxy_ssl.pem
    option forwardfor
    default_backend balancer_http_out

# Round-robin between the two web servers
backend balancer_http_out
    balance roundrobin
    server web-01 44.211.45.35:80 check
    server web-02 44.211.161.173:80 check
```

To test and reload HAProxy:

```bash
sudo haproxy -c -f /etc/haproxy/haproxy.cfg
sudo systemctl reload haproxy
```

---

### Step 5 — Verify load balancing

```bash
# Hit the load balancer 6 times — requests should alternate between Web01 and Web02
for i in $(seq 1 6); do
  curl -sk -o /dev/null -w "Hit $i: %{http_code}\n" https://tutoarchive.lancewreal.tech
done

# Tail the nginx access log on each server to confirm traffic distribution
sudo tail -f /var/log/nginx/access.log
```

---

### Updating the deployment

When new code is ready, copy updated files and restart:

```bash
cd /var/www/tuto-archive
# copy updated files, then:
pm2 restart tuto-archive
```

---

## Credits & Attribution

| Resource | Purpose | Link |
|---|---|---|
| **YouTube Data API v3** by Google | Video search and metadata | [developers.google.com/youtube/v3](https://developers.google.com/youtube/v3) |
| **Bootstrap 5.3.2** by The Bootstrap Authors | UI components, grid, modal | [getbootstrap.com](https://getbootstrap.com) |
| **Bootstrap Icons 1.11.3** by The Bootstrap Authors | Icons throughout the interface | [icons.getbootstrap.com](https://icons.getbootstrap.com) |
| **Express.js** by the OpenJS Foundation | Node.js HTTP server and routing | [expressjs.com](https://expressjs.com) |
| **dotenv** by motdotla | Loading environment variables from `.env` | [github.com/motdotla/dotenv](https://github.com/motdotla/dotenv) |
| **Google Fonts** — Urbanist & JetBrains Mono | Typography | [fonts.google.com](https://fonts.google.com) |
| **HAProxy** | Load balancer on Lb01 | [haproxy.org](https://www.haproxy.org) |
| **PM2** by Unitech | Process manager keeping Node.js alive | [pm2.keymetrics.io](https://pm2.keymetrics.io) |

---

## Challenges

**1. Keeping the API key secure**
The first prototype called the YouTube API directly from the browser, which would have exposed the key in the JavaScript source and network requests. The solution was a Node.js/Express proxy layer: the browser calls `/api/search` on the local server, the server appends the key from `.env`, and the key never reaches the client.

**2. YouTube API quota limits**
The free YouTube Data API quota is 10,000 units per day, and each search costs roughly 100 units. Loading all 8 course cards on page load would consume 800 units at once and exhaust the quota in a dozen page loads. The fix was a lazy-loading accordion — course videos are only fetched when a student clicks to open that card, making quota consumption proportional to actual usage.

**3. Filtering out YouTube Shorts**
YouTube Shorts (≤60 second vertical videos) were appearing in course results and failing to play properly in the embedded player. The YouTube Search API has no direct "exclude Shorts" parameter, so three layers of filtering were combined: `videoDuration=medium` (API-level, excludes sub-4-minute videos), `-#shorts` appended to queries (instructs YouTube's ranking to deprioritise Shorts), and a server-side title filter that drops any result whose title contains the word "shorts".

**4. Handling API timeouts and network errors**
YouTube API requests can time out silently, especially under load. A 10-second server-side timeout was added using `request.setTimeout()`, and a 12-second `AbortController` timeout was added on the browser side. Both caught states display a clear inline message rather than leaving the UI frozen on a skeleton loader.

**5. Offline detection**
If a student is on a poor connection, API calls would fail with cryptic network errors. Adding `navigator.onLine` event listeners lets the app catch the transition, display a red offline banner, and block new searches with an explanatory toast — giving clear feedback instead of a silent failure.

**6. Load balancer conflicts with other hosted sites**
The Lb01 and web servers were shared infrastructure. On the web servers, an alphabetically earlier Nginx config (`portfolio`) was being loaded as the default server, serving a different site instead of Tuto Archive. The fix was setting `listen 80 default_server` and an explicit `server_name` in the Tuto Archive Nginx config to ensure it took priority.

**7. Accordion and CSS grid stretching**
When one course card in the grid expanded to show its videos, the other cards in the same grid row stretched to match the expanded height. This was fixed by adding `align-items: start` to the `.course-grid` CSS rule, which prevents CSS Grid from stretching items to fill row height.
