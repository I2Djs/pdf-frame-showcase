<template>
    <pdfFrame
      id="contextContainer"
      :type="type"
      @on-ready="onInstanceReady"
    >
      <i-g
        :bbox= 'false'
      >
        <i-path
          v-for="(d, n) in geoPaths"
          v-bind:key="n"
          :d="path(d)"
          :style="{
              shadowBlur: 20,
              lineWidth: 1,
              fillStyle: 'rgba(255, 255, 255, 1)',
              strokeStyle: '#064c75',
          }"
        ></i-path>
      </i-g>
        
    </pdfFrame>
</template>

<script setup>
import { ref } from "vue";
import * as d3Geo from "d3-geo";
let width = ref(0);
let height = ref(0);
let geoPaths = ref([]);
var projection = d3Geo.geoMercator()
var path = d3Geo.geoPath().projection(projection);

const props = defineProps({
    type: {
      type: String,
      required: true,
      default: 'canvas',
    },
  });

async function onInstanceReady (layer) {
    width.value = layer.width - 50;
    height.value = layer.height - 50;

    let response = await fetch("https://nswamy14.github.io/geoJson/india.district.geo.json");
    let geoJsonData = await response.json();

    projection.fitExtent([[20, 20], [width.value - 20, height.value - 20]], geoJsonData);

    geoPaths.value = geoJsonData.features;
}

</script>
