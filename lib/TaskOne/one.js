"use strict";

require("core-js/modules/es.array.reverse");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

const chalk = require('chalk');

console.log(chalk.bgBlue("Start Tast One - Subtask One"));
process.stdin.setEncoding("utf-8");
process.stdin.on("data", a => {
  const res = a.trim().split("").reverse().join("");
  res.length && process.stdout.write(res + "\n\n");
});