class Calculator {
  constructor(prevOperandText, currOperandText) {
    this.prevOperandText = prevOperandText;
    this.currOperandText = currOperandText;
    this.clear();
  }
  
  
  clear() {
    this.prevOperand = "";
    this.currOperand = "";
    this.operator = undefined;
  }
  
  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1)
  }

  chooseOperator(operator) {
    if (this.currOperand === '') return;
    if (this.prevOperand !== '') {
      this.compute();
    }
    this.operator = operator;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  compute() {
    let compute;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch(this.operator){
      case '+':
        compute = prev + curr;
        break;
      case '-':
        compute = prev - curr;
        break;
      case '*':
        compute = prev * curr;
        break;
      case '÷':
        compute = prev / curr;
        break;
      default:
        return;
    }   
    this.currOperand = compute;
    this.operator = undefined;
    this.prevOperand = '';
  }

  appendNumber(number) {
    if (number === '.' && this.currOperand.includes('.')) return
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  getDisplayNumber(number) {
    const stringNum = number.toString();
    const integerDigit = parseFloat(stringNum);
    let integerDisplay;
    if (isNaN(integerDigit)){
      integerDisplay = '';
    } else {
      integerDisplay = parseFloat(stringNum).toLocaleString('en', {maximumFractionDigits: 0});
    }
    return integerDisplay;
  }

  updateDisplay() {
    this.currOperandText.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operator != null) {
      this.prevOperandText.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operator}`;
    } else {
      this.prevOperandText.innerText = "";
    }
  }
}

const numButtons = document.getElementsByClassName("num");
const operatorButtons = document.getElementsByClassName("operator");
const equal = document.getElementById("equal");
const allClear = document.getElementById("all-clear");
const del = document.getElementById("delete");
const prevOperandText = document.getElementById("prev-operand");
const currOperandText = document.getElementById("curr-operand");

const calculator = new Calculator(prevOperandText, currOperandText);

for(let num of numButtons){
  num.addEventListener("click", () => {
    console.log("Clicked");
    calculator.appendNumber(num.innerText);
    calculator.updateDisplay();
  })
}
for(let operator of operatorButtons){
  operator.addEventListener("click", () => {
    console.log("Clicked");
    calculator.chooseOperator(operator.innerText);
    calculator.updateDisplay();
  })
}
equal.addEventListener("click", () => {
  console.log("clicked")
  calculator.compute();
  calculator.updateDisplay();
})
allClear.addEventListener("click", () => {
  console.log("clicked")
  calculator.clear();
  calculator.updateDisplay();
})
del.addEventListener("click", () => {
  console.log("clicked")
  calculator.delete();
  calculator.updateDisplay();
})