<template>
  <pdfFrame id="canvasContid" type="canvas" 
      @on-ready="onInstanceReady"
      @on-resize="onInstanceResize">
    <i-g :transform="{ translate: [width * 0.5,50], scale: [1.5, 1.5] }">
      <i-rect
        v-for="n in 60"
        v-bind:key="n"
        :x="Math.sin((n * 0.5 + 7.5 * (n % 2)) * 0.4 + t) * 50"
        :y="n * 0.5 * 11"
        :width="(Math.sin((n * 0.5 + 7.5 * (n % 2)) * 0.4 - 4.5 + t) + 1) * 3 + 4"
        :height="(Math.sin((n * 0.5 + 7.5 * (n % 2)) * 0.4 - 4.5 + t) + 1) * 3 + 4"
        :style="{
          fillStyle: 'hsl(' + (((n * 0.5 + 7.5 * (n % 2)) * 10) % 360) + ',100%,50%)',
          opacity: Math.sin((n * 0.5 + 7.5 * (n % 2)) * 0.4 - 4.5 + t) + 1 + 0.1
        }"
      />
    </i-g>
  </pdfFrame>
</template>

<script setup>
import { ref, onMounted } from 'vue';
let t = ref(0);
let loopCount = 2000;
let runningCount = 0;
let i2dinstanceID = 0;
function step() {
  if (runningCount < loopCount) {
    runningCount += 1;
    t.value = runningCount * 0.01;
    var elementExists = document.getElementById("canvasContid");
      if (elementExists) {
        window.requestAnimationFrame(step);
      }
  }
}

let width = ref(0);
  let height = ref(0);

  function onInstanceResize(data) {
    width.value = data.width;
    height.value = data.height;
  }

  function onInstanceReady (layer) {
    width.value = layer.width;
    height.value = layer.height;
    i2dinstanceID = layer.vDomIndex;
    window.requestAnimationFrame(step);
  }
</script>
