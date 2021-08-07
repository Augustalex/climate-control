<template>
    <div class="blob" :style="style">
        <div v-if="!handsEmpty" class="blob-hands" :style="handsStyle"></div>
        <img v-if="dead" class="blob--dead" src="/blob_dead.png" />
        <template v-else>
            <img v-if="order === 0 || stuckInNormal" class="blob--order0" src="/blob_normal.png" />
            <img v-else class="blob--order1" src="/blob_squished.png" />
        </template>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import {BlobSpeedState} from "@/Blob.js";

    export default {
        name: 'Blob',
        props: ['blob'],
        data() {
            return {
                order: 0,
            };
        },
        mounted() {
            const next = () => {
                this.order = this.order === 0 ? 1 : 0;
                setTimeout(next, this.animationInterval);
            };
            next();
        },
        computed: {
            ...mapState([
                'map',
                'disaster',
            ]),
            animationInterval() {
                return this.running
                    ? 250
                    : 1000;
            },
            running() {
                return this.blob.speedState === BlobSpeedState.Running;
            },
            dead() {
                return this.disaster.flood && this.disaster.ticks >= 8;
            },
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
            },
            stuckInNormal() {
                return this.disaster.flood;
            }
        }
    }
</script>
<style lang="scss">

    .blob {
        width: 4px;
        height: 4px;
        /*background: black;*/
        background: transparent;
        position: absolute;
    }

    .blob-hands {
        width: 2px;
        height: 2px;
        position: absolute;
        top: 1px;
        left: -1px;
    }

    .blob > img {
        position: absolute;
        left: 0;
        bottom: -1px;
    }

    .blob--order0 {
        width: 7px;
        height: 5px;
    }

    .blob--order1 {
        width: 9px;
        height: 3px;
    }

    .blob--dead {
        width: 7px;
        height: 5px;
        transform: scale(1.2) rotate(15deg);
    }
</style>
