const ClearColor = 'rgba(0,0,0,0)';
const RainColor = 'rgba(200,200,255,.4)';

export function Foreground({ state }) {
    return {
        clear,
        rain
    };

    function clear() {
        state.color = ClearColor;
    }

    function rain() {
        state.color = RainColor;
    }
}
