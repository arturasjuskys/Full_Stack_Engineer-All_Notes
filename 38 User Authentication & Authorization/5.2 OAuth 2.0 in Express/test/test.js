console.log = function() {};
const rewire = require('rewire');
const { assert, expect } = require('chai');
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('app.js', 'utf8');

describe('', function () {
  it('', function() {
    let appModule
    try {
      appModule = rewire('../app.js');
    } catch(e) {
      expect(true, 'Try checking your code again. You likely have a syntax error.').to.equal(false);
    }

    // Test that the variable was declared
    let learnerVariableName = 'obtainToken()';
    let varLearnerDeclares
    try {
        varLearnerDeclares = appModule.__get__('obtainToken');
    } catch (e) {
        expect(true, 'Did you declare a `obtainToken` function?').to.equal(false);
    }

    // Make assertions about the variable value
    expect(varLearnerDeclares, `Did you declare the \`${learnerVariableName}\` variableas the correct type?`).to.be.a('function');

    // Make assertions about the structure of the code
    let structureOne = function() {
      const obtainToken = () => {}
    };

    let isMatchOne = Structured.match(varLearnerDeclares.toString(), structureOne)

    assert.isOk(isMatchOne, `Did you declare \`${learnerVariableName}\` as an arrow function using the \`const\` keyword?`)
  });
});
