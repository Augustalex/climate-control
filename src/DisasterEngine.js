import {SeedState} from "@/Seed.js";
import {AudioDriver} from "@/AudioDriver.js";

export function DisasterEngine({ state, weather, map, house, seed }) {
    return {
        run,
        drying,
        flooding,
        inflames,
        extinguish,
        dry,
        ticks: () => state().ticks,
    };

    function run() {
        if (disasterRunning()) {
            if (flooding()) {
                if (state().ticks > 2 && seed.state() !== SeedState.Underground) {
                    seed.kill();
                }

                if (drying()) {
                    decreaseDisasterTicks();

                    if (state().ticks === 0) {
                        endDrying();
                    }
                }
                else {
                    increaseDisasterToMax(map.height() - 6);
                }
            }
        }
        else {
            if (weather.ticks() > 10) {
                if (weather.raining()) {
                    flood();
                }
                else if (weather.sunny()) {
                    if (!house.demolished()) {
                        enflame();
                    }
                }
            }
        }
    }

    function decreaseDisasterTicks() {
        state().ticks = Math.max(0, state().ticks - 1);
    }

    function increaseDisasterToMax(max) {
        state().ticks = Math.min(max, state().ticks + 1);
    }

    function disasterRunning() {
        return state().flood || state().fire;
    }

    function flood() {
        state().flood = true;
    }

    function dry() {
        state().drying = true;
    }

    function endDrying() {
        state().drying = false;
        state().flood = false;
    }

    function drying() {
        return state().drying;
    }

    function enflame() {
        state().fire = true;
        AudioDriver.play('fire', .2, true);
    }

    function inflames() {
        return state().fire;
    }

    function flooding() {
        return state().flood;
    }

    function extinguish() {
        state().fire = false;
        AudioDriver.stop('fire');
    }
}
