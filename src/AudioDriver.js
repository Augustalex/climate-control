const tinyPlop = new Audio('/tiny_plop_2.mp3');

const state = {
    toggleButton: {
        audio: tinyPlop,
        playing: false,
    }
};

export const AudioDriver = {
    play
};

function play(name) {
    const audioState = state[name];
    const audio = audioState.audio;

    audio.pause();
    audio.currentTime = 0;
    audio.play();
}
