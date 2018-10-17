import { generateSeed } from "../../application/logic/generateSeed";

it("should produce different seed every time", () => {
  const first = generateSeed(Math.random);
  const second = generateSeed(Math.random);
  const third = generateSeed(Math.random);
  expect(first).not.toBe(second);
  expect(first).not.toBe(third);
  expect(second).not.toBe(third);
});
