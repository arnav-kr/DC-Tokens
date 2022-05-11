export interface TokenError {
  name: DCTError;
  message: (DCTErrorMessage | string);
  stack?: string;
}

export enum DCTError {
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  SIGNATURE_REQUIRED = 'SIGNATURE_REQUIRED',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  UNCAUGHT_ERROR = 'UNCAUGHT_ERROR',
  TIMESTAMP_MALFORMED =  'TIMESTAMP_MALFORMED',
}

export enum DCTErrorMessage {
  INVALID_TOKEN = 'invalid token',
  TOKEN_MALFORMED = 'malformed token',
  SIGNATURE_REQUIRED = 'signature is required',
  INVALID_SIGNATURE = 'invalid signature',
  UNCAUGHT_ERROR = 'uncaught error',
  TIMESTAMP_MALFORMED = 'malformed timestamp',
}