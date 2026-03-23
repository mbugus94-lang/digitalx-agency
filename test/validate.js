const fs = require('fs');
const path = require('path');

/**
 * DigitalX Agency - Site Validation Tests
 * Run with: node test/validate.js
 */

const indexPath = path.join(__dirname, '../index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('\n🧪 DigitalX Agency Validation Tests\n');

// HTML Structure Tests
test('HTML has DOCTYPE declaration', () => {
  assert(indexContent.includes('<!DOCTYPE html>'), 'Missing DOCTYPE');
});

test('HTML has html tag with lang attribute', () => {
  assert(indexContent.includes('<html'), 'Missing html tag');
  assert(indexContent.includes('lang='), 'Missing lang attribute');
});

test('HTML has head section', () => {
  assert(indexContent.includes('<head>'), 'Missing head tag');
  assert(indexContent.includes('</head>'), 'Missing closing head tag');
});

test('HTML has body section', () => {
  assert(indexContent.includes('<body>'), 'Missing body tag');
  assert(indexContent.includes('</body>'), 'Missing closing body tag');
});

test('HTML has title tag', () => {
  assert(indexContent.includes('<title>'), 'Missing title tag');
  assert(indexContent.includes('</title>'), 'Missing closing title tag');
});

// Meta Tags Tests
test('Has meta charset', () => {
  assert(indexContent.includes('charset='), 'Missing charset meta tag');
});

test('Has meta viewport', () => {
  assert(indexContent.includes('viewport'), 'Missing viewport meta tag');
});

test('Has meta description', () => {
  assert(indexContent.includes('name="description"') || indexContent.includes('name=\'description\''), 
    'Missing description meta tag');
});

test('Has meta keywords', () => {
  assert(indexContent.includes('name="keywords"') || indexContent.includes('name=\'keywords\''), 
    'Missing keywords meta tag');
});

// Content Tests
test('Has agency name in content', () => {
  assert(
    indexContent.toLowerCase().includes('digitalx') || 
    indexContent.toLowerCase().includes('digital x') ||
    indexContent.toLowerCase().includes('agency'),
    'Missing agency name in content'
  );
});

test('Has navigation links', () => {
  assert(indexContent.includes('<nav') || indexContent.includes('<a'), 
    'Missing navigation elements');
});

test('Has contact section or form', () => {
  assert(
    indexContent.toLowerCase().includes('contact') ||
    indexContent.includes('<form') ||
    indexContent.includes('mailto:'),
    'Missing contact information'
  );
});

// Responsive Design Tests
test('Uses responsive CSS or media queries', () => {
  assert(
    indexContent.includes('@media') ||
    indexContent.includes('max-width') ||
    indexContent.includes('min-width') ||
    indexContent.includes('flex') ||
    indexContent.includes('grid'),
    'Missing responsive design elements'
  );
});

// Performance & Security Tests
test('Has no inline scripts with http://', () => {
  // Allow https:// but not http:// for security
  const httpScripts = indexContent.match(/src=["']http:\/\//g);
  assert(!httpScripts || httpScripts.length === 0, 
    'Found insecure http:// script sources');
});

test('CSS is included (inline or linked)', () => {
  assert(
    indexContent.includes('<style') ||
    indexContent.includes('rel="stylesheet"'),
    'No CSS styles found'
  );
});

// Footer Tests
test('Has footer section', () => {
  assert(
    indexContent.includes('<footer') ||
    indexContent.toLowerCase().includes('copyright') ||
    indexContent.includes('©'),
    'Missing footer or copyright information'
  );
});

// Summary
console.log('\n' + '='.repeat(40));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(40) + '\n');

process.exit(failed > 0 ? 1 : 0);
