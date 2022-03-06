import { GRAVITY_ACCELERATION, move } from '../../game.js';

export const addHeroMoveListeners = (hero) => {
  let timeSnapshot;

  document.addEventListener("keydown", (event) => {
    hero.classList.remove("hero--left");

    if (event.key === "ArrowRight") {
      move(hero, [1, 0]); //tuple
    }

    if (event.key === "ArrowLeft") {
      hero.classList.add("hero--left");
      move(hero, [-1, 0]);
    }

    if (event.key === "ArrowUp") {
      const now = Date.now();

      if (now <= timeSnapshot + GRAVITY_ACCELERATION) {
        return;
      }

      timeSnapshot = now;
      move(hero, [0, -1]);
    }

    if (event.key === "ArrowDown") {
      move(hero, [0, 1]);
    }
  });
};