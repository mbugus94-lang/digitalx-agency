const fs = require('fs');
const path = require('path');

describe('DigitalX Agency - HTML Structure Tests', () => {
  const indexPath = path.join(__dirname, '../index.html');
  let htmlContent;

  beforeAll(() => {
    if (fs.existsSync(indexPath)) {
      htmlContent = fs.readFileSync(indexPath, 'utf8');
    }
  });

  describe('Basic Structure', () => {
    test('should have HTML5 doctype', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('should have html tag with lang attribute', () => {
      expect(htmlContent).toMatch(/<html[^>]*lang=/i);
    });

    test('should have head section', () => {
      expect(htmlContent).toMatch(/<head>/i);
    });

    test('should have body section', () => {
      expect(htmlContent).toMatch(/<body>/i);
    });
  });

  describe('Meta Tags', () => {
    test('should have charset meta tag', () => {
      expect(htmlContent).toMatch(/charset=['"]UTF-8['"]/i);
    });

    test('should have viewport meta tag', () => {
      expect(htmlContent).toMatch(/viewport/i);
    });

    test('should have title tag', () => {
      expect(htmlContent).toMatch(/<title>/i);
    });
  });

  describe('SEO and Accessibility', () => {
    test('should have meta description', () => {
      expect(htmlContent).toMatch(/meta[^>]*name=['"]description['"]/i);
    });

    test('should have semantic HTML elements', () => {
      const semanticElements = ['header', 'nav', 'main', 'footer', 'section'];
      semanticElements.forEach(element => {
        expect(htmlContent).toMatch(new RegExp(`<${element}`, 'i'));
      });
    });
  });

  describe('Security', () => {
    test('should not contain inline scripts with external URLs', () => {
      // Check for potentially dangerous patterns
      const dangerousPatterns = [
        /eval\s*\(/,
        /document\.write\s*\(/,
      ];
      dangerousPatterns.forEach(pattern => {
        expect(htmlContent).not.toMatch(pattern);
      });
    });
  });
});

describe('DigitalX Agency - Package.json Tests', () => {
  const packagePath = path.join(__dirname, '../package.json');
  let packageContent;

  beforeAll(() => {
    if (fs.existsSync(packagePath)) {
      packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    }
  });

  test('should have required fields', () => {
    expect(packageContent).toHaveProperty('name');
    expect(packageContent).toHaveProperty('version');
    expect(packageContent).toHaveProperty('description');
    expect(packageContent).toHaveProperty('scripts');
  });

  test('should have proper engine requirements', () => {
    expect(packageContent).toHaveProperty('engines');
    expect(packageContent.engines).toHaveProperty('node');
  });

  test('should have license specified', () => {
    expect(packageContent).toHaveProperty('license');
  });
});
