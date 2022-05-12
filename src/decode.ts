import { DCTokenError } from "./Errors/DCTokenError";
import { DCTError } from "./interfaces/Errors";
import { Token } from "./interfaces/Token";
import CustomTimestamp from "./utils/customTimestamp";
import { createHmac, scryptSync, Hmac } from "crypto";
import { VerifyOptions } from "./interfaces/verifyOptions";

export function decode(
  token: string,
  secret: (string | Buffer),
  options?: VerifyOptions
): (undefined | Token) {
  if (!token) {
    throw new DCTokenError(DCTError.INVALID_TOKEN);
  }
  if (typeof token !== 'string') {
    throw new DCTokenError(DCTError.INVALID_TOKEN);
  }
  if (token.split('.').length !== 3) {
    throw new DCTokenError(DCTError.TOKEN_MALFORMED);
  }
  let splited: string[] = token.split('.');
  if (splited.length !== 3 || (splited[0].trim() === '' || splited[1].trim() === '' || splited[2].trim() === '')) {
    throw new DCTokenError(DCTError.TOKEN_MALFORMED)
  }

  let payload: string = splited[0];
  let timestamp: string = splited[1];
  let signature: string = splited[2];
  let authedSignature: string;
  let DateTimestamp: Date;

  try {
    payload = Buffer.from(payload, "base64url").toString("utf-8");
  }
  catch (err) {
    throw new DCTokenError(DCTError.TOKEN_MALFORMED)
  }

  try {
    let customTimestamp = new CustomTimestamp(options?.epoch);
    timestamp = customTimestamp.parse(timestamp).toString();
    DateTimestamp = new Date(parseInt(timestamp) * 1000);
  }
  catch (err) {
    throw new DCTokenError(DCTError.TOKEN_MALFORMED)
  }

  let payloads: string = payload + '.' + timestamp;

  try {
    let hmacsha256: Hmac = createHmac('sha-256', scryptSync(secret, "", 32));
    hmacsha256.update(splited.slice(0, 2).join("."));
    authedSignature = hmacsha256.digest("base64url")
  }
  catch (err) {
    throw new DCTokenError(DCTError.INVALID_SIGNATURE);
  }
  if (authedSignature !== signature) {
    throw new DCTokenError(DCTError.INVALID_SIGNATURE);
  }
  let result: Token = {
    payload: payload,
    timestamp: DateTimestamp,
    signature: signature
  }
  return result;
}