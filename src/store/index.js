import Vue from 'vue'
import Vuex from 'vuex'
import Game from "@/Game.js";
import {BlobCharacter} from "@/Blob.js";
import {BlobWander} from "@/BlobWander.js";
import {DisplayMap} from "@/DisplayMap.js";
import {CloudBop} from "@/CloudBop.js";
import {Cloud} from "@/Cloud.js";
import {WeatherController, Weathers} from "@/WeatherController.js";
import {Foreground} from "@/Foreground.js";
import {WeatherSlider} from "@/WeatherSlider.js";
import {BlobBehaviourController} from "@/BlobBehaviourController.js";
import {BlobWork} from "@/BlobWork.js";
import {House} from "@/House.js";
import {Button} from "@/Button.js";
import {SliderIsLowered} from "@/SliderIsLowered.js";
import {Mode} from "@/Mode.js";
import {Seed, SeedState} from "@/Seed.js";

Vue.use(Vuex);

let store;

const sliderIsLowered = SliderIsLowered({ state: () => store.state.sliders.find(s => s.id === 'WeatherSlider') });
const cloud = Cloud({ state: () => store.state.cloud });
const foreground = Foreground({ state: () => store.state.foreground });
const buttonA = Button({ id: 'ButtonA', state: () => store.state.buttons.find(b => b.id === 'ButtonA') });
const buttonB = Button({ id: 'ButtonB', state: () => store.state.buttons.find(b => b.id === 'ButtonB') });

const weatherController = WeatherController({ state: () => store.state.weather, cloud, foreground });

const seed = Seed({ weatherController, state: () => store.state.seed });
const cloudBop = CloudBop({ cloud });
const blob = BlobCharacter({ state: () => store.state });
const map = DisplayMap({ state: () => store.state });
const blobWander = BlobWander({ blob, map });
const house = House({ state: () => store.state.house });
const blobWork = BlobWork({ blob, house, map });

const blobBehaviourController = BlobBehaviourController({ blobWork, blobWander, weatherController });

const mode = Mode({ slider: { isLowered: sliderIsLowered }, buttonA, buttonB });

const weatherSlider = WeatherSlider({
    id: 'WeatherSlider',
    state: () => store.state.sliders.find(s => s.id === 'WeatherSlider'),
    weatherController,
    mode
});

const sliders = [
    weatherSlider
];
const buttons = [
    buttonA,
    buttonB,
];

const actions = [
    weatherController.run,
    seed.run,
    blobBehaviourController.run,
    blobWork.run,
    blobWander.run,
    cloudBop.bop
];
const game = Game({ actions });

store = new Vuex.Store({
    state: {
        map: {
            scale: 4,
            width: 20,
            height: 10
        },
        weather: {
            mode: Weathers.Clear
        },
        seed: {
            state: SeedState.Underground,
            ticks: 0
        },
        cloud: {
            width: 4,
            height: 2,
            position: {
                x: 2,
                y: 6
            },
            color: 'rgba(255,255,255,.7)'
        },
        foreground: {
            color: 'rgba(0,0,0,0)',
        },
        blob: {
            width: 1,
            inHands: {
                type: 'empty'
            },
            position: {
                x: 3,
                y: 1
            }
        },
        house: {
            position: {
                x: 13,
                y: 1
            },
            order: 1
        },
        sliders: [
            { id: 'WeatherSlider', wrapperHeight: 100, positionY: 2 }
        ],
        buttons: [
            { id: 'ButtonA', wrapperHeight: 40, on: false },
            { id: 'ButtonB', wrapperHeight: 40, on: false }
        ]
    },
    mutations: {},
    actions: {
        updateSlider,
        updateButton,
    },
    modules: {}
});

function updateSlider({ state }, { id, ...data }) {
    sliders.find(s => s.is(id)).update(data);
}

function updateButton({ state }, { id, ...data }) {
    buttons.find(b => b.is(id)).update(data);
    mode.onButtonUpdated();
}

game.start();

export default store;
