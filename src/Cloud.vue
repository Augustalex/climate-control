<template>
    <div class="cloud" :style="style">
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
            style() {
                const scale = this.map.scale;
                return {
                    background: this.cloud.color,
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
    .cloud {
        position: absolute;
    }
</style>
