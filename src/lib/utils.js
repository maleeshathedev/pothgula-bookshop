import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Get time-based greeting
export function getGreeting() {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'goodMorning';
  } else if (hour >= 12 && hour < 17) {
    return 'goodAfternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'goodEvening';
  } else {
    return 'goodNight';
  }
}

// Format currency in LKR
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2
  }).format(amount);
}

// Format date
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// Format time
export function formatTime(date) {
  return new Intl.DateTimeFormat('en-LK', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(new Date(date));
}

// Generate unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Validate email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (Sri Lankan format)
export function isValidPhone(phone) {
  const phoneRegex = /^(\+94|0)?[1-9]\d{8}$/;
  return phoneRegex.test(phone);
}

