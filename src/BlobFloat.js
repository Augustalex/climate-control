export function BlobFloat({ blob, map, disaster }) {
    let running = false;
    let direction = -1;
    let directionY = 0;

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

        if (disaster.drying()) {
            blob.setPosition({ x: blob.position().x, y: disaster.ticks() });
        }
        else if (blob.position().y <= disaster.ticks() - 2) {
            direction = 0;

            if (nearLeftEdge()) {
                directionY = Math.random() ? -1 : 1;
            }
            else if (nearRightEdge()) {
                directionY = Math.random() ? -1 : 1;
            }

            if (disaster.ticks() - 1 <= blob.position().y) {
                directionY = -1;
            }
            else if (blob.position().y < 2) {
                directionY = 1;
            }

            blob.move(0, .5 * directionY * delta);
        }
        else {
            if (nearLeftEdge()) {
                direction = 1;
            }
            else if (nearRightEdge()) {
                direction = -1;
            }

            blob.move(blob.speed() * delta * direction);
        }
    }

    function nearLeftEdge() {
        return blob.position().x < 2;
    }

    function nearRightEdge() {
        const maxX = map.width() - 2;
        return blob.position().x > (maxX);
    }
}
