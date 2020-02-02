import {AudioDriver} from "@/AudioDriver.js";

export function Disaster({ state }) {
    return {
        flooding,
        dry,
        inflames,
        extinguish
    };

    function dry() {
        state().drying = true;
    }

    function drying() {
        return state().drying;
    }

    function flooding() {
        return state().flood;
    }

    function inflames() {
        return state().fire;
    }

    function extinguish() {
        state().fire = false;
        state().ticks = 0;

        AudioDriver.stop('fire');
    }
}
