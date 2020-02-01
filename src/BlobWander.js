export function BlobWander({ blob, map }) {
    let running = false;
    let direction = -1;

    return {
        start,
        stop,
        run
    };

    function start() {
        blob.emptyHands();
        running = true;
    }

    function stop() {
        running = false;
    }

    function run(delta) {
        if (!running) return;

        if (nearLeftEdge()) {
            direction = 1;
        }
        else if (nearRightEdge()) {
            direction = -1;
        }

        blob.move(blob.width() * .5 * delta * direction);
    }

    function nearLeftEdge() {
        return blob.position().x < 2;
    }

    function nearRightEdge() {
        const number = map.width() - 2;
        return blob.position().x > (number);
    }
}
