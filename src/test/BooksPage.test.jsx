import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
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
  beforeEach(() => {
    render(
      <TestWrapper>
        <BooksPage />
      </TestWrapper>
    )
  })

  it('renders books page with title', () => {
    expect(screen.getByText('books')).toBeInTheDocument()
  })

  it('displays add book button', () => {
    expect(screen.getByText('addBook')).toBeInTheDocument()
  })

  it('opens add book dialog when button is clicked', async () => {
    const user = userEvent.setup()
    const addButton = screen.getByText('addBook')
    
    await user.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByText('addNewBook')).toBeInTheDocument()
    })
  })

  it('displays sample books in the table', () => {
    expect(screen.getByText('Madol Doova')).toBeInTheDocument()
    expect(screen.getByText('Martin Wickramasinghe')).toBeInTheDocument()
  })

  it('filters books by search term', async () => {
    const user = userEvent.setup()
    const searchInput = screen.getByPlaceholderText('searchBooks')
    
    await user.type(searchInput, 'Madol')
    
    expect(screen.getByText('Madol Doova')).toBeInTheDocument()
  })

  it('shows book categories filter', () => {
    expect(screen.getByText('allCategories')).toBeInTheDocument()
  })
})
