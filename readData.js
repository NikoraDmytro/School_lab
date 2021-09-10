const readline = require("readline");

const rl = readline.createInterface(process.stdin);

const SETS_LIMIT = 4;

const enumeration = {
  1: "first",
  2: "second",
  3: "third",
  4: "universal ",
};

async function readData(callback) {
  const inputs = [];

  for await (const line of rl) {
    const index = inputs.length + 1;

    if (index <= SETS_LIMIT) {
      inputs.push(line);
    } else {
      const formula = line;

      callback(inputs, formula);
      rl.close();
    }
  }
}

module.exports = readData;
