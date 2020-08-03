"use strict";

require("core-js/modules/es.string.replace");

const chalk = require('chalk');

const csv = require('csvtojson');

const fs = require('fs');

console.log(chalk.bgBlue("Start Tast One - Subtask Two"));
const csvFilePath = 'TaskOne\\input\\nodejs-hw1-ex1.csv';
const txtFilePath = 'TaskOne\\output.txt';
const csvOptions = {
  output: 'cvs',
  noheader: false,
  delimiter: [";"],
  colParser: {
    Book: "string",
    Author: "string",
    Amount: "omit",
    Price: v => +v.replace(",", ".")
  },
  flatKeys: true
};
const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);
csv().on('error', err => console.log(err));
csv(csvOptions).fromStream(readStream).subscribe(j => writeStream.write(JSON.stringify(j) + "\n"));