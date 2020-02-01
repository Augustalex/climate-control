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

Vue.use(Vuex);

const store = new Vuex.Store({
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
            position: {
                x: 3,
                y: 1
            }
        }
    },
    mutations: {},
    actions: {},
    modules: {}
});

const cloud = Cloud({ state: store.state.cloud });
const foreground = Foreground({ state: store.state.foreground });

const weatherController = WeatherController({ cloud, foreground });
const cloudBop = CloudBop({ cloud });
const blob = BlobCharacter({ state: store.state });
const map = DisplayMap({ state: store.state });
const blobWander = BlobWander({ blob, map });
const actions = [
    cloudBop.bop,
    blobWander.wander,
    weatherController.run
];
const game = Game({ actions });
game.start();

export default store;
