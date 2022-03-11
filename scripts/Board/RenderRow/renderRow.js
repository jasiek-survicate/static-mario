import { boardContainer } from "../../game.js";
import { renderCell } from "../RenderCell/renderCell.js";

export const renderRow = (row) => {
  const rowElement = document.createElement("div");
  rowElement.classList.add("row");
  row.forEach((cell) => {
    rowElement.appendChild(renderCell(cell));
  });
  boardContainer.appendChild(rowElement);
};
