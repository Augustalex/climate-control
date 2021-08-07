<template>
    <div class="doomsday-fire" :style="fireStyle">
        <img v-if="order === 0" src="./assets/fire_0.png" class="fire--0" :style="fire0Style" />
        <img v-else src="./assets/fire_1.png" class="fire--1" :style="fire1Style" />
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'DoomsdayFire',
        props: [
            'left',
            'upsideDown'
        ],
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
                return {
                    left: `${this.left}px`,
                }
            },
            fire1Style() {
                return {
                    left: `${this.left}px`,
                }
            },
            fireStyle() {
                const style = {
                };
                if(this.upsideDown) {
                    style.transform = 'translate(50%, 50%) rotate(180deg) translate(50%, 50%)';
                }
                return style;
            }
        }
    }
</script>

<style scoped>
    .doomsday-fire {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .doomsday-fire > img {
        position: absolute;
        width: 28px;
        height: 36px;
        bottom: 0;
    }
</style>
