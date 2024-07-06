<template>
    <pdfFrame
      id="canvasContainer"
      type="pdf"
      @on-ready="onInstanceReady"      
    >
      <i-g>
        <i-path
          v-for="(d, n) in geoPaths"
          v-bind:key="n"
          :d="path(d)"
          :style="{
            shadowBlur: 20,
              lineWidth: 0.2,
              fillStyle: 'rgba(0, 0, 1, 1)',
              strokeStyle: '#42baff',
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

  function onInstanceReady (layer) {
    width.value = layer.width - 50;
    height.value = layer.height - 50;

    projection.translate([width.value / 2, height.value / 2])
                .center([78.96288, 20.593684])
                .scale([height.value * 1.5]);

    fetchGeoJson();
  }

  async function fetchGeoJson() {
    let response = await fetch("https://nswamy14.github.io/geoJson/india.district.geo.json");
    let geoJsonData = await response.json();

    geoPaths.value = geoJsonData.features;
  }

</script>
