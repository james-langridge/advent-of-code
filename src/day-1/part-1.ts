import path from "path";
import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream(path.join(__dirname, '../../src/day-1/input.txt'));
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const calibrationValues: number[] = []

rl.on('line', (line) => {
    let firstDigit, lastDigit = ''

    for (let char of line) {
        if (!firstDigit && Number.isInteger(Number(char))) {
            firstDigit = char
        }

        if (firstDigit && Number.isInteger(Number(char))) {
            lastDigit = char
        }
    }

    const calibrationValue = Number(firstDigit + lastDigit)
    calibrationValues.push(calibrationValue)
});

rl.on('close', () => {
    const sum = calibrationValues.reduce((prev, cur) => {
        return prev + cur
    }, 0)

    console.log('Sum of all the calibration values:', sum)
});
