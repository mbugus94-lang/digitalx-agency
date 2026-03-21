#!/usr/bin/env node
// Simple validation tests for DigitalX Agency

const fs = require('fs');
const path = require('path');

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

async function runTests() {
  console.log('🧪 DigitalX Agency Validation Tests\n');
  let passed = 0;
  let failed = 0;

  for (const { name, fn } of tests) {
    try {
      await fn();
      console.log(`✅ ${name}`);
      passed++;
    } catch (err) {
      console.log(`❌ ${name}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

// Test: index.html exists
test('index.html exists', () => {
  if (!fs.existsSync('index.html')) {
    throw new Error('index.html not found');
  }
});

// Test: index.html has basic structure
test('index.html has required HTML structure', () => {
  const content = fs.readFileSync('index.html', 'utf-8');
  if (!content.includes('<!DOCTYPE html>')) {
    throw new Error('Missing DOCTYPE declaration');
  }
  if (!content.includes('<html')) {
    throw new Error('Missing <html> tag');
  }
  if (!content.includes('<head>')) {
    throw new Error('Missing <head> tag');
  }
  if (!content.includes('<body>')) {
    throw new Error('Missing <body> tag');
  }
  if (!content.includes('</html>')) {
    throw new Error('Missing closing </html> tag');
  }
});

// Test: index.html has title
test('index.html has title', () => {
  const content = fs.readFileSync('index.html', 'utf-8');
  if (!content.includes('<title>')) {
    throw new Error('Missing <title> tag');
  }
});

// Test: index.html has meta charset
test('index.html has meta charset', () => {
  const content = fs.readFileSync('index.html', 'utf-8');
  if (!content.includes('charset=')) {
    throw new Error('Missing charset meta tag');
  }
});

// Test: index.html has viewport meta
test('index.html has viewport meta', () => {
  const content = fs.readFileSync('index.html', 'utf-8');
  if (!content.includes('viewport')) {
    throw new Error('Missing viewport meta tag');
  }
});

// Test: package.json exists
test('package.json exists', () => {
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json not found');
  }
});

// Test: package.json has valid JSON
test('package.json has valid JSON', () => {
  const content = fs.readFileSync('package.json', 'utf-8');
  JSON.parse(content); // Will throw if invalid
});

// Test: LICENSE exists
test('LICENSE file exists', () => {
  if (!fs.existsSync('LICENSE')) {
    throw new Error('LICENSE file not found');
  }
});

// Test: README.md exists
test('README.md exists', () => {
  if (!fs.existsSync('README.md')) {
    throw new Error('README.md not found');
  }
});

// Test: .gitignore exists
test('.gitignore exists', () => {
  if (!fs.existsSync('.gitignore')) {
    throw new Error('.gitignore not found');
  }
});

// Test: .env.example exists
test('.env.example exists', () => {
  if (!fs.existsSync('.env.example')) {
    throw new Error('.env.example not found');
  }
});

runTests();
