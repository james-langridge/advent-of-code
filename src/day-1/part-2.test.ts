import {
    describe,
    expect,
    test,
} from "@jest/globals";
import {processLine} from "./part-2";
import {sumValues} from "../utils";

const expectedValues = [12, 38, 15, 77, 29, 83, 13, 24, 42, 14, 76]
const expectedSum = 423

describe("Day 1 part 2", () => {
    test("processLine() should correctly process the input", () => {
        const input = [
            '1abc2',
            'qr3stu8vwx',
            'a1b2c3d4e5f',
            'treb7uchet',
            'two1nine',
            'eightwothree',
            'abcone2threexyz',
            'xtwone3four',
            '4nineeightseven2',
            'zoneight234',
            '7pqrstsixteen'
        ]

        const results: number[] = []

        input.forEach(line => {
            results.push(processLine(line))
        })

        expect(results).toEqual(expectedValues);
    })

    test("sumValues() should correctly sum the values", () => {
        const sum = sumValues(expectedValues)

        expect(sum).toEqual(expectedSum);
    })
});