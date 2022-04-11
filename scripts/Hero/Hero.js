import { BLOCK_SIZE, boardContainer } from '../game.js';

export class Hero {
  constructor(initialPosition) {
    this.initialPosition = initialPosition; // [x, y]
    this.currentPosition = initialPosition; // [x, y]
    this.heroHTML = document.createElement("div");
    this.render();
    this.addMoveListeners()
  }

  render() {
    this.heroHTML.classList.add("hero");

    boardContainer.appendChild(this.heroHTML);

    this.setCSSPosition(this.initialPosition[0] * BLOCK_SIZE, this.initialPosition[1] * BLOCK_SIZE);
  }

  move(coords, board) {
    const x = this.currentPosition[0] + coords[0];
    const y = this.currentPosition[1] + coords[1];


    const nextBoardElement = board[y][x];
    const canMove = nextBoardElement === "·" || nextBoardElement === "M";

    if (!canMove) {
      return;
    }

    this.currentPosition = [x,y];

    this.setCSSPosition(x * BLOCK_SIZE, y * BLOCK_SIZE);

    boardContainer.style.left = `-${x * BLOCK_SIZE}px`;
    boardContainer.style.top = `-${y * BLOCK_SIZE}px`;

    const timeout = coords[1] === -1 ? GRAVITY_ACCELERATION : 0;

    setTimeout(() => move([0, 1], board), timeout);
  };

  addMoveListeners = (board) => {
    let timeSnapshot;

    document.addEventListener("keydown", (event) => {
      this.heroHTML.classList.remove("hero--left");

      if (event.key === "ArrowRight") {
        this.move([1, 0], board); //tuple
      }

      if (event.key === "ArrowLeft") {
        this.heroHTML.classList.add("hero--left");
        this.move([-1, 0], board);
      }

      if (event.key === "ArrowUp") {
        const now = Date.now();

        if (now <= timeSnapshot + GRAVITY_ACCELERATION) {
          return;
        }

        timeSnapshot = now;
        this.move([0, -1], board);
      }

      if (event.key === "ArrowDown") {
        this.move([0, 1], board);
      }
    });
  };

  setCSSPosition(x, y) {
    this.heroHTML.style.left = `${x}px`;
    this.heroHTML.style.top = `${y}px`;
  }
}
