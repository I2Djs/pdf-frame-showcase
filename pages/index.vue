<script setup>
import { watch, shallowRef, ref } from 'vue';
import Canvas_example from './../components/Canvas_example.vue';
import Canvas_path_animation from './../components/Canvas_path_animation.vue';
import Canvas_path_morph from './../components/Canvas_path_morph.vue';
import Pdf_example from './../components/Pdf_example.vue';
import Pdf_custom_fonts from './../components/Pdf_custom_fonts.vue';
import Canvas_Helix_animation from './../components/Canvas_helix_animation.vue';
import Canvas_rect_animation from './../components/Canvas_animate.vue';
import PDf_table from './../components/Pdf_table_test.vue';
import PDf_encrypt from './../components/Pdf_encrypt_blob.vue';
import Canvas_events from './../components/Canvas_events.vue';
import Canvas_tadpole_animation from './../components/Canvas_tadpole_animation.vue';
import Canvas_line_chart from './../components/Canvas_line_chart.vue';
import Canvas_geomap from './../components/Canvas_geomap.vue';
import Pdf_geomap from './../components/Pdf_geomap.vue';
  
let exampleList = [{
    title: 'Canvas: Basic Rendering',
    component: Canvas_example,
    file: 'Canvas_example.vue'
  }, {
    title: 'PDF: Basic Rendering',
    component: Pdf_example,
    file: 'Pdf_example.vue'
  }, {
    title: 'Canvas: Line Chart; Resizable',
    component: Canvas_line_chart,
    file: 'Canvas_line_chart.vue'
  }, {
    title: 'PDF: Table rendering; Auto Pagination',
    component: PDf_table,
    file: 'Pdf_table_test.vue'
  }, {
    title: 'Canvas: Path Animaton',
    component: Canvas_path_animation,
    file: 'Canvas_path_animation.vue'
  }, {
    title: 'Canvas: Path Morph',
    component: Canvas_path_morph,
    file: 'Canvas_path_morph.vue'
  }, {
    title: 'PDF: Custom Fonts',
    component: Pdf_custom_fonts,
    file: 'Pdf_custom_fonts.vue'
  }, {
    title: 'Canvas: Tadpole Animation',
    component: Canvas_tadpole_animation,
    file: 'Canvas_tadpole_animation.vue'
  }, {
    title: 'Canvas: Helix Animation',
    component: Canvas_Helix_animation,
    file: 'Canvas_helix_animation.vue'
  }, {
    title: 'PDF: Encryption',
    component: PDf_encrypt,
    file: 'Pdf_encrypt_blob.vue'
  }, {
    title: 'Canvas: Rect Animation',
    component: Canvas_rect_animation,
    file: 'Canvas_animate.vue'
  }, {
    title: 'Canvas: Events',
    component: Canvas_events,
    file: 'Canvas_events.vue'
  }, {
    title: 'Canvas: GeoMap',
    component: Canvas_geomap,
    file: 'Canvas_geomap.vue'
  }, {
    title: 'PDF: GeoMap',
    component: Pdf_geomap,
    file: 'Pdf_geomap.vue'
  }];


  let selectedValue = shallowRef('Canvas: Basic Rendering');
  let selectedExample = shallowRef('');

  watch(selectedValue, async () => {
    let selectedObj =  exampleList.filter((d)=>{
      return d.title === selectedValue.value;
    })[0];

    if (!selectedObj) {
      return;
    }

    selectedExample.value = selectedObj.component;

  }, { immediate: true });

</script>

<template>
    <div class="container">
        <div class="exampleSelector">
          <v-select
            label="Select"
            :items="exampleList"
             v-model="selectedValue"
            :item-props="(d) => d"
            variant="outlined"
          > </v-select>
        </div>
        <div class="editorParentContainer">
            <component :is="selectedExample"></component>
        </div>
    </div>
</template>

<style>
html, body, #__nuxt {
    height: 100%;
    width: 100%;
    background-color: #242424;
  }

.container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 4rem 1fr;
    grid-template-columns: 100%;
    grid-row-gap: 1rem;
    justify-content: center;
    padding-top: 3rem;
}

.exampleSelector {
    height: 100%;
    width: 100%;
    display: flex;
/*    align-items: end;*/
}

.editorParentContainer {
  height: 100%;
  width: 100%;
}

#canvasContainer{
  height: 100%;
  width: 100%;
  position: relative;
}

.canvasParentContainer {
  height: 100%;
  width: 100%;
}

.pdfContainer {
  height: 100%;
  width: 100%;
}

</style>
