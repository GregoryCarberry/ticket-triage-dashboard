# 🎫 Ticket Triage Dashboard (React + REST API)

A **full-stack service desk–style ticket triage application** built with **React** and a **RESTful Node.js API**.  
This project demonstrates **realistic first-line IT support workflows**, including filtering, status updates, self‑assignment, and live operational metrics.

> **Focus:** Practical support operations and clean API-driven state, rather than UI gimmicks.

---

## 🧩 Overview

The goal of this project is to model the **core experience of a first-line service desk**:

- Incoming tickets are easy to scan and prioritise
- Status changes are fast and reliable
- Agents can self‑assign work
- Managers (or agents) can see live workload metrics at a glance

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
- Data storage can be swapped for a database without altering the UI

---

## 🚀 Key Features

### Ticket Triage
- View tickets with priority and status indicators
- Filter by status, priority, or free‑text search
- Designed for rapid scanning and decision‑making

### Status Management
- Inline status updates (*New → In Progress → Resolved*)
- **Optimistic UI updates** with rollback on API failure
- Changes persist via REST API

### Assignment Workflow
- “Assign to me” action for first‑line agents
- Assignee persisted server‑side
- Mirrors common service desk ownership patterns

### Metrics Dashboard
- Live summary of:
  - Total tickets
  - Open tickets
  - New / In‑progress tickets
  - High‑priority tickets
- Backed by a dedicated `/metrics` API endpoint

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
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

- **No database**: keeps focus on API contracts and UI logic
- **No authentication** (yet): scope kept intentionally tight
- **Optimistic UI patterns**: reflects modern, responsive internal tools
- **Readable code first**: prioritises maintainability over cleverness

---

## 📌 Why This Project Exists

This project demonstrates how common **service desk concepts** translate into clean, maintainable code:

- API‑driven state management
- Incremental feature development
- Clear separation of concerns
- Practical workflows aligned with real IT support environments

---

## 👤 Author

**Gregory John Carberry**  
GitHub: https://github.com/GregoryCarberry  
LinkedIn: https://www.linkedin.com/in/gregory-carberry  
