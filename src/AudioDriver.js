const tinyPlop = new Audio('/tiny_plop_2.mp3');
const RainAudio = new Audio('/rain.mp3');
const SunAudio = new Audio('/sun.mp3');

const state = {
    toggleButton: {
        audio: tinyPlop,
        lastPlayed: 0
    },
    rain: {
        audio: RainAudio,
        lastPlayed: 0
    },
    sun: {
        audio: SunAudio,
        lastPlayed: 0
    }
};

export const AudioDriver = {
    play,
    stop
};

function play(name, volume = 1, loop = false) {
    const audioState = state[name];

    const now = Date.now();
    if(now - audioState.lastPlayed < 50) return;
    audioState.lastPlayed = now;

    const audio = audioState.audio;

    audio.pause();
    audio.loop = loop;
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
}

function stop(name) {
    const audioState = state[name];
    const audio = audioState.audio;

    audio.pause();
    audio.currentTime = 0;
}
