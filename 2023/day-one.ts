import * as fs from 'fs';
import * as readline from 'readline';

//Values here are hacky because oneight would need to be replaced with 
//18 but if I replace "one" with 1 it wipes out the e and 8 isn't picked up on
const digitMap = new Map<string, string>([
    ['one', "o1e"], 
    ['two', "t2o"],
    ['three', "t3e"],
    ['four', "f4r"],
    ['five', "f5e"],
    ['six', "s6x"],
    ['seven', "s7n"],
    ['eight', "e8t"],
    ['nine', "n9e"]
]);

const filePath: string = 'aoc-input-1.txt'; // Replace with your file path
let totalSum: number = 0; // Initialize the variable to accumulate data

// Create a readable stream for the file
const fileStream = fs.createReadStream(filePath, 'utf8');

// Create a readline interface
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Detects all line terminators (\n, \r, or \r\n)
});

// Event listener for each line
rl.on('line', (line: string) => {
    let firstDigit: number = 0;
    let secondDigit: number = 0;

    digitMap.forEach((value, key) => {
        const regex = new RegExp(key, 'g');
        line = line.replace(regex, value);
    });

    // Get the first digit, stop iterating once we've found it
    for (let i = 0; i < line.length; i++) {
        if (!isNaN(parseInt(line[i]))) {
            firstDigit = parseInt(line[i]);
            break;
        }
    }

    // Get the second digit, stop iterating once we've found it
    for (let i = line.length - 1; i >= 0; i--) {
        if (!isNaN(parseInt(line[i]))) {
            secondDigit = parseInt(line[i]);
            break;
        }
    }

    let lineSum: number =  ((firstDigit * 10) + secondDigit);
    totalSum += lineSum;
});

// Event listener for the end of the file
rl.on('close', () => {
    console.log(`Total Sum: ${totalSum}`);
    console.log('Finished reading and calculating.');
});
