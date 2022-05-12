import { SignOption } from "./interfaces";
import { TokenError } from "./interfaces/Errors"
import CustomTimestamp from "./utils/customTimestamp";
import { createHmac, Hmac, scryptSync } from "crypto";
import { DCTError } from "./interfaces/Errors";

export function sign(
  payload: string,
  secret: (string | Buffer),
  option?: SignOption,
  callback?: (error: (TokenError | undefined), decoded: (string | undefined)) => void
): (string | undefined) {
  if (arguments.length < 2) throw new TypeError(`Failed to sign token: atleast 2 argument required, but only ${arguments.length} present.`);
  if (typeof payload !== 'string') throw new TypeError(`Failed to sign token: payload must be a string.`);
  if (typeof secret !== 'string' && !Buffer.isBuffer(secret)) throw new TypeError(`Failed to sign token: secret must be a string or a Buffer.`);
  if (typeof option !== 'object' && option !== undefined && !Array.isArray(option)) throw new TypeError(`Failed to sign token: option must be an object.`);
  if (typeof callback !== 'function' && callback !== undefined) throw new TypeError(`Failed to sign token: callback must be a function.`);
  try {
    let date: Date = option?.timestamp instanceof Date ? option?.timestamp : new Date();
    let timestamp: number = date.getTime();
    let epoch: (number | undefined) = option?.epoch;
    let customTimestamp: CustomTimestamp = new CustomTimestamp(epoch);

    if (payload.trim() == "") throw new TypeError("payload cannot be empty");

    let payloads: string =
      Buffer.from(payload, "utf-8").toString("base64url") + '.' + customTimestamp.create(timestamp);

    let signature: Hmac = createHmac('sha-256', scryptSync(secret, "", 32));
    signature.update(payloads);
    let token: string = payloads + '.' + signature.digest("base64url");

    if (callback) {
      callback(undefined, token)
    }
    return token;
  }
  catch (err: any) {
    if (err instanceof Error) {
      if (callback) {
        callback({
          name: DCTError.UNCAUGHT_ERROR,
          message: err.message,
          stack: err?.stack,
        }, undefined)
      }
      else {
        throw err;
      }
    }
  }
};