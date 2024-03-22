<template>
  <div class="canvasParentContainer">
    <pdfFrame id="nswamyid" type="canvas" @on-ready="onInstanceReady"
      @on-resize="onInstanceResize">
      <i-linearGradient
        id="grad3"
        :x1="0"
        :y1="0"
        :x2="100"
        :y2="100"
        :colorStops="[
          {
            color: '#023c73', offset: 0,
          },
          {
            color: '#5f0b9c', offset: 50,
          },
          {
            color: '#b814c4', offset: 100,
          },
        ]"
      />
      <i-rect
        :x="0" :y="0" :width="width" :height="height" rx=50 ry=50
        :style="{ fillStyle: 'grad(grad3)' }"
      />
      <i-g :transform="{ translate: [width * 0.25 - 200,-50], scale:[0.85, 0.85] }">
        <i-path
          v-for="n in 40"
          v-bind:key="n"
          :transform="{ translate: [100 + n * 5, 100 + n * 5] }"
          :style="{
            lineWidth: 3,
            stroke: 'hsl(' + ((n * 5) % 360) + ',100%,50%)'
          }"
        >
          <i-animatePath
            :from="{
              d: 'M522.149671,254.139433 C522.041988,207.959016 521.986515,159.717586 517.458917,157.851988 C513.198896,156.097838 449.845156,154.932984 368.480551,154.447501 C370.296485,73.9306184 372.745467,6.2805593 369.449702,4.59205584 C356.219327,-2.18333147 171.003862,-0.841383416 162.581714,4.59205584 C159.268002,6.729402 157.709856,71.7444186 157.375385,154.645969 C88.8022632,155.194046 30.4606972,156.245926 4.99357083,157.851988 C-4.68814662,158.462659 1.98985633,345.833109 6.01166852,348.329224 C8.92238371,350.136809 72.3332278,349.451331 158.41143,349.159736 C159.357738,417.423519 160.839201,475.797496 162.581714,500.827346 C163.234341,510.202662 366.780459,504.720369 369.449702,500.827346 C371.397793,497.983149 368.873759,435.021511 367.615821,350.291003 C447.980276,351.55051 514.381782,353.142833 517.458917,351.420743 C522.226355,348.752114 522.263881,302.425136 522.149671,254.139433'
            }"
            ease= "easeInOutSin"
            :loop="10"
            :delay="Math.random()*1000"
            :duration="10000"
          />
        </i-path>
      </i-g>
  </pdfFrame>
  </div>
</template>
<script setup>
  let width = ref(0);
  let height = ref(0);

  function onInstanceResize(data) {
    width.value = data.width;
    height.value = data.height;
  }

  function onInstanceReady (layer) {
    width.value = layer.width;
    height.value = layer.height;
    console.log(width);
  }
</script>

