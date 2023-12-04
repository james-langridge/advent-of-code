import { describe, expect, test } from "@jest/globals";

import { processLine } from "./part-1";
import { sumValues } from "../utils";

const expectedValues = [1, 2, 5];
const expectedSum = 8;

describe("Day 1 part 2", () => {
  test("processLine() should correctly process the input", () => {
    const input = [
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    ];

    const results: number[] = [];

    input.forEach((line) => {
      const value = processLine(line);

      if (value) {
        results.push(value);
      }
    });

    expect(results).toEqual(expectedValues);
  });

  test("sumValues() should correctly sum the values", () => {
    const sum = sumValues(expectedValues);

    expect(sum).toEqual(expectedSum);
  });
});
