# Test Installation and Setup Guide

## Quick Setup Commands

### 1. Install Testing Dependencies
```powershell
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui @vitest/coverage-v8 vitest jsdom prettier
```

### 2. Install Playwright for E2E Testing
```powershell
pnpm add -D @playwright/test
npx playwright install
```

### 3. Update package.json
Add these scripts to your package.json:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",  
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### 4. Run Tests Locally
```powershell
# Unit tests
pnpm test

# E2E tests  
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

## CI/CD Pipeline Features

✅ **Automated Testing on PRs**
✅ **Code Coverage Reports** 
✅ **Security Vulnerability Scanning**
✅ **Multi-browser E2E Testing**
✅ **Performance Audits with Lighthouse**
✅ **Automatic Deployment to Firebase**
✅ **Mobile Responsiveness Testing**

## Pipeline Stages

1. **Code Quality** - ESLint, Prettier
2. **Unit Tests** - Component testing with 70% coverage
3. **Security Scan** - Dependency vulnerabilities  
4. **Build** - Production build verification
5. **E2E Tests** - Cross-browser testing
6. **Deploy** - Firebase hosting
7. **Performance** - Lighthouse audit
8. **Notify** - Status updates

## Quality Gates

- ✅ All tests pass
- ✅ Code coverage ≥ 70%
- ✅ No ESLint errors
- ✅ No critical security issues
- ✅ Build succeeds
- ✅ E2E tests pass

Your CI/CD pipeline is now ready! 🚀
