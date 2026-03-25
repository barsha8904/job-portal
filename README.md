# Job Portal Full-Stack React & Node.js Application

A production-ready Job Portal allowing standard authenticated users (Job Seekers) to view and apply for jobs, and Employers to post, manage, and view applicants for their jobs. Built with a modern, responsive user interface using Tailwind CSS and React.

## System Requirements
- Node.js (v18+)
- PostgreSQL Database
- IDE or Text Editor

---

## 🚀 Quick Start / Local Development

### 1. Database Setup
1. Create a local PostgreSQL database named `jobportal`.
2. Run the SQL initialization script located in `database/schema.sql` to create the `users`, `jobs`, and `applications` tables.

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory: `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure the `.env` file is present in the `backend` folder with your PostgreSQL connection string:
   ```env
   PORT=5000
   DATABASE_URL=postgres://your_user:your_password@localhost:5432/jobportal
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory: `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Visit the local preview link provided by Vite (usually `http://localhost:3000` or `http://localhost:5173`).

---

## 🌍 CI/CD & Cloud Deployment Guide

### Database (PostgreSQL) - Render or Supabase
1. Create a free PostgreSQL instance on **Render** (render.com) or **Supabase** (supabase.com).
2. Run the `database/schema.sql` queries in their SQL editor.
3. Access the remote `DATABASE_URL` string (e.g., `postgresql://user:pass@host/db`). 

### Backend (Node.js/Express) - Render or Railway
1. Push your `job-portal` repository to GitHub.
2. Sign in to **Render** and click `New + -> Web Service`.
3. Connect your GitHub account and select your `job-portal` repository.
4. **Root Directory**: `backend`
5. **Build Command**: `npm install`
6. **Start Command**: `npm start`
7. In the **Environment Variables** section, add your production values:
   - `PORT`: `5000`
   - `DATABASE_URL`: `[Your remote postgres string]`
   - `JWT_SECRET`: `[A random secure string]`
8. Deploy and keep track of the generated Render backend URL (e.g., `https://jobportal-api.onrender.com`).

### Frontend (React/Vite) - Vercel or Netlify
1. Before deploying, update `frontend/src/services/api.js` to point to your new Production Backend URL:
   ```javascript
   baseURL: 'https://jobportal-api.onrender.com/api'
   ```
2. Commit and push the updated `api.js` to GitHub.
3. Sign in to **Vercel** and select `Add New Project`.
4. Connect the same `job-portal` GitHub repository.
5. **Framework Preset**: Vite
6. **Root Directory**: `frontend`
7. Click **Deploy**. Vercel will install dependencies, build the React artifacts, and deploy your site to their global CDN.

---

## Application Structure & API

- `POST /api/auth/register` : User Registration
- `POST /api/auth/login` : User Authentication
- `GET /api/jobs` : List recent jobs
- `GET /api/jobs/:id` : Job details
- `POST /api/jobs` : Post new job (Employer)
- `POST /api/applications` : Apply to job (Job Seeker)
- `GET /api/applications/:jobId` : View candidates for a given job (Employer)
