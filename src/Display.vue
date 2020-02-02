<template>
    <div class="display-wrapper" :style="displayWrapperStyle">
        <!--        <div class="display-background">-->
        <!--        </div>-->
        <Sky />
        <Cloud />
        <Fire />
        <House />
        <Blob />
        <Seed />
        <div class="display-ground" :style="groundStyle"></div>
        <Rain />
        <DisasterOverlay />
        <Foreground />
        <img src="/bounds_white.png" class="bounds" />
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

    export default {
        name: 'Display',
        components: { Rain, Fire, DisasterOverlay, Seed, Sky, House, Foreground, Blob, Cloud },
        computed: {
            ...mapState([
                'map'
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
</style>
