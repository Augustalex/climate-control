const RainColor = 'rgb(90,90,130,1)';
const ClearColor = 'rgb(255,255,255,.7)';
const SunColor = 'rgba(255,255,255,0.5)';

export function Cloud({ state }) {
    return {
        rain,
        clear,
        sun,
        setPosition
    };

    function rain() {
        state().color = RainColor;
    }

    function clear() {
        state().color = ClearColor;
    }

    function sun() {
        state().color = SunColor;
    }

    function setPosition({ x, y }) {
        state().position.x = x;
        state().position.y = y;
    }
}
