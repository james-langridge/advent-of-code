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
rl.on("close", () => sumValues(gameIds));

const gameIds: number[] = [];
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

export function processLine(game: string) {
  let isPossible = true;

  const handfuls = game
    .split(":")[1]
    .trim()
    .split("; ")
    .map((handful) => handful.split(", "));

  for (const handful of handfuls) {
    if (!isPossible) {
      return;
    }

    for (const cubes of handful) {
      if (!isPossible) {
        return;
      }

      const colAndNum = cubes.split(" ");
      const number = Number(colAndNum[0]);
      const colour = colAndNum[1];

      switch (colour) {
        case "red":
          isPossible = number <= maxRed;
          break;
        case "green":
          isPossible = number <= maxGreen;
          break;
        case "blue":
          isPossible = number <= maxBlue;
          break;
        default:
          console.error(game);
          console.error("cubes:", cubes);
          console.error("colAndNum:", colAndNum);
          throw new Error(`Unknown colour: ${colour}`);
      }
    }
  }

  if (isPossible) {
    const gameId = Number(game.split(":")[0].split(" ")[1]);
    gameIds.push(gameId);

    return gameId;
  }

  return;
}
