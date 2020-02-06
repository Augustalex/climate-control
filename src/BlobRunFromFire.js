import {BlobSpeedState} from "@/Blob.js";
import {AudioDriver} from "@/AudioDriver.js";

export function BlobRunFromFire({ blob, map }) {
    let running = false;
    let direction = -1;

    return {
        start,
        stop,
        run
    };

    function start() {
        AudioDriver.playIfStopped('scream', .05, true);
        blob.emptyHands();
        blob.setSpeedState(BlobSpeedState.Running);
        running = true;
    }

    function stop() {
        AudioDriver.stop('scream');
        running = false;
        blob.setSpeedState(BlobSpeedState.Walking);
    }

    function run(delta) {
        if (!running) return;

        if (nearLeftEdge()) {
            direction = 1;
        }
        else if (nearRightEdge()) {
            direction = -1;
        }
        else {
            direction = Math.random() < .2 ? (direction === 1 ? -1 : 1) : direction;
        }

        blob.move(blob.speed() * 2 * delta * direction);
    }

    function nearLeftEdge() {
        return blob.position().x < 2;
    }

    function nearRightEdge() {
        const maxX = map.width() - 2;
        return blob.position().x > (maxX);
    }
}
