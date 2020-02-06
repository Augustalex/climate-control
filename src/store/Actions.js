export function Actions({
    sliders,
    buttons,
    mode
}) {

    return {
        updateSlider,
        updateButton,
    };

    function updateSlider({ state }, { id, ...data }) {
        sliders.find(s => s.is(id)).update(data);
    }

    function updateButton({ state }, { id, ...data }) {
        buttons.find(b => b.is(id)).update(data);
        mode.onButtonUpdated();
    }
}
