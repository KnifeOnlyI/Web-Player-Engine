import {GlobalData} from '../data/global-data.ts';
import {GameProperties} from './game.properties.ts';
import {GameScreen} from '../screen/game-screen.ts';
import {Game} from './game.ts';
import {GameObject} from '../structure/game-object.ts';
import {Time} from '../data/time.ts';
import {Scene} from '../structure/scene.ts';

export class Engine {
    readonly screen: GameScreen;
    readonly time = new Time();

    private readonly globalData = new GlobalData();
    private readonly gameObjects = new Array<GameObject>();
    private readonly scenes = new Array<Scene>();

    private currentScene?: Scene;
    private game?: Game;
    private isPlaying = false;
    private _started = false;

    constructor(canvasId: string, private readonly properties: GameProperties) {
        this.screen = new GameScreen(canvasId);
    }

    get started(): boolean {
        return this._started;
    }

    load(game: Game): void {
        this.game = game;

        this.game.onLoad(this);
    }

    start(): void {
        if (!this.game) {
            throw new Error('Cannot start the engine, no loaded game');
        }

        this.isPlaying = true;

        this.screen.setSize(this.properties.screen.width, this.properties.screen.height);

        this.game.onStart();

        window.requestAnimationFrame(this.loop.bind(this));
    }

    resume(): void {
        this.isPlaying = true;
    }

    pause(): void {
        this.isPlaying = false;
    }

    instanciateGameObject(gameObject: any): GameObject {
        const instance = new gameObject(this, this.globalData.nextGameObjectId++);

        this.gameObjects.push(instance);

        return instance;
    }

    loadScene<T extends Scene>(scene: any): T {
        const instance = new scene(this, this.globalData.nextGameObjectId++) as T;

        this.scenes.push(instance);

        instance.load();

        return instance;
    }

    showScene(scene: Scene): void {
        if (this.currentScene === scene || scene.destroyed || !this.findSceneById(scene.id)) {
            return;
        }

        this.currentScene?.hide();

        this.currentScene = scene;

        this.currentScene.show();
    }

    private findSceneById(id: number): Scene | null {
        return this.scenes.find(scene => scene.id === id) ?? null;
    }

    private update(): void {
        this.currentScene?.update();
    }

    private draw(): void {
        this.screen.clear();

        this.currentScene?.draw();
    }

    private playPlayingFrame(): void {
        this.update();
        this.draw();

        this.globalData.lastRender = this.globalData.timestamp;

        window.requestAnimationFrame(this.loop.bind(this));
    }

    private playPausingFrame(): void {
        this.globalData.lastRender = this.globalData.timestamp;

        window.requestAnimationFrame(this.loop.bind(this));
    }

    private playStartFrame(): void {
        this._started = true;

        this.playPausingFrame();
    }

    private loop(timestamp: number) {
        this.globalData.timestamp = timestamp;
        this.time.deltaTime = timestamp - this.globalData.lastRender;

        if (!this._started) {
            this.playStartFrame();
        } else if (!this.isPlaying) {
            this.playPausingFrame();
        } else {
            this.playPlayingFrame();
        }
    }

    // TODO: Remove destroyed game objects (remove its from parent scenes)
    // TODO: Remove destroyed scenes
}