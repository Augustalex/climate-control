<template>
    <div class="house">
        <img v-if="house.order === 1" src="/house_1.png" class="house--1" :style="houseStyle"/>
        <img v-if="house.order === 2" src="/house_2.png" class="house--2" :style="houseStyle"/>
        <img v-if="house.order === 3" src="/house_3.png" class="house--3" :style="houseStyle"/>
        <img v-if="house.order >= 4" src="/house_4.png" class="house--4" :style="houseStyle"/>
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
            houseStyle() {
                return {
                    left: `${this.house.position.x * this.map.scale}px`,
                    bottom: `${this.house.position.y * this.map.scale - 2}px`,
                };
            }
        },
    }
</script>

<style scoped>
    .house > img {
        position: absolute;
        /*background: saddlebrown;*/
        /*width: 20px;*/
    }

    .house--1 {
        width: 24px;
        height: 24px;
    }

    .house--2 {
        width: 24px;
        height: 24px;
    }

    .house--3 {
        width: 24px;
        height: 24px;
    }

    .house--4 {
        width: 24px;
        height: 34px;
    }
</style>
