# Smart Billing - Quick Start Guide

## ⚡ Get Running in 5 Minutes

### Step 1: Install MongoDB
Download from: https://www.mongodb.com/try/download/community

Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Step 2: Backend Setup (Terminal 1)

```powershell
cd "d:\abc\Smart Billig app\backend"
npm install
npm start
```

Expected output:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

### Step 3: Frontend Setup (Terminal 2)

```powershell
cd "d:\abc\Smart Billig app\frontend"
npm install
npm run dev
```

Expected output:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### Step 4: Open Browser

Go to: **http://localhost:3000**

---

## 🎯 Quick Test

1. Click "New Bill" button
2. Enter:
   - Customer: "Test Customer"
   - Product: "Web Design"
   - Qty: 1
   - Price: 500
   - Tax: 10%
3. Click "Create Bill"
4. View in Bills list
5. Print invoice

---

## 📱 Default Ports

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27017`

---

## 🔧 Troubleshooting

### Backend won't start
```powershell
# Kill port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Try again
npm start
```

### Frontend port in use
Edit `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change this
}
```

### MongoDB connection error
- Start MongoDB service: `mongod`
- Or update MONGODB_URI to your Atlas connection string in `.env`

---

## 📖 File Structure Explanation

**Backend**
- `server.js` - Main server file
- `models/Bill.js` - MongoDB schema
- `controllers/billController.js` - Business logic
- `routes/billRoutes.js` - API endpoints

**Frontend**
- `App.jsx` - Main routing
- `pages/` - Full page components
- `components/` - Reusable components
- `services/api.js` - API calls
- `utils/` - Helper functions

---

## 💻 Key Commands

```bash
# Backend
npm install          # Install dependencies
npm start           # Start server
npm run dev         # Start with auto-reload

# Frontend
npm install         # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

---

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Change this
    600: '#0284c7',
  }
}
```

### Change Database
Edit `.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smart-billing
```

### Change Port
Backend `.env`:
```
PORT=8000
```

Frontend `vite.config.js`:
```javascript
port: 3001
```

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running on 5000
- [ ] Frontend running on 3000
- [ ] Can access http://localhost:3000
- [ ] Can create a bill
- [ ] Can view bill list
- [ ] Can print invoice

---

**All done! Start billing! 🎉**
