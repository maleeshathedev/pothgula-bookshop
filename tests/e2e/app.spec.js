import { test, expect } from '@playwright/test'

test.describe('Pothgula Bookshop E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the login page', async ({ page }) => {
    await expect(page).toHaveTitle(/Pothgula Bookshop/)
    await expect(page.getByText('Login')).toBeVisible()
  })

  test('should login with admin credentials', async ({ page }) => {
    // Fill login form
    await page.fill('[name="email"]', 'admin@pothgula.com')
    await page.fill('[name="password"]', 'admin123')
    
    // Click login button
    await page.click('button[type="submit"]')
    
    // Wait for navigation to dashboard
    await page.waitForURL('/dashboard')
    await expect(page.getByText("Today's Sales")).toBeVisible()
  })

  test('should navigate through main sections', async ({ page }) => {
    // Login first
    await page.fill('[name="email"]', 'admin@pothgula.com')
    await page.fill('[name="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')

    // Test navigation to Books
    await page.click('text=Books')
    await page.waitForURL('/books')
    await expect(page.getByText('Madol Doova')).toBeVisible()

    // Test navigation to Sales
    await page.click('text=Sales')
    await page.waitForURL('/sales')
    await expect(page.getByText('New Sale')).toBeVisible()

    // Test navigation to Customers
    await page.click('text=Customers')
    await page.waitForURL('/customers')
    await expect(page.getByText('Add New Customer')).toBeVisible()

    // Test navigation to Suppliers
    await page.click('text=Suppliers')
    await page.waitForURL('/suppliers')
    await expect(page.getByText('Add New Supplier')).toBeVisible()
  })

  test('should add a new book', async ({ page }) => {
    // Login
    await page.fill('[name="email"]', 'admin@pothgula.com')
    await page.fill('[name="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')

    // Navigate to books
    await page.click('text=Books')
    await page.waitForURL('/books')

    // Click add book button
    await page.click('text=Add Book')

    // Fill the form
    await page.fill('[name="title"]', 'Test Book')
    await page.fill('[name="author"]', 'Test Author')
    await page.fill('[name="isbn"]', '978-1234567890')
    await page.fill('[name="price"]', '25.99')
    await page.fill('[name="stock"]', '10')
    
    // Select category
    await page.click('[data-testid="category-select"]')
    await page.click('text=Fiction')

    // Submit form
    await page.click('button[type="submit"]')

    // Verify book was added
    await expect(page.getByText('Test Book')).toBeVisible()
  })

  test('should test quick actions from dashboard', async ({ page }) => {
    // Login
    await page.fill('[name="email"]', 'admin@pothgula.com')
    await page.fill('[name="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')

    // Test Add Book quick action
    await page.click('text=Add Book')
    await page.waitForURL('/books')

    // Go back to dashboard
    await page.click('text=Dashboard')
    await page.waitForURL('/dashboard')

    // Test New Sale quick action
    await page.click('text=New Sale')
    await page.waitForURL('/sales')

    // Go back to dashboard
    await page.click('text=Dashboard')
    await page.waitForURL('/dashboard')

    // Test Add Customer quick action
    await page.click('text=Add Customer')
    await page.waitForURL('/customers')
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Login
    await page.fill('[name="email"]', 'admin@pothgula.com')
    await page.fill('[name="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')

    // Check if mobile navigation works
    await expect(page.getByText("Today's Sales")).toBeVisible()
    
    // Test mobile menu if it exists
    const mobileMenuButton = page.locator('[data-testid="mobile-menu"]')
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click()
      await expect(page.getByText('Books')).toBeVisible()
    }
  })

  test('should handle logout', async ({ page }) => {
    // Login
    await page.fill('[name="email"]', 'admin@pothgula.com')
    await page.fill('[name="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')

    // Click logout
    await page.click('[data-testid="logout-button"]')
    
    // Should redirect to login
    await page.waitForURL('/login')
    await expect(page.getByText('Login')).toBeVisible()
  })
})
