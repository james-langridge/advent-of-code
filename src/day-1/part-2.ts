import path from "path";
import fs from 'fs';
import readline from 'readline';
import {sumValues} from "../utils";

const fileStream = fs.createReadStream(path.join(__dirname, '../../src/day-1/input.txt'));
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => processLine(line));
rl.on('close', () => sumValues(calibrationValues));

const calibrationValues: number[] = []
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

    for (const key of numberMap.keys()) {
        if (line.includes(key)) {
            let prevIndex = line.indexOf(key)
            indexMap.set(prevIndex, numberMap.get(key))

            while (line.indexOf(key, prevIndex + 1) !== -1) {
                prevIndex = line.indexOf(key, prevIndex + 1)
                indexMap.set(prevIndex, numberMap.get(key))
            }
        }
    }

    for (const char of line) {
        if (Number.isInteger(Number(char))) {
            let prevIndex = line.indexOf(char)
            indexMap.set(prevIndex, char)

            while (line.indexOf(char, prevIndex + 1) !== -1) {
                prevIndex = line.indexOf(char, prevIndex + 1)
                indexMap.set(prevIndex, char)
            }
        }
    }

    const sortedMap = new Map([...indexMap].sort((a, b) => a[0] - b[0]));
    const values = [...sortedMap.values()]

    if (values.length === 1) {
        calibrationValue = Number(values[0] + values[0])
    } else {
        calibrationValue = Number(values[0] + values[values.length - 1])
    }

    calibrationValues.push(calibrationValue)

    return calibrationValue
}
