export function Doomsday({ state, seed, weatherController, house }) {
    return {
        activate
    };

    function activate() {
        state().doomsday = true;
        setTimeout(() => {
            seed.kill();
            weatherController.clear();
            for (let i = house.order(); i > 1; i++) {
                house.tear();
            }
        }, 1000);
        setTimeout(() => {
            state().doomsday = false;
        }, 3000);
    }
}
