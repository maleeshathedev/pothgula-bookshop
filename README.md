# Pothgula Bookshop Management System

A comprehensive bookshop management application built with React, featuring inventory management, sales processing, customer management, and analytics dashboard.

## 🌟 Live Demo

**Live Application**: [https://pothgula-bookshop-app.web.app](https://pothgula-bookshop-app.web.app)

## ✨ Features

### 📚 Book Management
- Add, edit, and delete books
- Search and filter by title, author, ISBN, or category
- Stock level tracking with low stock alerts
- Category-based organization

### 💰 Sales Processing
- Complete sales transactions
- Customer information management
- Real-time inventory updates
- Sales history tracking

### 👥 Customer Management
- Customer database with contact information
- Purchase history tracking
- Customer categorization (Regular/VIP)

### 🏪 Supplier Management
- Supplier contact information
- Track book suppliers
- Supplier relationship management

### 📊 Analytics Dashboard
- Sales trends and revenue charts
- Book category distribution
- Monthly performance metrics
- AI-powered market insights for Sri Lankan book market

### 🌐 Internationalization
- Multi-language support (English/Sinhala)
- Localized content and currency formatting
- Cultural adaptation for Sri Lankan market

## 🛠️ Technical Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icons
- **Recharts** - Charts and data visualization
- **i18next** - Internationalization framework

### Backend & Hosting
- **Firebase Hosting** - Static site hosting
- **Firebase SDK** - Ready for Firestore integration

### Development Tools
- **ESLint** - Code linting and formatting
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **GitHub Actions** - CI/CD pipeline

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pothgula-bookshop.git
   cd pothgula-bookshop
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
# or
npm run build
```

## 🧪 Testing

### Run Unit Tests
```bash
pnpm test
# or
npm run test
```

### Run E2E Tests
```bash
pnpm test:e2e
# or
npm run test:e2e
```

### Test Coverage
```bash
pnpm test:coverage
# or
npm run test:coverage
```

## 🚀 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Deploy to Firebase**
   ```bash
   pnpm build
   firebase deploy
   ```

### Manual Deployment
Build the project and deploy the `dist` folder to any static hosting service.

## 📁 Project Structure

```
pothgula-bookshop/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── books/         # Book management
│   │   ├── customers/     # Customer management
│   │   ├── dashboard/     # Analytics dashboard
│   │   ├── layout/        # Layout components
│   │   ├── sales/         # Sales processing
│   │   ├── suppliers/     # Supplier management
│   │   └── ui/            # Reusable UI components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   └── test/              # Test files
├── tests/                 # E2E tests
├── .github/workflows/     # CI/CD pipelines
└── README.md
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Firebase Configuration (optional)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Customization
- **Colors**: Modify `src/index.css` for theme colors
- **Components**: Customize UI components in `src/components/ui/`
- **Translations**: Add translations in `src/lib/i18n.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 TODO / Roadmap

- [ ] Database integration (Firestore)
- [ ] User authentication
- [ ] Print receipts functionality
- [ ] Barcode scanning
- [ ] Inventory alerts
- [ ] Advanced reporting
- [ ] Mobile app version
- [ ] Offline support

## 🐛 Known Issues

- Form input optimization implemented for better UX
- Mobile responsiveness tested and working
- Cross-browser compatibility verified

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Malee** - Pothgula Bookshop Management System

## 🙏 Acknowledgments

- Sri Lankan literary community for inspiration
- Open source libraries and contributors
- Modern web development community

---

**Made with ❤️ for bookshops in Sri Lanka**
