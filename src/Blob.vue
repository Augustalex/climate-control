<template>
    <div class="blob" :style="style">
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
            style() {
                return {
                    left: `${this.blob.position.x * this.map.scale}px`,
                    bottom: `${this.blob.position.y * this.map.scale}px`,
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

</style>
