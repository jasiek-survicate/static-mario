import { Level } from "./Level/Level.js";
import { Hero } from "./Hero/Hero.js"
import { levelMap } from "./level_1.js";

export const GRAVITY_ACCELERATION = 300;
export const BLOCK_SIZE = 100;

const initGame = () => {
  const level = new Level(levelMap);
  new Hero(level.initialHeroPosition);
};

initGame();
