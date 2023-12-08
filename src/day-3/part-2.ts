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
  sumValues(gearRatios);
});

const gearRatios: number[] = [];
const lines: string[] = [];

function isDigit(char: string | undefined) {
  return Number.isInteger(Number(char));
}

function parseLine(line: string) {
  lines.push(line);
}

function processLines() {
  // Iterate lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split("");

    // Iterate characters
    for (let j = 0; j <= line.length; j++) {
      const isAsterisk = /[*]/g;
      const char = line[j];

      if (!isAsterisk.test(char)) {
        continue;
      }

      const grid = getSurroundingGrid(i, j);
      let isDigitInGrid = false;

      for (const row of grid) {
        isDigitInGrid = row.some((cell) => isDigit(cell?.value));

        if (isDigitInGrid) break;
      }

      if (!isDigitInGrid) {
        continue;
      }

      const partNumbers = [];

      for (let i = 0; i < grid.length; i++) {
        // Grid row
        if (partNumbers.length > 2) break;

        const row = grid[i];

        for (let j = 0; j < row.length; j++) {
          if (partNumbers.length > 2) break;

          const cell = row[j];
          // Cell
          if (cell?.value && isDigit(cell.value)) {
            const { i, j: cellJ } = cell;
            const row = lines[i];
            let num = row[cellJ];

            let prevIndex = cellJ - 1;
            while (isDigit(row[prevIndex])) {
              num = row[prevIndex] + num;
              prevIndex--;
            }

            let nextIndex = cellJ + 1;
            while (isDigit(row[nextIndex])) {
              num = num + row[nextIndex];
              nextIndex++;
            }

            partNumbers.push(Number(num));
            j = j + (nextIndex - cell.j);
          }
        }
      }

      if (partNumbers.length !== 2) {
        // Not a valid gear
        continue;
      }

      if (partNumbers.length === 2) {
        const gearRatio = partNumbers[0] * partNumbers[1];
        gearRatios.push(gearRatio);
      }
    }
  }
}

function getSurroundingGrid(i: number, j: number) {
  const cells = [];

  // First row

  if (i > 0) {
    const firstRow = [];
    if (j > 0) {
      // NW
      firstRow.push({
        i: i - 1,
        j: j - 1,
        value: lines[i - 1][j - 1],
      });
    } else {
      firstRow.push(undefined);
    }

    // N
    firstRow.push({
      i: i - 1,
      j: j,
      value: lines[i - 1][j],
    });

    if (j < lines[i].length - 1) {
      // NE
      firstRow.push({
        i: i - 1,
        j: j + 1,
        value: lines[i - 1][j + 1],
      });
    } else {
      firstRow.push(undefined);
    }

    cells.push(firstRow);
  } else {
    cells.push([undefined, undefined, undefined]);
  }

  // Second row

  const secondRow = [];

  if (j > 0) {
    // W
    secondRow.push({
      i: i,
      j: j - 1,
      value: lines[i][j - 1],
    });
  } else {
    secondRow.push(undefined);
  }

  secondRow.push({
    i: i,
    j: j,
    value: lines[i][j],
  });

  if (j < lines[i].length - 1) {
    // E
    secondRow.push({
      i: i,
      j: j + 1,
      value: lines[i][j + 1],
    });
  } else {
    secondRow.push(undefined);
  }

  cells.push(secondRow);

  // Third row

  if (i < lines.length - 1) {
    const thirdRow = [];
    if (j > 0) {
      // SW
      thirdRow.push({
        i: i + 1,
        j: j - 1,
        value: lines[i + 1][j - 1],
      });
    } else {
      thirdRow.push(undefined);
    }

    // S
    thirdRow.push({
      i: i + 1,
      j: j,
      value: lines[i + 1][j],
    });

    if (j < lines[i].length - 1) {
      // SE
      thirdRow.push({
        i: i + 1,
        j: j + 1,
        value: lines[i + 1][j + 1],
      });
    } else {
      thirdRow.push(undefined);
    }

    cells.push(thirdRow);
  } else {
    cells.push([undefined, undefined, undefined]);
  }

  return cells;
}
