import {Logger} from '../logs/logger.ts';
import {Engine} from './engine.ts';

export abstract class Game {
    abstract name: string;
    abstract guid: string;
    abstract version: string;
    abstract logger: Logger;

    protected engine!: Engine;

    onLoad(engine: Engine): void {
        this.engine = engine;
    }

    onStart(): void {
    }
}