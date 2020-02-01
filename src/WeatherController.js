export const Weathers = {
    Raining: 'weather-raining',
    Clear: 'weather-clear',
    Sunny: 'weather-sunny'
};

export function WeatherController({ state, cloud, foreground }) {
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
        if (raining()) {
            state().ticks += 1;
            cloud.rain();
            foreground.rain();
        }
        else if (isClear()) {
            cloud.clear();
            foreground.clear();
        }
        else if (sunny()) {
            cloud.sun();
            foreground.sun();
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
        state().mode = newMode;
        state().ticks = 0;
    }
}
