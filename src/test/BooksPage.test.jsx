import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import BooksPage from '../components/books/BooksPage'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)

describe('BooksPage Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TestWrapper>
        <BooksPage />
      </TestWrapper>
    )
    expect(container).toBeTruthy()
  })

  it('component mounts successfully', () => {
    expect(() => {
      render(
        <TestWrapper>
          <BooksPage />
        </TestWrapper>
      )
    }).not.toThrow()
  })
})
