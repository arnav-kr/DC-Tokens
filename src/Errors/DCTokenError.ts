import { DCTError, DCTErrorMessage } from "../interfaces/Errors";

export class DCTokenError extends Error {
  type: DCTError;
  constructor(type: DCTError) {
    const message: DCTErrorMessage = DCTErrorMessage[type];
    super(message);
    this.name = "DCTokenError";
    this.type = type;
  }
}