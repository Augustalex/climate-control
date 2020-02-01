<template>
    <div class="display-wrapper" :style="displayWrapperStyle">
        <!--        <div class="display-background">-->
        <!--        </div>-->
        <Sky />
        <Cloud />
        <House />
        <Blob />
        <div class="display-ground" :style="groundStyle"></div>
        <Foreground />
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import Blob from "./Blob.vue"
    import Cloud from "./Cloud.vue"
    import Foreground from "@/Foreground.vue";
    import House from "@/House.vue";
    import Sky from "@/Sky.vue";

    export default {
        name: 'Display',
        components: { Sky, House, Foreground, Blob, Cloud },
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
</style>
