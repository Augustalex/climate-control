import {Disaster} from "@/Disaster.js";
import {AudioDriver} from "@/AudioDriver.js";

export function Doomsday({ state, seed, weatherController, house, disasterEngine }) {
    return {
        activate
    };

    function activate() {
        state().doomsday = true;
        AudioDriver.play('fire', .35, true);

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
            AudioDriver.stop('fire');
        }, 3000);
    }
}
