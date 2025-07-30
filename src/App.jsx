import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import BooksPage from './components/books/BooksPage';
import SalesPage from './components/sales/SalesPage';
import CustomersPage from './components/customers/CustomersPage';
import SuppliersPage from './components/suppliers/SuppliersPage';
import './lib/i18n';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="books" element={<BooksPage />} />
              <Route path="sales" element={<SalesPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="suppliers" element={<SuppliersPage />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

