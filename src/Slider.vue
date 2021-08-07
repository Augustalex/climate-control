<template>
    <div class="slider-wrapper" :style="wrapperStyle">
        <div class="slider-lamp" :style="lampStyle" @click="reset"></div>
        <div class="slider-pipe">
        </div>
        <div ref="thumb" class="slider-thumb" :style="thumbStyle"></div>
        <span class="activate">↑</span>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {Modes} from "@/Mode.js";

    const ActiveColor = '#f73280';
    const InActiveColor = '#f73280';

    export default {
        name: 'Slider',
        props: {
            id: {
                type: String,
                default: 'WeatherSlider'
            }
        },
        data() {
            return {
                color: '',
                thumbHeight: 20,
                lastMousePosition: null,
                mousePosition: null,
                lightUpTimeout: null,
                lightUp: false,
            }
        },
        watch: {
            allWayUp() {
                clearTimeout(this.lightUpTimeout);
                this.lightUp = true;
                this.lightUpTimeout = setTimeout(() => {
                    this.lightUp = false;
                }, 1000);
            },
        },
        computed: {
            ...mapState([
                'sliders',
                'mode'
            ]),
            allWayUp() {
                return this.sliderData.positionY > this.sliderData.wrapperHeight * .7;
            },
            sliderData() {
                return this.sliders.find(s => s.id === this.id);
            },
            wrapperStyle() {
                return {
                    height: `${this.sliderData.wrapperHeight}px`,
                };
            },
            thumbStyle() {
                return {
                    bottom: `${this.sliderData.positionY}px`,
                    background: this.color,
                    height: `${this.thumbHeight}px`
                };
            },
            lampStyle() {
                return {
                    background: this.lightUp ? this.lampColor : '#EEE',
                    cursor: this.lightUp ? 'pointer' : 'auto'
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
        mounted() {
            window.addEventListener('mousedown', event => {
                if (event.target === this.$refs.thumb) {
                    this.moving = true;
                    this.color = ActiveColor;
                }
                else {
                    this.moving = false;
                    this.color = InActiveColor;
                }
            });
            window.addEventListener('mouseup', event => {
                this.moving = false;
                this.reset();
            });
            window.addEventListener('mousemove', event => {
                const newPosition = { x: event.screenX, y: event.screenY };
                if (!this.lastMousePosition) {
                    this.lastMousePosition = newPosition;
                }
                else {
                    this.lastMousePosition = { ...this.mousePosition };
                }
                this.mousePosition = newPosition;

                if (this.moving) {
                    const deltaY = this.mousePosition.y - this.lastMousePosition.y;
                    const maxThumbPosition = this.sliderData.wrapperHeight - this.thumbHeight - 2;
                    const positionY = clamp(this.sliderData.positionY - deltaY, 2, maxThumbPosition);
                    this.updateSlider({ id: this.id, positionY });
                }
            });
        },
        methods: {
            ...mapActions([
                'updateSlider'
            ]),
            reset() {
                this.updateSlider({ id: this.id, positionY: 2 });
            }
        }
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }
</script>

<style scoped>
    .slider-wrapper {
        position: absolute;
        top: 280px;
        left: 200px;
        width: 20px;
    }

    .slider-lamp {
        position: absolute;
        top: -20px;
        border-radius: 100%;
        background: #EEE;
        border: 2px solid #666;
        height: 16px;
        width: 16px;
    }

    .slider-pipe {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border: 2px solid black;
        position: absolute;
        top: 0;
        left: 0;
        user-select: none;
    }

    .slider-thumb {
        width: calc(100% - (4px));
        height: 20%;
        position: absolute;
        background: #f73280;
        left: 2px;
        user-select: none;
    }

    .activate {
        position: absolute;
        top: 10px;
        left: -55px;
        font-family: "Courier New";
        font-weight: bold;
        font-size: 40px;
        width: 130px;
        text-align: center;
        color: black;
        user-select: none;
    }
</style>
