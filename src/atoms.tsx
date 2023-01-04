import { atom } from "recoil";

export interface IToDo {
  title: string;
  content: string;
  id: string;
  createAt: string;
  updatedAt: string;
}

export const isLoggedIn = atom<boolean>({
  key: "isLoggedIn",
  default: Boolean(localStorage.getItem("isLoggedIn")),
});

export const toDosListAtom = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export const toDoAtom = atom<IToDo>({
  key: "toDo",
  default: undefined,
});
