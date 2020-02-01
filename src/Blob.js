export function BlobCharacter({ state }) {
    return {
        position,
        move,
        width,
        hasEmptyHands,
        emptyHands,
        holdFood
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

    function holdFood() {
        state().blob.inHands.type = 'food';
    }

    function emptyHands() {
        state().blob.inHands.type = 'empty';
    }

    function hasEmptyHands() {
        return state().blob.inHands.type === 'empty';
    }
}
