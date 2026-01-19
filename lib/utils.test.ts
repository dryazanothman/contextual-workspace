import { formatDate, formatCurrency, truncate, generateSlug, isValidEmail } from './utils'

describe('utils', () => {
  describe('formatDate', () => {
    it('formats a date string correctly', () => {
      const date = '2024-01-15'
      const result = formatDate(date)
      // Accept either date due to timezone differences
      expect(['January 15, 2024', 'January 14, 2024']).toContain(result)
    })

    it('formats a Date object correctly', () => {
      const date = new Date('2024-01-15')
      const result = formatDate(date)
      // Accept either date due to timezone differences
      expect(['January 15, 2024', 'January 14, 2024']).toContain(result)
    })
  })

  describe('formatCurrency', () => {
    it('formats USD currency correctly', () => {
      const amount = 1234.56
      const result = formatCurrency(amount)
      expect(result).toBe('$1,234.56')
    })

    it('formats EUR currency correctly', () => {
      const amount = 1234.56
      const result = formatCurrency(amount, 'EUR')
      expect(result).toBe('€1,234.56')
    })
  })

  describe('truncate', () => {
    it('truncates long strings', () => {
      const str = 'This is a very long string that needs to be truncated'
      const result = truncate(str, 20)
      expect(result).toBe('This is a very long ...')
    })

    it('does not truncate short strings', () => {
      const str = 'Short string'
      const result = truncate(str, 20)
      expect(result).toBe('Short string')
    })
  })

  describe('generateSlug', () => {
    it('generates a slug from text', () => {
      const text = 'Hello World! This is a Test.'
      const result = generateSlug(text)
      expect(result).toBe('hello-world-this-is-a-test')
    })

    it('handles special characters', () => {
      const text = 'Test & Demo @ Home'
      const result = generateSlug(text)
      expect(result).toBe('test-demo-home')
    })
  })

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('not-an-email')).toBe(false)
      expect(isValidEmail('missing@domain')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
    })
  })
})