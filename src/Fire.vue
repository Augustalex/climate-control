<template>
    <div v-if="inflames" class="fire-base" :style="fireStyle">
        <div class="fire-top" :style="topStyle">
        </div>
        <div class="fire-top" :style="top2Style">
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Fire',
        data() {
            return {
                random: 0,
                random2: 0,
                randomIntervalId: null,
            };
        },
        mounted() {
            this.randomIntervalId = setInterval(() => {
                this.random = Math.random();
                this.random2 = Math.random();
            }, (Math.random() * 500) + 200);
        },
        destroyed() {
            clearInterval(this.randomIntervalId);
        },
        computed: {
            ...mapState([
                'map',
                'house',
                'disaster'
            ]),
            inflames() {
                return this.disaster.fire;
            },
            topStyle() {
                const size = this.random * 15;
                return {
                    left: `${Math.max(size, Math.min(20 - size, this.random * 10)) + 1}px`,
                    height: `${size}px`,
                    width: `${size}px`,
                    bottom: `5px`
                }
            },
            top2Style() {
                const size = this.random2 * 15;
                return {
                    left: `${Math.max(size, Math.min(20 - size, (this.random2 * 10) + 10)) + 1}px`,
                    height: `${size}px`,
                    width: `${size}px`,
                    bottom: `5px`
                }
            },
            fireStyle() {
                return {
                    left: `${this.house.position.x * this.map.scale}px`,
                    bottom: `${(this.house.position.y + 1) * this.map.scale}px`,
                    height: `${this.house.order * 5}px`
                };
            }
        }
    }
</script>

<style scoped>
    .fire-base {
        position: absolute;
        background: orangered;
        width: 20px;
        bottom: 0;
        height: 5px;
    }

    .fire-top {
        position: absolute;
        background: orangered;
        transform: translate(-50%, -50%) rotate(45deg) translate(50%, 100%);
    }
</style>
