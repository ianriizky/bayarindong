import bcrypt from "bcrypt";

export function check(value: string, hashedValue: string) {
  return bcrypt.compare(value, hashedValue);
}

export function make(value: string) {
  return bcrypt.hash(value, +process.env.BCRYPT_ROUNDS);
}
