/**
 * This script finds "beautiful" card numbers that are valid according to the Luhn algorithm.
 * Categories include: Palindromes, Repeating Patterns, Sequential Runs, Mirror Halves, and Same Digits.
 */

// Luhn validation function
function checkLuhn(cardNumberString) {
  let sum = 0;
  // Read right-to-left
  let rev = cardNumberString.split('').map(Number).reverse();
  for (let i = 0; i < rev.length; i++) {
    let d = rev[i];
    // Double every second digit (odd indexes)
    if (i % 2 === 1) {
      d = d * 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

const beautifulNumbers = {
  "Palindromes": [],
  "Repeating Patterns": [],
  "Sequential Runs": [],
  "Mirror Halves": [],
  "All Same Digits": []
};

// 1. Find Palindromes (e.g. 1234567887654321)
let palCount = 0;
for (let i = 12340000; i <= 99999999 && palCount < 5; i++) {
  let s = i.toString();
  let pal = s + s.split('').reverse().join('');
  if (checkLuhn(pal)) {
    beautifulNumbers["Palindromes"].push(pal);
    palCount++;
  }
}

// 2. Find Repeating Patterns (e.g. 1234123412341234)
let repCount = 0;
for (let i = 1234; i <= 9999 && repCount < 5; i++) {
  let s = i.toString().repeat(4);
  if (checkLuhn(s)) {
    beautifulNumbers["Repeating Patterns"].push(s);
    repCount++;
  }
}

// 3. Find Sequential Runs
const sequences = [
  "1234567890123456",
  "2345678901234567",
  "3456789012345678",
  "4567890123456789",
  "5678901234567890"
];
for (let seq of sequences) {
  if (checkLuhn(seq)) {
    beautifulNumbers["Sequential Runs"].push(seq);
  }
}

// 4. Find Mirror Halves (e.g. 1234567812345678)
let mirrorCount = 0;
for (let i = 12345678; i <= 99999999 && mirrorCount < 5; i++) {
  let s = i.toString() + i.toString();
  if (checkLuhn(s)) {
    beautifulNumbers["Mirror Halves"].push(s);
    mirrorCount++;
  }
}

// 5. Find All Same Digits (e.g. 5555... or 8888...)
for (let d = 1; d <= 9; d++) {
  let s = d.toString().repeat(16);
  if (checkLuhn(s)) {
    beautifulNumbers["All Same Digits"].push(s);
  }
}

console.log("\n✨ BEAUTIFUL LUHN NUMBERS GENERATED ✨\n");
for (const [category, arr] of Object.entries(beautifulNumbers)) {
  console.log(`=== ${category} ===`);
  if (arr.length === 0) {
    console.log("  (None found)");
  } else {
    arr.forEach(num => console.log(`  ${num}`));
  }
  console.log("");
}
