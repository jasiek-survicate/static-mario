import { Level } from "./Level/Level.js";
import { Hero } from "./Hero/Hero.js"
import { levelMap } from "./level_1.js";

export const GRAVITY_ACCELERATION = 300;

const initGame = () => {
  const level = new Level(levelMap);
  new Hero(level.initialHeroPosition);
};

initGame();


export class Game {
  constructor() {
    this.GRAVITY_ACCELERATION = 300;

  }

  init() {
    const level = new Level(levelMap);
    new Hero(level.initialHeroPosition);
  };
}