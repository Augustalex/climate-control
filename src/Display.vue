<template>
    <div class="display-wrapper" :style="displayWrapperStyle">
        <!--        <div class="display-background">-->
        <!--        </div>-->
        <Sky />
        <Cloud />
        <!--        <Fire />-->
        <Fire2 />
        <House />
        <Seed />
        <div class="display-ground" :style="groundStyle"></div>
        <Blob />
        <Rain />
        <DisasterOverlay />
        <Foreground />
        <img src="/bounds_white.png" class="bounds" />
        <span v-if="house.order === 3" class="hurra blink">hurra!</span>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import Blob from "./Blob.vue"
    import Cloud from "./Cloud.vue"
    import Foreground from "@/Foreground.vue";
    import House from "@/House.vue";
    import Sky from "@/Sky.vue";
    import Seed from "@/Seed.vue";
    import DisasterOverlay from "@/DisasterOverlay.vue";
    import Fire from "@/Fire.vue";
    import Rain from "@/Rain.vue";
    import Fire2 from "@/Fire2.vue";

    export default {
        name: 'Display',
        components: { Fire2, Rain, Fire, DisasterOverlay, Seed, Sky, House, Foreground, Blob, Cloud },
        computed: {
            ...mapState([
                'map',
                'house'
            ]),
            displayWrapperStyle() {
                return {
                    height: (this.map.height * this.map.scale) + 'px',
                    width: (this.map.width * this.map.scale) + 'px'
                };
            },
            groundStyle() {
                const groundHeight = 1;
                return {
                    height: (groundHeight * this.map.scale) + 'px'
                };
            }
        }
    }
</script>
<style lang="scss">

    .display-wrapper {
        position: relative;
        width: 25px;
        height: 14px;
        transform: scale(4);
        margin: 0 auto;
        top: 100px;
    }

    .display-ground {
        background: green;
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .bounds {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        transform: scale(1.02);
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .hurra {
        position: absolute;
        transform: translate(-50%, -50%);
        font-family: "Comic sans MS";
        font-size: 16px;
        top: 50%;
        color: white;
    }

    @keyframes blink {
        40% {
            opacity: 0.0;
        }
    }
    .blink {
        animation: blink 2s step-start 0s infinite;
    }
</style>
