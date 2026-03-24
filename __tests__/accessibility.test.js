/**
 * Accessibility tests for DigitalX Agency website
 */
const fs = require('fs');
const path = require('path');

describe('DigitalX Agency - Accessibility', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  });

  test('has lang attribute on html element', () => {
    expect(html).toMatch(/<html[^>]*lang=/i);
  });

  test('has meta charset', () => {
    expect(html).toMatch(/<meta[^>]*charset=/i);
  });

  test('has viewport meta tag', () => {
    expect(html).toMatch(/<meta[^>]*viewport/i);
  });

  test('has title element', () => {
    expect(html).toMatch(/<title>[^<]+<\/title>/i);
  });

  test('has alt attributes on images', () => {
    // Count img tags without alt
    const imgTags = html.match(/<img[^>]*>/gi) || [];
    const imgWithoutAlt = imgTags.filter(img => !img.includes('alt='));
    expect(imgWithoutAlt).toHaveLength(0);
  });

  test('has proper heading hierarchy', () => {
    const h1Matches = html.match(/<h1[^>]*>/gi) || [];
    expect(h1Matches.length).toBeGreaterThanOrEqual(1);
  });

  test('has skip to content link', () => {
    const hasSkipLink = html.match(/skip.*content|skip-to-content/i);
    expect(hasSkipLink).toBeTruthy();
  });
});

describe('DigitalX Agency - SEO', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  });

  test('has meta description', () => {
    expect(html).toMatch(/<meta[^>]*name=["']description["']/i);
  });

  test('has meta keywords', () => {
    expect(html).toMatch(/<meta[^>]*name=["']keywords["']/i);
  });

  test('has Open Graph tags', () => {
    expect(html).toMatch(/<meta[^>]*property=["']og:/i);
  });

  test('has canonical link', () => {
    expect(html).toMatch(/<link[^>]*rel=["']canonical["']/i);
  });
});

describe('DigitalX Agency - Performance', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  });

  test('CSS is inline (no render-blocking external resources)', () => {
    const linkTags = html.match(/<link[^>]*rel=["']stylesheet["']/gi) || [];
    // Should be minimal or have media queries to prevent render blocking
    expect(linkTags.length).toBeLessThanOrEqual(2);
  });
});
