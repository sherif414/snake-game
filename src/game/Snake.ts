class Snake {
  body: Point[] = [{ x: 30, y: 40 }];

  private GRID_ROWS: number;
  private GRID_COLS: number;

  constructor(gridDimensions: { GRID_ROWS: number; GRID_COLS: number }) {
    this.GRID_COLS = gridDimensions.GRID_COLS;
    this.GRID_ROWS = gridDimensions.GRID_ROWS;
  }

  public consumedFood(point: Point, { ignoreHead = false } = {}): boolean {
    return this.body.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return point.x === segment.x && point.y === segment.y;
    });
  }

  public update(newSegments: number, input: Point): void {
    for (let i = 0; i < newSegments; i++) {
      this.body.push({ ...this.body[this.body.length - 1] });
    }
    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1] = { ...this.body[i] };
    }

    this.body[0].x += input.x;
    this.body[0].y += input.y;
  }

  public checkDeath(): boolean {
    const head = this.body[0];
    return (
      head.x < 1 ||
      head.x > this.GRID_COLS ||
      head.y < 1 ||
      head.y > this.GRID_ROWS ||
      this.consumedFood(this.body[0], { ignoreHead: true })
    );
  }

  public draw(board: HTMLElement): void {
    this.body.forEach((segment) => {
      const el = document.createElement("div");
      el.style.gridRowStart = segment.y.toString();
      el.style.gridColumnStart = segment.x.toString();
      el.classList.add("snake");
      board.appendChild(el);
    });
  }
}

type Point = {
  x: number;
  y: number;
};

export default Snake;
