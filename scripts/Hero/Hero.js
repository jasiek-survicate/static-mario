import { Level } from '../Level/Level.js';
import { Game } from '../Game/Game.js'

export class Hero {
  constructor(level) {
    this.initialPosition = level.initialHeroPosition; // [x, y]
    this.currentPosition = level.initialHeroPosition; // [x, y]
    this.levelContainer = Level.getLevelContainer();
    this.heroHTML = document.createElement("div");
    this.render();
    this.addMoveListeners(level.levelObject)
  }

  setCSSPosition(x, y) {
    this.heroHTML.style.left = `${x}px`;
    this.heroHTML.style.top = `${y}px`;
  }

  render() {
    this.heroHTML.classList.add("hero");
    this.levelContainer.appendChild(this.heroHTML);
    this.setCSSPosition(this.initialPosition[0] * Level.getBlockSize(), this.initialPosition[1] * Level.getBlockSize());
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
    this.setCSSPosition(x * Level.getBlockSize(), y * Level.getBlockSize());
    this.levelContainer.style.left = `-${(x - 2) * Level.getBlockSize()}px`;
    this.levelContainer.style.top = `-${(y - 7)* Level.getBlockSize()}px`;

    const timeout = coords[1] === -1 ? Game.getGravityAcceleration() : 0;

    setTimeout(() => this.move([0, 1], board), timeout);
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

        if (now <= timeSnapshot + Game.getGravityAcceleration()) {
          return;
        }

        timeSnapshot = now;
        this.move([0, -2], board);
      }

      if (event.key === "ArrowDown") {
        this.move([0, 1], board);
      }
    });
  };
}
