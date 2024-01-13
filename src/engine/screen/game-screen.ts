export class GameScreen {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement | null;

        if (!canvas) {
            throw new Error(`Cannot found canvas with id #${canvasId}`);
        }

        this.canvas = canvas!;

        const ctx = this.canvas.getContext('2d');

        if (!ctx) {
            throw new Error(`Cannot found 2D context in canvas #${canvasId}`);
        }

        this.ctx = ctx;
    }

    setSize(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    getWidth(): number {
        return this.canvas.width;
    }

    getHeight(): number {
        return this.canvas.height;
    }

    setFillColor(color: string): void {
        this.ctx.fillStyle = color;
    }

    drawRect(x: number, y: number, width: number, height: number): void {
        this.ctx.fillRect(x, y, width, height);
    }

    clear(): void {
        const savedFillStyle = this.ctx.fillStyle;

        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.getWidth(), this.getHeight());

        this.ctx.fillStyle = savedFillStyle;
    }
}