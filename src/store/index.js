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
import {Button} from "@/Button.js";
import {SliderIsLowered} from "@/SliderIsLowered.js";
import {Mode} from "@/Mode.js";
import {Seed} from "@/Seed.js";
import {BlobFloat} from "@/BlobFloat.js";
import {DisasterEngine} from "@/DisasterEngine.js";
import {HouseFire} from "@/HouseFire.js";
import {Weather} from "@/Weather.js";
import {Disaster} from "@/Disaster.js";
import {Doomsday} from "@/Doomsday.js";
import {AmbientMusicPlayer} from "@/AmbientMusicPlayer.js";
import {Actions} from "@/store/Actions.js";
import {StartState} from "@/store/StartState.js";
import {StoreHolder} from "@/store/StoreHolder.js";
import FindWeatherSliderById from "@/store/query/FindWeatherSliderById.js";
import GetWeather from "@/store/query/GetWeather.js";
import GetDisaster from "@/store/query/GetDisaster.js";
import GetCloud from "@/store/query/GetCloud.js";
import GetProperty from "@/store/query/GetProperty.js";
import FindButtonById from "@/store/query/FindButtonById.js";

Vue.use(Vuex);

const storeHolder = StoreHolder();

const ambientMusicPlayer = AmbientMusicPlayer();
const sliderIsLowered = SliderIsLowered({ state: FindWeatherSliderById(storeHolder, 'WeatherSlider') });
const weather = Weather({ state: GetWeather(storeHolder) });
const buttonA = Button({ id: 'ButtonA', state: FindButtonById(storeHolder, 'ButtonA') });
const buttonB = Button({ id: 'ButtonB', state: FindButtonById(storeHolder, 'ButtonB') });
const blob = BlobCharacter({ state: () => storeHolder.get().state });
const map = DisplayMap({ state: () => storeHolder.get().state });
const house = House({ state: GetProperty('house', storeHolder) });
const disaster = Disaster({ state: GetDisaster(storeHolder) });
const cloud = Cloud({ state: GetCloud(storeHolder) });
const foreground = Foreground({ state: GetProperty('foreground', storeHolder) });

const mode = Mode({
    state: GetProperty('mode', storeHolder),
    slider: { isLowered: sliderIsLowered },
    buttonA,
    buttonB
});
const cloudBop = CloudBop({ cloud });
const blobWander = BlobWander({ blob, map });
const weatherController = WeatherController({ state: GetWeather(storeHolder), cloud, foreground, disaster });

const seed = Seed({ disaster, weatherController, state: GetProperty('seed', storeHolder) });

const blobWork = BlobWork({ blob, house, map, seed });
const disasterEngine = DisasterEngine({ state: GetProperty('disaster', storeHolder), weather, map, house, seed });

const doomsday = Doomsday({ state: () => storeHolder.get().state, house, weatherController, seed, disasterEngine });
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

const weatherSlider = WeatherSlider({
    id: 'WeatherSlider',
    state: FindWeatherSliderById(storeHolder, 'WeatherSlider'),
    weatherController,
    mode,
    doomsday
});

const game = Game({
    actions: [
        weatherController.run,
        disasterEngine.run,
        houseFire.run,
        seed.run,
        blobBehaviourController.run,
        blobWork.run,
        blobWander.run,
        blobFloat.run,
        cloudBop.bop
    ]
});

const store = new Vuex.Store({
    state: StartState(),
    actions: Actions({
        mode,
        sliders: [
            weatherSlider
        ],
        buttons: [
            buttonA,
            buttonB,
        ]
    })
});
storeHolder.set(store);
export default store;

ambientMusicPlayer.init();
game.start();
