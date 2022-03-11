import { renderRow } from "../RenderRow/renderRow.js";
import { boardContainer } from "../../game.js";
import { BLOCK_SIZE } from "../../game.js";

export const renderBoard = (board, initialBoardPosition) => {
  board.forEach((row) => renderRow(row));
  boardContainer.style.left = `${initialBoardPosition[0] * BLOCK_SIZE}px`;
  boardContainer.style.top = `-${initialBoardPosition[1] * BLOCK_SIZE}px`;
};
