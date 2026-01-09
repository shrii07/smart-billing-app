# Smart Billing - Invoice Management Web App

A modern, fully-featured billing and invoice management system built with React, Node.js, Express, and MongoDB.

## 🌟 Features

- ✅ Create, view, edit, and delete bills/invoices
- ✅ Automatic calculation of subtotal, tax, and grand total
- ✅ Professional invoice printing with print-friendly layout
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Real-time statistics and dashboard
- ✅ Beautiful card-based design with soft shadows
- ✅ Toast notifications for user feedback
- ✅ Form validation and error handling
- ✅ Mobile-friendly responsive design

## 📋 Project Structure

```
Smart Billig app/
├── backend/
│   ├── models/
│   │   └── Bill.js
│   ├── controllers/
│   │   └── billController.js
│   ├── routes/
│   │   └── billRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── BillForm.jsx
    │   │   └── BillTable.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── CreateBillPage.jsx
    │   │   ├── BillsListPage.jsx
    │   │   ├── BillDetailPage.jsx
    │   │   └── PrintBillPage.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   ├── formatters.js
    │   │   └── context.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── index.html
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (installed locally or MongoDB Atlas account)

### Backend Setup

1. Navigate to backend folder:
```bash
cd "d:\abc\Smart Billig app\backend"
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already created, but verify values):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-billing
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd "d:\abc\Smart Billig app\frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

4. To build for production:
```bash
npm run build
```

## 📚 API Endpoints

### Bills
- `POST /api/bills` - Create a new bill
- `GET /api/bills` - Get all bills
- `GET /api/bills/:id` - Get a specific bill
- `PUT /api/bills/:id` - Update a bill
- `DELETE /api/bills/:id` - Delete a bill

### Health Check
- `GET /api/health` - Server health status

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Modern blue with soft grays
- **Typography**: Clean, professional fonts
- **Spacing**: Consistent margin and padding
- **Shadows**: Soft, card-like shadows for depth
- **Animations**: Smooth transitions and hover effects

### Pages

1. **Dashboard**
   - Quick statistics cards
   - Total bills, revenue, tax collected
   - Recent bills preview
   - Quick action to create new bill

2. **Create Bill**
   - Customer name input
   - Dynamic item list (add/remove items)
   - Real-time total calculation
   - Tax percentage input
   - Notes field
   - Form validation

3. **Bills List**
   - All bills in a clean table format
   - View, print, and delete actions
   - Responsive design for mobile
   - Empty state with CTA

4. **Bill Details**
   - Full bill information display
   - Itemized breakdown
   - Total calculations
   - Print and delete options
   - Back navigation

5. **Invoice Print**
   - Professional invoice layout
   - Print-optimized CSS
   - Company branding
   - Automatic print dialog

## 🔧 Key Technologies

### Backend
- **Express.js** - Server framework
- **MongoDB + Mongoose** - Database
- **CORS** - Cross-origin support
- **Dotenv** - Environment variables
- **JWT** - Authentication (prepared for use)

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

## 💡 Important Code Sections

### Bill Model (Backend)
The Bill schema includes:
- Customer name
- Items array with productName, quantity, price
- Auto-calculated subtotal
- Tax and grand total
- Unique bill number generation
- Timestamps

### Bill Form Component (Frontend)
Features:
- Dynamic item management
- Real-time calculation
- Form validation
- Loading states
- Toast notifications

### API Service
Clean fetch-based API wrapper with methods for:
- Creating bills
- Fetching all bills
- Getting single bill
- Updating bills
- Deleting bills

## 📱 Responsive Design

- Mobile: Optimized for small screens
- Tablet: Responsive grid layout
- Desktop: Full-width optimized
- Print: Invoice-specific print styles

## 🎯 Usage Example

1. Go to `http://localhost:3000`
2. Navigate to "New Bill"
3. Enter customer name
4. Add items (product, quantity, price)
5. Set tax percentage (optional)
6. Click "Create Bill"
7. View bill in Bills list
8. Print or delete as needed

## 📝 Database Sample Data

Bill document structure:
```json
{
  "_id": "ObjectId",
  "billNumber": "BILL-1673456789-1",
  "customerName": "John Doe",
  "items": [
    {
      "productName": "Web Design",
      "quantity": 1,
      "price": 500,
      "total": 500
    }
  ],
  "subTotal": 500,
  "tax": 50,
  "taxPercentage": 10,
  "grandTotal": 550,
  "notes": "Thank you for your business!",
  "createdAt": "2024-01-09T10:30:00Z",
  "updatedAt": "2024-01-09T10:30:00Z"
}
```

## ⚙️ Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
- Custom colors
- Soft shadows
- Extended spacing

### Environment Variables
Change in `.env`:
- `PORT`: Backend port (default: 5000)
- `MONGODB_URI`: Database connection string
- `JWT_SECRET`: Secret for token generation
- `NODE_ENV`: Environment (development/production)

## 🔐 Security Notes

- Change `JWT_SECRET` in production
- Use environment variables for sensitive data
- Validate input on both frontend and backend
- Use HTTPS in production
- Enable CORS only for trusted domains

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas: Update IP whitelist

### Port Already in Use
- Change PORT in .env (backend)
- Change port in vite.config.js (frontend)

### CORS Issues
- Check backend CORS configuration
- Ensure frontend URL is correct in API service

### Styling Not Applied
- Clear browser cache
- Rebuild Tailwind: `npm run build`
- Check if Tailwind paths are correct in tailwind.config.js

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "tailwindcss": "^3.2.7",
  "react-hot-toast": "^2.4.0"
}
```

## 🚀 Deployment

### Backend (Heroku)
1. Create Heroku account
2. Install Heroku CLI
3. `heroku create app-name`
4. `git push heroku main`

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Update API endpoint in production

## 📄 License

Open source - Feel free to use and modify

## 👨‍💻 Author

Built as a modern, professional billing system starter template.

---

**Happy Billing! 🎉**
