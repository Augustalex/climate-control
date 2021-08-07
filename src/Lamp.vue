<template>
    <div class="lamp" :style="lampStyle"></div>
</template>
<script>
    import {mapState} from 'vuex';
    import {Modes} from "@/Mode.js";

    export default {
        name: 'Lamp',
        computed: {
            ...mapState([
                'mode'
            ]),
            lampStyle() {
                return {
                    background: this.lampColor,
                    cursor: 'pointer'
                };
            },
            lampColor() {
                const mode = this.mode.mode;
                if (mode === Modes.Clear) {
                    return 'skyblue';
                }
                else if (mode === Modes.Rain) {
                    return 'darkblue';
                }
                else if (mode === Modes.Sun) {
                    return 'yellow';
                }
                else {
                    return 'red';
                }
            }
        },
    }
</script>

<style scoped>
    .lamp {
        position: absolute;
        top: 270px;
        left: 315px;
        border-radius: 100%;
        background: #EEE;
        border: 2px solid #666;
        height: 16px;
        width: 16px;
    }
</style>
