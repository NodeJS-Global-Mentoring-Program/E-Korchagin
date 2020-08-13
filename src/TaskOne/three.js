import chalk from "chalk";
import csv from "csvtojson";
import fs from "fs";

console.log(chalk.bgBlue("Start Tast One - Subtask Two"));

const csvFilePath = 'src\\TaskOne\\input\\nodejs-hw1-ex1.csv';
const txtFilePath = 'src\\TaskOne\\output.txt';

const csvOptions = {
  noheader: false,
  delimiter: [";"],
  colParser: {
    Book: "string",
    Author: "string",
    Amount: "omit",
    Price: v => +v.replace(",", "."),
  }
}

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

csv().on('error', err => console.log(err));
csv(csvOptions)
  .fromStream(readStream)
  .subscribe(j => writeStream.write(JSON.stringify(j) + "\n"))