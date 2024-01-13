import './style.css';
import {Engine} from './engine/game/engine.ts';
import {PauseButton, PlayButton} from './engine/dom/dom.ts';
import {DemoGame} from './game/demo-game.ts';

const engine = new Engine('screen', {
    screen: {
        width: 640,
        height: 480
    }
});

PlayButton.addEventListener('click', () => {
    if (!engine.started) {
        engine.start();
    } else {
        engine.resume();
    }
});

PauseButton.addEventListener('click', () => {
    engine.pause();
});

engine.load(new DemoGame());