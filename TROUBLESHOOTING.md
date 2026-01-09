# Deployment & Troubleshooting Guide

## 🚀 Deployment

### Deploying Backend

#### Option 1: Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

2. Login to Heroku:
```bash
heroku login
```

3. In backend folder:
```bash
heroku create your-app-name
git push heroku main
```

4. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

5. Verify deployment:
```bash
heroku logs --tail
heroku open
```

#### Option 2: Railway.app

1. Go to https://railway.app
2. Connect GitHub repo
3. Add MongoDB plugin
4. Deploy

#### Option 3: Self-hosted (AWS/DigitalOcean)

1. Get a VPS
2. Install Node.js and MongoDB
3. Clone repository
4. Set up environment variables
5. Use PM2 or systemd for process management

---

### Deploying Frontend

#### Option 1: Vercel

1. Go to https://vercel.com
2. Connect your GitHub repo
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Update API endpoint in `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-backend.vercel.app/api';
```

6. Deploy

#### Option 2: Netlify

1. Go to https://netlify.com
2. Connect GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy

#### Option 3: GitHub Pages

1. Build: `npm run build`
2. Deploy `dist` folder to GitHub Pages
3. Update API endpoint for production

---

## 🐛 Troubleshooting

### Backend Issues

#### Problem: Server won't start
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID [PID_NUMBER] /F

# Try again
npm start
```

---

#### Problem: MongoDB connection error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- **Windows**: Start MongoDB service
  ```powershell
  net start MongoDB
  ```
- **Mac**: Start MongoDB
  ```bash
  brew services start mongodb-community
  ```
- **Linux**: Start MongoDB
  ```bash
  sudo systemctl start mongod
  ```
- **Using MongoDB Atlas**: Update connection string in `.env`

---

#### Problem: CORS errors
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
In `backend/server.js`, update CORS:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',  // Add your frontend URL
  credentials: true
}));
```

---

#### Problem: 404 routes not working
**Solution:**
Add fallback route in Express:
```javascript
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
```

---

### Frontend Issues

#### Problem: Blank page / nothing loads
**Solution:**
1. Check browser console (F12)
2. Check network tab for API errors
3. Verify API_BASE_URL in `src/services/api.js`
4. Check if backend is running

---

#### Problem: Port 3000 already in use
**Solution:**
```javascript
// In vite.config.js
export default defineConfig({
  server: {
    port: 3001,  // Change to different port
  },
})
```

---

#### Problem: Tailwind styles not loading
**Solution:**
1. Clear node_modules: `rm -r node_modules && npm install`
2. Rebuild CSS
3. Check `tailwind.config.js` paths are correct
4. Restart dev server

---

#### Problem: Components not updating after API call
**Solution:**
Ensure you're using state updates:
```javascript
const [bills, setBills] = React.useState([]);

const fetchBills = async () => {
  const response = await api.bills.getAll();
  setBills(response.data);  // This triggers re-render
};
```

---

#### Problem: Images/assets not loading
**Solution:**
Place assets in `frontend/public/` folder:
```
frontend/
├── public/
│   ├── logo.svg
│   └── icon.png
└── src/
```

Reference in code:
```jsx
<img src="/logo.svg" alt="Logo" />
```

---

### Database Issues

#### Problem: Duplicate bill numbers
**Solution:**
The bill number uses timestamp and count, should be unique. If issue persists:
```javascript
// In billSchema.pre('save'):
billSchema.pre('save', async function (next) {
  if (!this.billNumber) {
    const count = await mongoose.model('Bill').countDocuments();
    this.billNumber = `BILL-${Date.now()}-${Math.random()}-${count}`;
  }
  next();
});
```

---

#### Problem: Data not saving to database
**Solution:**
1. Check MongoDB connection
2. Verify `.env` MONGODB_URI
3. Check data validation in schema
4. Monitor MongoDB logs

---

#### Problem: Can't query bills
**Solution:**
Ensure bill collection exists:
```bash
# In MongoDB CLI
db.bills.find()
```

---

### API Integration Issues

#### Problem: API calls timeout
**Solution:**
Increase timeout in `src/services/api.js`:
```javascript
const response = await fetch(`${API_BASE_URL}/bills`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  signal: AbortSignal.timeout(10000)  // 10 second timeout
});
```

---

#### Problem: 400 Bad Request
**Solution:**
Check request body:
```javascript
// Log request before sending
console.log('Sending:', billData);

const response = await api.bills.create(billData);
```

---

#### Problem: 500 Server Error
**Solution:**
1. Check backend logs: `npm run dev`
2. Look for validation errors
3. Check database connection
4. Review error message in API response

---

### Performance Issues

#### Slow database queries
**Solution:**
Add indexes in MongoDB:
```javascript
// In Bill.js model
billSchema.index({ createdAt: -1 });
billSchema.index({ billNumber: 1 });
billSchema.index({ customerName: 'text' });
```

---

#### Large list performance
**Solution:**
Implement pagination:
```javascript
// Backend
router.get('/bills', async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  
  const bills = await Bill.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
});
```

---

## 📋 Pre-deployment Checklist

- [ ] All environment variables set
- [ ] MongoDB connection tested
- [ ] API endpoints tested in Postman
- [ ] Frontend builds successfully
- [ ] No console errors
- [ ] Mobile responsive tested
- [ ] Print invoice works
- [ ] Database backups created
- [ ] API error handling complete
- [ ] Loading states working
- [ ] Toast notifications working
- [ ] Form validation working
- [ ] Delete confirmations working
- [ ] Dates formatting correctly
- [ ] Currency formatting correct

---

## 🔐 Security Checklist

- [ ] JWT_SECRET changed in production
- [ ] CORS configured properly
- [ ] Input validation on backend
- [ ] No sensitive data in frontend
- [ ] Environment variables in .env (not committed)
- [ ] Database backup schedule
- [ ] HTTPS enabled in production
- [ ] Rate limiting configured
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS protection (React escapes by default)

---

## 📊 Monitoring

### Backend Monitoring
```javascript
// Add to server.js
import http from 'http';

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`Memory: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
});
```

### Database Monitoring
```javascript
// Check MongoDB stats
db.stats()
db.bills.stats()
```

---

## 🔄 Continuous Integration (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - run: npm test
```

---

## 📞 Getting Help

1. Check console (F12 → Console tab)
2. Check network tab for API errors
3. Read error messages carefully
4. Check MongoDB logs
5. Look at backend server logs
6. Try clearing browser cache
7. Try fresh npm install
8. Check GitHub issues for similar problems

---

## 🎯 Next Steps

After successful deployment:

1. Set up monitoring and logging
2. Configure automated backups
3. Set up CI/CD pipeline
4. Add user authentication
5. Implement advanced features
6. Scale database
7. Add email notifications
8. Integrate payment gateway

---

**Everything not working? Check the logs! 🔍**
