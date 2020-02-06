const tinyPlop = new Audio('/tiny_plop_2.mp3');
const RainAudio = new Audio('/rain.mp3');
const SunAudio = new Audio('/sun.mp3');
const FireAudio = new Audio('/fire.mp3');
const AmbientAudio = new Audio('/ambient.wav');
const ScreamAudio = new Audio('/scream.mp3');

let lastPlayedName = '';

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
    },
    fire: {
        audio: FireAudio,
        lastPlayed: 0
    },
    ambient: {
        audio: AmbientAudio,
        lastPlayed: 0
    },
    scream: {
        audio: ScreamAudio,
        lastPlayed: 0
    }
};

export const AudioDriver = {
    playIfStopped,
    play,
    stop
};

function playIfStopped(name, volume, loop) {
    if (audioIsStopped(name)) {
        play(name, volume, loop);
    }
}

function play(name, volume = 1, loop = false) {
    const audioState = state[name];

    const now = Date.now();
    if (now - audioState.lastPlayed < 50) return;
    audioState.lastPlayed = now;

    const audio = audioState.audio;

    audio.pause();
    audio.loop = loop;
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();

    lastPlayedName = name;
}

function stop(name) {
    const audioState = state[name];
    const audio = audioState.audio;

    audio.pause();
    audio.currentTime = 0;

    lastPlayedName = '';
}

function audioIsStopped(name) {
    const lastPlayedAnotherSong = lastPlayedName !== name;
    if (lastPlayedAnotherSong) return true;

    const timeSinceLastPlayedSong = Date.now() - state[name].lastPlayed;
    const songDurationMilliseconds = state[name].audio.duration * 1000;
    return timeSinceLastPlayedSong > songDurationMilliseconds;
}
