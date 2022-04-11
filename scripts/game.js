import { boardModel } from "./board.js";
import { renderBoard } from "./Board/RenderBoard/renderBoard.js";
import { Hero } from "./Hero/Hero.js"

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

const initGame = () => {
  renderBoard(board, initialBoardPosition);

  new Hero(initialHeroPosition);
};

initGame();
