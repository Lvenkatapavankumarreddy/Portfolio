# Venkata Pavan - Personal Portfolio & Web Application Platform

> **Built with React 19 + Vite 8 and Deployed on Vercel**

---

## 📖 Project Overview

This project is a modern, high-performance web platform built with **React** and **Vite**, featuring a responsive developer portfolio, client-side authentication with browser **Local Storage**, and dedicated **Admin** and **User** workspace modules.

The application adheres to clean component architecture, role-based authorization guards, WCAG 2.1 AA/AAA accessibility compliance, persistent theme toggling (dark/light), and seamless deployment configuration for **Vercel**.

---

## ⚡ Technologies Used

- **React 19**: Declarative, component-driven UI library with hooks (`useState`, `useEffect`, `useContext`, `useCallback`).
- **Vite 8**: Next-generation frontend build tool providing sub-second Hot Module Replacement (HMR) and optimized rollup production bundles.
- **Client-Side SPA Routing**: Custom, dependency-free React Router implementation supporting HTML5 History API (`pushState`, `popstate`), scroll restoration, active link styles, and route protection guards.
- **Vanilla CSS3 Design Tokens**: Comprehensive custom design tokens (CSS variables for theming, typography, elevations, glassmorphic filters, and light/dark theme modes).
- **Local Storage State Persistence**: Complete client-side database layer with safe JSON serialization, collection CRUD operations, and idempotent seeding.
- **Vercel Cloud Deployment**: Automated SPA rewrites configuration (`vercel.json`), pre-configured build scripts, and production edge delivery.

---

## 📦 Project Modules & Functionalities

The application is structured into four primary modules:

```
                          ┌───────────────────────────┐
                          │   Public Portfolio (/)    │
                          └─────────────┬─────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
                 ┌───────────────┐             ┌───────────────┐
                 │ Login (/login)│             │Signup(/signup)│
                 └───────┬───────┘             └───────────────┘
                         │
                 Role Verification
                (portfolio_current_user)
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
    [role === 'admin']        [role === 'user']
            │                         │
            ▼                         ▼
┌───────────────────────┐ ┌───────────────────────┐
│ Admin Console (/admin)│ │   User Hub (/user)    │
├───────────────────────┤ ├───────────────────────┤
│ • Dashboard Overview  │ │ • Client Profile & PW │
│ • Projects CRUD       │ │ • Bookmarked Projects │
│ • Skills CRUD         │ │ • My Inquiries Tracker│
│ • Blogs CRUD          │ │ • Security & Storage  │
│ • Messages Inbox      │ └───────────────────────┘
└───────────────────────┘
```

### **1. Public Portfolio Module (`/`)**
- **Hero Section**: Dynamic typewriter role cycling, call-to-actions, live availability status pill, and responsive social channels.
- **About Me Section**: Professional biography, education/experience timeline, and engineering pillars.
- **Skills Section**: Dynamic proficiency matrix loaded directly from Local Storage (`portfolio_skills`), featuring filter tabs (All, Frontend, Backend, DevOps, Languages) and animated percentage indicators.
- **Projects Section**: Featured application gallery loaded from `portfolio_projects` with category filters (All, Full Stack, Frontend, Backend), tech tags, live demo & GitHub repository links, and an interactive **Bookmark button** connected to the User Hub.
- **Blog Section**: Technical articles loaded from `portfolio_blogs` with estimated read times, author meta, and excerpt previews.
- **Achievements Section**: Milestone counters and key credibility metrics.
- **Contact Section & Form**: Validated interactive form (Name, Email, Subject, Message) that submits inquiries directly to `portfolio_messages` in Local Storage with feedback toasts.
- **Navigation & Footer**: Sticky header with brand monogram, theme toggle (dark/light), authentication triggers, mobile drawer menu, and back-to-top button.

### **2. Authentication Module (`/login` & `/signup`)**
- **Client-Side Registration (`/signup`)**:
  - Full Name, Email, Password, Confirm Password, and Terms & Conditions acceptance.
  - Real-time password strength meter (**Weak**, **Medium**, **Strong**) and 4-rule requirements checklist (8+ chars, uppercase, lowercase, number).
  - Show/Hide password toggle buttons for accessible typing.
  - Real-time password confirmation match indicator.
  - Validates inputs, prevents duplicate emails, persists registered users into `portfolio_users` with default role `"user"`, and displays success notices before redirecting to `/login`.
- **Client-Side Login (`/login`)**:
  - Email and Password credentials authentication with Show/Hide toggle.
  - "Remember email" checkbox.
  - Validates credentials against `portfolio_users` without leaking account existence.
  - Pre-seeded Demo Administrator helper button (`admin@portfolio.com` / `Admin123`).
  - Sets active authenticated session in `portfolio_current_user` (strictly sanitized: **no passwords stored in session**).
  - Role-based automatic routing: `admin` &rarr; `/admin`, `user` &rarr; `/user`.
- **Route Guards (`RequireAuth`, `RequireAdmin`, `RequireGuest`)**:
  - Prevents unauthenticated visitors from accessing protected pages.
  - Prevents normal users (`role: "user"`) from accessing the Admin Console.
  - Prevents logged-in users from seeing login/signup pages.

### **3. Admin Management Module (`/admin`)**
- **Protected Console**: Guarded by `RequireAdmin`. Unauthenticated visitors bounce to `/login`; unauthorized users are redirected to `/user`.
- **Dashboard Overview**: Real-time metrics counters (Total Projects, Total Skills, Total Blogs, Inquiries, Active Users), quick action shortcuts, and Local Storage collection status.
- **Projects CRUD Management**:
  - Create new projects with title, description, category, comma-separated technologies, live demo URL, and GitHub repository URL.
  - Edit existing projects with pre-filled form modal.
  - Delete projects with confirmation safety modal.
  - Live search filtering by title or technology tag.
- **Skills CRUD Management**:
  - Create, edit, and delete skills with visual proficiency level slider (10%–100%) and category assignment (Frontend, Backend, DevOps, Languages).
  - Real-time percentage progress bar preview.
- **Blogs CRUD Management**:
  - Author and edit technical articles with title, excerpt, full markdown content, category, read time, and **Published / Draft status toggle**.
  - Live search by title, excerpt, or category.
- **Messages / Contact Inquiries Inbox**:
  - View inquiries dispatched from the public Contact form (`portfolio_messages`).
  - Filter inquiries by All, Unread, or Read.
  - Message preview modal with one-click `mailto:` reply generator.
  - Delete inquiries with confirmation modal.

### **4. User Workspace Module (`/user`)**
- **Protected Client Hub**: Guarded by `RequireAuth`.
- **User Banner**: Active user initials avatar, full name, email, and role badge (`ROLE: USER`).
- **Client Profile Tab**:
  - View account identifier, email, assigned role, and login timestamp.
  - Edit full name dynamically.
  - Change password with old password verification and strength analysis.
- **Saved Projects Tab**:
  - View bookmarked portfolio projects saved from the public showcase.
  - Direct access to live demos and GitHub source repositories.
  - Remove projects from bookmarks.
- **My Inquiries Tab**:
  - Real-time tracking of inquiries submitted by this user.
  - Status indicators (**Pending Review** / **Reviewed by Admin**).
  - Direct "New Inquiry" modal to send collaboration proposals to the admin.
- **Security & Storage Tab**:
  - Visual inspector displaying the sanitized session payload.
  - Explanation of client-side authentication guards and session handling.

---

## 🗄️ Local Storage Keys & Data Schema

| Storage Key | Type | Description |
| :--- | :--- | :--- |
| `portfolio_theme_mode` | String | User theme preference (`"dark"` or `"light"`) |
| `portfolio_users` | Array&lt;User&gt; | Registered user accounts (including seeded demo admin) |
| `portfolio_current_user` | Object | Active authenticated session (sanitized, **no password**) |
| `portfolio_projects` | Array&lt;Project&gt; | Featured portfolio projects collection |
| `portfolio_skills` | Array&lt;Skill&gt; | Technical skills and proficiency percentages |
| `portfolio_blogs` | Array&lt;Blog&gt; | Technical articles and publication status |
| `portfolio_messages` | Array&lt;Message&gt; | Contact inquiries and collaboration requests |
| `portfolio_bookmarks` | Object | Map of user IDs to arrays of bookmarked project IDs |

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm, pnpm, or yarn

### 1. Installation
Clone or navigate to the repository directory:
```bash
git clone https://github.com/venkatapavan78/Portfolio.git
cd Portfolio
```

Install dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to interact with the application.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle is generated in the `dist/` directory.

### 4. Preview the Production Build
```bash
npm run preview
```

---

## 🌐 Vercel Deployment Guide

The project is configured for deployment to [Vercel](https://vercel.com).

### Deployment Configuration Included:
- **`vercel.json`**:
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "cleanUrls": true,
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
  *(The SPA rewrite rule ensures refreshing routes like `/login`, `/admin`, or `/user` on Vercel resolves correctly without 404 errors).*

### Option A: Automatic Git Deployment via Vercel Dashboard (Recommended)

1. Push your updated code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete React + Vite migration with Admin, User, Auth and Vercel config"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com) with your GitHub account.
3. Click **Add New...** &rarr; **Project**.
4. Import your `Portfolio` repository (`https://github.com/venkatapavan78/Portfolio`).
5. Vercel automatically detects the framework as **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Vercel will build and assign your live production URL (e.g. `https://portfolio-venkatapavan.vercel.app`).

### Option B: Deploy Using Vercel CLI

If you have the Vercel CLI installed:
```bash
# 1. Log in to your Vercel account
npx vercel login

# 2. Deploy preview build
npx vercel

# 3. Deploy to production
npx vercel --prod
```

---

## 🧪 Verification Scenarios (Testing Guide)

| Test ID | Scenario | Steps | Expected Result |
| :---: | :--- | :--- | :--- |
| **01** | **Public Portfolio Showcase** | Open `/` in browser | Home page renders with Navbar, Hero typewriter, About, Skills, Projects, Blog, Contact, and Footer. |
| **02** | **Dark / Light Theming** | Click sun/moon toggle in Navbar | UI switches immediately between dark Obsidian and light Slate mode; preference persists across reload. |
| **03** | **Contact Form Submission** | Fill name, email, subject, message in Contact section and submit | Success banner appears; inquiry is added to `portfolio_messages` in Local Storage. |
| **04** | **Client Registration** | Navigate to `/signup`, fill details with valid password and submit | Strength meter displays progress; user is added to `portfolio_users` and redirected to `/login`. |
| **05** | **Duplicate Email Prevention** | Attempt to sign up again with the same email | Displays error: *"An account with this email already exists."* |
| **06** | **Demo Admin Login** | At `/login`, click "Auto-Fill" (or enter `admin@portfolio.com` / `Admin123`) and click Sign In | Redirects to `/admin`; Admin Console renders with metrics and CRUD managers. |
| **07** | **Client User Login** | Sign in with registered user credentials | Redirects to `/user`; User Hub displays user profile, bookmarks, and inquiries. |
| **08** | **Role Route Guard (User &rarr; Admin)** | Log in as user, manually navigate to `/admin` | Access denied; immediately redirected to `/user`. |
| **09** | **Route Guard (Guest &rarr; Protected)** | Log out, navigate directly to `/admin` or `/user` | Immediately bounced to `/login`. |
| **10** | **Admin Projects CRUD** | In `/admin`, create a project, edit its title, and delete it | Projects table and public home page update instantly in Local Storage. |
| **11** | **Admin Inbox Review** | In `/admin`, open Messages tab, read message, click Reply | Message marked as read; unread badge counter decreases; mailto link opens email client. |
| **12** | **User Bookmarks** | On home page, click bookmark star on a project | Project is saved to User Hub under Saved Projects tab; can be removed at any time. |
| **13** | **Production Build** | Run `npm run build` in terminal | Vite builds clean `dist/` bundle with zero errors in &lt; 500ms. |
| **14** | **Vercel Deep Routing** | Navigate directly to `/admin` or `/user` on Vercel deployment | `vercel.json` rewrites resolve to `/index.html`; route opens cleanly without 404. |

---

## 📂 Project Structure

```
Portfolio/
├── index.html                   # Vite HTML5 entry point
├── package.json                 # Project dependencies & npm scripts
├── vite.config.js               # Vite build & server configuration
├── vercel.json                  # Vercel SPA rewrites & deployment configuration
├── .gitignore                   # Git exclusion rules (node_modules, dist, temp)
├── public/
│   └── assets/                  # Public assets, images, and SVG illustrations
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main router, route guards, and layout setup
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication, registration, session, and role state
│   │   └── ThemeContext.jsx     # Dark/light theme state & document attribute sync
│   ├── router/
│   │   └── Router.jsx           # Clean SPA router (BrowserRouter, Routes, Route, Link, etc.)
│   ├── services/
│   │   └── storage.js           # Centralized Local Storage abstraction, schema & CRUD APIs
│   ├── components/
│   │   └── common/
│   │       ├── Navbar.jsx       # Responsive header with monogram, navigation & auth triggers
│   │       ├── Footer.jsx       # Footer with quick links, social profiles & back to top
│   │       ├── Modal.jsx        # Accessible dialog component with backdrop & keyboard exit
│   │       ├── Toast.jsx        # Animated floating alert notification banner
│   │       ├── ThemeToggle.jsx  # Dark/light switcher button
│   │       └── ProtectedRoute.jsx # Role-based route authorization guards
│   ├── modules/
│   │   ├── public/              # 1. Public Portfolio Module
│   │   │   ├── HomePage.jsx
│   │   │   └── components/
│   │   │       ├── HeroSection.jsx
│   │   │       ├── AboutSection.jsx
│   │   │       ├── SkillsSection.jsx
│   │   │       ├── ProjectsSection.jsx
│   │   │       ├── BlogSection.jsx
│   │   │       ├── AchievementsSection.jsx
│   │   │       └── ContactSection.jsx
│   │   ├── auth/                # 2. Authentication Module
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── admin/               # 3. Admin Management Module
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── sections/
│   │   │       ├── DashboardOverview.jsx
│   │   │       ├── ProjectsManager.jsx
│   │   │       ├── SkillsManager.jsx
│   │   │       ├── BlogsManager.jsx
│   │   │       └── MessagesManager.jsx
│   │   └── user/                # 4. User Workspace Module
│   │       ├── UserDashboard.jsx
│   │       └── tabs/
│   │           ├── ProfileTab.jsx
│   │           ├── BookmarksTab.jsx
│   │           ├── MyInquiriesTab.jsx
│   │           └── SecurityTab.jsx
│   └── styles/
│       ├── style.css            # Base design tokens, CSS variables & typography
│       ├── responsive.css       # Responsive breakpoints & media queries
│       ├── auth.css             # Authentication cards & form inputs
│       ├── dashboard.css        # Admin console tables, sidebar & badges
│       └── app.css              # React component styling, modals & tabs
└── legacy-vanilla/              # Preserved archive of initial vanilla HTML/CSS/JS files
```

---

## 👤 Author

**Venkata Pavan**  
- Software Engineer & Full-Stack Developer  
- **GitHub**: [https://github.com/venkatapavan78](https://github.com/venkatapavan78)  
- **LinkedIn**: [Personal Portfolio Showcase](https://www.linkedin.com/pulse/personal-portfolio-lokasani-venkata-pavan-kumar-reddy--zfimf)  
