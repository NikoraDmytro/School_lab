const readline = require("readline");
const [union] = require("./functions.js");

const rl = readline.createInterface(process.stdin);

const SETS_LIMIT = 3;

const setRequest = (setName) => `Type in elements of the set ${setName}:`;

const logs = {
  0: setRequest("A"),
  1: setRequest("B"),
  2: setRequest("C"),
  3: `Enter the set names and the actions you want to perform to them:
  U - union
  I - intersection
  \u005C - difference
  n - complement 
  () - brackets`,
};

const normalize = (line) => {
  return line.trim().replace(/ +/g, " ").split(" ");
};

async function readData(callback) {
  const inputs = [];

  console.log(logs[0]);
  for await (const line of rl) {
    const index = inputs.length;

    if (index < SETS_LIMIT - 1) {
      inputs.push(normalize(line));
    } else if (index === SETS_LIMIT - 1) {
      inputs.push(normalize(line));
      const universalSet = inputs.reduce((accumulator = [], input) =>
        union(accumulator, input)
      );

      console.log("\nYour sets:");
      inputs.forEach((input) => console.log(`{${input}}`));
      console.log("Universal set:");
      console.log(`{${universalSet}}`);
    } else {
      const formula = line;

      rl.close();
      callback(inputs, formula);
      return;
    }

    console.log(logs[inputs.length]);
  }
}

module.exports = readData;
