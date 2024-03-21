<script setup>
import { watch, shallowRef } from 'vue';
import Canvas_example from './../components/Canvas_example.vue';
import Canvas_path_animation from './../components/Canvas_path_animation.vue';
import Canvas_path_morph from './../components/Canvas_path_morph.vue';
import Pdf_example from './../components/Pdf_example.vue';
import Pdf_custom_fonts from './../components/Pdf_custom_fonts.vue';
import Canvas_Helix_animation from './../components/Canvas_helix_animation.vue';
import Canvas_animation from './../components/Canvas_animate.vue';
import PDf_table from './../components/Pdf_table_test.vue';
import PDf_encrypt from './../components/Pdf_encrypt_blob.vue';
import Canvas_events from './../components/Canvas_events.vue';
import Canvas_tadpole_animation from './../components/Canvas_tadpole_animation.vue';


  let exampleList = [{
    title: 'Canvas Example',
    component: Canvas_example
  },{
    title: 'Canvas Path Animaton',
    component: Canvas_path_animation
  }, {
    title: 'Canvas Path Morph',
    component: Canvas_path_morph
  }, {
    title: 'Canvas Helix Animation',
    component: Canvas_Helix_animation
  }, {
    title: 'Canvas Rect Animation',
    component: Canvas_animation
  }, {
    title: 'PDF Example',
    component: Pdf_example
  }, {
    title: 'PDF Custom Fonts',
    component: Pdf_custom_fonts
  }, {
    title: 'Pdf Table rendering',
    component: PDf_table
  }, {
    title: 'Pdf Encryption',
    component: PDf_encrypt
  }, {
    title: 'Canvas Events',
    component: Canvas_events
  }, {
    title: 'Canvas Tadpole Animation',
    component: Canvas_tadpole_animation
  }];


  let selectedValue = shallowRef('Canvas Example');
  let selectedExample = ref('');

  watch(selectedValue, () => {
    selectedExample.value = exampleList.filter((d)=>{
      return d.title === selectedValue.value;
    })[0].component;
  }, { immediate: true })

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
        <div class="canvasParentContainer">
            <component :is="selectedExample"></component>
        </div>
    </div>
</template>

<style>
html, body, #app {
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

.canvasParentContainer {
  height: 100%;
  width: 100%;
}

#canvasContainer{
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
