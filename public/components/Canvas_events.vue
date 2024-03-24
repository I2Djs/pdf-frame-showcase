<template>
  <div class="canvasParentContainer">
    <pdfFrame
      id="canvasContainer"
      type="canvas"
      @on-ready="onInstanceReady"
    >
        <i-circle
          v-for="n in 100"
            v-bind:key="n"
            :cx="Math.random() * width"
            :cy="Math.random() * height"
            :r=" 50"
            :style="{
                fill: '#0ff000'
            }"
            @mousein="mouseinhdlr"
            @mouseout="mouseouthdlr"
          >
        </i-circle>
    </pdfFrame>
  </div>
</template>

<script setup>
import { ref } from "vue";
let width = ref(0);
let height = ref(0);

  function mouseinhdlr() {
    this.setStyle('fill', '#ff0000');
  }

  function mouseouthdlr() {
    this.setStyle('fill', '#0ff000');
  }

  function onInstanceReady (layer) {
    width.value = layer.width - 50;
    height.value = layer.height - 50;
  }

</script>
