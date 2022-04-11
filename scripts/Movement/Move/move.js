import { boardContainer, BLOCK_SIZE, GRAVITY_ACCELERATION } from "../../game.js";

export const move = (character, coords, currentHeroPosition, board) => {
    const x = currentHeroPosition[0] + coords[0];
    const y = currentHeroPosition[1] + coords[1];

    const nextBoardElement = board[y][x];  
    const canMove = nextBoardElement === "·" || nextBoardElement === "M";
  
    if (!canMove) {
      return;
    }
  
    sessionStorage.setItem('currentHeroPosition',[x,y]);
  
    character.style.left = `${x * BLOCK_SIZE}px`;
    character.style.top = `${y * BLOCK_SIZE}px`;
  
    boardContainer.style.left = `-${x * BLOCK_SIZE}px`;
    boardContainer.style.top = `-${y * BLOCK_SIZE}px`;
  
    const timeout = coords[1] === -1 ? GRAVITY_ACCELERATION : 0;


    setTimeout(() => move(
      character,
      [0, 1],
      [x,y],
      board), timeout);
  };