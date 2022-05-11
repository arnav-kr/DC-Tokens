import { verify } from "../src";

test("Normal Verify", () => {
  expect(verify(
    "dGVzdGluZyB0b2tlbnM.DSsLgA.9XVPSExnS0ZWD9c1IXv-AJ8t4mY9gNv8qNjk2HsTBkA",
    "test"
  )).toEqual({
    "payload": "testing tokens",
    "signature": "9XVPSExnS0ZWD9c1IXv-AJ8t4mY9gNv8qNjk2HsTBkA",
    "timestamp": new Date("2022")
  });
})

test("Invalid Signature", () => {
  expect(() => {
    verify(
      "dGVzdGluZyB0b2tlbnM.DSsLgA.9XVPSExnS0ZWD9c1IXv-AJ8t4mY9gNv8qNjk2HsTBkA_INVALID_THING",
      "test"
    )
  }).toThrowError(
    "invalid signature"
  );
});

test("Malformed Token", () => {
  expect(() => {
    verify(
      "dGVzdGluZyB0b2tlbnM..9XVPSExnS0ZWD9c1IXv-AJ8t4mY9gNv8qNjk2HsTBkA",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  expect(() => {
    verify(
      ".DSsLgA.9XVPSExnS0ZWD9c1IXv-AJ8t4mY9gNv8qNjk2HsTBkA",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  expect(() => {
    verify(
      "dGVzdGluZyB0b2tlbnM.DSsLgA.",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  expect(() => {
    verify(
      "a.b.c.d",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  expect(() => {
    verify(
      "some_random_bunch_of_string",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  expect(() => {
    verify(
      "ewgwg.gw.",
      "test",
      {},
      function (err, res) { }
    )
  }).not.toThrowError(
    "malformed token"
  );

});