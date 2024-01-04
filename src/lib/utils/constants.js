import Cookies from "js-cookie";
import { aes } from "./aes";

export const DECRYPTED_EMAIL = aes("decrypt", Cookies.get("email"), "email");
export const DECRYPTED_PASSWORD = aes(
  "decrypt",
  Cookies.get("password"),
  "password"
);

export const USER_EMAIL = import.meta.env.VITE_EMAIL;
export const USER_PASSWORD = import.meta.env.VITE_PASSWORD;
