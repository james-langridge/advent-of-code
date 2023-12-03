import path from "path";
import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream(path.join(__dirname, '../../src/day-1/input.txt'));
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const calibrationValues: number[] = []
const numberStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const numberMap = new Map([
    ["one", '1'],
    ["two", '2'],
    ["three", '3'],
    ["four", '4'],
    ["five", '5'],
    ["six", '6'],
    ["seven", '7'],
    ["eight", '8'],
    ["nine", '9'],
]);

export function processLine(line: string) {
    const indexMap = new Map()
    let calibrationValue = 0

    numberStrings.forEach(num => {
        if (line.includes(num)) {
            let prevIndex = line.indexOf(num)
            indexMap.set(prevIndex, numberMap.get(num))

            while (line.indexOf(num, prevIndex + 1) !== -1) {
                prevIndex = line.indexOf(num, prevIndex + 1)
                indexMap.set(prevIndex, numberMap.get(num))
            }
        }
    })

    for (let char of line) {
        if (Number.isInteger(Number(char))) {
            let prevIndex = line.indexOf(char)
            indexMap.set(prevIndex, char)

            while (line.indexOf(char, prevIndex + 1) !== -1) {
                prevIndex = line.indexOf(char, prevIndex + 1)
                indexMap.set(prevIndex, char)
            }
        }
    }

    const sortedMap = new Map([...indexMap.entries()].sort((a, b) => a[0] - b[0]));
    const values = Array.from(sortedMap.values())

    if (values.length === 1) {
        calibrationValue = Number(values[0] + values[0])
        calibrationValues.push(calibrationValue)
    } else {
        const firstNum = values.shift()
        const lastNum = values.pop()

        if (firstNum && lastNum) {
            calibrationValue = Number(firstNum + lastNum)
            calibrationValues.push(calibrationValue)
        }
    }

    return calibrationValue
}

export function sumValues(values: number[]) {
    const sum = values.reduce((prev, cur) => {
        return prev + cur
    }, 0)

    console.log('Sum of all the calibration values:', sum)
}

rl.on('line', (line) => {
    processLine(line)
});

rl.on('close', () => {
    sumValues(calibrationValues)
});