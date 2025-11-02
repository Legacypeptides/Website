# Hostinger Deployment Guide

## ✅ Your Project is Ready for Deployment

Your Supabase database connection is properly configured and your build is working correctly.

## 📋 Deployment Steps for Hostinger

### 1. **Push Your Code to GitHub**
Your code is already in GitHub. When you click "Publish" in Bolt, it automatically commits and pushes all changes.

### 2. **Configure Hostinger Environment Variables**

In your Hostinger control panel, you need to set these environment variables:

```
VITE_SUPABASE_URL=https://lxqkwfdlxsffcnlibkcn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4cWt3ZmRseHNmZmNubGlia2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NTA2MDksImV4cCI6MjA3NTAyNjYwOX0.RO-Ktsd-O4vz1KG6NF07xPtY6z_1RltSdbzjkcAQpB4
```

**How to set environment variables in Hostinger:**
1. Log into your Hostinger panel
2. Go to your website settings
3. Find "Environment Variables" or "Build Configuration"
4. Add both variables above
5. Save the configuration

### 3. **Build Configuration**

Hostinger should automatically detect your project as a Vite app. Verify these settings:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node Version:** 18+ (recommended)

### 4. **Deploy**

Once the environment variables are set and the build configuration is correct:
1. Trigger a deployment in Hostinger (usually automatic on git push)
2. Wait for the build to complete
3. Your site will be live!

## 🔄 How Updates Work

### When you make changes in Bolt:

1. **Product Changes** (via Admin Panel):
   - Changes save directly to Supabase
   - **No redeployment needed** ✨
   - Live site updates instantly

2. **Code Changes** (styling, features, etc.):
   - Click "Publish" in Bolt → pushes to GitHub
   - Hostinger auto-deploys the new version
   - Takes ~2-5 minutes to go live

## 🗄️ Database Access

Your Supabase database is accessible from:
- ✅ Local development (Bolt)
- ✅ Production site (Hostinger)
- ✅ Admin panel (anywhere)

All environments share the same database, so:
- Orders placed on the live site appear in your admin panel
- Products added in admin panel show on the live site immediately
- Inventory updates in real-time

## 🔒 Security Notes

- The `VITE_SUPABASE_ANON_KEY` is safe to expose (it's client-side)
- Row Level Security (RLS) policies protect your data
- Admin access is controlled by Supabase authentication
- Never commit sensitive keys to GitHub (`.env` is already in `.gitignore`)

## 🧪 Testing Your Deployment

After deployment, verify:
1. ✅ Homepage loads correctly
2. ✅ Products display from database
3. ✅ Shopping cart works
4. ✅ Checkout process completes
5. ✅ Admin panel is accessible
6. ✅ All images load correctly

## 📞 Troubleshooting

### Products not showing?
- Check environment variables are set correctly in Hostinger
- Verify Supabase database has products in the `products` table
- Check browser console for API errors

### Build failing?
- Ensure Node version is 18+
- Verify `npm install` completes successfully
- Check build logs in Hostinger dashboard

### Images not loading?
- All images are in the `public/` folder and will be included in the build
- No additional configuration needed

## ✅ What's Already Configured

Your project already has:
- ✅ Supabase client setup (`src/lib/supabase.ts`)
- ✅ Environment variable validation
- ✅ Production build configuration
- ✅ All product images in `public/` folder
- ✅ Database migrations applied
- ✅ RLS policies configured
- ✅ Admin authentication system
- ✅ Order tracking and management

You're ready to deploy! 🚀
