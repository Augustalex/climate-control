const Work = 'work-behaviour';
const Wander = 'wander-behaviour';
const Float = 'float-behaviour';
const Run = 'run-behaviour';

export function BlobBehaviourController({ blob, blobWork, blobWander, blobRunFromFire, blobFloat, seed, disasterEngine }) {
    let behaviour = Wander;

    return {
        run
    };

    function run() {
        if (disasterEngine.flooding()) {
            if (behaviour !== Float) {
                changeFrom(behaviour);
            }
            float();
        }
        else if (disasterEngine.inflames()) {
            if (behaviour !== Run) {
                changeFrom(behaviour);
            }
            makeBlobRun();
        }
        else if (seed.canBeHarvested() || !blob.hasEmptyHands()) {
            if (behaviour !== Work) {
                changeFrom(behaviour);
            }
            work();
        }
        else {
            if (behaviour !== Wander) {
                changeFrom(behaviour);
            }
            wander();
        }
    }

    function work() {
        behaviour = Work;
        update();
    }

    function wander() {
        behaviour = Wander;
        update();
    }

    function float() {
        behaviour = Float;
        update();
    }

    function makeBlobRun() {
        behaviour = Run;
        update();
    }

    function update() {
        if (behaviour === Wander) {
            blobWander.start();
        }
        else {
            blobWander.stop();
        }

        if (behaviour === Work) {
            blobWork.start();
        }
        else {
            blobWork.stop();
        }

        if (behaviour === Float) {
            blobFloat.start();
        }
        else {
            blobFloat.stop();
        }

        if (behaviour === Run) {
            blobRunFromFire.start();
        }
        else {
            blobRunFromFire.stop();
        }
    }

    function changeFrom(fromBehaviour) {
        if (fromBehaviour === Float) {
            blob.setPosition({ x: blob.position().x, y: blob.startingPositionY() });
        }
    }
}
