export default class Food {
  private GRID_ROWS: number;
  private GRID_COLS: number;
  position: Point = {
    x: 20,
    y: 20,
  };

  constructor(gridDimensions: { GRID_ROWS: number; GRID_COLS: number }) {
    this.GRID_COLS = gridDimensions.GRID_COLS;
    this.GRID_ROWS = gridDimensions.GRID_ROWS;
  }

  private isOutsideGrid(point: Point): boolean {
    return point.x < 1 || point.x > this.GRID_COLS || point.y < 1 || point.y > this.GRID_ROWS;
  }

  private getRandomPoint(): Point {
    let point: Point = { x: 0, y: 0 };
    do {
      point.x = Math.floor(Math.random() * this.GRID_COLS) + 1;
      point.y = Math.floor(Math.random() * this.GRID_ROWS) + 1;
    } while (this.isOutsideGrid(point));
    this.position = point;
    return point;
  }
  /**
   * draws food on a random point
   *
   */
  public draw(board: HTMLElement, redraw: boolean): void {
    let point = this.position;
    if (redraw) {
      point = this.getRandomPoint();
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
