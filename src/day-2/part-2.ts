import fs from "fs";
import path from "path";
import readline from "readline";

import { sumValues } from "../utils";

const fileStream = fs.createReadStream(
  path.join(__dirname, "../../src/day-2/input.txt")
);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => processLine(line));
rl.on("close", () => sumValues(powers));

const powers: number[] = [];

export function processLine(game: string) {
  let fewestRed = 0;
  let fewestGreen = 0;
  let fewestBlue = 0;

  const handfuls = game
    .split(":")[1]
    .trim()
    .split("; ")
    .map((handful) => handful.split(", "));

  for (const handful of handfuls) {
    for (const cubes of handful) {
      const colAndNum = cubes.split(" ");
      const number = Number(colAndNum[0]);
      const colour = colAndNum[1];

      switch (colour) {
        case "red":
          if (number > fewestRed) {
            fewestRed = number;
          }
          break;
        case "green":
          if (number > fewestGreen) {
            fewestGreen = number;
          }
          break;
        case "blue":
          if (number > fewestBlue) {
            fewestBlue = number;
          }
          break;
        default:
          console.error(game);
          console.error("cubes:", cubes);
          console.error("colAndNum:", colAndNum);
          throw new Error(`Unknown colour: ${colour}`);
      }
    }
  }

  const power = fewestRed * fewestGreen * fewestBlue;

  powers.push(power);
}
