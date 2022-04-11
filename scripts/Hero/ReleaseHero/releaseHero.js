import { BLOCK_SIZE, boardContainer } from '../../game.js';

export const releaseHero = (hero, initialHeroPosition) => {
  boardContainer.appendChild(hero);

  hero.style.left = `${initialHeroPosition[0] * BLOCK_SIZE}px`;
  hero.style.top = `${initialHeroPosition[1] * BLOCK_SIZE}px`;
};