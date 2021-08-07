<template>
  <div id="app">
    <div class="displayWrapperWrapper">
      <Display/>
    </div>
    <div class="controls">
      <Slider
          :style="{
        top: offsetY + 'px',
        left: offsetX + 'px'
        }"
      />
      <Button
          :style="{
        top: (offsetY + 30) + 'px',
        left: (offsetX + 80) + 'px'
        }"
          id="ButtonA" :order="0"/>
      <Button
          :style="{
        top: (offsetY + 30) + 'px',
        left: (offsetX + 110) + 'px'
        }"
          id="ButtonB" :order="1"/>
      <Lamp
          :style="{
        top: (offsetY + 0) + 'px',
        left: (offsetX + 95) + 'px'
        }"
      />
    </div>
  </div>
</template>

<script>
import Display from "@/Display.vue";
import Slider from "@/Slider.vue";
import Button from "@/Button.vue";
import Lamp from "@/Lamp.vue";

export default {
  name: 'app',
  components: {Lamp, Button, Slider, Display},
  data() {
    return {
      offsetX: 95,
      offsetY: 0
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 95vw;
}

.controls {
  position: relative;
  margin: 0 auto;
  width: 320px;
}

.displayWrapperWrapper {
  position: relative;
  height: 250px;
  width: 320px;
  margin: 0 auto;
}

</style>
