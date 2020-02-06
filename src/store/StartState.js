import {Weathers} from "@/WeatherController.js";
import {Modes} from "@/Mode.js";
import {SeedState} from "@/Seed.js";
import {BlobStartingPositionY} from "@/Blob.js";

export function StartState() {
    return {
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
    };
}
