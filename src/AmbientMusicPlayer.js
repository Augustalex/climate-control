import {AudioDriver} from "@/AudioDriver.js";

export function AmbientMusicPlayer() {
    let ambientPlaying = false;

    return {
        init
    };

    function init() {
        window.addEventListener('click', makeSureMusicIsPlaying);
    }

    function makeSureMusicIsPlaying() {
        if (ambientPlaying) return;

        AudioDriver.play('ambient', .06, true);
        ambientPlaying = true;
    }
}
