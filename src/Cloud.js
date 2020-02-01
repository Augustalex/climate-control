const RainColor = 'rgb(90,90,130,1)';
const ClearColor = 'rgb(255,255,255,.7)';

export function Cloud({ state }) {
    return {
        rain,
        clear,
        setPosition
    };

    function rain() {
        state.color = RainColor;
    }

    function clear() {
        state.color = ClearColor;
    }

    function setPosition({ x, y }) {
        state.position.x = x;
        state.position.y = y;
    }
}
