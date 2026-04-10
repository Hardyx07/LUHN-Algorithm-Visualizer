function luhn(s) {
  let sum = 0;
  let rev = s.split('').map(Number).reverse();
  for (let i = 0; i < rev.length; i++) {
    let d = rev[i];
    if (i % 2 === 1) {
      d = d * 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

let results = {};

// 1. Palindrome (16 digit)
for (let i = 12345678; i <= 99999999; i++) {
   let s = i.toString();
   let pal = s + s.split('').reverse().join('');
   if (luhn(pal)) {
       results["Palindrome"] = pal;
       break;
   }
}
// Maybe a prettier palindrome? Like 5555... or 1234...
// Let's try to find 1234xxxx...
for (let i = 12340000; i <= 12349999; i++) {
   let s = i.toString();
   let pal = s + s.split('').reverse().join('');
   if (luhn(pal)) {
       results["Palindrome"] = pal;
       break; // e.g. 1234000550004321
   }
}

// 2. Repeating pattern (16 digit) ABCD ABCD ABCD ABCD
for (let i = 1234; i <= 9999; i++) {
   let s = i.toString().repeat(4);
   if (luhn(s)) {
       results["Repeating pattern"] = s;
       break;
   }
}

// 3. Sequential run (16 digit)
// Since 1234567890123456 doesn't work maybe? Wait, I saw 34567890123456 in earlier output.
let seq = "1234567890123456";
if (luhn(seq)) results["Sequential run"] = seq;
else {
    seq = "2345678901234567";
    if (luhn(seq)) results["Sequential run"] = seq;
    else {
        seq = "3456789012345678";
        if (luhn(seq)) results["Sequential run"] = seq;
        else {
            seq = "4567890123456789";
            if (luhn(seq)) results["Sequential run"] = seq;
        }
    }
}

// 4. Mirror halves (16 digit) ABCDEFGH ABCDEFGH
for (let i = 12345678; i <= 99999999; i++) {
   let s = i.toString() + i.toString();
   if (luhn(s)) {
       results["Mirror halves"] = s; // e.g. 1234567812345678
       break;
   }
}

// 5. All same digit (16 digit)
for (let d = 1; d <= 9; d++) {
   let s = d.toString().repeat(16);
   if (luhn(s)) {
       results["All same digit"] = s;
       break; // 8888888888888888
   }
}

console.log(JSON.stringify(results, null, 2));

