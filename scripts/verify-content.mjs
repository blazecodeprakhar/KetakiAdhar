import fs from 'node:fs';

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir);

let hasViolations = false;
const disallowedPatterns = [
  { regex: /₹\s*\d+/, desc: 'Price or currency amounts (₹)' },
  { regex: /One-Time|Monthly/i, fileCheck: 'DonationPage.tsx', desc: 'Transactional frequency buttons' },
  { regex: /ketakiadhar\.(com|org)/, desc: 'Legacy non-.in email domain' }
];

for (const file of files) {
  if (!file.endsWith('.tsx')) continue;
  const content = fs.readFileSync(`${pagesDir}/${file}`, 'utf8');

  for (const { regex, fileCheck, desc } of disallowedPatterns) {
    if (fileCheck && file !== fileCheck) continue;
    if (regex.test(content)) {
      console.error(`❌ Disallowed pattern [${desc}] found in ${file}!`);
      hasViolations = true;
    }
  }
}

if (hasViolations) {
  process.exit(1);
} else {
  console.log('✅ Content verification passed: zero prices, zero legacy emails in pages.');
}

