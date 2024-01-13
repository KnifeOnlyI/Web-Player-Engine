import {Game} from '../engine/game/game.ts';
import {Logger} from '../engine/logs/logger.ts';

export class DemoGame extends Game {
    guid = 'koi.wpengine.demo-game';
    name = 'Web Player - Demo Game';
    version = '0.0.1';
    logger = new Logger(`${this.guid}`);

    onLoad() {
        this.logger.debug(`${this.name} v${this.version} loaded`);
    }

    onStart() {
        this.logger.debug(`${this.name} v${this.version} started`);
    }

}