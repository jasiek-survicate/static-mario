import { legend } from '../legend.js'

export class Level {
  constructor(levelMap) {
    this.BLOCK_SIZE = 100;
    this.levelRows = levelMap.split("\n"); // use regex to solve new line issue
    this.levelObject = this.levelRows.filter((row) => row.length).map((row) => row.split(""));
    this.initialPosition = this.getInitialLevelPosition();
    this.currentPosition = this.initialPosition;
    this.levelHTML = document.querySelector("[data-board-container]");
    this.initialHeroPosition = this.getInitialHeroPosition();
    this.render();
  }

  setInitialPosition() {
    this.levelHTML.style.left = `${this.initialPosition[0] * this.BLOCK_SIZE}px`;
    this.levelHTML.style.top = `-${this.initialPosition[1] * this.BLOCK_SIZE}px`;
  }

  render() {
    this.levelObject.forEach((row) => this.renderRow(row));
    // this.setInitialPosition();
  };

  renderRow(row) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    row.forEach((cell) => {
      rowElement.appendChild(this.renderCell(cell));
    });
    this.levelHTML.appendChild(rowElement);
  }

  renderCell(cell) {
    const div = document.createElement("div");
    div.classList.add("block");
    div.classList.add(legend[cell]);
    return div;
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

  getBlockSize() {
    return this.BLOCK_SIZE;
  }
}