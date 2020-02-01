import {Modes} from "@/Mode.js";

export function WeatherSlider({ id, state, weatherController, mode }) {
    return {
        is: otherId => otherId === id,
        update
    };

    function update(data) {
        Object.assign(state(), { ...data });

        if (raised()) {
            onRaise()
        }
    }

    function onRaise() {
        if (mode.mode() === Modes.Rain) {
            return weatherController.rain();
        }
        else if (mode.mode() === Modes.Clear) {
            return weatherController.clear();
        }
    }

    function raised() {
        const { wrapperHeight, positionY } = state();
        return positionY > wrapperHeight * .7;
    }
}
