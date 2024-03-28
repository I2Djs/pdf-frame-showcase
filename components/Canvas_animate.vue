<template>
    <pdfFrame id="nswamyid" type="canvas" 
      @on-ready="onInstanceReady"
      @on-resize="onInstanceResize">
      <i-linearGradient
        id="grad3"
        :x1="0"
        :y1="0"
        :x2="100"
        :y2="100"
        :colorStops="[
          {
            color: '#023c73',
            offset: 0,
          },
          {
            color: '#5f0b9c',
            offset: 50,
          },
          {
            color: '#b814c4',
            offset: 100,
          },
        ]"
      />
      <i-rect
        :x="0"
        :y="0"
        :width="width"
        :height="height"
        rx=20 ry=20
        :style="{ fillStyle: 'grad(grad3)' }"
      />
    <i-g :transform="{ translate: [width * 0.1, 0] }">
      <i-rect
        v-for="(d, n) in rectCount"
        v-bind:key="n"
        :x="6 * n"
        :y="0"
        :width="4"
        :height="-1 * (100 + Math.random() * (height - 100))"
        :transform="{ translate: [0, height] }"
        :style="{
          fillStyle: 'hsl(' + ((n * 4) % 360) + ',100%,50%)',
        }"
      >
        <i-animate
          :to="{ 
            height: -1 * (100 + Math.random() * (height - 100)),
            style:{
              fillStyle: 'hsl(' + ((Math.random() * 25 * 4) % 360) + ',100%,50%)',
            }
          }"
          ease= "easeInOutSin"
          :delay="Math.random()*1000"
          loop="100"
          direction= "alternate" :duration="1000"
        />
      </i-rect>
    </i-g>
  </pdfFrame>
</template>
<script setup>
    let width = ref(0);
  let height = ref(0);
  let rectCount = ref([]);

  function onInstanceResize(data) {
    width.value = data.width;
    height.value = data.height;
    rectCount.value = Math.round((width.value * 0.8) / 6);
    // rectCount.value = new Array(value).fill();
  }

  function onInstanceReady (layer) {
    width.value = layer.width;
    height.value = layer.height;
    rectCount.value = Math.round((width.value * 0.8) / 6);
    // rectCount.value = new Array(value).fill();
  }
</script>
<style>

</style>
