import { formatCurrency } from '../lib/utils'
import { describe, it, expect } from 'vitest'

describe('Utils Functions', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('Rs. 1,000.00')
      expect(formatCurrency(1234.56)).toBe('Rs. 1,234.56')
      expect(formatCurrency(0)).toBe('Rs. 0.00')
    })

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000)).toBe('Rs. 1,000,000.00')
    })

    it('should handle decimal numbers', () => {
      expect(formatCurrency(123.45)).toBe('Rs. 123.45')
      expect(formatCurrency(123.4)).toBe('Rs. 123.40')
    })
  })
})
