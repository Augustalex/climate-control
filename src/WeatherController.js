import {AudioDriver} from './AudioDriver.js'

export const Weathers = {
    Raining: 'weather-raining',
    Clear: 'weather-clear',
    Sunny: 'weather-sunny'
};

export function WeatherController({ state, cloud, foreground, disaster }) {
    return {
        run,
        rain,
        clear,
        bringOutTheSun,
        raining,
        sunny,
        ticks: () => state().ticks
    };

    function run() {
        state().ticks += 1;

        if (raining()) {
            cloud.rain();
            foreground.rain();

            if (disaster.inflames()) {
                disaster.extinguish();
            }
        }
        else if (isClear()) {
            cloud.clear();
            foreground.clear();
        }
        else if (sunny()) {
            cloud.sun();
            foreground.sun();

            if (disaster.flooding()) {
                disaster.dry();
            }
        }
    }

    function rain() {
        setMode(Weathers.Raining);
    }

    function clear() {
        setMode(Weathers.Clear);
    }

    function bringOutTheSun() {
        setMode(Weathers.Sunny);
    }

    function raining() {
        return state().mode === Weathers.Raining;
    }

    function isClear() {
        return state().mode === Weathers.Clear;
    }

    function sunny() {
        return state().mode === Weathers.Sunny;
    }

    function setMode(newMode) {
        if (newMode === Weathers.Raining) {
            if (state().mode !== Weathers.Raining) {
                AudioDriver.play('rain', .12, true);
            }
        }
        else {
            AudioDriver.stop('rain');
        }

        if (newMode === Weathers.Sunny) {
            if (state().mode !== Weathers.Sunny) {
                AudioDriver.play('sun', .05, true);
            }
        }
        else {
            AudioDriver.stop('sun');
        }

        state().mode = newMode;
        state().ticks = 0;
    }
}
