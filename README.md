# 🎫 Ticket Triage Dashboard (React + REST API)

A **full-stack service desk–style ticket triage application** built with **React** and a **RESTful Node.js API**.  
This project demonstrates **realistic first-line IT support workflows**, clean client–server separation, and API-driven state management.

> **Focus:** Practical support operations — prioritisation, status tracking, and clear data flow — rather than UI gimmicks.

---

## 🧩 Overview

**Goal:**  
Build a lightweight but realistic ticket triage system similar to what’s used in internal IT service desks and MSP environments.

The application allows support agents to:
- View incoming tickets
- See priority and status at a glance
- Consume ticket data from a REST API
- Extend easily into create/update workflows

This project is intentionally **framework-light**, readable, and fork-friendly.

---

## 🏗️ Architecture

```
React (Vite)
   │
   │  fetch()
   ▼
REST API (Node.js + Express)
   │
   ▼
JSON Data Store
```

- The **frontend** is a standalone React application
- The **backend** exposes a REST API (`/tickets`)
- No shared state between client/server
- Designed so the data layer can later be swapped for a real database

---

## 📁 Project Structure

```
ticket-triage-dashboard/
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── api.js
│       ├── styles.css
│       └── components/
│           ├── TicketTable.jsx
│           └── StatusBadge.jsx
│
├── server/
│   ├── package.json
│   ├── data/
│   │   └── tickets.json
│   └── src/
│       └── index.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Key Features

### 🧑‍💻 Frontend (React)
- React 18 with functional components and hooks
- Data fetched from a live REST API
- Ticket table with:
  - ID
  - Title
  - Priority
  - Status badges
- Clean, readable UI with minimal styling

### 🔌 Backend (REST API)
- Node.js + Express
- CORS enabled for local development
- REST endpoint:
  - `GET /tickets`
- JSON-backed data store for simplicity and clarity

---

## 🔍 Example API Response

```json
[
  {
    "id": "INC-1001",
    "title": "VPN not connecting",
    "priority": "High",
    "status": "New"
  }
]
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Node.js, Express |
| API Style | REST |
| Data Store | JSON (file-based) |
| Tooling | npm, Git, GitHub |

---

## ▶️ Running Locally

### 1️⃣ Start the API server
```bash
cd server
npm install
npm start
```

Runs on:
```
http://localhost:3000
```

---

### 2️⃣ Start the React client
```bash
cd client
npm install
npm run dev
```

Open:
```
http://localhost:5173
```

The dashboard will load ticket data from the REST API automatically.

---

## 🧠 Design Decisions

- **No database**: keeps focus on API contracts and frontend logic  
- **No auth (yet)**: scope kept intentionally tight for clarity  
- **Explicit separation** between client and server folders  
- **Readable code first** — optimised for learning and review  

This mirrors real-world internal tools, where clarity often matters more than novelty.

---

## 🧪 Extension Ideas

This project is designed to grow naturally into:

- `POST /tickets` (create tickets)
- `PATCH /tickets/:id` (status updates)
- Filtering & search (priority, status, SLA)
- Role-based access (agent vs admin)
- Database backing (SQLite / PostgreSQL)
- Metrics endpoint (`/metrics`) for dashboards

---

## 📌 Why This Project Exists

This project demonstrates:
- Understanding of **RESTful APIs**
- Practical **first-line IT support workflows**
- Real-world React usage (not a toy counter app)
- Clean project structure suitable for team environments

It is intentionally aligned with **IT support, service desk, and junior engineering roles**.

---

## 👤 Author

**Gregory John Carberry**  
- GitHub: https://github.com/GregoryCarberry  
- LinkedIn: https://www.linkedin.com/in/gregory-carberry  
