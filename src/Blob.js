export const BlobStartingPositionY = 1;
export const BlobSpeedState = {
    Running: 'running',
    Walking: 'walking'
};

export function BlobStateTemplate({
    id,
    speedState = BlobSpeedState.Walking,
    x = 3,
} = {}) {
    return {
        id,
        speedState,
        width: 1,
        inHands: {
            type: 'empty'
        },
        position: {
            x,
            y: BlobStartingPositionY
        }
    };
}

export function BlobCharacter({ state }) {
    return {
        startingPositionY,
        setSpeedState,
        position,
        setPosition,
        move,
        width,
        hasEmptyHands,
        emptyHands,
        holdMaterial,
        speed
    };

    function startingPositionY() {
        return BlobStartingPositionY;
    }

    function setSpeedState(speedState) {
        state().speedState = speedState;
    }

    function position() {
        return { ...state().position };
    }

    function setPosition({ x, y }) {
        state().position.x = x;
        state().position.y = y;
    }

    function move(x = 0, y = 0) {
        const position = state().position;
        position.x += x;
        position.y += y;
    }

    function width() {
        return state().width;
    }

    function holdMaterial() {
        state().inHands.type = 'material';
    }

    function emptyHands() {
        state().inHands.type = 'empty';
    }

    function hasEmptyHands() {
        return state().inHands.type === 'empty';
    }

    function speed() {
        return width();
    }
}
