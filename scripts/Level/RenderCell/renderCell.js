import { boardElementsMap } from "../../board.js";

export const renderCell = (cell) => {
  const div = document.createElement("div");
  div.classList.add("block");
  div.classList.add(boardElementsMap[cell]);
  return div;
};
