<template>
    <pdfFrame
      id="canvasContainer"
      type="canvas"
      @on-ready="onInstanceReady"
    >
        
    </pdfFrame>
</template>

<script setup>
import { ref } from "vue";
let width = ref(0);
let height = ref(0);

  



  function onInstanceReady (layer) {
    width.value = layer.width - 50;
    height.value = layer.height - 50;

    fetchGeoJson();
  }

  async function fetchGeoJson() {
    let response = await fetch("https://nswamy14.github.io/geoJson/india.district.geo.json");
    let geoJsonData = await response.json()

    console.log(geoJsonData);
  }



</script>
