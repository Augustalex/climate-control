export function WeatherController({ cloud, foreground }) {
    let isRaining = true;

    return {
        run,
        rain,
        clear
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
}
