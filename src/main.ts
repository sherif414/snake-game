import "./style.css";
import { Snake, Food } from "./game";

const GAME_SPEED = 5;
const snakeExpansionRate = 5;
const GRID = { GRID_ROWS: 80, GRID_COLS: 40 };
let score = 0;
let inputDirection: Point = { x: 0, y: 0 };
let lastInputDirection: Point = { x: 0, y: 0 };
let lastRenderTime = 0;
const board = document.getElementById("game-board")!;
const scoreElement = document.getElementById("score")!;
const snake = new Snake(GRID);
const food = new Food(GRID);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

function updateInputDirection(): void {
  lastInputDirection = inputDirection;
}

//main function

const paint = (currTime: number) => {
  if (snake.checkDeath()) {
    if (confirm("You lost. Press ok to restart.")) {
      location.reload();
    }
    return;
  }
  requestAnimationFrame(paint);
  const timeSinceLastRender = (currTime - lastRenderTime) / 1000;
  if (timeSinceLastRender < 1 / GAME_SPEED) return;
  lastRenderTime = currTime;

  board.innerHTML = "";
  updateInputDirection();
  if (snake.consumedFood(food.position)) {
    score++;
    scoreElement.innerHTML = score.toString();
    snake.update(snakeExpansionRate, lastInputDirection);
    food.draw(board, true);
  } else {
    snake.update(0, lastInputDirection);
    food.draw(board, false);
  }
  snake.draw(board);
};

//end of main

requestAnimationFrame(paint);

type Point = {
  x: number;
  y: number;
};
