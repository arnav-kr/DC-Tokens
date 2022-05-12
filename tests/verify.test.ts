import { verify } from "../src";

test("Normal Verify", () => {
  // Normal Functioning
  expect(verify(
    "dGVzdGluZyB0b2tlbnM.DSsLgA.T-4Lu01Zb7BQQmxddfjKtYYAWQawiCe83EWoKd2x-3Q",
    "test"
  )).toEqual({
    "payload": "testing tokens",
    "signature": "T-4Lu01Zb7BQQmxddfjKtYYAWQawiCe83EWoKd2x-3Q",
    "timestamp": new Date("2022")
  });
})

test("Invalid Signature", () => {
  // Signature not valid
  expect(() => {
    verify(
      "dGVzdGluZyB0b2tlbnM.DSsLgA.T-4Lu01Zb7BQQmxddfjKtYYAWQawiCe83EWoKd2x-3Q_INVALID_THING",
      "test"
    )
  }).toThrowError(
    "invalid signature"
  );

  // Wrong Key
  expect(() => {
    expect(verify(
      "dGVzdGluZyB0b2tlbnM.DSsLgA.T-4Lu01Zb7BQQmxddfjKtYYAWQawiCe83EWoKd2x-3Q",
      "wrong_key"
    ))
  }).toThrowError(
    "invalid signature"
  );

  // Altered Payload
  expect(() => {
    expect(verify(
      "dGVzdGluZyB0b2tlbnM.DSsLgB.T-4Lu01Zb7BQQmxddfjKtYYAWQawiCe83EWoKd2x-3Q",
      "wrong_key"
    ))
  }).toThrowError(
    "invalid signature"
  );

});

test("Malformed Token", () => {
  // Missing Timestamp
  expect(() => {
    verify(
      "dGVzdGluZyB0b2tlbnM..T-4Lu01Zb7BQQmxddfjKtYYAWQawiCe83EWoKd2x-3Q",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  // Missing Payload
  expect(() => {
    verify(
      ".DSsLgA.T-4Lu01Zb7BQQmxddfjKtYYAWQawiCe83EWoKd2x-3Q",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  // Missing Signature
  expect(() => {
    verify(
      "dGVzdGluZyB0b2tlbnM.DSsLgA.",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  // Some random thing seperated with "."
  expect(() => {
    verify(
      "a.b.c.d",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  // Some random string
  expect(() => {
    verify(
      "some_random_bunch_of_string",
      "test"
    )
  }).toThrowError(
    "malformed token"
  );

  // in async mode
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