export function DisasterEngine({ state, weatherController, map, house }) {
    return {
        run,
        flooding,
        inflames,
        extinguish,
        ticks: () => state().ticks,
    };

    function run() {
        if (disasterRunning()) {
            state().ticks = Math.min(map.height() - 6, state().ticks + 1);
        }
        else {
            if (weatherController.ticks() > 10) {
                if (weatherController.raining()) {
                    flood();
                }
                else if (weatherController.sunny()) {
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
        state().flood = false;
        state().ticks = 0;
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
