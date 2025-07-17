const { validateBugData, sanitizeInput } = require('../../src/utils/validation.js');

describe('Validation Utils', () => {
  describe('validateBugData', () => {
    test('should pass validation with valid bug data', () => {
      const validBug = {
        title: 'Test Bug',
        description: 'This is a test bug description',
        severity: 'medium',
        status: 'open',
        priority: 'high',
        reportedBy: 'John Doe'
      };

      const result = validateBugData(validBug);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should fail validation with missing title', () => {
      const invalidBug = {
        description: 'This is a test bug description',
        reportedBy: 'John Doe'
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    test('should fail validation with missing description', () => {
      const invalidBug = {
        title: 'Test Bug',
        reportedBy: 'John Doe'
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description is required');
    });

    test('should fail validation with invalid severity', () => {
      const invalidBug = {
        title: 'Test Bug',
        description: 'This is a test bug description',
        severity: 'invalid',
        reportedBy: 'John Doe'
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Severity must be: low, medium, high, or critical');
    });

    test('should fail validation with title too long', () => {
      const invalidBug = {
        title: 'a'.repeat(101),
        description: 'This is a test bug description',
        reportedBy: 'John Doe'
      };

      const result = validateBugData(invalidBug);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title cannot exceed 100 characters');
    });
  });

  describe('sanitizeInput', () => {
    test('should remove script tags', () => {
      const maliciousInput = '<script>alert("XSS")</script>Hello World';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Hello World');
    });

    test('should remove javascript: protocols', () => {
      const maliciousInput = 'javascript:alert("XSS")';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('alert("XSS")');
    });

    test('should remove event handlers', () => {
      const maliciousInput = 'Hello onclick="alert()" World';
      const result = sanitizeInput(maliciousInput);
      expect(result).toBe('Hello World');
    });

    test('should trim whitespace', () => {
      const input = '  Hello World  ';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    test('should handle non-string input', () => {
      const numberInput = 123;
      const result = sanitizeInput(numberInput);
      expect(result).toBe(123);
    });
  });
});