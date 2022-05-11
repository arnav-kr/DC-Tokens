import { decode } from "./decode"
import { TokenError, DCTError, DCTErrorMessage } from "./interfaces/Errors"
import { Token } from "./interfaces/Token";
import { DCTokenError } from "./Errors/DCTokenError";
import { VerifyOptions } from "./interfaces/verifyOptions";

export function verify(
  token: string,
  secret: (string | Buffer),
  options?: VerifyOptions,
  callback?: (error: (TokenError | undefined), decoded: (Token | undefined)) => void
): (undefined | Token) {
  if (arguments.length < 2) throw new TypeError(`Failed to verify token: atleast 2 argument required, but only ${arguments.length} present.`);
  if (typeof token !== 'string') throw new TypeError(`Failed to verify token: token must be a string.`);
  if (typeof secret !== 'string' && !Buffer.isBuffer(secret)) throw new TypeError(`Failed to verify token: secret must be a string or a Buffer.`);
  if (typeof options !== 'object' && options !== undefined && !Array.isArray(options)) throw new TypeError(`Failed to verify token: options must be an object.`);
  if (typeof callback !== 'function' && callback !== undefined) throw new TypeError(`Failed to verify token: callback must be a function.`);

  let result: (Token | undefined);
  try {
    result = decode(
      token,
      secret,
      options
    );
    if (callback) {
      callback(undefined, result);
    }
    return result
  }
  catch (err) {

    if (err instanceof DCTokenError) {
      if (callback) {
        callback({
          name: DCTError[err.type],
          message: DCTErrorMessage[err.type],
          stack: err?.stack
        }, undefined)
      }
      else {
        throw err;
      }
    }
    else if (err instanceof Error) {
      if (callback) {
        callback({
          name: DCTError.UNCAUGHT_ERROR,
          message: DCTErrorMessage.UNCAUGHT_ERROR,
          stack: err?.stack,
        }, undefined);
      }
      else {
        throw err;
      }
    }
  }
}