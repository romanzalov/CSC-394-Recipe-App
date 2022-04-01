import { atom } from "recoil";

export const allRecipesAtom = atom({
  key: "allRecipesAtom",
  default: [],
});

export const queryInputAtom = atom({
  key: "queryInputAtom",
  default: '',
});
