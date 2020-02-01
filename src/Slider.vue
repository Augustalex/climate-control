<template>
    <div class="slider-wrapper" :style="wrapperStyle">
        <div class="slider-pipe">
        </div>
        <div ref="thumb" class="slider-thumb" :style="thumbStyle"></div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    const ActiveColor = 'rgb(220,220,220)';
    const InActiveColor = 'rgb(180,180,180)';

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
                mousePosition: null
            }
        },
        computed: {
            ...mapState([
                'sliders'
            ]),
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
        }
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }
</script>

<style scoped>
    .slider-wrapper {
        position: absolute;
        top: 240px;
        left: 200px;
        width: 20px;
    }

    .slider-pipe {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border: 2px solid black;
        position: absolute;
        top: 0;
        left: 0;
    }

    .slider-thumb {
        width: calc(100% - (4px));
        height: 20%;
        position: absolute;
        background: blue;
        left: 2px;
    }
</style>
