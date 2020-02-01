const Work = 'work-behaviour';
const Wander = 'wander-behaviour';
const Float = 'float-behaviour';

export function BlobBehaviourController({ blob, blobWork, blobWander, blobFloat, seed, disasterEngine }) {
    let behaviour = Wander;

    return {
        work,
        wander,
        run
    };

    function run() {
        if (disasterEngine.flooding()) {
            float();
        }
        else if (seed.canBeHarvested() || !blob.hasEmptyHands()) {
            work();
        }
        else {
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
    }
}
