import {WeatherController} from "@/WeatherController.js";

const Work = 'work-behaviour';
const Wander = 'wander-behaviour';

export function BlobBehaviourController({ blobWork, blobWander, weatherController }) {
    let behaviour = Wander;

    return {
        work,
        wander,
        run
    };

    function run() {
        if (weatherController.raining()) {
            wander();
        }
        else {
            work();
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
