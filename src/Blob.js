export function BlobCharacter({ state }) {
    return {
        position,
        move,
        width
    };

    function position() {
        return { ...state().blob.position };
    }

    function move(x = 0, y = 0) {
        const position = state().blob.position;
        position.x += x;
        position.y += y;
    }

    function width() {
        return state().blob.width;
    }
}
