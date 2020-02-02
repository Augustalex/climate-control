<template>
    <div v-if="inflames" class="fire-base" :style="fireStyle">
        <img v-if="order === 0" src="/fire_0.png" class="fire--0" :style="fire0Style" />
        <img v-else src="/fire_1.png" class="fire--1" :style="fire1Style" />
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Fire2',
        data() {
            return {
                order: 0,
            };
        },
        mounted() {
            setInterval(() => {
                this.order = this.order === 0 ? 1 : 0;
            }, 1000);
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
            fire0Style() {
                const size = this.random * 15;
                return {
                    left: `${Math.max(size, Math.min(20 - size, this.random * 10)) + 1}px`,
                    height: `${size}px`,
                    width: `${size}px`,
                }
            },
            fire1Style() {
                const size = this.random2 * 15;
                return {
                    left: `${Math.max(size, Math.min(20 - size, (this.random2 * 10) + 10)) + 1}px`,
                    height: `${size}px`,
                    width: `${size}px`,
                }
            },
            fireStyle() {
                return {
                    left: `${this.house.position.x * this.map.scale}px`,
                    bottom: `${(this.house.position.y) * this.map.scale}px`,
                };
            }
        }
    }
</script>

<style scoped>
    .fire-base {
        position: absolute;
    }

    .fire-base > img {
        position: absolute;
        width: 28px;
        height: 36px;
        bottom: -2px;
        left: -2px;
    }

    .fire--0 {

    }

    .fire--1 {

    }
</style>
