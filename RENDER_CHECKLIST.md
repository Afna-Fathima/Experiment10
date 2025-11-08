# 📋 RENDER DEPLOYMENT CHECKLIST

## Pre-Deployment

- [x] Code pushed to GitHub (Afna-Fathima/Experiment10)
- [x] MongoDB Atlas configured (Cluster0.podcast_db)
- [x] Backend API tested locally
- [x] Frontend UI tested locally
- [x] Environment variables created
- [x] CORS configured
- [x] API endpoint environment-aware

## Backend Deployment (Podcast-Backend)

**Render Service Type:** Web Service
**Repository:** Afna-Fathima/Experiment10
**Root Directory:** `server`

### Build & Start Configuration
- Build Command: `npm install`
- Start Command: `npm start`
- Environment: Node
- Region: Singapore (or closest to you)

### Environment Variables
```
✓ MONGODB_URI = mongodb+srv://afnafathima:afrin@cluster0.n0friyv.mongodb.net/podcast_db?retryWrites=true&w=majority
✓ JWT_SECRET = [Your secure secret key]
✓ ADMIN_SECRET = [Your secure secret key]
✓ NODE_ENV = production
✓ PORT = 5000
✓ FRONTEND_URL = https://podcast-frontend-xxxxx.onrender.com (optional)
```

### Deployment Steps
1. [ ] Click "New +" → "Web Service"
2. [ ] Connect "Afna-Fathima/Experiment10" repository
3. [ ] Set Root Directory to "server"
4. [ ] Set Build Command: `npm install`
5. [ ] Set Start Command: `npm start`
6. [ ] Add all environment variables above
7. [ ] Click "Create Web Service"
8. [ ] Wait for "live" status
9. [ ] Copy Backend URL: `https://podcast-backend-xxxxx.onrender.com`

### Post-Deployment Verification
- [ ] Backend health check: `GET /api/health`
- [ ] Can fetch podcasts: `GET /api/podcasts`
- [ ] MongoDB connection works
- [ ] Check logs for errors
- [ ] Test auth endpoints

**Backend URL:** `https://podcast-backend-xxxxx.onrender.com`

---

## Frontend Deployment (Podcast-Frontend)

**Render Service Type:** Static Site
**Repository:** Afna-Fathima/Experiment10
**Root Directory:** `client`

### Build & Publish Configuration
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

### Environment Variables
```
✓ VITE_API_URL = https://podcast-backend-xxxxx.onrender.com
```
(Use the backend URL from above)

### Deployment Steps
1. [ ] Click "New +" → "Static Site"
2. [ ] Connect "Afna-Fathima/Experiment10" repository
3. [ ] Set Root Directory to "client"
4. [ ] Set Build Command: `npm install && npm run build`
5. [ ] Set Publish Directory: `dist`
6. [ ] Add environment variable: `VITE_API_URL`
7. [ ] Click "Create Static Site"
8. [ ] Wait for deployment
9. [ ] Copy Frontend URL: `https://podcast-frontend-xxxxx.onrender.com`

### Post-Deployment Verification
- [ ] Frontend loads without errors
- [ ] Homepage displays podcasts
- [ ] Login page works
- [ ] Can navigate between pages
- [ ] API calls reach backend successfully

**Frontend URL:** `https://podcast-frontend-xxxxx.onrender.com`

---

## Configuration Files Updated

### ✓ Files Modified for Deployment
- `server/index.js` - Updated CORS for Render domains
- `client/src/utils/api.js` - Using environment variables
- `client/.env.production` - Added VITE_API_URL
- `server/.env.example` - Created template

### ✓ Files Committed to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

## Testing After Deployment

### Backend Tests
```bash
# Test health endpoint
curl https://podcast-backend-xxxxx.onrender.com/api/health

# Test podcasts endpoint
curl https://podcast-backend-xxxxx.onrender.com/api/podcasts
```

### Frontend Tests
1. [ ] Open frontend URL in browser
2. [ ] Check console for errors
3. [ ] Browse podcasts
4. [ ] Test login/register
5. [ ] Test subscribe functionality
6. [ ] Verify images load
7. [ ] Test navigation

---

## Common Issues & Solutions

### Issue: "Cannot GET /api/podcasts"
**Solution:** 
- Verify backend is deployed and running
- Check VITE_API_URL in frontend
- Verify MONGODB_URI in backend

### Issue: "CORS error"
**Solution:**
- Frontend URL must be in backend CORS whitelist
- Update `FRONTEND_URL` env var in backend
- Redeploy backend after updating

### Issue: "Build failed"
**Solution:**
- Check package.json exists
- Verify build command syntax
- Check logs for dependency errors

### Issue: "MongoDB connection failed"
**Solution:**
- Verify MONGODB_URI in environment variables
- Check MongoDB Atlas whitelist allows Render IPs
- Test connection string locally

### Issue: "Services keep spinning down"
**Solution:**
- Free tier services sleep after 15 min inactivity
- Upgrade to Paid tier for always-on
- Or implement health checks

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connections stable
- [ ] Check Render logs for errors

### Weekly Maintenance
- [ ] Review error logs
- [ ] Update dependencies if needed
- [ ] Monitor performance metrics

### Monthly Tasks
- [ ] Check MongoDB usage
- [ ] Review Render billing
- [ ] Plan for scaling if needed

---

## Auto-Deployment Configuration

Once deployed, Render automatically updates when you push to GitHub:

1. Commit changes locally
2. Push to `main` branch
3. Render detects the push
4. Services rebuild automatically
5. New version goes live

**Example:**
```bash
git add .
git commit -m "Update podcast styling"
git push origin main
# → Render auto-deploys both services!
```

---

## Deployment Summary

| Component | Status | URL |
|-----------|--------|-----|
| GitHub Repo | ✅ | https://github.com/Afna-Fathima/Experiment10 |
| Backend | 🔄 | https://podcast-backend-xxxxx.onrender.com |
| Frontend | 🔄 | https://podcast-frontend-xxxxx.onrender.com |
| MongoDB | ✅ | Cluster0.podcast_db |
| Domain | ⏳ | (Optional custom domain) |

---

## Need Help?

📖 Render Documentation: https://render.com/docs
💬 Render Community: https://community.render.com
📧 Support: support@render.com

---

**Deployment Date:** November 8, 2025
**Deployed By:** Afna-Fathima
**Email:** afnafathima@karunya.edu.in
