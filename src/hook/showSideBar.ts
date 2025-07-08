import { atom } from "jotai";

// Initialize the atom with a conditional value based on the window width
export const showSideBarAtom = atom<boolean>(false);
