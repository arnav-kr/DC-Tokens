import { sign } from "../src"

test("Normal Sign", () => {
  expect(
    sign(
      "payload",
      "secret",
      {
        timestamp: new Date("2022")
      }
    )
  ).toEqual("cGF5bG9hZA.DSsLgA.nUToGBqu_K9WK1blkgfu7dynVkxyTgkjTU5TmG2Uwgw");

  expect(
    sign(
      "payload",
      "secret",
      {
        timestamp: new Date("2022"),
        epoch: new Date("2022").getTime()
      }
    )
  ).toEqual("cGF5bG9hZA.AAAAAA.nUToGBqu_K9WK1blkgfu7dynVkxyTgkjTU5TmG2Uwgw");
})

test("Errors", () => {
  expect(() => {
    sign(
      "payload",
      "secret",
      {
        timestamp: new Date("10000"),
        epoch: new Date("2022").getTime()
      }
    )
  }).toThrowError(
    "Timestamp must not be 0, less than 0, or greater than 3788478847"
  );

  expect(() => {
    sign(
      "",
      "secret",
      {
        timestamp: new Date("2022")
      }
    )
  }).toThrowError(
    "payload cannot be empty"
  )
})