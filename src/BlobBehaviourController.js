import {WeatherController} from "@/WeatherController.js";

const Work = 'work-behaviour';
const Wander = 'wander-behaviour';

export function BlobBehaviourController({ blob, blobWork, blobWander, seed }) {
    let behaviour = Wander;

    return {
        work,
        wander,
        run
    };

    function run() {
        if (seed.canBeHarvested() || !blob.hasEmptyHands()) {
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
    }
};
