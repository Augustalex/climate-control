import Vue from 'vue'
import Vuex from 'vuex'
import Game from "@/Game.js";
import {BlobCharacter} from "@/Blob.js";
import {BlobWander} from "@/BlobWander.js";
import {DisplayMap} from "@/DisplayMap.js";
import {CloudBop} from "@/CloudBop.js";
import {Cloud} from "@/Cloud.js";
import {WeatherController} from "@/WeatherController.js";
import {Foreground} from "@/Foreground.js";
import {WeatherSlider} from "@/WeatherSlider.js";
import {BlobBehaviourController} from "@/BlobBehaviourController.js";
import {BlobWork} from "@/BlobWork.js";
import {House} from "@/House.js";

Vue.use(Vuex);

let store;

const cloud = Cloud({ state: () => store.state.cloud });
const foreground = Foreground({ state: () => store.state.foreground });

const weatherController = WeatherController({ cloud, foreground });

const cloudBop = CloudBop({ cloud });
const blob = BlobCharacter({ state: () => store.state });
const map = DisplayMap({ state: () => store.state });
const blobWander = BlobWander({ blob, map });
const house = House({ state: () => store.state.house });
const blobWork = BlobWork({ blob, house, map });

const blobBehaviourController = BlobBehaviourController({ blobWork, blobWander, weatherController });

const weatherSlider = WeatherSlider({
    id: 'WeatherSlider',
    state: () => store.state.sliders.find(s => s.id === 'WeatherSlider'),
    weatherController
});
const sliders = [
    weatherSlider
];

const actions = [
    cloudBop.bop,
    blobWander.run,
    blobWork.run,
    blobBehaviourController.run,
    weatherController.run
];
const game = Game({ actions });

store = new Vuex.Store({
    state: {
        map: {
            scale: 4,
            width: 20,
            height: 10
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
        ]
    },
    mutations: {},
    actions: {
        updateSlider
    },
    modules: {}
});

function updateSlider({ state }, { id, ...data }) {
    sliders.find(s => s.is(id)).update(data);
}

game.start();

export default store;
