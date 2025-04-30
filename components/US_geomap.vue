<template>
  <pdfFrame
    id="contextContainer"
    :type="type"
    @on-ready="onInstanceReady"
  >
    <i-g>
      <i-path
        v-for="(d, n) in geoPaths"
        v-bind:key="n"
        :d="path(d)"
        :style="{
            lineWidth: 2,
            strokeStyle:'rgba(255, 255, 255, 1)',
            fillStyle:'rgba(255, 255, 255, 1)',
            opacity: 0.5
        }"
      ></i-path>
    </i-g>
      
  </pdfFrame>
</template>

<script setup>
import { ref } from "vue";
import * as d3Geo from "d3-geo";
import jsonData from "~/static/us.geo.json";
let width = ref(0);
let height = ref(0);
let geoPaths = ref([]);
var projection = d3Geo.geoMercator();
var path = d3Geo.geoPath().projection(projection);

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: 'canvas',
  },
});

function onInstanceReady (layer) {
  width.value = layer.width - 50;
  height.value = layer.height - 50;

  projection.fitExtent([[20, 20], [width.value - 20, height.value - 20]], jsonData);

  geoPaths.value = jsonData.features;
}

</script>
