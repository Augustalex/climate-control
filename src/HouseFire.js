export function HouseFire({ disasterEngine, house }) {
    let tick = 0;

    return {
        run
    };

    function run() {
        if (disasterEngine.inflames()) {
            tick += 1;
            if (tick === 3) {
                house.tear();
                tick = 0;

                if (house.demolished()) {
                    disasterEngine.extinguish();
                }
            }
        }
    }
}
