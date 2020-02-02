<template>
    <div class="seed">
        <img v-if="isSeed" class="tree--seed" src="/tree_seed.png" :style="seedStyle" />
        <img v-if="isHalfTree" class="tree--half" src="/tree_half.png" :style="halfTreeStyle" />
        <img v-if="isTree" class="tree--full" src="/tree_full.png" :style="treeStyle" />
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {SeedState} from "@/Seed.js";

    export default {
        name: 'Seed',
        computed: {
            ...mapState([
                'seed',
                'map'
            ]),
            isSeed() {
                return this.seed.state === SeedState.Underground;
            },
            isHalfTree() {
                return this.seed.state === SeedState.CreepingUp;
            },
            isTree() {
                return this.seed.state === SeedState.Ready;
            },
            seedStyle() {
                const scale = this.map.scale;
                return {
                    left: `${(this.seed.position.x) * scale}px`,
                    bottom: `${(this.seed.position.y)}px`,
                };
            },
            halfTreeStyle() {
                const scale = this.map.scale;
                return {
                    left: `${(this.seed.position.x) * scale - 2}px`,
                    bottom: `${(this.seed.position.y)}px`,
                };
            },
            treeStyle() {
                const scale = this.map.scale;
                return {
                    left: `${(this.seed.position.x) * scale - 8}px`,
                    bottom: `${(this.seed.position.y)}px`,
                };
            }
        }
    }
</script>

<style scoped>
    .seed > img {
        position: absolute;
    }

    .tree--seed {
        width: 4px;
        height: 6px;
    }

    .tree--half {
        width: 7px;
        height: 16px;
    }

    .tree--full {
        bottom: 3px;
        width: 20px;
        height: 30px
    }
</style>
