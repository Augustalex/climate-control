export function WeatherController({ cloud, foreground }) {
    let isRaining = false;

    return {
        run,
        rain,
        clear,
        raining
    };

    function run() {
        if (isRaining) {
            cloud.rain();
            foreground.rain();
        }
        else {
            cloud.clear();
            foreground.clear();
        }
    }

    function rain() {
        isRaining = true;
    }

    function clear() {
        isRaining = false;
    }

    function raining() {
        return !!isRaining;
    }
}
