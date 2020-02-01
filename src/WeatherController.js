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
        raining
    };

    function run() {
        if (raining()) {
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
        state().mode = Weathers.Raining;
    }

    function clear() {
        state().mode = Weathers.Clear;
    }

    function bringOutTheSun() {
        state().mode = Weathers.Sunny;
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
}
