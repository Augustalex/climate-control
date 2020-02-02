<template>
    <div class="doomsday" v-if="isDoomsday">
        <DoomsdayFire :left="0" />
        <DoomsdayFire :left="25" />
        <DoomsdayFire :left="50" />
        <DoomsdayFire :left="0" :upsideDown="true" />
        <DoomsdayFire :left="25" :upsideDown="true" />
        <DoomsdayFire :left="50" :upsideDown="true" />
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import DoomsdayFire from "@/DoomsdayFire.vue";

    export default {
        name: 'Doomsday',
        components: { DoomsdayFire },
        computed: {
            ...mapState([
                'doomsday'
            ]),
            isDoomsday() {
                return this.doomsday;
            }
        }
    }
</script>

<style scoped>
    .doomsday {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
</style>
