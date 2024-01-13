import {Engine} from '../game/engine.ts';
import {Scene} from './scene.ts';
import {Vector2} from '../math/vector2.ts';

export abstract class GameObject {
    abstract readonly name: string;

    scene: Scene | null = null;
    position = new Vector2(0, 0);
    size = new Vector2(0, 0);
    scale = new Vector2(1, 1);

    private _parent: GameObject | null = null;
    private readonly children = new Array<GameObject>();

    private _visible = true;
    private _started = false;
    private _enabled = true;
    private _destroyed = false;

    constructor(protected readonly engine: Engine, readonly id: number) {
    }

    get enabled(): boolean {
        return this._enabled;
    }

    get destroyed(): boolean {
        return this._destroyed;
    }

    get parent(): GameObject | null {
        return this._parent;
    }

    start(): void {
        if (this.destroyed || this._started) {
            return;
        }

        this.children.forEach(child => child.start());

        this.onStart();

        this._started = true;
    }

    onStart(): void {
    }

    enable(): void {
        if (this._enabled || this.destroyed) {
            return;
        }

        this.onEnable();

        this._enabled = true;
    }

    onEnable(): void {
    }

    disable(): void {
        if (!this._enabled || this.destroyed) {
            return;
        }

        this.onDisable();

        this._enabled = false;
    }

    onDisable(): void {
    }

    update(): void {
        if (!this._enabled || this.destroyed) {
            return;
        }

        this.children.forEach(child => child.update());

        this.start();

        this.onUpdate();
    }

    onUpdate(): void {
    }

    show(): void {
        if (this._visible || this.destroyed) {
            return;
        }

        this._visible = true;

        this.onShow();
    }

    onShow(): void {
    }

    hide(): void {
        if (!this._visible || this.destroyed) {
            return;
        }

        this._visible = false;

        this.onHide();
    }

    onHide(): void {
    }

    draw(): void {
        if (!this._enabled || !this._visible || this.destroyed) {
            return;
        }

        this.children.forEach(child => child.draw());

        this.onDraw();
    }

    onDraw(): void {
    }

    destroy(): void {
        if (!this._destroyed) {
            this.children.forEach(child => child.destroy());

            this.onDestroy();

            this._destroyed = true;
        }
    }

    onDestroy(): void {
    }

    getScaledSize(): Vector2 {
        return new Vector2(this.size.x * this.scale.x, this.size.y * this.scale.y);
    }

    addChild(child: GameObject): void {
        if (child.destroyed || child === this || this.findChildIndex(child)) {
            return;
        }

        child._parent = this;

        this.children.push(child);
    }

    removeChild(child: GameObject): GameObject | null {
        if (child.destroyed) {
            return null;
        }

        const index = this.findChildIndex(child);

        if (index === -1) {
            return null;
        }

        child._parent = null;

        this.children.splice(index);

        return child;
    }

    private findChildIndex(child: GameObject): number {
        return this.children.findIndex(c => c.id === child.id);
    }
}