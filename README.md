# 🎫 Ticket Triage Dashboard

A **full-stack service desk–style ticket triage application** built with **React** and a **RESTful Node.js API**.

This project demonstrates **realistic first-line IT support workflows**, including ticket filtering, status updates, self-assignment, activity notes, and live operational metrics — all driven by a clean REST API.

---

## 🧩 Overview

The Ticket Triage Dashboard models the **core day-to-day experience of a first-line service desk**:

- Incoming tickets are easy to scan and prioritise
- Status changes are fast and reliable
- Agents can self-assign work
- All actions are logged in a ticket activity timeline
- Live metrics provide instant operational visibility

The application is intentionally lightweight, readable, and easy to extend.

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
JSON-backed data store
```

- Frontend and backend are **fully decoupled**
- All state changes flow through REST endpoints
- Data storage can be swapped for a database later without changing the UI

---

## 🚀 Key Features

### 🎯 Ticket Triage
- View tickets with priority and status indicators
- Filter tickets by status, priority, or free-text search
- Designed for rapid scanning and decision-making

### 🔄 Status Management
- Inline status updates (*New → In Progress → Resolved*)
- **Optimistic UI updates** with rollback on API failure
- Status changes persisted via REST API

### 👤 Assignment Workflow
- “Assign to me” action for first-line agents
- Ownership persisted server-side
- Mirrors common service desk ownership patterns

### 📝 Notes & Activity Timeline
- Per-ticket notes visible in a dedicated details drawer
- Manual notes added by agents
- **System-generated activity events** logged automatically for:
  - Status changes
  - Assignee changes
- Creates a clear audit trail of ticket activity

### 📊 Metrics Dashboard
- Live summary of:
  - Total tickets
  - Open tickets
  - New / In-progress tickets
  - High-priority tickets
- Powered by a dedicated `/metrics` API endpoint

---

## ⚙️ Tech Stack

| Layer | Technology |
|-----|-----------|
| Frontend | React, Vite, JavaScript |
| Backend | Node.js, Express |
| API Style | REST |
| Data Store | JSON (file-based) |
| Tooling | Git, GitHub, npm |

---

## ▶️ Running Locally

### API Server
```bash
cd server
npm install
npm start
```
Runs on `http://localhost:3000`

### React Client
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173`

---

## 🧠 Design Decisions

- **File-based storage** keeps the focus on API behaviour and UI logic
- **No authentication (yet)** to keep scope tight and readable
- **Optimistic UI patterns** reflect modern internal tooling
- **System events logged server-side** to ensure consistency
- Prioritised **clarity and maintainability** over unnecessary abstraction

---

## 📌 Why This Project Exists

This project demonstrates how common **service desk concepts** translate into clean, maintainable code:

- API-driven state management
- Incremental feature development
- Clear separation of concerns
- Realistic workflows aligned with IT support environments

It is intentionally aligned with **IT Support, Service Desk, and Junior Engineering roles**, rather than being a purely academic demo.

---

## 🔮 Future Enhancements

- Role-based reassignment and escalation
- Ticket activity filtering
- Database persistence (SQLite / PostgreSQL)
- Authentication and user management
- Reporting and SLA indicators

---

## 👤 Author

**Gregory John Carberry**  
GitHub: https://github.com/GregoryCarberry  
LinkedIn: https://www.linkedin.com/in/gregory-carberry
