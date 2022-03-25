import { GRAVITY_ACCELERATION } from '../../game.js';
import { move } from '../../Movement/Move/move.js';

export const addHeroMoveListeners = (hero, board) => {
  let timeSnapshot;

  document.addEventListener("keydown", (event) => {
    hero.classList.remove("hero--left");

    const currentHeroPosition = sessionStorage.getItem('currentHeroPosition').split(',').map((num) => {
      return parseInt(num, 10);
    });

    if (event.key === "ArrowRight") {
      move(hero, [1, 0], currentHeroPosition, board); //tuple
    }

    if (event.key === "ArrowLeft") {
      hero.classList.add("hero--left");
      move(hero, [-1, 0], currentHeroPosition, board);
    }

    if (event.key === "ArrowUp") {
      const now = Date.now();

      if (now <= timeSnapshot + GRAVITY_ACCELERATION) {
        return;
      }

      timeSnapshot = now;
      move(hero, [0, -1], currentHeroPosition, board);
    }

    if (event.key === "ArrowDown") {
      move(hero, [0, 1], currentHeroPosition, board);
    }
  });
};