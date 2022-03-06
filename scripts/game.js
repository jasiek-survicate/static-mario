import { boardModel, boardElementsMap } from "./board.js";
import { createHero } from "./Hero/CreateHero/createHero.js";
import { releaseHero } from "./Hero/ReleaseHero/releaseHero.js"
import { addHeroMoveListeners } from "./Hero/AddHeroMoveListeners/addHeroMoveListeners.js"

const boardRows = boardModel.split("\n"); // use regex to solve new line issue
const board = boardRows.filter((row) => row.length).map((row) => row.split(""));

export const GRAVITY_ACCELERATION = 300;
export const BLOCK_SIZE = 100;

export const boardContainer = document.querySelector("[data-board-container]");

let currentHeroPosition = [0, 0];

const heroRow = board.find((row) => row.includes("M"));
const x = heroRow.indexOf("M");
const y = board.indexOf(heroRow);
const initialHeroPosition = [x, y];
const initialBoardPosition = [x + 1, y - 4];

const renderCell = (cell) => {
  const div = document.createElement("div");
  div.classList.add("block");
  div.classList.add(boardElementsMap[cell]);
  return div;
};

const renderRow = (row) => {
  const rowElement = document.createElement("div");
  rowElement.classList.add("row");
  row.forEach((cell) => {
    rowElement.appendChild(renderCell(cell));
  });
  boardContainer.appendChild(rowElement);
};

const renderBoard = (board) => {
  board.forEach((row) => renderRow(row));
  boardContainer.style.left = `${initialBoardPosition[0] * BLOCK_SIZE}px`;
  boardContainer.style.top = `-${initialBoardPosition[1] * BLOCK_SIZE}px`;
};

export const move = (character, coords) => {
  const x = currentHeroPosition[0] + coords[0];
  const y = currentHeroPosition[1] + coords[1];

  const nextBoardElement = board[y][x];

  const canMove = nextBoardElement === "·" || nextBoardElement === "M";

  if (!canMove) {
    return;
  }

  currentHeroPosition = [
    currentHeroPosition[0] + coords[0],
    currentHeroPosition[1] + coords[1]
  ];

  character.style.left = `${currentHeroPosition[0] * BLOCK_SIZE}px`;
  character.style.top = `${currentHeroPosition[1] * BLOCK_SIZE}px`;

  boardContainer.style.left = `-${currentHeroPosition[0] * BLOCK_SIZE}px`;
  boardContainer.style.top = `-${currentHeroPosition[1] * BLOCK_SIZE}px`;

  const timeout = coords[1] === -1 ? GRAVITY_ACCELERATION : 0;
  setTimeout(() => move(character, [0, 1]), timeout);
};

const initGame = () => {
  renderBoard(board);
  const hero = createHero();
  releaseHero(hero, initialHeroPosition, currentHeroPosition);
  addHeroMoveListeners(hero);
};

initGame();