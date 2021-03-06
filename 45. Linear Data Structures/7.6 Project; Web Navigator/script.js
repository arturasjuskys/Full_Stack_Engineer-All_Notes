const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------

// 1.
const backPages = new Stack();
const nextPages = new Stack();
// 2.
let currentPage = 'Home Page';

// ------------------------------
// Helper Functions
// ------------------------------

// 3.
showCurrentPage = action => {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log(`Back page = ${backPages.peek()}`);
  console.log(`Next page = ${nextPages.peek()}`);
};
// 4.
newPage = page => {
  backPages.push(currentPage);
  currentPage = page;

  // Clear the nextPages stack
  while(!nextPages.isEmpty) {
    nextPages.pop();
  };
  showCurrentPage('NEW: ');
};
// 5.
backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage('BACK: ');
};
// 6.
nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPage.pop();
  showCurrentPage('NEXT: ');
};

/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------

// 7.
let finish = false;
// 8.
let showBack = false;
let showNext = false;
// 9.
showCurrentPage('DEFAULT: ');
// 10.
while (finish === false) {
  // 11.
  let instructions = baseInfo;
  if (backPages.peek() != null) {
    instructions += ', ' + backInfo;
    showBack = true;
  } else {
    showBack = false;
  };
  // 12.
  if (nextPages.peek() != null) {
    instructions = `${instructions}, ${nextInfo}`;
    showNext = true;
  } else {
    showNext = false;
  };
  // 13
  instructions = `${instructions}, ${quitInfo}.`;
  console.log(instructions);
  // 14.
  const answer = prompt(question);
  // 15.
  const lowerCaseAnswer = answer.toLowerCase();
  // 16.
  if ((lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'q')) {
    newPage(answer);
    // 17.
  } else if ((showNext === true) && (lowerCaseAnswer === 'n')) {
    nextPage();
  } else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
    backPage();
    // 18.
  } else if (lowerCaseAnswer === 'b') {
    console.log('Cannot go back a page. Stack is empty.');
  } else if (lowerCaseAnswer === 'n') {
    console.log('Cannot go to hte next page. Stack is empty.');
    // 19.
  } else if (lowerCaseAnswer === 'q') {
    finish = true;
  };
};
