import { sign } from "../src"

test("Normal Sign", () => {
  // Signing with a timestamp
  expect(
    sign(
      "payload",
      "secret",
      {
        timestamp: new Date("2022")
      }
    )
  ).toEqual("cGF5bG9hZA.DSsLgA.2-VCgm3zhf0JyqTDEJ3a9wvNPi_sCwhpEUwaP2kdViI");

  // Signing with timestamp ad custom epoch
  expect(
    sign(
      "payload",
      "secret",
      {
        timestamp: new Date("2022"),
        epoch: new Date("2022").getTime()
      }
    )
  ).toEqual("cGF5bG9hZA.AAAAAA.rtZx5pp4bqUPRFh1fMmoofm3Wiq3BwLNRlVUTSrcGpU");
})

test("Errors", () => {
  // Timestamp Out of Range
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

  // Empty Payload
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