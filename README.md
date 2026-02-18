# 🏳️‍⚧️ TransConnect — Your Identity, Your Safe Space

**TransConnect** is a web application designed as India's verified community platform for transgender individuals. It provides a safe, anonymous, and encrypted space to connect with mentors, access healthcare resources, find trans-friendly doctors, and get support on their journey.

> Built with React, TypeScript, Tailwind CSS v4, and Vite.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation Guide](#-installation-guide)
- [Running the Application](#-running-the-application)
- [Build for Production](#-build-for-production)
- [Pages & Routes](#-pages--routes)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Mentor Discovery** — Browse and connect with verified mentors who understand the transgender journey.
- **Safe Community Chat** — End-to-end encrypted messaging with mentors and community members.
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

## 📂 Project Structure

```
TransConnect/
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── vite.config.ts              # Vite configuration
├── postcss.config.mjs          # PostCSS configuration
├── src/
│   ├── main.tsx                # React entry point
│   ├── styles/
│   │   ├── index.css           # Global styles
│   │   ├── fonts.css           # Font imports
│   │   ├── tailwind.css        # Tailwind directives
│   │   └── theme.css           # Theme variables
│   └── app/
│       ├── App.tsx             # Root component with routing
│       ├── components/
│       │   ├── Navbar.tsx      # Navigation bar
│       │   ├── CrisisButton.tsx # Crisis support floating button
│       │   ├── MobileBottomNav.tsx # Mobile bottom navigation
│       │   └── ui/             # Reusable UI components (Shadcn/ui)
│       ├── data/
│       │   └── mockData.ts     # Mock data (mentors, doctors, resources)
│       └── pages/
│           ├── LandingPage.tsx         # Public landing page
│           ├── SignupPage.tsx           # User registration
│           ├── LoginPage.tsx            # User login
│           ├── DashboardPage.tsx        # User dashboard with mood check-in
│           ├── MentorDiscoveryPage.tsx  # Browse & filter mentors
│           ├── ChatPage.tsx             # Community & mentor chat
│           ├── HealthcarePage.tsx       # Trans-friendly doctors directory
│           └── ResourcesPage.tsx        # Educational resources library
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

This will install all the required dependencies listed in `package.json`, including React, Tailwind CSS, Vite, Radix UI components, and more.

### Step 4: Start the Development Server

```bash
npm run dev
```

The application will start on a local development server. Open your browser and visit:

```
http://localhost:5173
```

---

## 🏃 Running the Application

| Command | Description |
|---|---|
| `npm install` | Install all project dependencies |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Create an optimized production build |

### Development Server

```bash
npm run dev
```

This starts the Vite dev server with:
- ⚡ Lightning-fast Hot Module Replacement (HMR)
- 🔄 Auto-refresh on file changes
- 📱 Accessible from local network for mobile testing

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory, ready for deployment.

---

## 🗺 Pages & Routes

| Route | Page | Access | Description |
|---|---|---|---|
| `/` | Landing Page | Public | Hero section, features overview, CTA |
| `/signup` | Sign Up | Public | User registration form |
| `/login` | Log In | Public | User login form |
| `/dashboard` | Dashboard | Protected | Mood check-in, quick actions, recommendations |
| `/mentors` | Mentor Discovery | Protected | Browse & filter verified mentors |
| `/chat` | Community Chat | Protected | Group chats & community messaging |
| `/chat/:mentorId` | Mentor Chat | Protected | Direct messaging with a specific mentor |
| `/healthcare` | Healthcare | Protected | Trans-friendly doctors directory |
| `/resources` | Resources | Protected | Educational guides & articles |

---

## 🎨 Design System

TransConnect uses a carefully crafted design system:

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

## 💜 About TransConnect

TransConnect is India's first verified community platform dedicated to transgender individuals. Our mission is to provide a safe, supportive, and inclusive digital space where trans people can:

- Find mentors who understand their journey
- Access verified healthcare providers
- Learn about legal rights and medical transitions
- Connect with a supportive community

> *"Your identity, your safe space. All communications are encrypted."*

---

Made with 💜 for the trans community in India
