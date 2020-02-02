import Vue from 'vue'
import Vuex from 'vuex'
import Game from "@/Game.js";
import {BlobCharacter, BlobStartingPositionY} from "@/Blob.js";
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
import {Mode, Modes} from "@/Mode.js";
import {Seed, SeedState} from "@/Seed.js";
import {BlobFloat} from "@/BlobFloat.js";
import {DisasterEngine} from "@/DisasterEngine.js";
import {HouseFire} from "@/HouseFire.js";
import {Weather} from "@/Weather.js";
import {Disaster} from "@/Disaster.js";
import {Doomsday} from "@/Doomsday.js";

Vue.use(Vuex);

let store;

const sliderIsLowered = SliderIsLowered({ state: () => store.state.sliders.find(s => s.id === 'WeatherSlider') });
const weather = Weather({ state: () => store.state.weather });
const disaster = Disaster({ state: () => store.state.disaster });
const cloud = Cloud({ state: () => store.state.cloud });
const foreground = Foreground({ state: () => store.state.foreground });
const buttonA = Button({ id: 'ButtonA', state: () => store.state.buttons.find(b => b.id === 'ButtonA') });
const buttonB = Button({ id: 'ButtonB', state: () => store.state.buttons.find(b => b.id === 'ButtonB') });

const weatherController = WeatherController({ state: () => store.state.weather, cloud, foreground, disaster });

const seed = Seed({ disaster, weatherController, state: () => store.state.seed });
const cloudBop = CloudBop({ cloud });
const blob = BlobCharacter({ state: () => store.state });
const map = DisplayMap({ state: () => store.state });
const blobWander = BlobWander({ blob, map });
const house = House({ state: () => store.state.house });
const blobWork = BlobWork({ blob, house, map, seed });
const disasterEngine = DisasterEngine({ state: () => store.state.disaster, weather, map, house, seed });

const doomsday = Doomsday({ state: () => store.state, house, weatherController, seed });

const houseFire = HouseFire({ disasterEngine, house });
const blobFloat = BlobFloat({ blob, map, disasterEngine });

const blobBehaviourController = BlobBehaviourController({
    blob,
    blobWork,
    blobWander,
    blobFloat,
    seed,
    disasterEngine
});

const mode = Mode({ state: () => store.state.mode, slider: { isLowered: sliderIsLowered }, buttonA, buttonB });

const weatherSlider = WeatherSlider({
    id: 'WeatherSlider',
    state: () => store.state.sliders.find(s => s.id === 'WeatherSlider'),
    weatherController,
    mode,
    doomsday
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
    disasterEngine.run,
    houseFire.run,
    seed.run,
    blobBehaviourController.run,
    blobWork.run,
    blobWander.run,
    blobFloat.run,
    cloudBop.bop
];
const game = Game({ actions });

store = new Vuex.Store({
    state: {
        map: {
            scale: 4,
            width: 20,
            height: 14
        },
        doomsday: false,
        weather: {
            mode: Weathers.Clear,
            ticks: 0
        },
        mode: {
            mode: Modes.Rain
        },
        disaster: {
            flood: false,
            fire: false,
            ticks: 0
        },
        seed: {
            state: SeedState.Underground,
            ticks: 0,
            position: {
                x: 3.5,
                y: 3.5
            }
        },
        cloud: {
            width: 4,
            height: 2.5,
            position: {
                x: 2,
                y: 10.5
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
                y: BlobStartingPositionY
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
