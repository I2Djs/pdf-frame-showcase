<script setup>
import { watch, shallowRef, onMounted, ref } from 'vue';
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
import { useDisplay } from 'vuetify'
  
  const { mdAndUp } = useDisplay()
  let rawTemplate = shallowRef('');
  
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

    let response = await $fetch("/components/"+selectedObj.file);
    response = await response.text();
    rawTemplate.value = response;

  }, { immediate: true });

  const { mobile } = useDisplay()


const editorInit = (editor) => {
  editor.setReadOnly(true);
};


</script>

<template>
  <v-container fluid class="d-flex flex-column pl-12 pr-12 pt-5" style="overflow-y: auto;">
      <v-row class="d-flex flex-column justify-top justify-space-around h-auto" >
        <v-banner class="h-auto d-flex justify-center text-subtitle-1 text-center pb-0 font-weight-medium main-banner" justify="space-around" :stacked="false"  position="sticky" border=0>
            <template v-slot:text>
              Discover PDF-Frame, the JavaScript framework for client-side PDF and Canvas rendering. Effortlessly integrate with Vue and Nuxt for dynamic graphical content creation.
            </template>
        </v-banner>
        <v-banner density="compact" class="d-flex justify-center text-subtitle-1 text-center pt-2 main-sub-title font-weight-medium" position="sticky" border=0>
            Powered By <v-btn variant="tonal" href="https://github.com/I2Djs/I2Djs" color="pink-accent-3" class="rounded-pill ml-2" density="compact"> I2Djs </v-btn>
        </v-banner>
      </v-row>
      <v-row class="fill-width px-10" justify="space-around">
          <v-select
            label="Select"
            :items="exampleList"
             v-model="selectedValue"
             hint="Select example from the list"
             persistent-hint
            :item-props="(d) => d"
            variant="outlined"
            :density="mdAndUp ? 'default':'compact'"
          > </v-select>
      </v-row>
      <v-row justify="space-around" >
          <v-banner class="d-flex justify-center align-center text-center text-subtitle-1 example-title" lines="one" :stacked="false" border=0 position="sticky">
            <!-- <template v-slot:text class="justify-center">
              
            </template> -->
            Try examples -  <v-btn class="rounded-pill ml-2" color="deep-purple-darken-4" prepend-icon="mdi-pencil" variant="tonal" href="https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase">Stackblitz</v-btn>
            <!-- <template v-slot:actions>
              
            </template> -->
          </v-banner>
      </v-row>
      <v-row class="fill-width justify-space-around mb-5" style="min-height: 600px; overflow-y: auto;" >
          <v-col
              cols="12"
              md="7"
              :class=" mdAndUp ? 'order-2' : 'order-1'"
              style="min-height: 300px;"
            >
            <component :is="selectedExample"></component>
          </v-col>
          <v-col
              cols="12"
              md="5"
              :class="mdAndUp ? 'order-1' : 'order-2'"
              style="min-height: 300px;"
            >
              <v-ace-editor
                v-model:value="rawTemplate"
                lang="html"
                theme="chrome"
                :readOnly="true"
                style="height: 100%"
                @init="editorInit" />
            <!-- </div> -->
          </v-col>
          
        <!-- </div> -->
      </v-row>
  </v-container>
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
/*    display: grid;*/
    /*grid-template-rows: 4rem 1fr;
    grid-template-columns: 100%;
    grid-row-gap: 1rem;
    justify-content: center;
    padding-top: 3rem;*/
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
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 100%;
  grid-column-gap: 1rem;
  justify-content: center;
  padding-top: 1.5rem;
}

.editor {
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
  position: relative;
}

.pdfContainer {
  height: 100%;
  width: 100%;
}

.main-title {
  color: #8E24AA !important;
}


.main-sub-title {
  color: #D81B60 !important;
}

.example-title {
  color: #5E35B1 !important;
}

.main-banner .v-banner-text {
  padding-inline-end: 0px !important;
}
</style>
