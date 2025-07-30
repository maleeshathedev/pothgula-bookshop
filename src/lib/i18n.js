import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      books: "Books",
      sales: "Sales",
      customers: "Customers",
      suppliers: "Suppliers",
      logout: "Logout",
      
      // Authentication
      login: "Login",
      register: "Register",
      username: "Username",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginButton: "Sign In",
      registerButton: "Sign Up",
      
      // Dashboard
      goodMorning: "Good Morning",
      goodAfternoon: "Good Afternoon",
      goodEvening: "Good Evening",
      goodNight: "Good Night",
      welcome: "Welcome to Pothgula Bookshop",
      todaySales: "Today's Sales",
      totalBooks: "Total Books",
      lowStock: "Low Stock Items",
      totalCustomers: "Total Customers",
      
      // Books
      addBook: "Add Book",
      editBook: "Edit Book",
      bookTitle: "Book Title",
      author: "Author",
      price: "Price",
      stock: "Stock",
      category: "Category",
      isbn: "ISBN",
      description: "Description",
      
      // Sales
      newSale: "New Sale",
      saleDate: "Sale Date",
      customer: "Customer",
      total: "Total",
      quantity: "Quantity",
      
      // Customers
      addCustomer: "Add Customer",
      customerName: "Customer Name",
      phone: "Phone",
      email: "Email",
      address: "Address",
      
      // Suppliers
      addSupplier: "Add Supplier",
      supplierName: "Supplier Name",
      contactPerson: "Contact Person",
      
      // Common
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      actions: "Actions",
      currency: "LKR",
      darkMode: "Dark Mode",
      lightMode: "Light Mode"
    }
  },
  si: {
    translation: {
      // Navigation
      dashboard: "උපකරණ පුවරුව",
      books: "පොත්",
      sales: "විකුණුම්",
      customers: "ගනුදෙනුකරුවන්",
      suppliers: "සැපයුම්කරුවන්",
      logout: "ඉවත් වන්න",
      
      // Authentication
      login: "ඇතුල් වන්න",
      register: "ලියාපදිංචි වන්න",
      username: "පරිශීලක නාමය",
      password: "මුරපදය",
      confirmPassword: "මුරපදය තහවුරු කරන්න",
      loginButton: "ඇතුල් වන්න",
      registerButton: "ලියාපදිංචි වන්න",
      
      // Dashboard
      goodMorning: "සුභ උදෑසනක්",
      goodAfternoon: "සුභ දහවලක්",
      goodEvening: "සුභ සන්ධ්‍යාවක්",
      goodNight: "සුභ රාත්‍රියක්",
      welcome: "පොත්ගුල පොත් කඩයට සාදරයෙන් පිළිගනිමු",
      todaySales: "අද විකුණුම්",
      totalBooks: "මුළු පොත් ගණන",
      lowStock: "අඩු තොගයේ අයිතම",
      totalCustomers: "මුළු ගනුදෙනුකරුවන්",
      
      // Books
      addBook: "පොත එකතු කරන්න",
      editBook: "පොත සංස්කරණය කරන්න",
      bookTitle: "පොතේ නම",
      author: "කතුවරයා",
      price: "මිල",
      stock: "තොගය",
      category: "කාණ්ඩය",
      isbn: "ISBN",
      description: "විස්තරය",
      
      // Sales
      newSale: "නව විකුණුම",
      saleDate: "විකුණුම් දිනය",
      customer: "ගනුදෙනුකරු",
      total: "මුළු එකතුව",
      quantity: "ප්‍රමාණය",
      
      // Customers
      addCustomer: "ගනුදෙනුකරු එකතු කරන්න",
      customerName: "ගනුදෙනුකරුගේ නම",
      phone: "දුරකථනය",
      email: "ඊමේල්",
      address: "ලිපිනය",
      
      // Suppliers
      addSupplier: "සැපයුම්කරු එකතු කරන්න",
      supplierName: "සැපයුම්කරුගේ නම",
      contactPerson: "සම්බන්ධතා පුද්ගලයා",
      
      // Common
      save: "සුරකින්න",
      cancel: "අවලංගු කරන්න",
      edit: "සංස්කරණය කරන්න",
      delete: "මකන්න",
      search: "සොයන්න",
      actions: "ක්‍රියාමාර්ග",
      currency: "LKR",
      darkMode: "අඳුරු මාදිලිය",
      lightMode: "ආලෝක මාදිලිය"
    }
  },
  ta: {
    translation: {
      // Navigation
      dashboard: "டாஷ்போர்டு",
      books: "புத்தகங்கள்",
      sales: "விற்பனை",
      customers: "வாடிக்கையாளர்கள்",
      suppliers: "சப்ளையர்கள்",
      logout: "வெளியேறு",
      
      // Authentication
      login: "உள்நுழை",
      register: "பதிவு செய்",
      username: "பயனர் பெயர்",
      password: "கடவுச்சொல்",
      confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்து",
      loginButton: "உள்நுழை",
      registerButton: "பதிவு செய்",
      
      // Dashboard
      goodMorning: "காலை வணக்கம்",
      goodAfternoon: "மதிய வணக்கம்",
      goodEvening: "மாலை வணக்கம்",
      goodNight: "இரவு வணக்கம்",
      welcome: "பொத்குல புத்தக கடைக்கு வரவேற்கிறோம்",
      todaySales: "இன்றைய விற்பனை",
      totalBooks: "மொத்த புத்தகங்கள்",
      lowStock: "குறைந்த இருப்பு பொருட்கள்",
      totalCustomers: "மொத்த வாடிக்கையாளர்கள்",
      
      // Books
      addBook: "புத்தகம் சேர்",
      editBook: "புத்தகம் திருத்து",
      bookTitle: "புத்தக தலைப்பு",
      author: "ஆசிரியர்",
      price: "விலை",
      stock: "இருப்பு",
      category: "வகை",
      isbn: "ISBN",
      description: "விளக்கம்",
      
      // Sales
      newSale: "புதிய விற்பனை",
      saleDate: "விற்பனை தேதி",
      customer: "வாடிக்கையாளர்",
      total: "மொத்தம்",
      quantity: "அளவு",
      
      // Customers
      addCustomer: "வாடிக்கையாளர் சேர்",
      customerName: "வாடிக்கையாளர் பெயர்",
      phone: "தொலைபேசி",
      email: "மின்னஞ்சல்",
      address: "முகவரி",
      
      // Suppliers
      addSupplier: "சப்ளையர் சேர்",
      supplierName: "சப்ளையர் பெயர்",
      contactPerson: "தொடர்பு நபர்",
      
      // Common
      save: "சேமி",
      cancel: "ரத்து செய்",
      edit: "திருத்து",
      delete: "நீக்கு",
      search: "தேடு",
      actions: "செயல்கள்",
      currency: "LKR",
      darkMode: "இருண்ட பயன்முறை",
      lightMode: "ஒளி பயன்முறை"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

