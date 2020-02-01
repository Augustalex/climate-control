<template>
    <div class="house" :style="style">
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'house',
                'map'
            ]),
            style() {
                return {
                    left: `${this.house.position.x * this.map.scale}px`,
                    bottom: `${this.house.position.y * this.map.scale}px`,
                    height: `${this.house.order * 5}px`
                };
            }
        },
    }
</script>

<style scoped>
    .house {
        position: absolute;
        background: saddlebrown;
        width: 20px;
    }
</style>
