<template>
    <div class="cloud">
        <img src="./assets/cloud.png" :style="cloudImageStyle" />
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'map',
                'cloud'
            ]),
            cloudImageStyle() {
                const scale = this.map.scale;
                return {
                    width: `${this.cloud.width * scale}px`,
                    height: `${this.cloud.height * scale}px`,
                    left: `${this.cloud.position.x * scale}px`,
                    bottom: `${this.cloud.position.y * scale}px`
                };
            }
        }
    }
</script>

<style scoped>
    .cloud > img {
        position: absolute;
        width: 20px;
        height: 40px;
    }
</style>
