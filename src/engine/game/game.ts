import {Logger} from '../logs/logger.ts';

export abstract class Game {
    abstract name: string;
    abstract guid: string;
    abstract version: string;
    abstract logger: Logger;

    onLoad(): void {
    }

    onStart(): void {
    }
}