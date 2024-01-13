import {Game} from '../engine/game/game.ts';
import {Logger} from '../engine/logs/logger.ts';
import {MainScene} from './scenes/main-scene.ts';
import {CubePrefab} from './prefabs/cube-prefab.ts';
import {Scene} from '../engine/structure/scene.ts';

export class DemoGame extends Game {
    guid = 'koi.wpengine.demo-game';
    name = 'Web Player - Demo Game';
    version = '0.0.1';
    logger = new Logger(`${this.guid}`);

    onStart() {
        const mainScene = this.engine.loadScene(Scene) as MainScene;

        mainScene.logger = this.logger;

        mainScene.addGameObject(this.engine.instanciateGameObject(CubePrefab));

        this.engine.showScene(mainScene);
    }

}