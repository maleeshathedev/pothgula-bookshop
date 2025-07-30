import { describe, it, expect } from 'vitest';

describe('Simple Basic Tests', () => {
  it('should pass basic math operations', () => {
    expect(1 + 1).toBe(2);
    expect(5 * 2).toBe(10);
    expect(10 / 2).toBe(5);
  });

  it('should handle string operations correctly', () => {
    const text = 'Pothgula Bookshop';
    expect(text.toLowerCase()).toBe('pothgula bookshop');
    expect(text.toUpperCase()).toBe('POTHGULA BOOKSHOP');
    expect(text.length).toBe(17);
  });

  it('should handle array operations correctly', () => {
    const books = ['Fiction', 'Non-Fiction', 'Educational'];
    expect(books.length).toBe(3);
    expect(books[0]).toBe('Fiction');
    expect(books.includes('Fiction')).toBe(true);
    expect(books.includes('Romance')).toBe(false);
  });

  it('should handle object operations correctly', () => {
    const book = {
      title: 'Test Book',
      author: 'Test Author',
      price: 250,
      inStock: true
    };
    
    expect(book.title).toBe('Test Book');
    expect(book.price).toBeGreaterThan(200);
    expect(book.inStock).toBe(true);
    expect(typeof book.author).toBe('string');
  });

  it('should handle boolean operations correctly', () => {
    expect(true).toBe(true);
    expect(false).toBe(false);
    expect(!true).toBe(false);
    expect(!false).toBe(true);
  });

  it('should handle null and undefined correctly', () => {
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
    expect('').toBeDefined();
    expect(0).toBeDefined();
  });

  it('should handle function operations correctly', () => {
    const add = (a, b) => a + b;
    const multiply = (a, b) => a * b;
    
    expect(add(2, 3)).toBe(5);
    expect(multiply(4, 5)).toBe(20);
    expect(typeof add).toBe('function');
  });

  it('should handle date operations correctly', () => {
    const now = new Date();
    expect(now instanceof Date).toBe(true);
    expect(typeof now.getTime()).toBe('number');
    expect(now.getTime()).toBeGreaterThan(0);
  });

  it('should handle JSON operations correctly', () => {
    const obj = { name: 'Book', price: 100 };
    const jsonString = JSON.stringify(obj);
    const parsedObj = JSON.parse(jsonString);
    
    expect(jsonString).toBe('{"name":"Book","price":100}');
    expect(parsedObj.name).toBe('Book');
    expect(parsedObj.price).toBe(100);
  });

  it('should handle Promise operations correctly', async () => {
    const promise = Promise.resolve('success');
    const result = await promise;
    expect(result).toBe('success');
  });
});
