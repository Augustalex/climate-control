<template>
    <div v-if="raining" class="rain">
        <img v-if="order === 0" src="/rain1.png" :style="style" />
        <img v-if="order === 1" src="/rain2.png" :style="style" />
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {Weathers} from "@/WeatherController.js";

    export default {
        name: 'Rain',
        data() {
            return {
                order: 0
            };
        },
        mounted() {
            setInterval(() => {
                this.order = this.order === 0 ? 1 : 0;
            }, 1000);
        },
        computed: {
            ...mapState([
                'map',
                'cloud',
                'weather'
            ]),
            style() {
                const scale = this.map.scale;
                return {
                    bottom: `${this.cloud.position.y * scale}px`
                }
            },
            raining() {
                return this.weather.mode === Weathers.Raining;
            }
        },
    }
</script>

<style scoped>
    .rain {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .rain > img {
        width: 13px;
        height: 37px;
        /*top: 13px;*/
        transform: translate(0, calc(100% + 2px));
        position: absolute;
        left: 9px;
    }
</style>
