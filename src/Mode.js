export const Modes = {
    Rain: 'mode-rain',
    Clear: 'mode-clear',
    Sun: 'mode-sun',
    ChangeRate: 'mode-changeRate'
};

export function Mode({ state, slider, buttonA, buttonB }) {
    return {
        onButtonUpdated,
        mode: () => state().mode
    };

    function onButtonUpdated() {
        if (!slider.isLowered()) return;

        if (buttonA.on() && buttonB.on()) {
            setMode(Modes.Sun);
        }
        else if (!buttonA.on() && buttonB.on()) {
            setMode(Modes.Clear);
        }
        else if (buttonA.on() && !buttonB.on()) {
            setMode(Modes.Rain);
        }
        else if (!buttonA.on() && !buttonB.on()) {
            setMode(Modes.ChangeRate);
        }
    }

    function setMode(newMode) {
        state().mode = newMode;
    }
}
