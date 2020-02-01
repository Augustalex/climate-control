export function DisasterEngine({ state, weather, map, house }) {
    return {
        run,
        flooding,
        inflames,
        extinguish,
        dry,
        ticks: () => state().ticks,
    };

    function run() {
        if (disasterRunning()) {
            if (drying()) {
                state().ticks = Math.max(0, state().ticks - 1);
                if (state().ticks === 0) {
                    endDrying();
                }
            }
            else {
                state().ticks = Math.min(map.height() - 6, state().ticks + 1);
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
    }

    function inflames() {
        return state().fire;
    }

    function flooding() {
        return state().flood;
    }

    function extinguish() {
        state().fire = false;
        state().ticks = 0;
    }
}
