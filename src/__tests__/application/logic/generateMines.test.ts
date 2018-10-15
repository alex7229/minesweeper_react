import * as seedRandom from "seedrandom";
import { generateEmptyField } from "../../../application/logic/generateEmptyField";
import { generateMines } from "../../../application/logic/generateMines";

it("should generate mines for 60 by 60 field consistently", () => {
  const seed = "mis";
  const gameOptions = { width: 60, height: 60, mines: 3500 };
  const firstRun = generateMines(gameOptions, seed, seedRandom);
  const secondRun = generateMines(gameOptions, seed, seedRandom);
  expect(firstRun).toEqual(secondRun);
});

it("shouuld return proper amount of mines", () => {
  const mines = generateMines(
    { width: 25, height: 25, mines: 300 },
    "hi",
    seedRandom
  );
  expect(mines.length).toBe(300);
});

it("should generate only mines from field bounds", () => {
  const gameOptions = { width: 25, height: 20, mines: 300 };
  const mines = generateMines(gameOptions, "sdf", seedRandom);
  expect(
    mines.every(
      position =>
        position.row >= 0 &&
        position.row < gameOptions.height &&
        position.column >= 0 &&
        position.column < gameOptions.width
    )
  ).toBe(true);
});

it("should not generate the same mines", () => {
  const gameOptions = { width: 100, height: 100, mines: 9500 };
  const mines = generateMines(gameOptions, "gas", seedRandom);
  const field = generateEmptyField(gameOptions.width, gameOptions.height);
  for (const mine of mines) {
    expect(field[mine.row][mine.column].isMine).toBe(false);
    // @ts-ignore
    field[mine.row][mine.column].isMine = true;
  }
});
