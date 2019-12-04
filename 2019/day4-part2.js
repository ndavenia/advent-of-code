const isOrderedDigit = code =>
   !code.some((digit, index) => parseInt(digit) < parseInt(code[index - 1] || 0));

const atLeastOneDouble = code =>
   code.some((digit, index) =>
     digit === code[index - 1] && code[index -2] !== digit && code[index+1] !== digit
   );

const isValid = code => isOrderedDigit(code) && atLeastOneDouble(code);

const solveDay3 = (start, stop) => {
  let nb = 0;
  for(let i = start; i <= stop; i++) {
    if(isValid([...("" + i)])) {
      nb++;
    }
  }
  return nb;
};

console.log(solveDay3(183564,657474));
