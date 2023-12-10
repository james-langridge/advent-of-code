import fs from "fs";
import path from "path";
import readline from "readline";

import { sumValues } from "../utils";

const fileStream = fs.createReadStream(
  path.join(__dirname, "../../src/day-4/input.txt")
);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => parseLine(line));
rl.on("close", () => {
  sumValues(allPoints);
});

const allPoints: number[] = [];

function parseLine(line: string) {
  const card = line.split(":");
  const numbers = card[1].trim().split("|");
  const winningNumbers = numbers[0].trim().split(" ").filter(Boolean);
  const ourNumbers = numbers[1].trim().split(" ").filter(Boolean);
  let matches = 0;

  winningNumbers.forEach((num: string) => {
    if (ourNumbers.includes(num)) {
      matches++;
    }
  });

  let points = 0;

  for (let i = 0; i < matches; i++) {
    if (i === 0) {
      points = 1;
      continue;
    }

    points = points * 2;
  }

  allPoints.push(points);
}
