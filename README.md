# DC Tokens

<p align="center"><img src="https://raw.githubusercontent.com/arnav-kr/DC-Tokens/main/images/DCT.svg" width="100%" /></p>

![npm version](https://img.shields.io/npm/v/dc-tokens.svg?maxAge=3600)
![npm downloads](https://img.shields.io/npm/dt/dc-tokens.svg?maxAge=3600)

---

## About

DCTokens are the discord like tokens that can be used for authentiction in your website, api, or anything you want (you can even trick people to think its an actual discord token 😉).

It Uses HMAC with SHA-256 to sign the tokens.

## Features
* Sign Custom Tokens (with your own private key) 📝
* Verify Tokens ✅
* Zero-Depencency 💪

## Install

**Via NPM:**

```bash
npm install dc-tokens
```

**Via Yarn:**

```bash
yarn add dc-tokens
```

**Via PNPM**
  
```bash
pnpm install dc-tokens
```

## Usage


### DCT.sign(payload, privateKey, [options, callback])

If a callback is supplied, the callback is called with the `err` and the `Token`.

Else returns the `DCToken` as string

`payload` could should be string.

`privateKey` is a string or buffer.

`options` is an object with the following properties:
  * `timestamp` (in milliseconds) - defaults to `Date.now()`
  * `epoch` (in milliseconds) - defaults to Milliseconds since Discord Epoch: `1420070400000`

`callback` is a function that is called with the `err` and the `Token` as string respectively.

Synchronous Sign:

```js
const DCT = require('dc-tokens');
let token = DCT.sign("Cute little cats", "secret");
```

Sign asynchronously
  
```js
const DCT = require('dc-tokens');

DCT.sign("Cute little cats", "secret", { }, (err, token) => {
  if (err) {
    console.error(err);
  } else {
    console.log(token);
  }
});
```

### DCT.verify(token, privateKey, [options, callback])

If a callback is supplied, the callback is called with the `err` and the `TokenObject`.

Else returns the `TokenObject` as string

The `TokenObject` is an object with the following structure

```ts
{
  payload: string;
  timestamp: Date;
  signature: string;
}
```

`privateKey` is a string or buffer. it should be the same key that was used to generate the token.

`options` is an object with the following properties:
  * `epoch` (in milliseconds) - defaults to Milliseconds since Discord Epoch: `1420070400000`

`callback` is a function that is called with the `err` and the `TokenObject` respectively.

Verify Asynchronously
  
```js
const DCT = require('dc-tokens');

DCT.verify(token, privateKey, options, (err, decoded) =>{
    console.log(decoded);
});
```

Verify Synchronously
  
```js
const DCT = require('dc-tokens');

let decoded = DCT.verify(token, privateKey, options);
```

Handiling Errors

```js
const DCT = require('dc-tokens');

// Handling Erros - Asynchronously
DCT.verify(token, privateKey, options, (err, decoded) =>{
  if (err) {
    console.error(err);
  } else {
    console.log(decoded);
  }
});

// Handling Erros - Synchronously
try{
  let decoded = DCT.verify(token, privateKey, options);
} catch (err) {
  console.error(err);
}
```

## Error Codes

the error that is passed as the first paramater in the callback function in either `sign` or `verify` has a specific structure when running asynchronously.

```ts
{
  code: DCTError;
  message: string;
  stack?: string;
}
```

`DCTError` can have the following values:
* `INVALID_TOKEN` - token is invalid
* `TOKEN_MALFORMED` - token is malformed
* `SIGNATURE_REQUIRED` - signature is required
* `INVALID_SIGNATURE` - invalid signature
* `UNCAUGHT_ERROR` - uncaught error (any other error)
* `TIMESTAMP_MALFORMED` - malformed timestamp

If used synchronously, the error is thrown.

## Report an Issue 

If you have found a bug or if you have a feature request, please report them at this repository issues section.

## Author

[arnav-kr](https://github.com/arnav-kr)

## License

The project is licensed under the [MIT](https://github.com/arnav-kr/DC-Tokens/blob/main/LICENSE) license.