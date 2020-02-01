export function BlobWork({ blob, house, map }) {
    let running = false;
    let direction = -1;

    return {
        stop,
        start,
        run
    };

    function stop() {
        running = false;
    }

    function start() {
        running = true;
    }

    function run(delta) {
        if (!running) return;

        if (working()) {
            direction = houseToTheRight() ? 1 : -1;
        }
        else {
            direction = houseToTheRight() ? -1 : 1;
        }

        blob.move(blob.width() * .5 * delta * direction);

        if (working()) {
            if (closeToHouse()) {
                work();
                stopWork();
            }
        }
        else {
            if (nearLeftEdge()) {
                startWork();
            }
        }

    }

    function working() {
        return hasMaterials();
    }

    function work() {
        house.repair();
    }

    function stopWork() {
        blob.emptyHands();
    }

    function startWork() {
        blob.holdFood();
    }

    function nearLeftEdge() {
        return blob.position().x < 1;
    }

    function houseToTheRight() {
        return house.position().x > blob.position().x;
    }

    function closeToHouse() {
        return Math.abs(house.position().x - blob.position().x) < 1;
    }

    function hasMaterials() {
        return !blob.hasEmptyHands();
    }
}
