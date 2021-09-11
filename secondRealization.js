const [union, intersection, difference, complement] = require("./functions.js");
const readData = require("./readData.js");

const SETS_LIMIT = 4;

const sets = {
  A: 0,
  B: 1,
  C: 2,
};

const operations = {
  I: intersection,
  U: union,
  "-": difference,
};

function doTheOperations(formula) {
  Object.entries(operations).forEach(([key, operation]) => {
    while (true) {
      if (formula.indexOf(key) === -1) {
        break;
      }

      const operationIndex = formula.indexOf(key);
      const firstSet = formula[operationIndex - 1];
      const secondSet = formula[operationIndex + 1];
      const newSet = operation(firstSet, secondSet);

      formula.splice(operationIndex - 1, 3, newSet);
    }
  });

  const result = formula[0];
  return result;
}

function launchCalculations(allSets, formulaWithSpaces) {
  const formula = formulaWithSpaces.replace(/ +/g, "");

  let index = -1;

  const parseFormula = () => {
    const parsedFormula = [];

    while (true) {
      index = index + 1;

      if (index >= formula.length || formula[index] === ")") {
        return parsedFormula;
      }

      const element = formula[index];

      if (sets[element] !== undefined) {
        const setNumber = sets[element];

        parsedFormula.push(allSets[setNumber]);
      }
      if (operations[element]) {
        parsedFormula.push(element);
      }
      if (element === "(") {
        const parsedBrackets = parseFormula();
        const resultInBrackets = doTheOperations(parsedBrackets);

        parsedFormula.push(resultInBrackets);
      }
      if (element === "n") {
        index = index + 1;

        const parsedBrackets = parseFormula();
        const resultInBrackets = doTheOperations(parsedBrackets);
        const complementResult = complement(
          resultInBrackets,
          allSets[SETS_LIMIT - 1]
        );

        parsedFormula.push(complementResult);
      }
    }
  };

  const parsedFormula = parseFormula();
  const result = doTheOperations(parsedFormula);

  return result;
}

function main(inputs, formula) {
  const allSets = [...inputs];

  const result = launchCalculations(allSets, formula);

  console.log("RESULT:");
  console.log(`{${result}}`);
}

readData(main);
