export class GameScreen {
    private readonly canvas: HTMLCanvasElement;

    constructor(canvasId: string) {
        this.canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;

        if (!this.canvas) {
            throw new Error(`Cannot found canvas with id #${canvasId}`);
        }
    }

    setSize(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }
}