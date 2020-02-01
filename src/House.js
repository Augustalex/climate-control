export function House({ state }) {
    return {
        repair,
        position
    };

    function repair() {
        state().order += 1;
    }

    function position() {
        return { ...state().position };
    }
}
