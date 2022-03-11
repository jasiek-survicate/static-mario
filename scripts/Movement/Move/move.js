import { boardContainer, BLOCK_SIZE, GRAVITY_ACCELERATION } from "../../game.js";

export const move = (character, coords, currentHeroPosition, board) => {
    console.log("currentHeroPosition", currentHeroPosition);
    const x = currentHeroPosition[0] + coords[0];
    const y = currentHeroPosition[1] + coords[1];

    console.log("x", x, "y", y)
  
    
    const nextBoardElement = board[y][x];  
    console.log(nextBoardElement, "next board")
    const canMove = nextBoardElement === "·" || nextBoardElement === "M";
  
    if (!canMove) {
      return;
    }
  
    currentHeroPosition = [
      currentHeroPosition[0] + coords[0],
      currentHeroPosition[1] + coords[1]
    ];
  
    character.style.left = `${currentHeroPosition[0] * BLOCK_SIZE}px`;
    character.style.top = `${currentHeroPosition[1] * BLOCK_SIZE}px`;
  
    boardContainer.style.left = `-${currentHeroPosition[0] * BLOCK_SIZE}px`;
    boardContainer.style.top = `-${currentHeroPosition[1] * BLOCK_SIZE}px`;
  
    const timeout = coords[1] === -1 ? GRAVITY_ACCELERATION : 0;
    setTimeout(() => move(character, [0, 1], currentHeroPosition, board), timeout);
  };