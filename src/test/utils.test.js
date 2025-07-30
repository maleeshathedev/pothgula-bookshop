import { formatCurrency } from '../lib/utils'
import { describe, it, expect } from 'vitest'

describe('Utils Functions', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toMatch(/LKR\s1,000\.00/)
      expect(formatCurrency(1234.56)).toMatch(/LKR\s1,234\.56/)
      expect(formatCurrency(0)).toMatch(/LKR\s0\.00/)
    })

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000)).toMatch(/LKR\s1,000,000\.00/)
    })

    it('should handle decimal numbers', () => {
      expect(formatCurrency(123.45)).toMatch(/LKR\s123\.45/)
      expect(formatCurrency(123.4)).toMatch(/LKR\s123\.40/)
    })
  })
})
