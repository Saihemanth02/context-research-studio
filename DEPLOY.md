# Deployment Guide - Context Research Studio

This guide outlines how to deploy the **Context Research Studio** workspace (Vite React frontend and Node/Express backend) using your GitHub account, **Netlify** (for the frontend), and **Render** (for the backend).

---

## Architecture of Deployed SaaS

- **Frontend**: Vite + React hosted on Netlify (global CDN, highly scalable, automated CI/CD builds on git push).
- **Backend**: Express API hosted on Render (handles persistent Node server execution and dynamic API connections).
- **Security**: The Context.dev API key remains hidden inside the backend environment variables, keeping it safe from client exposure.

---

## Step 1: Create a GitHub Repository & Push Code

Open a terminal or Command Prompt in the workspace root (`d:\Voice Agent`):

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Stage and Commit all Files**:
   Create a `.gitignore` file in the root if needed, or Git will automatically capture the folder structures.
   ```bash
   git add .
   git commit -m "feat: initial commit of Context Research Studio"
   ```

3. **Link to GitHub**:
   - Go to [GitHub](https://github.com) and click **New Repository**.
   - Name it `context-research-studio` (keep it private or public).
   - Run the commands shown in GitHub to link and push your repository:
     ```bash
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/context-research-studio.git
     git push -u origin main
     ```

---

## Step 2: Deploy the Express Backend to Render

1. Go to [Render](https://render.com) and log in using your GitHub account.
2. Click **New +** and select **Web Service**.
3. Select your repository `context-research-studio`.
4. Configure the Web Service settings:
   - **Name**: `research-studio-api`
   - **Language**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free (costs $0)
5. Click **Advanced** and add **Environment Variables**:
   - `CONTEXT_API_KEY` = `ctxt_secret_f7adc3562fbb481da141e8434dd857c7`
   - `PORT` = `10000` (or let Render assign it)
6. Click **Create Web Service**. Once deployed, Render will provide a public URL (e.g., `https://research-studio-api.onrender.com`).

---

## Step 3: Configure Redirects & Deploy Frontend to Netlify

1. Open [frontend/netlify.toml](file:///d:/Voice%20Agent/frontend/netlify.toml) inside your editor.
2. Replace `https://your-backend-render-url.onrender.com` in line 16 with your actual Render API URL:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://research-studio-api.onrender.com/api/:splat"
     status = 200
     force = true
   ```
3. Commit and push this change to GitHub:
   ```bash
   git add frontend/netlify.toml
   git commit -m "build: configure Netlify proxy redirects to Render API"
   git push origin main
   ```
4. Log in to [Netlify](https://netlify.com) using your GitHub account.
5. Click **Add new site** -> **Import an existing project**.
6. Select **GitHub** and authorize your repository `context-research-studio`.
7. Configure the Site Build settings:
   - **Branch to deploy**: `main`
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
8. Click **Deploy Site**.

Netlify will build your React code, configure SPA redirection, and link all `/api/*` endpoints to your Render server. Your platform is now live!
