<template>
    <div class="button-wrapper" :style="wrapperStyle" @click="toggle">
        <img v-if="buttonData.on" src="./assets/button_1.png" class="button--0"/>
        <img v-else src="./assets/button_0.png" class="button--1"/>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {AudioDriver} from "@/AudioDriver.js";

    export default {
        name: 'Button',
        props: {
            id: {
                type: String,
                default: 'ButtonA'
            },
            order: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                color: '',
                thumbHeight: 20,
            }
        },
        computed: {
            ...mapState([
                'buttons'
            ]),
            buttonData() {
                return this.buttons.find(s => s.id === this.id);
            },
            wrapperStyle() {
                return {
                    height: `${this.buttonData.wrapperHeight}px`,
                    left: `${300 + 30 * this.order}px`
                };
            },
        },
        methods: {
            ...mapActions([
                'updateButton'
            ]),
            toggle() {
                AudioDriver.play('toggleButton', .2);
                this.updateButton({ id: this.id, on: !this.buttonData.on });
            }
        }
    }
</script>

<style scoped>
    .button-wrapper {
        position: absolute;
        top: 300px;
        left: 300px;
        width: 20px;
    }

    .button-pipe {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border: 2px solid black;
        position: absolute;
        top: 0;
        left: 0;
    }

    .button-thumb {
        width: calc(100% - (4px));
        height: 20%;
        position: absolute;
        background: blue;
        left: 2px;
    }

    .button--0 {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 40px;
        user-select: none;

        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }

    .button--1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 40px;
        user-select: none;

        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
</style>
