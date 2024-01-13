import {GlobalData} from '../data/global-data.ts';
import {GameProperties} from './game.properties.ts';
import {GameScreen} from '../screen/game-screen.ts';
import {Game} from './game.ts';
import {Logger} from '../logs/logger.ts';

export class Engine {
    private readonly screen: GameScreen;
    private readonly globalData = new GlobalData();

    private game?: Game;

    private isPlaying = false;
    private _started = false;

    private logger = new Logger('koi.wpengine.core');

    constructor(canvasId: string, private readonly properties: GameProperties) {
        this.screen = new GameScreen(canvasId);

        this.logger.debug('Web Player Engine initialized');
    }

    get started(): boolean {
        return this._started;
    }

    load(game: Game): void {
        this.game = game;

        this.game.onLoad();
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

    private update(): void {
        this.logger.debug('Update');
    }

    private draw(): void {
        this.logger.debug('Draw');
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
        this.globalData.deltaTime = timestamp - this.globalData.lastRender;

        if (!this._started) {
            this.playStartFrame();
        } else if (!this.isPlaying) {
            this.playPausingFrame();
        } else {
            this.playPlayingFrame();
        }
    }
}