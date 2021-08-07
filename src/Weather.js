import {Weathers} from "@/WeatherController.js";

export function Weather({ state }) {
    return {
        raining,
        sunny,
        isClear,
        ticks: () => state().ticks
    };

    function raining() {
        return state().mode === Weathers.Raining;
    }

    function isClear() {
        return state().mode === Weathers.Clear;
    }

    function sunny() {
        return state().mode === Weathers.Sunny;
    }
}
