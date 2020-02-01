export function House({ state }) {
    return {
        repair,
        tear,
        demolished: () => state().order === 0,
        position
    };

    function repair() {
        state().order += 1;
    }

    function tear() {
        state().order = Math.max(0, state().order - 1);
    }

    function position() {
        return { ...state().position };
    }
}
