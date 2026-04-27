# AI-Powered Curriculum Creator

A full-stack Next.js application built for the House of Edtech Fullstack Developer Assignment. This platform allows users to generate, edit, and manage structured educational curricula using AI assistance.

## 🚀 Features

- **AI Generation**: Generate multi-module curricula based on topics and target audiences.
- **Full CRUD**: Create, Read, Update, and Delete courses and individual modules.
- **Authentication**: Secure access using NextAuth.js (supporting GitHub OAuth and Mock Credentials).
- **Authorization**: Route-level protection and resource ownership.
- **Modern UI**: Built with React, Tailwind CSS, and Shadcn UI components.
- **E2E Testing**: Automated browser testing with Playwright.
- **Security**: Robust protections against common web vulnerabilities (XSS, CSRF, Injection).

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: SQLite with Prisma ORM
- **Auth**: Auth.js (NextAuth.js v5)
- **Styling**: Tailwind CSS + Shadcn UI
- **Testing**: Playwright

## 🏁 Getting Started

### 1. Clone and Install
```bash
git clone https://github.com/MohammedMuneeb/House-of-EdTech-.git
cd House-of-EdTech-
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="any-random-string-for-dev"
# For GitHub Login (Optional for local testing)
AUTH_GITHUB_ID="your_client_id"
AUTH_GITHUB_SECRET="your_client_secret"
```

### 3. Database Initialization
```bash
npx prisma db push
```

### 4. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🧪 Running Tests
```bash
npm run test:e2e
```

## 📄 License
Built as a technical assignment.
