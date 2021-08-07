<template>
    <div class="sky" :style="style">
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Weathers} from "@/WeatherController.js";

    const WeatherToColor = {
        [Weathers.Raining]: 'skyblue',
        [Weathers.Clear]: 'skyblue',
        [Weathers.Sunny]: 'rgb(255,239,210)'
    };

    export default {
        name: 'Sky',
        computed: {
            ...mapState([
                'weather'
            ]),
            style() {
                return {
                    background: WeatherToColor[this.weather.mode]
                };
            }
        }
    }
</script>

<style scoped>
    .sky {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
