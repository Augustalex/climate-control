<template>
    <div class="foreground" :style="style">
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'foreground'
            ]),
            style() {
                return {
                    background: this.foreground.color
                };
            }
        }
    }
</script>

<style scoped>
    .foreground {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>
