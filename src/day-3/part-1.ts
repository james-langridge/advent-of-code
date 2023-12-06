import fs from "fs";
import path from "path";
import readline from "readline";

import { sumValues } from "../utils";

const fileStream = fs.createReadStream(
  path.join(__dirname, "../../src/day-3/input.txt")
);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => parseLine(line));
rl.on("close", () => {
  processLines();
  sumValues(partNums);
});

const partNums: number[] = [];
const lines: string[] = [];

function parseLine(line: string) {
  lines.push(line);
}

function processLines() {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j <= lines[i].length; j++) {
      const char = lines[i][j];

      let isAdjacentSymbol = false;

      let N = "";
      let NE = "";
      let E = "";
      let SE = "";
      let S = "";
      let SW = "";
      let W = "";
      let NW = "";

      if (i > 0) {
        N = lines[i - 1][j];

        if (j > 0) {
          NW = lines[i - 1][j - 1];
        }

        if (j < lines[i].length - 1) {
          NE = lines[i - 1][j + 1];
        }
      }

      if (i < lines.length - 1) {
        S = lines[i + 1][j];

        if (j > 0) {
          SW = lines[i + 1][j - 1];
        }

        if (j < lines[i].length - 1) {
          SE = lines[i + 1][j + 1];
        }
      }

      if (j > 0) {
        W = lines[i][j - 1];
      }

      if (j < lines[i].length - 1) {
        E = lines[i][j + 1];
      }

      if (Number.isInteger(Number(char))) {
        const adjChars = [N, NE, E, SE, S, SW, W, NW];
        const isSymbol = /[^.\d]/g;

        for (const ch of adjChars) {
          if (ch && isSymbol.test(ch)) {
            isAdjacentSymbol = true;

            break;
          }
        }
      }

      if (isAdjacentSymbol) {
        let num = char;

        let prevIndex = j - 1;
        while (Number.isInteger(Number(lines[i][prevIndex]))) {
          num = lines[i][prevIndex] + num;
          prevIndex--;
        }

        let nextIndex = j + 1;
        while (Number.isInteger(Number(lines[i][nextIndex]))) {
          num = num + lines[i][nextIndex];
          nextIndex++;
        }

        partNums.push(Number(num));
        j = nextIndex - 1;
      }
    }
  }
}
