export default class CustomTimestamp implements customTimestamp {
  epoch: number;

  constructor(epoch: (number | undefined)) {
    this.epoch = epoch ? epoch : 1420070400000;
    this.epoch = Math.floor(this.epoch / 1000);
  }

  /**
   * Parses a custom timestamp.
   * @param customTimestamp the custom timestamp to be parsed
   * @returns timestamp in seconds
   */
  parse(customTimestamp: string): number {
    if (customTimestamp.trim() == "") throw new TypeError("Invalid Timestamp");
    let bin: Buffer;
    let num: number;
    try {
      bin = Buffer.from(customTimestamp, "base64url");
      num = bin.readInt32BE();
    }
    catch (err) {
      throw new TypeError("Invalid Timestamp");
    }
    let timestamp: number = num + this.epoch;
    return timestamp;
  }

  /**
   * Creates a custom timestamp
   * @param timestamp timestamp in milliseconds
   * @returns the custom timestamp
   */
  create(timestamp: number): string {
    timestamp = Math.floor(timestamp / 1000);
    if (timestamp <= 0 || ((timestamp - this.epoch) > 2147483647)) throw new RangeError(`Timestamp must not be 0, less than 0, or greater than ${this.epoch + 2147483647}`);
    let num: number = timestamp - this.epoch;
    let bin: Buffer = Buffer.alloc(4)
    bin.writeInt32BE(num);
    return bin.toString("base64url");
  }

}

interface customTimestamp {
  epoch: number;
  parse(customTimestamp: string): number;
  create(timestamp: number): string;
}