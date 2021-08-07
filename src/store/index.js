import Vue from 'vue'
import Vuex from 'vuex'
import Game from "@/Game.js";
import {DisplayMap} from "@/DisplayMap.js";
import {CloudBop} from "@/CloudBop.js";
import {Cloud} from "@/Cloud.js";
import {WeatherController} from "@/WeatherController.js";
import {Foreground} from "@/Foreground.js";
import {WeatherSlider} from "@/WeatherSlider.js";
import {House} from "@/House.js";
import {Button} from "@/Button.js";
import {SliderIsLowered} from "@/SliderIsLowered.js";
import {Mode} from "@/Mode.js";
import {Seed} from "@/Seed.js";
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
import {BlobFactory} from "@/BlobFactory.js";

Vue.use(Vuex);

const storeHolder = StoreHolder();

const ambientMusicPlayer = AmbientMusicPlayer();
const sliderIsLowered = SliderIsLowered({ state: FindWeatherSliderById(storeHolder, 'WeatherSlider') });
const weather = Weather({ state: GetWeather(storeHolder) });
const buttonA = Button({ id: 'ButtonA', state: FindButtonById(storeHolder, 'ButtonA') });
const buttonB = Button({ id: 'ButtonB', state: FindButtonById(storeHolder, 'ButtonB') });
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
const weatherController = WeatherController({ state: GetWeather(storeHolder), cloud, foreground, disaster });

const seed = Seed({ disaster, weather, state: GetProperty('seed', storeHolder) });

const disasterEngine = DisasterEngine({ state: GetProperty('disaster', storeHolder), weather, map, house, seed });

const doomsday = Doomsday({ state: () => storeHolder.get().state, house, weatherController, seed, disasterEngine });
const houseFire = HouseFire({ disasterEngine, house });

const weatherSlider = WeatherSlider({
    id: 'WeatherSlider',
    state: FindWeatherSliderById(storeHolder, 'WeatherSlider'),
    weatherController,
    mode,
    doomsday
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

const blobFactory = BlobFactory({
    storeHolder,
    map,
    house,
    disaster,
    seed
});

const game = Game({
    actions: [
        weatherController.run,
        disasterEngine.run,
        houseFire.run,
        seed.run,
        ...blobFactory.create().actions,
        cloudBop.bop
    ]
});

ambientMusicPlayer.init();
game.start();
