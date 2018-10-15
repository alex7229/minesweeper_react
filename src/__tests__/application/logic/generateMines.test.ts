import * as seedRandom from "seedrandom";
import { generateEmptyField } from "../../../application/logic/generateEmptyField";
import { generateMines } from "../../../application/logic/generateMines";

it("should generate mines for 60 by 60 field consistently", () => {
  const seed = "mis";
  const firstRun = generateMines(60, 60, 3500, seed, seedRandom);
  const secondRun = generateMines(60, 60, 3500, seed, seedRandom);
  expect(firstRun).toEqual(secondRun);
});

it("shouuld return proper amount of mines", () => {
  const mines = generateMines(25, 25, 300, "hi", seedRandom);
  expect(mines.length).toBe(300);
});

it("should generate only mines from field bounds", () => {
  const mines = generateMines(25, 25, 300, "sdf", seedRandom);
  expect(
    mines.every(
      position =>
        position.row >= 0 &&
        position.row < 25 &&
        position.column >= 0 &&
        position.column < 25
    )
  ).toBe(true);
});

it("should not generate the same mines", () => {
  const mines = generateMines(100, 100, 9500, "gas", seedRandom);
  const field = generateEmptyField(100, 100);
  for (const mine of mines) {
    expect(field[mine.row][mine.column].isMine).toBe(false);
    // @ts-ignore
    field[mine.row][mine.column].isMine = true;
  }
});
