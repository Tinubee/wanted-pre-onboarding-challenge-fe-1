import { atom } from "recoil";

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: Boolean(localStorage.getItem("isLoggedIn")),
});
