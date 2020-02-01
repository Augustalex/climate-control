export function WeatherController({ cloud, foreground }) {
    let rain = true;

    return {
        run
    };

    function run() {
        if (Math.random() < .2) {
            rain = !rain;
        }

        if (rain) {
            cloud.rain();
            foreground.rain();
        }
        else {
            cloud.clear();
            foreground.clear();
        }
    }
}
