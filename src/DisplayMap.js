export function DisplayMap({ state }) {
    return {
        width,
        height
    };

    function width() {
        return state().map.width;
    }

    function height() {
        return state().map.height;
    }
}
