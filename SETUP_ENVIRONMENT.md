# 🔧 Environment Setup Guide - SEA Catering App

## 📋 Prerequisites

Sebelum testing end-to-end, pastikan environment kamu sudah ready:

### 1. Create `.env.local` File

Copy kode di bawah ini dan buat file `.env.local` di root project:

```env
# 🔧 SEA Catering Environment Variables
# Development configuration

# Database Configuration (Required)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres"

# NextAuth Configuration (Required) 
NEXTAUTH_SECRET="sea-catering-super-secret-key-for-jwt-tokens-make-this-long-and-random-2024"
NEXTAUTH_URL="http://localhost:3002"

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## 🗄️ Database Setup Options

### Option 1: Supabase (Recommended - Free & Easy)

1. **Create Supabase Account**:
   - Go to https://supabase.com
   - Sign up for free account
   - Create new project

2. **Get Database URL**:
   - Go to Project Settings → Database
   - Copy Connection String
   - Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

3. **Update .env.local**:
   - Replace `YOUR_PASSWORD` with your project password
   - Replace `YOUR_PROJECT` with your project reference

### Option 2: Local PostgreSQL

1. **Install PostgreSQL**:
   - Download from https://www.postgresql.org/download/
   - Create database: `sea_catering`

2. **Update .env.local**:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sea_catering"
   ```

---

## 🚀 Initialize Database

Once database is connected, run these commands:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database  
npm run db:push

# Seed sample data (optional)
npm run db:seed
```

---

## 🔐 Admin Account Setup

The app includes an admin setup endpoint:

```bash
# Create admin account via API
curl -X POST http://localhost:3002/api/admin/setup
```

Or login with pre-seeded admin:
- **Email**: `admin@seacatering.com`
- **Password**: `admin123!`

---

## 🧪 Test Environment

Run environment checker:

```bash
node check-environment.js
```

This will verify:
- ✅ Package dependencies
- ✅ Prisma schema
- ✅ Environment variables
- ✅ Required files
- ✅ API routes
- ✅ Port availability

---

## 🎯 Test Execution Workflow

1. **Check Environment**:
   ```bash
   node check-environment.js
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   - Navigate to http://localhost:3002
   - Open DevTools → Console

4. **Load Test Script**:
   ```javascript
   // Copy contents of test-setup.js to browser console
   // Then run:
   automatedTests.runAll()
   manualTestGuide.all()
   ```

5. **Execute Test Cases**:
   - Follow `END_TO_END_TEST_CASES.md`
   - Check off completed tests
   - Document any issues

---

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test database connection
curl http://localhost:3002/api/test-db
```

Expected response:
```json
{
  "success": true,
  "message": "Database connection successful"
}
```

### Common Issues:

1. **Port 3000 in use**:
   - App configured for port 3002
   - Check with: `netstat -an | findstr :3002`

2. **Prisma client not generated**:
   ```bash
   npx prisma generate
   ```

3. **Database schema out of sync**:
   ```bash
   npx prisma db push
   ```

4. **Missing dependencies**:
   ```bash
   npm install
   ```

---

## 📊 Test Completion Checklist

- [ ] Environment checker passes all tests
- [ ] Database connection successful
- [ ] Admin account accessible
- [ ] Level 1 tests: Homepage content ✅
- [ ] Level 2 tests: Interactive features ✅
- [ ] Level 3 tests: Subscription system ✅
- [ ] Level 4 tests: Authentication & security ✅
- [ ] Level 5 tests: Dashboard functionality ✅
- [ ] Bonus tests: UI/UX quality ✅
- [ ] Production deployment ready 🚀

---

## 🎉 Ready for Submission!

Setelah semua test cases passed, app kamu ready untuk:
- COMPFEST submission
- Production deployment
- Portfolio showcase

**Total Expected Score**: 100/100 pts + 25 bonus pts = 125 pts 🏆

Good luck, bro! 🔥 