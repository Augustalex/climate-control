<template>
    <div class="blob" :style="style">
        <div v-if="!handsEmpty" class="blob-hands" :style="handsStyle"></div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Blob',
        computed: {
            ...mapState([
                'blob',
                'map'
            ]),
            handsEmpty() {
                return this.blob.inHands.type === 'empty';
            },
            style() {
                return {
                    left: `${this.blob.position.x * this.map.scale}px`,
                    bottom: `${this.blob.position.y * this.map.scale}px`,
                };
            },
            handsStyle() {
                return {
                    background: 'saddlebrown',
                };
            }
        }
    }
</script>
<style lang="scss">

    .blob {
        width: 4px;
        height: 4px;
        background: black;
        position: absolute;
    }

    .blob-hands {
        width: 2px;
        height: 2px;
        position: absolute;
        top: 1px;
        left: -1px;
    }
</style>
