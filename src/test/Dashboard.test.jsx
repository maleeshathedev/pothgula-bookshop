import { render } from '@testing-library/react'
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
  it('renders without crashing', () => {
    const { container } = render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    )
    expect(container).toBeTruthy()
  })

  it('component mounts successfully', () => {
    expect(() => {
      render(
        <TestWrapper>
          <Dashboard />
        </TestWrapper>
      )
    }).not.toThrow()
  })
})
