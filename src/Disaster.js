export function Disaster({ state }) {
    return {
        flooding,
        dry
    };

    function dry() {
        state().drying = true;
    }

    function drying() {
        return state().drying;
    }

    function flooding() {
        return state().flood;
    }
}
