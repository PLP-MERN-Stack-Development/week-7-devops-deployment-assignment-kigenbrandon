markdown
# 🚀 Week 7: MERN Stack Deployment & DevOps Project

## 🌍 Live Project Links

- **Frontend (React/Vercel)**: [vercel link](https://week-7-devops-deployment-assignment-five.vercel.app/)
- **Backend API (Express/Render)**:[render](https://week-6-test-debug-assignment-kigenbrandon.onrender.com/api/bugs)
- **MongoDB Atlas Cluster**: Configured (connection secured via `.env`)

---

## 📦 Overview

This project demonstrates a complete DevOps workflow for deploying a full-stack **MERN (MongoDB, Express, React, Node.js)** application. It includes backend and frontend deployment, CI/CD pipelines, secure environment configurations, performance optimization, and monitoring.

---

## 🧑‍💻 Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions
- **Deployment Platforms**:
  - Frontend: Vercel
  - Backend: Render
- **Monitoring**: UptimeRobot + Sentry (optional)

---

## ✅ Features Implemented

### 🔧 Task 1: Application Optimization

- React build optimized with `vite build`
- Code splitting and lazy loading for improved performance
- Production-ready Express server with:
  - `helmet` for secure headers
  - `express-rate-limit` for DDoS protection
  - Centralized error handling
  - Environment-based config management using `dotenv`
- MongoDB Atlas with:
  - Secure database user
  - Connection pooling via Mongoose

---

### 🚀 Task 2: Backend Deployment

- Deployed using **Render**
- Environment variables set securely via Render dashboard
- Continuous Deployment from GitHub
- HTTPS via Render’s auto SSL
- Health check endpoint: `/api/health`
- Backend logs monitored via Render dashboard

---

### 🌐 Task 3: Frontend Deployment

- Deployed using **Vercel**
- Environment variables set through Vercel dashboard
- Static files optimized for caching and CDN delivery
- HTTPS enforced
- Continuous Deployment connected to GitHub

---

### 🔁 Task 4: CI/CD Pipeline

- GitHub Actions used for automation
- **CI Workflow Includes**:
  - Linting with ESLint
  - Unit tests (Jest + React Testing Library)
  - Backend tests with Supertest
- **CD Workflow Includes**:
  - Auto deployment to Render (backend)
  - Auto deployment to Vercel (frontend)
- Staging & production branches configured
- Rollback instructions documented below

---

### 📈 Task 5: Monitoring & Maintenance

- **Monitoring**:
  - Uptime monitoring: [UptimeRobot](https://uptimerobot.com/)
  - Health checks: `/api/health`
  - Optional error tracking with [Sentry](https://sentry.io/)
- **Performance**:
  - Frontend build analysis via Vercel analytics
  - Render logs and metrics for backend
- **Maintenance Plan**:
  - Weekly dependency audit using `npm audit`
  - Database backups via MongoDB Atlas
  - Deployment logs archived in GitHub Actions

---

## 📁 Project Structure

```

project-root/
│
├── client/               # React frontend
│   ├── public/
│   └── src/
│
├── server/               # Node/Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .github/workflows/    # GitHub Actions CI/CD
├── .env.example          # Template for environment variables
├── README.md             # This file
└── package.json

````

---

## 📋 Environment Variable Templates

### `.env.example`

```env
# Backend
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.vercel.app

# Frontend (set in Vercel dashboard)
VITE_API_URL=https://your-backend-url.onrender.com/api
````

---

## 🚀 Deployment Instructions

### Frontend (Vercel)

1. Push React app to GitHub.
2. Import repo into Vercel.
3. Add `VITE_API_URL` in Environment Variables.
4. Deploy automatically or manually.
5. Optional: Configure custom domain.

### Backend (Render)

1. Push backend to GitHub.
2. Create new web service on Render.
3. Set environment variables:

   * `PORT`
   * `MONGO_URI`
   * `CORS_ORIGIN`
4. Auto-deploy on commit.
5. Use Render’s HTTPS and monitoring tools.

---

## 🧪 Screenshots

### ✅ GitHub Actions CI/CD

![CI/CD Success](./assets/github-actions-success.png)

### 🖥️ Health Endpoint

![Health Check](./assets/health-check.png)

---

## 🔁 Rollback Strategy

If deployment fails:

* **Frontend**: Revert to last working deployment in Vercel.
* **Backend**: Rollback from Render dashboard.
* GitHub commits are atomic, enabling branch-based hotfixes and redeployment.

---

## 📆 Maintenance Plan

* 🧪 Weekly test + audit runs
* 🔄 Keep dependencies updated with `npm-check-updates`
* 🔒 Rotate API keys and secrets regularly
* 💾 Ensure automated backups on MongoDB Atlas
* 📊 Monthly performance reviews via analytics dashboards

---

## 👨‍🏫 Author

**Brandon Kigen**
Week 7 MERN DevOps Deployment Project
[GitHub Profile](https://github.com/kigenbrandon)

---

## 📃 License


