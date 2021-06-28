import crypto from "crypto";

const safeRandomBytes = (length: number): Buffer => {
  return crypto.randomBytes(length);
};

export const generateRandom = (length = 35, charset = "alphanumeric") => {
  let chars;
  let string = "";

  const numbers = "0123456789";
  const charsLower = "abcdefghijklmnopqrstuvwxyz";
  const charsUpper = charsLower.toUpperCase();
  const hexChars = "abcdef";

  if (charset === "alphanumeric") {
    chars = numbers + charsLower + charsUpper;
  } else if (charset === "numeric") {
    chars = numbers;
  } else if (charset === "alphabetic") {
    chars = charsLower + charsUpper;
  } else if (charset === "hex") {
    chars = numbers + hexChars;
  } else {
    chars = charset;
  }

  const unreadableChars = /[0OIl]/g;
  chars = chars.replace(unreadableChars, "");

  const charsLen = chars.length;
  const maxByte = 256 - (256 % charsLen);
  while (length > 0) {
    const buf = safeRandomBytes(Math.ceil((length * 256) / maxByte));
    for (let i = 0; i < buf.length && length > 0; i += 1) {
      const randomByte = buf.readUInt8(i);
      if (randomByte < maxByte) {
        string += chars.charAt(randomByte % charsLen);
        length -= 1;
      }
    }
  }

  return string;
};
