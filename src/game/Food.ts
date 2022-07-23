export default class Food {
  private GRID_ROWS: number;
  private GRID_COLS: number;
  private _position: Point = {
    x: 20,
    y: 20,
  };
  public get position(): Point {
    return this._position;
  }
  private set position(value: Point) {
    this._position = value;
  }

  constructor(gridDimensions: { GRID_ROWS: number; GRID_COLS: number }) {
    this.GRID_COLS = gridDimensions.GRID_COLS;
    this.GRID_ROWS = gridDimensions.GRID_ROWS;
  }

  private getRandomPoint(snakeBody: Point[]): Point {
    let point: Point = { x: 0, y: 0 };
    let onSnake = true;
    do {
      point.x = Math.floor(Math.random() * this.GRID_COLS) + 1;
      point.y = Math.floor(Math.random() * this.GRID_ROWS) + 1;
      onSnake = snakeBody.includes(point);
    } while (onSnake);
    this.position = point;
    return point;
  }
  /**
   * draws food on a random point
   *
   */
  public draw(board: HTMLElement, redraw: boolean, snakeBody: Point[]): void {
    let point = this.position;
    if (redraw) {
      point = this.getRandomPoint(snakeBody);
    }
    const el = document.createElement("div");
    el.style.gridRowStart = point.y.toString();
    el.style.gridColumnStart = point.x.toString();
    el.classList.add("food");
    board.appendChild(el);
  }
}

type Point = {
  x: number;
  y: number;
};
