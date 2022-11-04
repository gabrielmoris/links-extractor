const fs = require("fs");

const jsonMaker = (results) => {
  const stringedObj = JSON.stringify(results, null, 8);
  fs.writeFileSync("./results.json", stringedObj);
};

module.exports = { jsonMaker };
