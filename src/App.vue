<template>
    <div id="app">
        <Display />
        <Slider />
    </div>
</template>

<script>
    import Display from "@/Display.vue";
    import Slider from "@/Slider.vue";

    export default {
        name: 'app',
        components: { Slider, Display }
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
    }

</style>
