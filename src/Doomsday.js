import {Disaster} from "@/Disaster.js";

export function Doomsday({ state, seed, weatherController, house, disasterEngine }) {
    return {
        activate
    };

    function activate() {
        state().doomsday = true;
        setTimeout(() => {
            seed.kill();
            weatherController.clear();
            disasterEngine.dry();
            for (let i = house.order(); i > 1; i++) {
                house.tear();
            }
        }, 1000);
        setTimeout(() => {
            state().doomsday = false;
        }, 3000);
    }
}
