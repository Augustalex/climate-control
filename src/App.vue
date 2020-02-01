<template>
    <div id="app">
        <Display />
        <Slider />
        <Button id="ButtonA" :order="0" />
        <Button id="ButtonB" :order="1" />
    </div>
</template>

<script>
    import Display from "@/Display.vue";
    import Slider from "@/Slider.vue";
    import Button from "@/Button.vue";

    export default {
        name: 'app',
        components: { Button, Slider, Display }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        position: relative;
    }

</style>
