<template>
    <div class="slider-wrapper" :style="wrapperStyle">
        <div class="slider-pipe">
        </div>
        <div ref="thumb" class="slider-thumb" :style="thumbStyle"></div>
    </div>
</template>

<script>
    const ActiveColor = 'rgb(220,220,220)';
    const InActiveColor = 'rgb(180,180,180)';

    export default {
        name: 'Slider',
        data() {
            return {
                color: '',
                wrapperHeight: 100,
                thumbHeight: 20,
                positionY: 2,
                lastMousePosition: null,
                mousePosition: null
            }
        },
        computed: {
            wrapperStyle() {
                return {
                    height: `${this.wrapperHeight}px`,
                };
            },
            thumbStyle() {
                return {
                    bottom: `${this.positionY}px`,
                    background: this.color,
                    height: `${this.thumbHeight}px`
                };
            }
        },
        methods: {
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
                    // const deltaX = this.mousePosition.x - this.lastMousePosition.x;
                    const deltaY = this.mousePosition.y - this.lastMousePosition.y;
                    const maxThumbPosition = this.wrapperHeight - this.thumbHeight - 2;
                    this.positionY = clamp(this.positionY - deltaY, 2, maxThumbPosition);
                }
            });
        }
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }
</script>

<style scoped>
    .slider-wrapper {
        position: relative;
        top: 200px;
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
