# 🚀 RENDER FRONTEND DEPLOYMENT - AS WEB SERVICE

## ✅ THE FIX

Deploy frontend as a **Web Service** (not Static Site)

This solves the `vite: Permission denied` error!

---

## 📋 DEPLOYMENT STEPS

### Step 1: Delete Old Frontend Static Site (Optional)

If you already tried deploying as Static Site:
1. Go to Render dashboard
2. Click on your frontend service
3. Go to Settings → Danger Zone
4. Click "Delete Service"

---

### Step 2: Create New Frontend Web Service

**On Render Dashboard:**

1. Click **"New +"** → **"Web Service"**
2. Connect repository: **"Afna-Fathima/Experiment10"**
3. Click **"Connect"**

---

### Step 3: Configure Frontend Web Service

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `podcast-frontend` |
| **Environment** | `Node` |
| **Region** | `Singapore` |
| **Branch** | `main` |
| **Root Directory** | `client` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

---

### Step 4: Add Environment Variables

Click **"Advanced"** and add:

```
VITE_API_URL=https://podcast-backend-xxxxx.onrender.com
```

(Replace xxxxx with your actual backend URL)

---

### Step 5: Deploy

Click **"Create Web Service"** and wait for deployment

---

## 🎯 WHAT CHANGED

### Frontend now works like a Web Service:

```
1. npm install
   ↓
2. npm run build (builds with Vite → creates dist/ folder)
   ↓
3. npm start (runs Express server from dist/)
   ↓
4. Serves files at https://podcast-frontend-xxxxx.onrender.com
```

### Files Added/Modified:

✅ `client/server.js` - Express server to serve built files
✅ `client/package.json` - Updated with:
   - `vite` moved to dependencies (not devDependencies)
   - `express` added to dependencies
   - `npm start` script added

---

## 🔗 YOUR DEPLOYMENT ARCHITECTURE

```
┌──────────────────────────────────────────────┐
│         User Browser                          │
│  https://podcast-frontend-xxxxx.onrender.com │
└────────────────────┬─────────────────────────┘
                     │
        ┌────────────▼────────────┐
        │    Render Web Service   │
        │  (Node.js + Express)    │
        │                         │
        │  1. Serves index.html   │
        │  2. Routes all requests │
        │  3. Calls backend API   │
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │ Backend API             │
        │ (podcast-backend-xxxxx) │
        │        ↓                │
        │   MongoDB Atlas         │
        └─────────────────────────┘
```

---

## ✨ WHY THIS WORKS

### Static Site Issues:
- ❌ Doesn't have npm installed by default
- ❌ Can't run `npm run build` properly
- ❌ No permissions to execute Vite

### Web Service Solution:
- ✅ Full npm support
- ✅ Can run build scripts
- ✅ Has proper execution permissions
- ✅ Can serve built files with Express

---

## 📝 WHAT HAPPENS DURING DEPLOYMENT

```
==> Cloning from GitHub
==> Checking out main branch
==> Installing dependencies (npm install)
    - Installs Vite from dependencies
    - Installs Express
    - Installs all other packages
==> Running build command (npm install)
==> Running start command (npm start)
    1. npm run build (Vite builds to dist/)
    2. node server.js (Express starts serving)
==> Service goes LIVE ✅
```

---

## 🧪 TESTING AFTER DEPLOYMENT

### Check Frontend is Running
```
https://podcast-frontend-xxxxx.onrender.com
```

You should see:
- ✅ Homepage loads
- ✅ Podcasts display
- ✅ Navigation works
- ✅ No console errors

### Check API Connection
Open DevTools (F12) → Console

Should see podcast data loading from:
```
https://podcast-backend-xxxxx.onrender.com/api/podcasts
```

---

## 🐛 TROUBLESHOOTING

### Still getting "vite: Permission denied"?

**Solution:** 
1. Make sure you deployed as **Web Service** (not Static Site)
2. Make sure `root directory` is set to `client`
3. Check that latest code is pushed to GitHub

### Frontend loads but no podcasts show?

**Solution:**
1. Check `VITE_API_URL` environment variable is correct
2. Verify backend is running
3. Check browser console for API errors

### Build still fails?

**Solution:**
1. Try redeploying from Render dashboard
2. Check that package.json has both vite and express in dependencies
3. View full logs on Render → Logs tab

---

## 🔄 AUTO-DEPLOYMENT

Every time you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render automatically:
1. Detects the push
2. Rebuilds with `npm install`
3. Builds frontend with `npm run build`
4. Starts new server with `npm start`
5. Zero downtime deployment! 🚀

---

## 📊 CURRENT STATUS

| Component | Type | Status |
|-----------|------|--------|
| Backend | Web Service | ✅ Running |
| Frontend | Web Service | 🔄 Deploying |
| Database | MongoDB Atlas | ✅ Connected |
| GitHub | Repository | ✅ Updated |

---

## 🎉 DONE!

Your frontend is now deployed as a Web Service and should be live soon!

Monitor deployment:
1. Go to Render dashboard
2. Click "podcast-frontend" service
3. Wait for "live" status
4. Click service URL to view

**Expected time: 5-10 minutes**

---

## 📚 FILES CREATED/MODIFIED

- ✅ `client/server.js` - NEW (Express server)
- ✅ `client/package.json` - MODIFIED (vite to dependencies, added express, updated start script)
- ✅ Code pushed to GitHub

---

## 💡 KEY INSIGHT

**Web Services** can do everything Static Sites can do (serve files) PLUS more (run scripts, build, handle routes).

So for React/Vite apps on Render, always use **Web Service**! 🎯

---

Contact: afnafathima@karunya.edu.in
GitHub: https://github.com/Afna-Fathima/Experiment10
