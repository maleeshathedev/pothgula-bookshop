import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Dashboard from '../components/dashboard/Dashboard'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)

describe('Dashboard Component', () => {
  it('renders dashboard title', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    )
    
    // Check if key metrics are displayed
    expect(screen.getByText("Today's Sales")).toBeInTheDocument()
    expect(screen.getByText('Total Books')).toBeInTheDocument()
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(screen.getByText('Suppliers')).toBeInTheDocument()
  })

  it('displays quick actions buttons', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    )
    
    expect(screen.getByText('Add Book')).toBeInTheDocument()
    expect(screen.getByText('New Sale')).toBeInTheDocument()
    expect(screen.getByText('Add Customer')).toBeInTheDocument()
    expect(screen.getByText('Low Stock Alert')).toBeInTheDocument()
  })

  it('displays AI insights section', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    )
    
    expect(screen.getByText('AI Market Insights')).toBeInTheDocument()
  })

  it('displays charts sections', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    )
    
    expect(screen.getByText('Sales Trend (Last 7 Days)')).toBeInTheDocument()
    expect(screen.getByText('Book Categories')).toBeInTheDocument()
    expect(screen.getByText('Monthly Revenue Trend')).toBeInTheDocument()
  })

  it('displays recent sales section', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    )
    
    expect(screen.getByText('Recent Sales')).toBeInTheDocument()
  })
})
