export const BlobStartingPositionY = 1;

export function BlobCharacter({ state }) {
    return {
        startingPositionY: () => BlobStartingPositionY,
        position,
        setPosition,
        move,
        width,
        hasEmptyHands,
        emptyHands,
        holdMaterial,
        speed
    };

    function position() {
        return { ...state().blob.position };
    }

    function setPosition({ x, y }) {
        state().blob.position.x = x;
        state().blob.position.y = y;
    }

    function move(x = 0, y = 0) {
        const position = state().blob.position;
        position.x += x;
        position.y += y;
    }

    function width() {
        return state().blob.width;
    }

    function holdMaterial() {
        state().blob.inHands.type = 'material';
    }

    function emptyHands() {
        state().blob.inHands.type = 'empty';
    }

    function hasEmptyHands() {
        return state().blob.inHands.type === 'empty';
    }

    function speed() {
        return width();
    }
}
