/**
 * SEO and Meta Tags Test Suite
 */

const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, '..', 'index.html');

function runTests() {
  console.log('Running SEO tests...\n');

  if (!fs.existsSync(HTML_FILE)) {
    console.error('❌ index.html not found');
    process.exit(1);
  }

  const html = fs.readFileSync(HTML_FILE, 'utf-8');
  let passed = 0;
  let failed = 0;

  // Test 1: Title tag exists
  if (html.includes('<title>') && html.includes('</title>')) {
    console.log('✅ Title tag exists');
    passed++;
  } else {
    console.log('❌ Title tag missing');
    failed++;
  }

  // Test 2: Meta description exists
  if (html.includes('name="description"') || html.includes('name="Description"')) {
    console.log('✅ Meta description exists');
    passed++;
  } else {
    console.log('❌ Meta description missing');
    failed++;
  }

  // Test 3: Viewport meta tag exists
  if (html.includes('name="viewport"')) {
    console.log('✅ Viewport meta tag exists');
    passed++;
  } else {
    console.log('❌ Viewport meta tag missing');
    failed++;
  }

  // Test 4: Charset is UTF-8
  if (html.includes('charset="UTF-8"') || html.includes('charset="utf-8"')) {
    console.log('✅ UTF-8 charset declared');
    passed++;
  } else {
    console.log('❌ UTF-8 charset not declared');
    failed++;
  }

  // Test 5: OG tags exist (Open Graph)
  if (html.includes('og:title') || html.includes('og:description')) {
    console.log('✅ Open Graph tags exist');
    passed++;
  } else {
    console.log('❌ Open Graph tags missing');
    failed++;
  }

  // Test 6: Canonical link
  if (html.includes('rel="canonical"')) {
    console.log('✅ Canonical link exists');
    passed++;
  } else {
    console.log('❌ Canonical link missing');
    failed++;
  }

  // Test 7: Favicon
  if (html.includes('rel="icon"') || html.includes('rel="shortcut icon"')) {
    console.log('✅ Favicon declared');
    passed++;
  } else {
    console.log('❌ Favicon not declared');
    failed++;
  }

  // Test 8: Semantic HTML structure
  if (html.includes('<header') && html.includes('<main') && html.includes('<footer')) {
    console.log('✅ Semantic HTML structure (header, main, footer)');
    passed++;
  } else {
    console.log('❌ Missing semantic HTML structure');
    failed++;
  }

  // Test 9: Alt attributes on images
  const imgTags = html.match(/<img[^>]*>/g) || [];
  const imgsWithAlt = imgTags.filter(img => img.includes('alt='));
  if (imgTags.length === 0 || imgsWithAlt.length === imgTags.length) {
    console.log('✅ All images have alt attributes');
    passed++;
  } else {
    console.log(`❌ ${imgTags.length - imgsWithAlt.length} images missing alt attributes`);
    failed++;
  }

  // Test 10: Language attribute
  if (html.includes('lang="en"') || html.includes('lang="en-US"')) {
    console.log('✅ HTML language attribute set');
    passed++;
  } else {
    console.log('❌ HTML language attribute missing');
    failed++;
  }

  console.log(`\n${passed}/${passed + failed} tests passed`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
