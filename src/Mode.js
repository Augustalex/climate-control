export const Modes = {
    Rain: 'mode-rain',
    Clear: 'mode-clear',
    Sun: 'mode-sun',
    ChangeRate: 'mode-changeRate'
};

export function Mode({ slider, buttonA, buttonB }) {
    let mode = Modes.Rain;

    return {
        onButtonUpdated,
        mode: () => mode
    };

    function onButtonUpdated() {
        if (!slider.isLowered()) return;

        if (buttonA.on() && buttonB.on()) {
            mode = Modes.Sun;
        }
        else if (!buttonA.on() && buttonB.on()) {
            mode = Modes.Clear;
        }
        else if (buttonA.on() && !buttonB.on()) {
            mode = Modes.Rain;
        }
        else if (!buttonA.on() && !buttonB.on()) {
            mode = Modes.ChangeRate;
        }
    }
}
