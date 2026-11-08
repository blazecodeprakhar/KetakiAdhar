import fs from 'node:fs';

const fileContent = fs.readFileSync('src/translations/translations.ts', 'utf8');

// Basic validation that all 4 language dictionaries are declared
const requiredLangs = ['en', 'mr', 'kn', 'hi'];
let allPresent = true;

for (const lang of requiredLangs) {
  const regex = new RegExp(`\\b${lang}:\\s*\\{`);
  if (!regex.test(fileContent)) {
    console.error(`❌ Language key "${lang}" is missing in translations.ts!`);
    allPresent = false;
  } else {
    console.log(`✅ Language dictionary "${lang}" found.`);
  }
}

if (!allPresent) {
  process.exit(1);
} else {
  console.log('🎉 All 4 localization dictionaries verified successfully.');
}

