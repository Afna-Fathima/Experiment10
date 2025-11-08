# 🎬 RENDER DEPLOYMENT - STEP-BY-STEP GUIDE WITH SCREENSHOTS

## Overview

Your PodStream app consists of:
- **Backend** (Node.js + Express + MongoDB)
- **Frontend** (React + Vite)

Both will be deployed to Render separately.

---

## STEP 1: Create Render Account

1. Go to **https://render.com**
2. Click **"Sign Up"**
3. Sign up with GitHub account (Afna-Fathima)
4. Authorize access to your repositories
5. Verify email

**Time: 5 minutes**

---

## STEP 2: Deploy Backend Service

### Create Web Service

```
Dashboard → New + → Web Service
```

### Connect Repository

```
Connect a repository → Search "Experiment10"
→ Select "Afna-Fathima/Experiment10"
→ Click "Connect"
```

### Configure Service

Fill in these fields:

| Field | Value |
|-------|-------|
| Name | `podcast-backend` |
| Environment | `Node` |
| Region | `Singapore` (or your region) |
| Branch | `main` |
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |

### Add Environment Variables

Scroll down to **"Environment"** section:

**Copy-paste these:**

```
MONGODB_URI = mongodb+srv://afnafathima:afrin@cluster0.n0friyv.mongodb.net/podcast_db?retryWrites=true&w=majority
JWT_SECRET = podcast_secret_jwt_12345_secure_key
ADMIN_SECRET = podcast_secret_admin_67890_key
NODE_ENV = production
PORT = 5000
```

⚠️ **Important:** Save these values for later!

### Deploy

```
Click "Create Web Service" → Wait for "live" status (5-10 minutes)
```

### Get Backend URL

Once deployed, you'll see:
```
podcast-backend-xxxxx.onrender.com
```

Save this URL! (Example: `https://podcast-backend-xyza1234.onrender.com`)

**Time: 10-15 minutes**

---

## STEP 3: Deploy Frontend Service

### Create Static Site

```
Dashboard → New + → Static Site
```

### Connect Repository

```
Connect a repository → Select "Afna-Fathima/Experiment10"
→ Click "Connect"
```

### Configure Service

Fill in these fields:

| Field | Value |
|-------|-------|
| Name | `podcast-frontend` |
| Region | `Singapore` |
| Branch | `main` |
| Root Directory | `client` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

### Add Environment Variable

```
VITE_API_URL = https://podcast-backend-xxxxx.onrender.com
```

**REPLACE xxxxx with your actual backend URL from Step 2!**

Example:
```
VITE_API_URL = https://podcast-backend-xyza1234.onrender.com
```

### Deploy

```
Click "Create Static Site" → Wait for deployment (3-5 minutes)
```

### Get Frontend URL

Once deployed, you'll see:
```
podcast-frontend-xxxxx.onrender.com
```

**Time: 8-12 minutes**

---

## STEP 4: Verify Everything Works

### Test Backend API

Open in browser or use curl:
```
https://podcast-backend-xxxxx.onrender.com/api/health
```

You should see:
```json
{
  "status": "Server is running",
  "timestamp": "2025-11-08T10:30:00.000Z"
}
```

### Test Frontend

Open in browser:
```
https://podcast-frontend-xxxxx.onrender.com
```

You should see:
- ✅ Homepage with podcasts
- ✅ Navigation bar
- ✅ Podcast cards loading
- ✅ No console errors

### Test Functionality

1. **Browse podcasts** → Should load from backend
2. **Go to Discover page** → Should display all 10 podcasts
3. **Try Login** → Should work without errors
4. **Try Subscribe** → Should work if logged in

---

## STEP 5: Monitor and Update

### View Logs

If something goes wrong:

```
Service Dashboard → Logs tab → Check errors
```

### Auto-Deployment

Every time you push to GitHub:

```
git add .
git commit -m "Your message"
git push origin main
```

Render automatically:
1. Detects the push
2. Rebuilds services
3. Deploys new version
4. No manual action needed!

### Update Backend URL (if needed)

If you change the backend URL:

1. Edit `client/.env.production`:
   ```
   VITE_API_URL=https://new-backend-url.onrender.com
   ```

2. Push to GitHub:
   ```
   git add .
   git commit -m "Update backend URL"
   git push origin main
   ```

3. Render redeploys frontend automatically

---

## Your Live Deployment

### Frontend
```
🌐 https://podcast-frontend-xxxxx.onrender.com
```

### Backend API
```
🔌 https://podcast-backend-xxxxx.onrender.com/api
```

### GitHub Repository
```
📚 https://github.com/Afna-Fathima/Experiment10
```

### Database
```
🗄️ MongoDB Cluster0 (podcast_db)
```

---

## Troubleshooting

### "Page not loading"
- Check browser console for errors (F12)
- Verify backend URL in environment variables
- Check Render logs for build errors

### "Can't fetch podcasts"
- Verify VITE_API_URL is correct
- Check backend is running (test health endpoint)
- Verify CORS settings

### "Build failed"
- Check build logs on Render dashboard
- Verify package.json exists
- Check for missing dependencies

### "MongoDB connection error"
- Verify MONGODB_URI is correct
- Check MongoDB Atlas whitelist
- Verify credentials

---

## Cost & Limits

### Free Tier
- ✅ 750 hours/month (sufficient for testing)
- ✅ Static sites always-on
- ⚠️ Web services sleep after 15 min inactivity
- ⚠️ Limited resources

### Paid Tier ($7+/month)
- ✅ Always-on web services
- ✅ Better performance
- ✅ More resources
- ✅ Priority support

**Recommendation:** Start with free tier, upgrade if needed

---

## Next Steps

1. ✅ Deploy backend
2. ✅ Deploy frontend
3. ✅ Verify everything works
4. ✅ Share URLs with others
5. ✅ Monitor and maintain

**Total deployment time: 30-45 minutes**

---

## Support Resources

- 📖 Render Docs: https://render.com/docs
- 🆘 Status Page: https://status.render.com
- 💬 Community: https://community.render.com
- 📧 Support: support@render.com

---

## Deployment Checklist

- [ ] Render account created
- [ ] Backend deployed (Web Service)
- [ ] Backend environment variables set
- [ ] Backend URL obtained
- [ ] Frontend deployed (Static Site)
- [ ] Frontend VITE_API_URL set to backend URL
- [ ] Frontend URL obtained
- [ ] Backend API tested (/api/health)
- [ ] Frontend loads in browser
- [ ] Podcasts display correctly
- [ ] Can log in / register
- [ ] Can subscribe to podcasts
- [ ] Changes auto-deploy when pushed to GitHub

---

**🎉 Your app is now live on the internet!**

Share your frontend URL with anyone to let them explore PodStream!
