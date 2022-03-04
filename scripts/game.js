import { boardModel, boardElementsMap } from "./board.js";

const boardRows = boardModel.split("\n"); // use regex to solve new line issue
const board = boardRows.filter((row) => row.length).map((row) => row.split(""));

const GRAVITY_ACCELERATION = 300;
const BLOCK_SIZE = 100;

let timeSnapshot;
let hero;

const boardContainer = document.querySelector("[data-board-container]");

let currentHeroPosition = [0, 0];

const heroRow = board.find((row) => row.includes("M"));
const x = heroRow.indexOf("M");
const y = board.indexOf(heroRow);
const initialHeroPosition = [x, y];
const initialBoardPosition = [x + 1, y - 4];

const createHero = () => {
  hero = document.createElement("div");
  hero.classList.add("hero");
};

const releaseHero = () => {
  boardContainer.appendChild(hero);
  currentHeroPosition = initialHeroPosition;
  hero.style.left = `${currentHeroPosition[0] * BLOCK_SIZE}px`;
  hero.style.top = `${currentHeroPosition[1] * BLOCK_SIZE}px`;
};

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

const move = (coords) => {
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

  hero.style.left = `${currentHeroPosition[0] * BLOCK_SIZE}px`;
  hero.style.top = `${currentHeroPosition[1] * BLOCK_SIZE}px`;

  boardContainer.style.left = `-${currentHeroPosition[0] * BLOCK_SIZE}px`;
  boardContainer.style.top = `-${currentHeroPosition[1] * BLOCK_SIZE}px`;

  const timeout = coords[1] === -1 ? GRAVITY_ACCELERATION : 0;
  setTimeout(() => move([0, 1]), timeout);
};

const addMoveListeners = () => {
  document.addEventListener("keydown", (event) => {
    hero.classList.remove("hero--left");

    if (event.key === "ArrowRight") {
      move([1, 0]); //tuple
    }

    if (event.key === "ArrowLeft") {
      hero.classList.add("hero--left");
      move([-1, 0]);
    }

    if (event.key === "ArrowUp") {
      const now = Date.now();

      if (now <= timeSnapshot + GRAVITY_ACCELERATION) {
        return;
      }

      timeSnapshot = now;
      move([0, -1]);
    }

    if (event.key === "ArrowDown") {
      move([0, 1]);
    }
  });
};

const initGame = () => {
  renderBoard(board);
  createHero();
  releaseHero();
  addMoveListeners();
};

initGame();
