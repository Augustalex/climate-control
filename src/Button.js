export function Button({ id, state }) {
    return {
        is: otherId => otherId === id,
        update,
        on
    };

    function update(data) {
        const wasOn = state().on;
        const newStateCopy = Object.assign(state(), { ...data });

        const wasToggled = newStateCopy.on !== wasOn;
        if (wasToggled) {
        }
    }

    function on() {
        return state().on;
    }
}
