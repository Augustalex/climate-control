<template>
    <div v-if="ongoingDisaster" class="disasterOverlay">
        <div v-if="disaster.fire" class="disasterOverlay-fire">
        </div>
        <div v-if="disaster.flood" class="disasterOverlay-flood" :style="floodStyle">
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'DisasterOverlay',
        computed: {
            ...mapState([
                'disaster',
                'map'
            ]),
            ongoingDisaster() {
                return this.disaster.fire || this.disaster.flood;
            },
            style() {
                return {};
            },
            floodStyle() {
                return {
                    height: `${this.map.scale * this.disaster.ticks}px`,
                    width: `${this.map.width * this.map.scale}px`,
                    background: 'rgba(50,50, 255,.8)'
                }
            }
        }
    }
</script>

<style scoped>
    .disasterOverlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .disasterOverlay-flood {
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>
