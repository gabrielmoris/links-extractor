const fs = require("fs");
const date = new Date();
const jsonMaker = (results) => {
  const stringedObj = JSON.stringify(results, null, 8);
  fs.writeFileSync(`./results/links${date.toISOString()}.json`, stringedObj);
};

module.exports = { jsonMaker };
