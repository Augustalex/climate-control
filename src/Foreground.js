const ClearColor = 'rgba(0,0,0,0)';
const RainColor = 'rgba(200,200,255,.4)';
const SunColor = 'rgba(255,35,0,0.2)';

export function Foreground({ state }) {
    return {
        clear,
        rain,
        sun
    };

    function clear() {
        state().color = ClearColor;
    }

    function rain() {
        state().color = RainColor;
    }

    function sun() {
        state().color = SunColor;
    }
}
