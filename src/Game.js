import {Timer} from "@/Timer.js";

export default function Game({ actions }) {
    const timer = Timer({ duration: 750 });

    return {
        start
    };

    function start() {
        timer.reset();
        loop();

    }

    function loop() {
        if (timer.hasPassed()) {
            for (const action of actions) {
                action(timer.time() / 1000);
            }
            timer.reset();
        }
        requestAnimationFrame(loop);
    }
}
