export function SliderIsLowered({ state }) {
    return () => {
        return state().positionY < 5
    };
}
