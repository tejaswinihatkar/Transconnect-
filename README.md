# 🏳️‍⚧️ Astitva — Your Identity, Your Safe Space

**Astitva** is a web application designed as India's verified community platform for transgender individuals. It provides a safe, anonymous, and encrypted space to use an AI Study Bot, access healthcare resources, find trans-friendly doctors, and get support on their journey.

> Built with React, TypeScript, Tailwind CSS v4, and Vite.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Technical Architecture](#-technical-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Build for Production](#-build-for-production)
- [Pages & Routes](#-pages--routes)
- [Backend API Routes](#-backend-api-routes)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **AI Study Bot** — Ask study and career questions, get YouTube resources with summarized notes.
- **Safe Community Chat** — End-to-end encrypted messaging in community rooms.
- **Healthcare Directory** — Find trans-friendly doctors and healthcare providers across India.
- **Resource Library** — Comprehensive guides on HRT, legal name changes, mental health, career support, and more.
- **Mood Check-in** — Daily mood tracking on the dashboard for mental wellness.
- **Crisis Support** — Quick-access crisis button available on every page.
- **Anonymous & Encrypted** — Privacy-first design with anonymous profiles and encrypted communications.
- **Responsive Design** — Fully responsive UI with mobile bottom navigation.
- **Beautiful Animations** — Smooth page transitions and micro-interactions powered by Framer Motion.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI Library |
| **TypeScript** | Type Safety |
| **Vite 6** | Build Tool & Dev Server |
| **Tailwind CSS v4** | Utility-first CSS Styling |
| **React Router v7** | Client-side Routing |
| **Radix UI** | Accessible UI Primitives |
| **Shadcn/ui** | Pre-built UI Components |
| **Framer Motion** | Animations & Transitions |
| **Lucide React** | Icon Library |
| **MUI (Material UI)** | Additional UI Components |
| **Recharts** | Data Visualization / Charts |
| **Sonner** | Toast Notifications |

---

## 🧱 Technical Architecture

Astitva uses a modular **frontend + backend + managed BaaS** architecture:

- **Frontend (React + TypeScript):** Handles UI, routing, multilingual support (English/Hindi/Marathi), and responsive interactions.
- **Backend (Express + TypeScript):** Exposes `/api/*` endpoints for auth/profile/message/study workflows and middleware-based security.
- **Supabase:** Provides authentication, PostgreSQL database, and realtime updates for chat.

### Request flow

1. User action on frontend pages (`/login`, `/dashboard`, `/chat`, `/study-bot`, etc.)
2. Frontend calls Supabase Auth and backend API endpoints as needed.
3. Backend processes business logic and persists data via Supabase.
4. Supabase realtime subscriptions stream new community chat messages.

### Core modules

- **Auth:** signup, login, forgot/reset password, profile upsert
- **Community Chat:** predefined + custom communities, join flow, realtime messaging
- **AI Study Bot:** query to resources API, prompt history, share-ready output
- **Healthcare Locator:** filters, map-based view, booking request modal
- **Talent Showcase:** list and profile pages backed by `talent_profiles`
- **Profile & Settings:** profile editing + instant language switching

---

## 📂 Project Structure

```
Astitva/
├── index.html
├── package.json                 # Frontend dependencies & scripts
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── supabaseClient.ts        # Frontend Supabase client
│   └── app/
│       ├── App.tsx
│       ├── components/
│       └── pages/
│           ├── LandingPage.tsx
│           ├── SignupPage.tsx
│           ├── LoginPage.tsx
│           ├── DashboardPage.tsx
│           ├── StudyBotPage.tsx
│           ├── ChatPage.tsx
│           ├── HealthcarePage.tsx
│           ├── ResourcesPage.tsx
│           └── ProfilePage.tsx
└── backend/
    ├── package.json             # Backend scripts & dependencies
    ├── tsconfig.json
    └── src/
        ├── server.ts
        ├── supabase.ts
        ├── middleware/
        │   └── auth.ts
        ├── controllers/
        │   ├── authController.ts
        │   ├── messageController.ts
        │   └── studyController.ts
        └── routes/
            ├── auth.ts
            ├── study.ts
            └── messages.ts
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v18.0.0 or higher) — [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher) — Comes bundled with Node.js
- **Git** — [Download Git](https://git-scm.com/)

You can verify your installations by running:

```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/tejaswinihatkar/Transconnect-.git
```

### Step 2: Navigate to the Project Directory

```bash
cd Transconnect-
```

### Step 3: Install Dependencies

```bash
npm install
```

Install backend dependencies too:

```bash
cd backend
npm install
cd ..
```

### Step 4: Create Environment Files

Create frontend `.env` in the project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Create backend `.env` inside `backend/`:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-own-random-long-secret
PORT=5000
FRONTEND_URL=http://localhost:5173
```

You can also copy the backend template:

```bash
cd backend
cp .env.example .env
```

Then replace placeholder values.

### Step 5: Start Frontend + Backend

Run backend in one terminal:

```bash
cd backend
npm run dev
```

Run frontend in another terminal:

```bash
# from project root
npm run dev
```

Then open:

```
Frontend: http://localhost:5173
Backend API: http://localhost:5000
Backend health check: http://localhost:5000/api/health
```

---

## 🔐 Environment Variables

### Frontend (`/.env`)

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key |

### Backend (`/backend/.env`)

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only, secret) |
| `JWT_SECRET` | Backend JWT signing secret (your own random long string) |
| `PORT` | Backend server port (default `5000`) |
| `FRONTEND_URL` | Frontend URL for CORS (`http://localhost:5173`) |

Get Supabase values from **Supabase Dashboard -> Settings -> API**.

---

## 🏃 Running the Application

### Frontend (project root)

| Command | Description |
|---|---|
| `npm install` | Install all project dependencies |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Create an optimized production build |

### Backend (`backend/`)

| Command | Description |
|---|---|
| `npm install` | Install backend dependencies |
| `npm run dev` | Start backend server with nodemon |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run compiled backend from `dist/` |

### Development Servers

```bash
# terminal 1 (root)
npm run dev

# terminal 2 (backend)
cd backend
npm run dev
```

This starts:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

### Build for Production

```bash
# frontend
npm run build

# backend
cd backend
npm run build
```

This creates optimized builds in:
- Frontend: `/dist`
- Backend: `/backend/dist`

---

## 🗺 Pages & Routes

| Route | Page | Access | Description |
|---|---|---|---|
| `/` | Landing Page | Public | Hero section, features overview, CTA |
| `/signup` | Sign Up | Public | User registration form |
| `/login` | Log In | Public | User login form |
| `/dashboard` | Dashboard | Protected | Mood check-in, quick actions, recommendations |
| `/study-bot` | AI Study Bot | Protected | Ask queries, get video resources + summaries |
| `/chat` | Community Chat | Protected | Group chats & community messaging |
| `/healthcare` | Healthcare | Protected | Trans-friendly doctors directory |
| `/resources` | Resources | Protected | Educational guides & articles |
| `/profile` | Profile | Protected | User profile management |

---

## 🧩 Backend API Routes

Base URL: `http://localhost:5000/api`

### Auth

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/profile` (requires JWT)
- `PUT /auth/profile` (requires JWT)

### Study Bot

- `POST /study-resources`

### Messages

- `GET /messages` (requires JWT)
- `POST /messages` (requires JWT)
- `DELETE /messages/:id` (requires JWT)

---

## 🎨 Design System

Astitva uses a carefully crafted design system:

- **Primary Purple**: `#7c3aed` — Main brand color
- **Pink Accent**: `#f472b6` — Secondary accent
- **Sky Blue**: `#38bdf8` — Tertiary accent
- **Dark Navy**: `#1e1b4b` — Text color
- **Gradients**: Pink → Purple, Purple → Blue — Used across cards and CTAs
- **Border Radius**: Rounded corners (`rounded-3xl`) for a friendly, modern feel
- **Typography**: Clean, accessible typography with proper hierarchy

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "Add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💜 About Astitva

Astitva is India's first verified community platform dedicated to transgender individuals. Our mission is to provide a safe, supportive, and inclusive digital space where trans people can:

- Use AI-assisted learning and career guidance tools
- Access verified healthcare providers
- Learn about legal rights and medical transitions
- Connect with a supportive community

> *"Your identity, your safe space. All communications are encrypted."*

---

Made with 💜 for the trans community in India
