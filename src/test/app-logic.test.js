import { describe, it, expect } from 'vitest';

describe('Basic App Functionality Tests', () => {
  it('should handle book data structure correctly', () => {
    const book = {
      id: '1',
      title: 'Madol Doova',
      author: 'Martin Wickramasinghe',
      isbn: '978-955-1234-01-0',
      category: 'Fiction',
      price: 850,
      stock: 25,
      description: 'A classic Sinhala novel'
    };

    expect(book.id).toBe('1');
    expect(book.title).toBe('Madol Doova');
    expect(book.price).toBeGreaterThan(0);
    expect(book.stock).toBeGreaterThan(0);
    expect(typeof book.isbn).toBe('string');
  });

  it('should filter books by search term correctly', () => {
    const books = [
      { title: 'Madol Doova', author: 'Martin Wickramasinghe', isbn: '978-955-1234-01-0' },
      { title: 'Viragaya', author: 'W.A. Silva', isbn: '978-955-1234-02-7' },
      { title: 'Mathematics Grade 10', author: 'Department of Education', isbn: '978-955-1234-03-4' }
    ];

    const searchTerm = 'madol';
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
    );

    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('Madol Doova');
  });

  it('should filter books by category correctly', () => {
    const books = [
      { title: 'Book 1', category: 'Fiction' },
      { title: 'Book 2', category: 'Educational' },
      { title: 'Book 3', category: 'Fiction' }
    ];

    const fictionBooks = books.filter(book => book.category === 'Fiction');
    const educationalBooks = books.filter(book => book.category === 'Educational');

    expect(fictionBooks.length).toBe(2);
    expect(educationalBooks.length).toBe(1);
    expect(fictionBooks[0].category).toBe('Fiction');
  });

  it('should format currency correctly', () => {
    const formatCurrency = (amount) => {
      return `LKR ${amount.toFixed(2)}`;
    };

    expect(formatCurrency(850)).toBe('LKR 850.00');
    expect(formatCurrency(1200.5)).toBe('LKR 1200.50');
    expect(formatCurrency(0)).toBe('LKR 0.00');
  });

  it('should generate unique IDs correctly', () => {
    const generateId = () => {
      return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    };

    const id1 = generateId();
    const id2 = generateId();

    expect(typeof id1).toBe('string');
    expect(typeof id2).toBe('string');
    expect(id1).not.toBe(id2);
    expect(id1.length).toBeGreaterThan(10);
  });

  it('should handle form data correctly', () => {
    const formData = {
      title: 'New Book',
      author: 'New Author',
      isbn: '978-123-456-789',
      category: 'Fiction',
      price: '500',
      stock: '10',
      description: 'A new book'
    };

    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    expect(processedData.title).toBe('New Book');
    expect(processedData.price).toBe(500);
    expect(processedData.stock).toBe(10);
    expect(typeof processedData.price).toBe('number');
    expect(typeof processedData.stock).toBe('number');
  });

  it('should validate book stock levels correctly', () => {
    const books = [
      { title: 'Book 1', stock: 5 },
      { title: 'Book 2', stock: 15 },
      { title: 'Book 3', stock: 8 }
    ];

    const lowStockBooks = books.filter(book => book.stock < 10);
    const adequateStockBooks = books.filter(book => book.stock >= 10);

    expect(lowStockBooks.length).toBe(2);
    expect(adequateStockBooks.length).toBe(1);
    expect(lowStockBooks[0].stock).toBeLessThan(10);
  });

  it('should handle book categories correctly', () => {
    const categories = [
      'Fiction',
      'Non-Fiction',
      'Educational',
      'Children',
      'Biography',
      'History',
      'Science',
      'Technology',
      'Religion',
      'Poetry'
    ];

    expect(categories.length).toBe(10);
    expect(categories.includes('Fiction')).toBe(true);
    expect(categories.includes('Romance')).toBe(false);
    expect(categories[0]).toBe('Fiction');
  });
});
