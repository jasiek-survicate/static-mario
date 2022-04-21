import { Level } from "../Level/Level.js";
import { Hero } from "../Hero/Hero.js"
import { levelMap } from "../level_1.js";

export class Game {
  constructor() {
    this.GRAVITY_ACCELERATION = 300;
  }

  init() {
    const level = new Level(levelMap);
    new Hero(level.initialHeroPosition);
  };

  static getGravityAcceleration() {
    return this.GRAVITY_ACCELERATION;
  }
}