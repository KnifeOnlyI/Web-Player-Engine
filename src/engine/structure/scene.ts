import {GameObject} from './game-object.ts';
import {Engine} from '../game/engine.ts';

export abstract class Scene {
    abstract readonly name: string;

    private readonly gameObjects = new Array<GameObject>();

    private _shown = false;
    private _destroyed = false;

    constructor(protected readonly engine: Engine, public id: number) {
    }

    get destroyed(): boolean {
        return this._destroyed;
    }

    load(): void {
        if (this.destroyed) {
            return;
        }

        this.onLoad();
    }

    onLoad(): void {
    }

    destroy(): void {
        if (this.destroyed) {
            return;
        }

        this.gameObjects.forEach(gameObject => gameObject.destroy());

        this.onDestroy();

        this._destroyed = true;
    }

    onDestroy(): void {
    }

    show(): void {
        if (this.destroyed || this._shown) {
            return;
        }

        this._shown = true;

        this.onShow();
    }

    onShow(): void {
    }

    hide(): void {
        if (this.destroyed || !this._shown) {
            return;
        }

        this._shown = false;

        this.onHide();
    }

    onHide(): void {
    }

    update(): void {
        if (this.destroyed || !this._shown) {
            return;
        }

        this.gameObjects.forEach(gameObject => gameObject.update());

        this.onUpdate();
    }

    onUpdate(): void {
    }

    draw(): void {
        if (this.destroyed || !this._shown) {
            return;
        }

        this.gameObjects.forEach(gameObject => gameObject.draw());

        this.onDraw();
    }

    onDraw(): void {
    }

    addGameObject(gameObject: GameObject): void {
        if (gameObject.destroyed || this.findGameObjectIndex(gameObject) !== -1) {
            return;
        }

        gameObject.scene = this;

        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject: GameObject): GameObject | null {
        if (gameObject.destroyed) {
            return null;
        }

        const index = this.findGameObjectIndex(gameObject);

        if (index !== -1) {
            gameObject.scene = null;

            this.gameObjects.splice(index);

            return gameObject;
        }

        return null;
    }

    private findGameObjectIndex(gameObject: GameObject): number {
        return this.gameObjects.findIndex(c => c.id === gameObject.id);
    }
}