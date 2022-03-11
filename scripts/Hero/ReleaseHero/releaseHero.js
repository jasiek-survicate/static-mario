import { BLOCK_SIZE, boardContainer } from '../../game.js';

export const releaseHero = (hero, initialHeroPosition, currentHeroPosition) => {
  boardContainer.appendChild(hero);
  currentHeroPosition = initialHeroPosition;

  console.log(currentHeroPosition, "release hero current hero");
  hero.style.left = `${currentHeroPosition[0] * BLOCK_SIZE}px`;
  hero.style.top = `${currentHeroPosition[1] * BLOCK_SIZE}px`;
};