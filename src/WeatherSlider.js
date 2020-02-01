export function WeatherSlider({ id, state, weatherController }) {
    return {
        is: otherId => otherId === id,
        update
    };

    function update(data) {
        const { wrapperHeight, positionY } = Object.assign(state(), { ...data });
        if (positionY > wrapperHeight * .5) {
            weatherController.rain();
        }
        else {
            weatherController.clear();
        }
    }
}
