import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components/Layout'
import { AuthProvider, useAuth } from './utils/context'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import CreateBillPage from './pages/CreateBillPage'
import BillsListPage from './pages/BillsListPage'
import BillDetailPage from './pages/BillDetailPage'
import PrintBillPage from './pages/PrintBillPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

// Protected Route Component
function ProtectedRoute({ element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <style>{`
        @media print {
          nav, .no-print, button, aside, [role="navigation"] {
            display: none !important;
          }
          main {
            margin: 0 !important;
            padding: 0 !important;
          }
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .print-container {
            width: 100%;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {isAuthenticated && <Navbar />}
        <main className={`flex-1 transition-all ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={() => {}} />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/bills" element={<ProtectedRoute element={<BillsListPage />} />} />
            <Route path="/create-bill" element={<ProtectedRoute element={<CreateBillPage />} />} />
            <Route path="/bills/:id" element={<ProtectedRoute element={<BillDetailPage />} />} />
            <Route path="/print/:id" element={<ProtectedRoute element={<PrintBillPage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#000',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
