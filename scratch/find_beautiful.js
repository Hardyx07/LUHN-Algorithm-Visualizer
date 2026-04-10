function luhn(digits) {
  let sum = 0;
  let rev = [...digits].reverse();
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

// 1. Palindrome
for (let i = 10000000; i <= 99999999; i++) {
   let s = i.toString();
   let pal = s + s.split('').reverse().join(''); // 16 digits
   if (luhn(pal.split('').map(Number))) {
       console.log("Palindrome: " + pal);
       break;
   }
}

// 2. Repeating pattern 
for (let i = 1000; i <= 9999; i++) {
   let s = i.toString().repeat(4); // 16 digits
   if (luhn(s.split('').map(Number))) {
       console.log("Repeating: " + s);
       break;
   }
}

// 3. Sequential run  (needs 13 to 24 digits per validation rules)
for (let start = 1; start <= 9; start++) {
    for (let len = 13; len <= 16; len++) {
        let s = '';
        let d = start;
        for (let i = 0; i < len; i++) {
            s += (d % 10).toString();
            d++;
        }
        if (luhn(s.split('').map(Number))) {
            console.log("Sequential: " + s);
        }
    }
}

// 4. Mirror halves
// first 8 mirror last 8 means simply repeating an 8-digit sequence? "first 8 mirror last 8" implies half 1 equals half 2? Or reversed like palindrome?
// If "first 8 digits mirror last 8", usually it means AABB or ABAB? Wait. "mirror halves" -> 12345678 12345678? Or 12345678 87654321? 
// The user has Palindrome as 12344321, so mirror halves must be repeat ABCDABCD?
for (let i = 10000000; i <= 99999999; i++) {
   let s = i.toString() + i.toString(); // 16 digits
   if (luhn(s.split('').map(Number))) {
       console.log("Mirror halves: " + s);
       break;
   }
}

// 5. All same digit
for (let d = 0; d <= 9; d++) {
   for (let len = 13; len <= 16; len++) {
       let s = d.toString().repeat(len);
       if (luhn(s.split('').map(Number))) {
           console.log("Same digit: " + s);
       }
   }
}

// 6. Ascending + valid
// ... wait, Sequential run is ascending. What does ascending mean?
