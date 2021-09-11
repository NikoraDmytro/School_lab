const [union, intersection, difference, complement] = require("./functions.js");
const readData = require("./readData.js");

const SETS_LIMIT = 3;

const sets = {
  A: 0,
  B: 1,
  C: 2,
};

const operations = {
  n: { func: complement, priority: 4 },
  I: { func: intersection, priority: 3 },
  U: { func: union, priority: 2 },
  "\u005C": { func: difference, priority: 1 },
};

function doTheOperations(allSets, parsedFormula) {
  const stack = [];

  parsedFormula.forEach((element) => {
    if (element === "n") {
      const last = stack.pop();
      const universal = allSets[SETS_LIMIT - 1];

      stack.push(complement(last, universal));
    } else if (operations[element]) {
      const y = stack.pop();
      const x = stack.pop();

      stack.push(operations[element].func(x, y));
    } else {
      const setNumber = sets[element];

      stack.push(allSets[setNumber]);
    }
  });

  return stack[0];
}

const polishNotation = (formula) => {
  const result = [];
  const stack = [];

  for (const element of formula) {
    if (operations[element]) {
      while (stack.length) {
        const last = stack[stack.length - 1];

        if (
          last == "(" ||
          operations[element].priority >= operations[last].priority
        ) {
          break;
        }

        result.push(stack.pop());
      }

      stack.push(element);
    }
    if (element === "(") {
      stack.push(element);
    }
    if (element === ")") {
      while (stack.length) {
        const last = stack.pop();

        if (last === "(") {
          break;
        }

        result.push(last);
      }
    }
    if (sets[element] != undefined) {
      result.push(element);
    }
  }

  while (stack.length) {
    result.push(stack.pop());
  }

  return result;
};

function launchCalculations(allSets, formulaWithSpaces) {
  const formula = formulaWithSpaces.replace(/ +/g, "");

  const parsedFormula = polishNotation(formula);
  const result = doTheOperations(allSets, parsedFormula);

  return result;
}

function main(inputs, formula) {
  const allSets = [...inputs];

  const result = launchCalculations(allSets, formula);

  console.log("\nRESULT:");
  console.log(`{${result}}`);
}

readData(main);
