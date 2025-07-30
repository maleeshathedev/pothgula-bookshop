# CI/CD Test Setup Documentation

## Overview
This document explains how to set up and run comprehensive testing for the Pothgula Bookshop system using CI/CD.

## Testing Strategy

### 1. Unit Tests (Vitest + React Testing Library)
- **Location**: `src/test/`
- **Purpose**: Test individual components and functions
- **Coverage**: Minimum 70% code coverage required

### 2. Integration Tests
- **Purpose**: Test component interactions and API integrations
- **Includes**: Form submissions, navigation, state management

### 3. End-to-End Tests (Playwright)
- **Location**: `tests/e2e/`
- **Purpose**: Test complete user workflows
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari

### 4. Security Scanning
- **npm audit**: Check for vulnerable dependencies
- **audit-ci**: Automated security checks in CI

### 5. Performance Testing
- **Lighthouse CI**: Automated performance, accessibility, and SEO audits
- **Thresholds**: Performance score > 90, Accessibility > 95

## Setup Instructions

### 1. Install Testing Dependencies
\`\`\`bash
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test @vitest/ui @vitest/coverage-v8 vitest jsdom prettier typescript
\`\`\`

### 2. Initialize Playwright
\`\`\`bash
npx playwright install
\`\`\`

### 3. Update package.json Scripts
Add the following scripts to your package.json:
\`\`\`json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
  }
}
\`\`\`

### 4. Set up GitHub Secrets
In your GitHub repository settings, add these secrets:
- \`FIREBASE_TOKEN\`: Your Firebase CI token (get with \`firebase login:ci\`)

### 5. Configure Firebase Projects
\`\`\`bash
# Production
firebase use --add pothgula-bookshop-app

# Staging (optional)
firebase use --add your-staging-project-id --alias staging
\`\`\`

## Running Tests Locally

### Unit Tests
\`\`\`bash
# Run tests
pnpm test

# Run with UI
pnpm test:ui

# Run with coverage
pnpm test:coverage
\`\`\`

### E2E Tests
\`\`\`bash
# Run all E2E tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Run specific browser
npx playwright test --project=chromium
\`\`\`

### Code Quality
\`\`\`bash
# Run linting
pnpm lint

# Check formatting
pnpm format:check

# Fix formatting
pnpm format
\`\`\`

## CI/CD Pipeline

### Workflow Triggers
- **Push to main**: Full pipeline + production deployment
- **Push to develop**: Full pipeline + staging deployment
- **Pull requests**: Testing and building only

### Pipeline Stages

1. **Install**: Cache dependencies, install packages
2. **Lint**: ESLint, Prettier format check
3. **Test**: Unit tests with coverage reports
4. **Build**: Production build
5. **Security**: Dependency audit, security scanning
6. **Deploy**: Firebase hosting deployment
7. **E2E**: Post-deployment testing
8. **Performance**: Lighthouse audit
9. **Notify**: Deployment status notifications

### Quality Gates
- ✅ All tests must pass
- ✅ Code coverage > 70%
- ✅ No ESLint errors
- ✅ No high/critical security vulnerabilities
- ✅ Build succeeds
- ✅ E2E tests pass on all browsers

## Monitoring and Reporting

### Test Reports
- **Unit Test Coverage**: HTML report in \`coverage/\`
- **E2E Test Results**: HTML report in \`playwright-report/\`
- **Lighthouse Reports**: Available in GitHub Actions artifacts

### Notifications
- GitHub commit status checks
- Failed build notifications
- Deployment success/failure alerts

## Best Practices

### Writing Tests
1. **Unit Tests**: Test one thing at a time
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test critical user journeys
4. **Mock External Dependencies**: Firebase, APIs, etc.

### Maintenance
1. **Update Dependencies**: Regularly update testing tools
2. **Review Test Coverage**: Aim for meaningful, not just high coverage
3. **Monitor Performance**: Track Lighthouse scores over time
4. **Security Updates**: Keep dependencies secure

## Troubleshooting

### Common Issues
1. **Tests failing in CI but passing locally**: Check environment differences
2. **E2E tests timing out**: Increase timeout or add proper waits
3. **Coverage below threshold**: Add tests for uncovered code
4. **Firebase deployment fails**: Check token and project configuration

### Debug Commands
\`\`\`bash
# Debug specific test
pnpm test -- --reporter=verbose src/test/Dashboard.test.jsx

# Debug E2E test
npx playwright test --debug tests/e2e/app.spec.js

# Check build locally
pnpm build && pnpm preview
\`\`\`

## Performance Benchmarks

### Target Metrics
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 90
- **SEO**: > 90
- **Load Time**: < 3 seconds
- **Bundle Size**: < 500KB (gzipped)

## Security Standards
- No critical or high severity vulnerabilities
- Regular dependency updates
- Secure coding practices
- Authentication testing
- Input validation testing
