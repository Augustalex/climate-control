export function Timer({ duration }) {
    let lastTime;
    let time;

    return {
        time: () => time,
        hasPassed,
        reset
    };

    function hasPassed() {
        const now = Date.now();
        time += now - lastTime;
        lastTime = now;

        return time >= duration;
    }

    function reset() {
        lastTime = Date.now();
        time = 0;
    }
}
