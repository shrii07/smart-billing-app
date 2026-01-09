# Smart Billing - Complete Setup Instructions

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Guide](#installation-guide)
3. [Running the Application](#running-the-application)
4. [Configuration](#configuration)
5. [Verification](#verification)
6. [First Steps](#first-steps)

---

## ⚙️ System Requirements

### Minimum Requirements
- Windows 10 / macOS 10.14 / Ubuntu 18.04+
- 4GB RAM
- 500MB disk space
- Internet connection

### Required Software
- **Node.js 14+** - Download from https://nodejs.org
- **npm or yarn** - Included with Node.js
- **MongoDB** - https://www.mongodb.com/try/download/community

### Optional
- **Visual Studio Code** - Code editor
- **Postman** - API testing
- **MongoDB Compass** - Database GUI

---

## 🚀 Installation Guide

### Step 1: Verify Node.js Installation

Open PowerShell or Command Prompt and run:

```powershell
node --version
npm --version
```

Expected output:
```
v16.13.0 (or higher)
8.1.0 (or higher)
```

If not installed, download from https://nodejs.org

### Step 2: Install MongoDB

#### Option A: Local Installation (Windows)
1. Download from https://www.mongodb.com/try/download/community
2. Run installer (accept defaults)
3. MongoDB will start automatically

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (Free Tier)
4. Get connection string
5. Update in backend `.env`

#### Verify MongoDB
```powershell
# Windows
mongod --version

# Then in another PowerShell window
mongo --version
```

### Step 3: Backend Setup

Navigate to backend folder:
```powershell
cd "d:\abc\Smart Billig app\backend"
```

Install dependencies:
```powershell
npm install
```

This installs:
- express (web server)
- mongoose (database)
- cors (cross-origin)
- dotenv (environment)

Time: ~2-3 minutes

Verify installation:
```powershell
npm list
```

You should see all packages listed without errors.

### Step 4: Frontend Setup

Navigate to frontend folder:
```powershell
cd "d:\abc\Smart Billig app\frontend"
```

Install dependencies:
```powershell
npm install
```

This installs:
- react & react-dom
- react-router-dom (routing)
- tailwindcss (styling)
- react-hot-toast (notifications)
- react-icons (icons)

Time: ~2-3 minutes

Verify installation:
```powershell
npm list
```

---

## ▶️ Running the Application

### Method 1: Two Terminal Windows (Recommended)

**Terminal 1 - Backend:**
```powershell
cd "d:\abc\Smart Billig app\backend"
npm start
```

Expected output:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

**Terminal 2 - Frontend:**
```powershell
cd "d:\abc\Smart Billig app\frontend"
npm run dev
```

Expected output:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### Method 2: Using npm-run-all (Single Terminal)

Install globally:
```powershell
npm install -g npm-run-all
```

In root folder, create `package.json`:
```json
{
  "scripts": {
    "dev": "npm-run-all --parallel dev:backend dev:frontend",
    "dev:backend": "cd backend && npm start",
    "dev:frontend": "cd frontend && npm run dev"
  }
}
```

Then run:
```powershell
npm run dev
```

---

## ⚙️ Configuration

### Backend Environment Variables

File: `backend/.env`

```env
# Server Port
PORT=5000

# Database Connection
MONGODB_URI=mongodb://localhost:27017/smart-billing

# Environment
NODE_ENV=development

# JWT Secret (change this!)
JWT_SECRET=your_super_secret_key_change_this_in_production
```

### MongoDB Atlas Connection String

If using MongoDB Atlas:

1. Get connection string from Atlas:
   - Click "Connect" → "Connect your application"
   - Copy connection string

2. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart-billing?retryWrites=true&w=majority
```

### Frontend API Endpoint

File: `frontend/src/services/api.js`

For local development (already configured):
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

For production:
```javascript
const API_BASE_URL = 'https://your-backend.herokuapp.com/api';
```

---

## ✅ Verification

### Backend Health Check

Go to: http://localhost:5000/api/health

Expected response:
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-09T..."
}
```

### Root API

Go to: http://localhost:5000/

Expected response:
```json
{
  "message": "Smart Billing API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "bills": "/api/bills"
  }
}
```

### Frontend Loading

Go to: http://localhost:3000/

You should see:
- Smart Billing navbar
- Dashboard with statistics
- "New Bill" button

---

## 🎯 First Steps

### 1. Create Your First Bill

1. Click "New Bill" button
2. Fill in details:
   ```
   Customer Name: John Doe
   Product: Web Design
   Quantity: 1
   Price: 500
   Tax: 10%
   ```
3. Click "Create Bill"

### 2. View Bills

1. Click "Bills" in navbar
2. See your created bill in the list
3. Click view icon to see details

### 3. Print Invoice

1. From Bills list, click print icon
2. In detail view, click "Print" button
3. Browser print dialog appears
4. Click "Print" or "Save as PDF"

### 4. Delete Bill (Optional)

1. From Bills list, click delete icon
2. Confirm in dialog
3. Bill is removed

---

## 📊 Test Data

Use this sample data to test:

```json
{
  "customerName": "ABC Corporation",
  "items": [
    {
      "productName": "Consulting Services",
      "quantity": 5,
      "price": 200
    },
    {
      "productName": "Software License",
      "quantity": 2,
      "price": 1500
    }
  ],
  "taxPercentage": 18,
  "notes": "Payment due within 30 days"
}
```

---

## 🔧 Useful Commands

### Backend
```powershell
# Start server
npm start

# Start with auto-reload
npm run dev

# Install specific package
npm install package-name
```

### Frontend
```powershell
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database
```bash
# Start MongoDB (Windows Service)
net start MongoDB

# Start MongoDB (Command)
mongod

# Connect to MongoDB
mongo

# Show databases
show databases

# Use smart-billing database
use smart-billing

# Show collections
show collections

# View bills
db.bills.find()

# Count bills
db.bills.countDocuments()

# Delete all bills
db.bills.deleteMany({})
```

---

## 🆘 Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env or kill process on that port |
| Port 3000 in use | Change port in vite.config.js |
| MongoDB won't connect | Start MongoDB service: `net start MongoDB` |
| API returns 404 | Ensure backend is running and check endpoint URL |
| Styles not loading | Clear cache: Ctrl+Shift+Delete, then F5 |
| Blank page | Check browser console (F12) for errors |
| Can't create bill | Fill all required fields, check backend logs |

---

## 📚 Project File Structure

```
Smart Billig app/
├── backend/
│   ├── models/Bill.js           # Database schema
│   ├── controllers/             # Business logic
│   ├── routes/                  # API endpoints
│   ├── server.js                # Main server
│   ├── package.json             # Dependencies
│   ├── .env                     # Configuration
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Full pages
│   │   ├── services/api.js      # API calls
│   │   ├── utils/               # Helpers
│   │   ├── App.jsx              # Main app
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── README.md                    # Project overview
├── QUICKSTART.md               # Quick setup
├── FEATURES.md                 # Feature docs
├── TROUBLESHOOTING.md          # Troubleshooting
└── SETUP.md                    # This file
```

---

## 🔐 Production Checklist

Before deploying to production:

- [ ] Change JWT_SECRET in .env
- [ ] Use MongoDB Atlas (not local)
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Remove console.logs (for security)
- [ ] Update API endpoints
- [ ] Test all features
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Update CORS origins
- [ ] Add error tracking (Sentry)
- [ ] Performance test
- [ ] Security audit
- [ ] Load testing
- [ ] Create documentation

---

## 📞 Support Resources

- **Node.js Docs**: https://nodejs.org/en/docs/
- **Express Docs**: https://expressjs.com/
- **MongoDB Docs**: https://docs.mongodb.com/
- **React Docs**: https://react.dev/
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Vite Docs**: https://vitejs.dev/

---

## ✨ You're All Set!

Your Smart Billing application is ready to use. 

**Next Steps:**
1. Create a bill
2. View it in the list
3. Print the invoice
4. Explore all features
5. Customize as needed

**Questions?** Check the troubleshooting guide or review the feature documentation.

**Happy Billing! 🎉**

---

*Last Updated: January 2024*
*Version: 1.0.0*
