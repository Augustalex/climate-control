export const SeedState = {
    Underground: 'seed-underground',
    CreepingUp: 'seed-creepingUp',
    Ready: 'seed-ready'
};

export function Seed({ state, weatherController }) {
    return {
        harvest,
        canBeHarvested,
        run
    };

    function run() {
        if (underground()) {
            console.log('underground');
            if (weatherController.raining()) {
                console.log('raining');
                tick();
                console.log('tick', state().ticks);
                if (readyToEvolve()) {
                    creepUp();
                }
            }
        }
        else if (creepingUp()) {
            if (weatherController.sunny()) {
                tick();
                if (readyToEvolve()) {
                    ready();
                }
            }
        }
    }

    function canBeHarvested() {
        return getState() === SeedState.Ready;
    }

    function creepingUp() {
        return getState() === SeedState.CreepingUp;
    }

    function underground() {
        return getState() === SeedState.Underground;
    }

    function tick() {
        state().ticks += 1;
    }

    function resetTicks() {
        state().ticks = 0;
    }

    function readyToEvolve() {
        return state().ticks > 5;
    }

    function harvest() {
        setState(SeedState.Underground);
        resetTicks();
    }

    function ready() {
        setState(SeedState.Ready);
        resetTicks();
    }

    function creepUp() {
        setState(SeedState.CreepingUp);
        resetTicks();
    }

    function setState(newState) {
        state().state = newState;
    }

    function getState() {
        return state().state;
    }
}
