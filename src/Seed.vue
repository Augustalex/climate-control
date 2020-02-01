<template>
    <div class="seed" :style="style">
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {SeedState} from "@/Seed.js";

    const SeedStateToSize = {
        [SeedState.Underground]: 1,
        [SeedState.CreepingUp]: 6,
        [SeedState.Ready]: 12
    };
    const SeedStateToColor = {
        [SeedState.Underground]: 'rgb(114,207,108)',
        [SeedState.CreepingUp]: 'rgb(54,118,66)',
        [SeedState.Ready]: 'rgb(109,69,44)'
    };

    export default {
        name: 'Seed',
        computed: {
            ...mapState([
                'seed',
                'map'
            ]),
            style() {
                const scale = this.map.scale;
                const size = SeedStateToSize[this.seed.state];
                return {
                    left: `${this.seed.position.x * scale}px`,
                    bottom: `${this.seed.position.y}px`,
                    height: `${size}px`,
                    background: SeedStateToColor[this.seed.state]
                };
            }
        }
    }
</script>

<style scoped>
    .seed {
        position: absolute;
        width: 2px;
        background: green;
    }
</style>
