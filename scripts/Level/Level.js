import { BLOCK_SIZE } from "../game.js";

export class Level {
  constructor(levelMap) {
    this.levelRows = levelMap.split("\n"); // use regex to solve new line issue
    this.levelObject = this.levelRows.filter((row) => row.length).map((row) => row.split(""));
    this.initialPosition = this.getInitialLevelPosition();
    this.currentPosition = this.initialPosition;
    this.levelHTML = document.querySelector("[data-board-container]");
    this.initialHeroPosition = this.getInitialHeroPosition();
  }

  render() {
    this.levelObject.forEach((row) => renderRow(row));
    this.levelHTML.style.left = `${this.initialPosition[0] * BLOCK_SIZE}px`;
    this.levelHTML.style.top = `-${this.initialPosition[1] * BLOCK_SIZE}px`;
  };

  renderRow(row) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    row.forEach((cell) => {
      rowElement.appendChild(renderCell(cell));
    });
    this.levelHTML.appendChild(rowElement);
  }

  getInitialLevelPosition() {
    const heroPosition = this.getInitialHeroPosition();
    return [heroPosition[0] + 1, heroPosition[1] - 4];
  }

  getInitialHeroPosition() {
    const heroRow = this.levelObject.find((row) => row.includes("M"));
    const x = heroRow.indexOf("M");
    const y = this.levelObject.indexOf(heroRow);

    return [x,y];
  }

  static getLevelContainer() {
    return document.querySelector("[data-board-container]");
  }
}