# 🚀 Render Deployment Guide - PodStream

This guide will help you deploy your Spotify-style podcast platform to Render.

## Prerequisites

1. **GitHub Account** - ✅ Already done (Afna-Fathima/Experiment10)
2. **Render Account** - Sign up at https://render.com
3. **MongoDB Atlas** - ✅ Already configured (Cluster0.podcast_db)

---

## Step 1: Prepare GitHub Repository

Your repository is already pushed to GitHub at:
```
https://github.com/Afna-Fathima/Experiment10.git
```

The code is ready for deployment!

---

## Step 2: Deploy Backend to Render

### 2.1 Create New Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"**
4. Select **"Afna-Fathima/Experiment10"**
5. Click **"Connect"**

### 2.2 Configure Backend Service

**Service Settings:**
- **Name:** `podcast-backend` (or similar)
- **Environment:** `Node`
- **Region:** `Singapore` (or closest to you)
- **Branch:** `main`
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 2.3 Add Environment Variables

Click **"Advanced"** and add these variables:

```
MONGODB_URI=mongodb+srv://afnafathima:afrin@cluster0.n0friyv.mongodb.net/podcast_db?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_key_123456
ADMIN_SECRET=your_secure_admin_secret_789
NODE_ENV=production
PORT=5000
```

**Generate secure keys:**
- Run in terminal: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 2.4 Deploy

Click **"Create Web Service"** and wait for deployment (5-10 minutes).

**Your backend URL will be something like:**
```
https://podcast-backend-xxxx.onrender.com
```

---

## Step 3: Deploy Frontend to Render

### 3.1 Create Static Site on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Static Site"**
3. Click **"Connect a repository"**
4. Select **"Afna-Fathima/Experiment10"**

### 3.2 Configure Frontend Service

**Service Settings:**
- **Name:** `podcast-frontend` (or similar)
- **Environment:** `Node`
- **Branch:** `main`
- **Root Directory:** `client`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

### 3.3 Update API URLs (Important!)

Before deployment, create `.env.production` file in client:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

Or update this in your code:

**client/src/utils/api.js:**
```javascript
const API_URL = process.env.VITE_API_URL || 'https://your-backend-url.onrender.com';
```

### 3.4 Deploy

Click **"Create Static Site"** and wait for deployment.

**Your frontend URL will be something like:**
```
https://podcast-frontend-xxxx.onrender.com
```

---

## Step 4: Update CORS Settings (Backend)

Update your backend `server/index.js` to allow Render frontend:

```javascript
const corsOptions = {
  origin: [
    'https://podcast-frontend-xxxx.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

Then commit and push:
```bash
git add .
git commit -m "Update CORS for Render deployment"
git push
```

---

## Step 5: Monitor & Troubleshoot

### View Logs
1. Go to your service on Render dashboard
2. Click on **"Logs"** tab
3. Check for any errors

### Common Issues & Fixes

**Issue: Backend won't start**
- Check environment variables are set correctly
- Verify MongoDB URI is accessible
- Check Node version compatibility

**Issue: Frontend can't connect to backend**
- Verify backend URL in `.env.production`
- Check CORS settings on backend
- Ensure backend is running

**Issue: Deployment fails**
- Check Build Command logs
- Verify package.json exists in root directories
- Ensure all dependencies are in package.json

---

## Step 6: Auto-Deployment Setup

Render automatically deploys when you push to GitHub:

1. Push code to GitHub main branch
2. Render detects the push
3. Services rebuild automatically
4. New version goes live

---

## Testing Your Live Site

Once deployed, test these endpoints:

**Backend:**
```
GET https://your-backend.onrender.com/api/podcasts
```

**Frontend:**
```
https://your-frontend.onrender.com
```

---

## Optional: Custom Domain

To use a custom domain:

1. Go to your Render service
2. Click **"Settings"**
3. Scroll to **"Custom Domains"**
4. Add your domain
5. Update DNS records at your registrar

---

## Important Notes

⚠️ **Free Tier Limitations:**
- Services spin down after 15 minutes of inactivity
- CPU/Memory limits apply
- 750 hours/month included

✅ **Solutions:**
- Upgrade to Paid plan for always-on services
- Use health checks to keep services warm

---

## Quick Reference

**Backend URL:** `https://podcast-backend-xxxx.onrender.com`
**Frontend URL:** `https://podcast-frontend-xxxx.onrender.com`
**GitHub:** `https://github.com/Afna-Fathima/Experiment10`
**MongoDB:** `Cluster0.podcast_db (AWS Mumbai)`

---

## Support

If you encounter issues:
1. Check Render documentation: https://render.com/docs
2. View service logs on Render dashboard
3. Verify environment variables
4. Test locally first before deploying

Happy hosting! 🎵
