export function BlobWork({ blob, house, map, seed }) {
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

        blob.move(blob.speed() * delta * direction);

        if (working()) {
            if (closeToHouse()) {
                work();
                stopWork();
            }
        }
        else {
            if (nearSeed()) {
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
        seed.harvest();
        blob.holdMaterial();
    }

    function nearSeed() {
        return blob.position().x < seed.position().x;
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
