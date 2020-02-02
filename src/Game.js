import {Timer} from "@/Timer.js";
import {AudioDriver} from "@/AudioDriver.js";

export default function Game({ actions }) {
    const timer = Timer({ duration: 750 });

    return {
        start
    };

    function start() {
        timer.reset();
        loop();

        let ambientPlaying = false;
        window.addEventListener('click', () => {
            if (!ambientPlaying) {
                AudioDriver.play('ambient', .06, true);
                ambientPlaying = true;
            }
        });
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
