import { AES, enc } from "crypto-js";

export function aes(option, value, name) {
  if (option === "encrypt") {
    return AES.encrypt(value !== undefined ? value : "", name).toString();
  }

  if (option === "decrypt") {
    return AES.decrypt(value !== undefined ? value : "", name).toString(
      enc.Utf8
    );
  }

  return "";
}
