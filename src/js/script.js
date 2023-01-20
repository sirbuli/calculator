const displayInput = document.querySelector('.display_input');
const displayOutput = document.querySelector('.display_output');
const keys = document.querySelectorAll('.key');

let input = '';

keys.forEach(key => key.addEventListener('click', handleClick));

function handleClick() {
  const value = this.dataset.key;
  switch (value) {
    case 'clear':
      clearAll();
      break;

    case 'brackets':
      addBrackets();
      break;

    case 'backspace':
      backSpace();
      break;

    case '=':
      showResult();
      break;

    case '.':
      if (displayInput.innerHTML === '') {
        displayInput.innerHTML = '0.';
      } else if (validateInput()) {
        input += value;
      }
      break;

    default:
      if (validateInput(value)) {
        input += value;
      }
      break;
  }
  displayInput.innerHTML = cleanInput(input);
}

const charMap = {
  '*': '<span class="operator">x</span>',
  '/': '<span class="operator">÷</span>',
  '+': '<span class="operator">+</span>',
  '-': '<span class="operator">-</span>',
  '(': '<span class="operator">(</span>',
  ')': '<span class="operator">)</span>',
  '%': '<span class="operator">%</span>',
};

function cleanInput(input) {
  return [...input].map(char => charMap[char] || char).join('');
}

function validateInput(value) {
  let lastInput = input.slice(-1);
  let operators = ['+', '-', '/', '*', '%', '(', ')'];

  if (value === '.' && lastInput === '.') {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(lastInput)) {
      return false;
    }
  }
  return true;
}

function clearAll() {
  input = '';
  displayInput.innerHTML = '';
  displayOutput.innerHTML = '';
}

function addBrackets() {
  if (
    input.indexOf('(') === -1 ||
    (input.indexOf('(') !== -1 &&
      input.indexOf(')') !== -1 &&
      input.lastIndexOf('(') < input.lastIndexOf(')'))
  ) {
    input += '(';
  } else if (
    (input.indexOf('(') !== -1 && input.indexOf(')' === -1)) ||
    (input.indexOf('(') !== -1 &&
      input.indexOf(')') !== -1 &&
      input.lastIndexOf('(') > input.lastIndexOf(')'))
  ) {
    input += ')';
  }
  displayInput.innerHTML = cleanInput(input);
  return input;
}

function percentInput(input) {
  let inputArray = [...input];
  inputArray.forEach((input, i) => {
    if (input === '%') {
      inputArray[i] = '/100';
    }
  });
  return inputArray.join('');
}

function backSpace() {
  input = input.slice(0, -1);
  displayInput.innerHTML = cleanInput(input);
}

function showResult() {
  let result = new Function('return ' + percentInput(input))();

  displayOutput.innerHTML = result;
}
