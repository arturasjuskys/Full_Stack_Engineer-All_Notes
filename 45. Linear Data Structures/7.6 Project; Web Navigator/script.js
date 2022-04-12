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

  // ------------------------------
  // User Interface Part 2
  // ------------------------------
