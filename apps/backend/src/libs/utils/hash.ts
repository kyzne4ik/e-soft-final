import bcrypt from "bcrypt";
import { randomBytes, createHash } from "crypto";

export class Hash {
  private static readonly SALT_ROUNDS = 10;

  static async generateHash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUNDS);
  }

  static async compareHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }

  static generateToken(
    size: number = 32,
    encoding: BufferEncoding = "base64url",
  ): string {
    return randomBytes(size).toString(encoding);
  }

  static hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }
}
