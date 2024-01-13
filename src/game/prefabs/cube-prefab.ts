import {GameObject} from '../../engine/structure/game-object.ts';

export class CubePrefab extends GameObject {
    readonly name = 'Cube';

    private add = true;
    private cycles = 1;

    onStart() {
        this.size.x = 50;
        this.size.y = 50;
        this.scale.x = 1;
        this.scale.y = 2;

        this.updatePosition();
    }

    onUpdate() {
        const valueToAddOrSubtract = 0.05 * this.engine.time.deltaTime;

        if (this.add) {
            this.size.x += valueToAddOrSubtract;
            this.size.y += valueToAddOrSubtract;
        } else {
            this.size.x -= valueToAddOrSubtract;
            this.size.y -= valueToAddOrSubtract;
        }

        if (this.size.y > 200) {
            this.size.y = 200;
            this.add = false;
        } else if (this.size.y < 50) {
            this.size.y = 50;
            this.add = true;
            this.cycles++;
        }

        if (this.cycles > 2) {
            this.destroy();
        }

        this.updatePosition();
    }

    onDraw() {
        const scaledSize = this.getScaledSize();

        this.engine.screen.setFillColor('#FFFF00');
        this.engine.screen.drawRect(this.position.x, this.position.y, scaledSize.x, scaledSize.y);
    }

    private updatePosition() {
        const scaledSize = this.getScaledSize();

        this.position.x = this.engine.screen.getWidth() / 2 - scaledSize.x / 2;
        this.position.y = this.engine.screen.getHeight() / 2 - scaledSize.y / 2;
    }
}