<template>
  <v-row v-if="!selectedExample" class="fill-width px-10 pb-4" justify="space-around">
    <div class="d-flex justify-space-evenly" :class="mdAndUp ? 'w-75' : 'w-100'">
      <v-text-field
        label="Search Example"
        variant="outlined"
         hint="Search example from the list"
         persistent-hint
         density="compact"
         class="input-select-example"
        @update:modelValue="onInput"
      > </v-text-field>
    </div>
  </v-row>
  <v-row v-else class="fill-width px-10 pb-8" :class="mdAndUp ? 'justify-left' : 'justify-center wrap-el'" style="height:auto">
       <v-btn variant="outlined" color="purple-lighten-5" size="small" @click="backClick()" prepend-icon="mdi-arrow-left-circle">
         <template v-slot:prepend>
            <v-icon ></v-icon>
          </template>
          Back to Examples
       </v-btn>

      <v-banner class="h-auto justify-center align-center text-center text-subtitle-1 example-title pt-0 pb-0" lines="one" density="compact" border=0 position="sticky">
        Try Examples on:  <v-btn class="ml-2" size="small" color="light-blue-darken-4" prepend-icon="mdi-pencil"  href="https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase/tree/stackBlitzShowcase">Stackblitz</v-btn>
      </v-banner>
  </v-row>


  <v-row v-if="!selectedExample" class="pb-1 " :class=" mdAndUp ? 'px-10 h-100 overflow-auto' : 'px-5 h-auto' " style=" flex-grow: 1;">
    <template v-for="(item, i) in exampleList" :key="i">
      <v-col class="d-flex justify-space-evenly align-content-start flex-wrap ga-3">
          <v-hover
            v-slot="{ isHovering, props }">
            <v-card
              max-height="250"
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
              :class=" mdAndUp ? 'widthClass' : 'widthFull'"
            >
              <v-img
                class="align-end text-white"
                height="200"
                :src="item.snap"
                cover
              >
                <v-card-title :class=" mdAndUp ? 'text-h6' : 'text-subtitle-1'">{{ item.title }}</v-card-title>
              </v-img>
            <v-card-actions>
              <v-btn v-for="(type) in item.types" size="small" variant="flat" :key="type" :color="type === 'pdf' ? 'purple' : '#d93484'" :text="type" density="compact" @click="viewClick(item, type)" elevation="2"></v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </template>
  </v-row>

  <v-row v-else class="fill-width justify-space-around pb-1 px-10" :class=" mdAndUp ? 'px-10 h-100 overflow-auto' : 'px-5 h-auto' " style=" flex-grow: 1;" >
      <v-col
          cols="12"
          md="7"
          :class=" mdAndUp ? 'order-2' : 'order-1'"
          style="min-height: 300px;"
        >
        <div class="canvasParentContainer">
          <component :is="selectedExample" :type="selectedOption"></component>
        </div>
      </v-col>
      <v-col
          cols="12"
          md="5"
          :class="mdAndUp ? 'order-1' : 'order-2'"
          style="min-height: 300px; max-height: 100%; overflow-y: scroll;background-color: #0d1117;"
        >
          <div v-html="rawTemplate"></div>
      </v-col>
  </v-row>
  <v-row class="fill-width">
    <v-banner  class="d-flex pt-2 pb-2 justify-center text-subtitle-1 text-center font-weight-medium pink-lighten-3 footer-class" color="pink-lighten-3" border=0>
        Powered By <v-btn variant="outlined" elevation="2" href="https://github.com/I2Djs/pdf-frame" color="pink-lighten-3" class="rounded-pill ml-2" density="compact"> PDF-Frame </v-btn>
    </v-banner>
  </v-row>
</template>


<script setup>
import { watch, shallowRef, ref } from 'vue';
import { codeToHtml } from 'shiki'
import barChart from './../components/charts/barChart.vue';
import multiLineChart from './../components/charts/multiLineChart.vue';
import stepChart from './../components/charts/stepChart.vue';
import Canvas_example from './../components/Basic_example.vue';
import Canvas_path_animation from './../components/Canvas_path_animation.vue';
import Canvas_path_morph from './../components/Canvas_path_morph.vue';
import Pdf_example from './../components/Pdf_example.vue';
import Pdf_custom_fonts from './../components/Pdf_custom_fonts.vue';
import Pdf_text_decoration from './../components/Pdf_text_decoration.vue';
import Pdf_language_fonts from './../components/Pdf_language_fonts.vue';
import Canvas_Helix_animation from './../components/Canvas_helix_animation.vue';
import Canvas_rect_animation from './../components/Canvas_animate.vue';
import PDf_table from './../components/Pdf_table.vue';
import PDf_encrypt from './../components/Pdf_encrypt_blob.vue';
import Canvas_events from './../components/Canvas_events.vue';
import Canvas_tadpole_animation from './../components/Canvas_tadpole_animation.vue';
import Canvas_line_chart from './../components/Canvas_line_chart.vue';
import Geomap from './../components/Geomap.vue';
import UsGeomap from './../components/US_geomap.vue';
import Pdf_line_chart from './../components/Pdf_line_chart.vue';
import Pdf_blob from './../components/Pdf_blob.vue';

import { useDisplay } from 'vuetify'
  
  const { mdAndUp } = useDisplay()
  let rawTemplate = shallowRef('');
  const router = useRouter();
  const route = useRoute();
  const selectedOption = ref('pdf');
  let selectedValue = shallowRef('');
  let selectedExample = shallowRef('');
  
  let full_exampleList = [{
    title: 'PDF-Canvas: Bar Chart',
    component: barChart,
    file: 'charts/barChart.vue',
    snap: 'snaps/barChart.png',
    types: ['pdf', 'canvas']
  }, {
    title: 'PDF: Multi Page PDF',
    component: Pdf_example,
    file: 'Pdf_example.vue',
    snap: 'snaps/pdf-multi-snap.png',
    types: ['pdf']
  }, {
    title: 'PDF-Canvas: Geo Map Rendering',
    component: Geomap,
    file: 'Geomap.vue',
    snap: 'snaps/pdf-geo.png',
    types: ['pdf', 'canvas']
  }, {
    title: 'PDF-Canvas: MultiLine Chart',
    component: multiLineChart,
    file: 'charts/multiLineChart.vue',
    snap: 'snaps/multiLineChart.png',
    types: ['pdf', 'canvas']
  }, {
    title: 'PDF-Canvas : Basic Example',
    component: Canvas_example,
    file: 'Canvas_example.vue',
    snap: 'snaps/snap.png',
    types: ['pdf', 'canvas']
  }, {
    title: 'PDF-Canvas: Line Chart',
    component: stepChart,
    file: 'Pdf_line_chart.vue',
    snap: 'snaps/lineChart.png',
    types: ['pdf', 'canvas']
  }, {
    title: 'PDF-Canvas: US Geo Map',
    component: UsGeomap,
    file: 'US_geo_map.vue',
    snap: 'snaps/us-geo.png',
    types: ['pdf', 'canvas']
  }, {
    title: 'Canvas: Step Chart; Resizable',
    component: Canvas_line_chart,
    file: 'Canvas_line_chart.vue',
    snap: 'snaps/lineChart.png',
    types: [ 'canvas']
  }, {
    title: 'PDF: Table rendering; Auto Pagination',
    component: PDf_table,
    file: 'Pdf_table.vue',
    snap: 'snaps/pdf-table.png',
    types: ['pdf']
  },{
    title: 'Canvas: Path Animaton',
    component: Canvas_path_animation,
    file: 'Canvas_path_animation.vue',
    snap: 'snaps/path-animation.gif',
    types: ['canvas']
  }, {
    title: 'Canvas: Path Morph',
    component: Canvas_path_morph,
    file: 'Canvas_path_morph.vue',
    snap: 'snaps/path-morph.gif',
    types: ['canvas']
  }, {
    title: 'PDF: Custom Fonts',
    component: Pdf_custom_fonts,
    file: 'Pdf_custom_fonts.vue',
    snap: 'snaps/pdf-customFonts.png',
    types: ['pdf']
  }, {
    title: 'PDF: Language Fonts',
    component: Pdf_language_fonts,
    file: 'Pdf_language_fonts.vue',
    snap: 'snaps/languageFonts.png',
    types: ['pdf']
  }, {
    title: 'PDF: Text Decorations',
    component: Pdf_text_decoration,
    file: 'Pdf_text_decoration.vue',
    snap: 'snaps/text-decoration.png',
    types: ['pdf']
  }, {
    title: 'Canvas: Tadpole Animation',
    component: Canvas_tadpole_animation,
    file: 'Canvas_tadpole_animation.vue',
    snap: 'snaps/canvas-tadpole.gif',
    types: ['canvas']
  }, {
    title: 'Canvas: Helix Animation',
    component: Canvas_Helix_animation,
    file: 'Canvas_helix_animation.vue',
    snap: 'snaps/helix.gif',
    types: ['canvas']
  }, {
    title: 'PDF: Encryption',
    component: PDf_encrypt,
    file: 'Pdf_encrypt_blob.vue',
    snap: 'snaps/pdf-encryption.png',
    types: ['pdf']
  }, {
    title: 'Canvas: Rect Animation',
    component: Canvas_rect_animation,
    file: 'Canvas_animate.vue',
    snap: 'snaps/rect-animation.gif',
    types: ['canvas']
  }, {
    title: 'Canvas: Events',
    component: Canvas_events,
    file: 'Canvas_events.vue',
    snap: 'snaps/canvas_events.png',
    types: ['canvas']
  }, {
    title: 'PDF: Blob',
    component: Pdf_blob,
    file: 'Pdf_blob.vue',
    snap: 'snaps/pdf-table.png',
    types: ['pdf']
  }];

  const exampleList = shallowRef();
  exampleList.value = full_exampleList;

  watch(
    () => route.query.title,
    title => {
      console.log(title);
      if (title) {
        loadComponent(title, route.query.type);
        selectedValue.value = title;
      } else {
        selectedExample.value = null;
        selectedValue.value = null;
      }
    }, { immediate: true }
  )

  watch(selectedValue, () => {
    if (!selectedValue.value) {
      return;
    }
    router.push({
      path: '/',
      query: {
        title: selectedValue.value,
        type: route.query.type
      },
    })
  });

  async function loadComponent(selectedEx, type) {
    let selectedObj =  exampleList.value.filter((d)=>{
      return d.title === selectedEx;
    })[0];
    if (!selectedObj) {
      return;
    }
    selectedExample.value = selectedObj.component;
    selectedOption.value = type || selectedObj.type[0]

    let response = await $fetch("/components/"+selectedObj.file);
    response = await response.text();
    rawTemplate.value = await codeToHtml(response, {
      lang: 'vue',
      theme: 'github-dark-default'
    })
  }


  function viewClick(item, type) {
    router.push({
      path: '/',
      query: {
        title: item.title,
        type
      },
    })
    window.scrollTo(0, 0);
  }

function backClick () {
  selectedExample.value = null;
  selectedValue.value = null;
  exampleList.value = full_exampleList;
  router.push({ path: '/', replace: true });
  window.scrollTo(0, 0);
}

function onInput (input) {
  if (!input) {
    exampleList.value = full_exampleList;
    return;
  }
  exampleList.value = full_exampleList.filter((d) => {
    return d.title.toLowerCase().includes(input.toLowerCase());
  });
}


</script>

<style>
html, body, #__nuxt {
    height: 100%;
    width: 100%;
    background-color: #242424;
  }

.container {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.exampleSelector {
    height: 100%;
    width: 100%;
    display: flex;
/*    align-items: end;*/
}

#contextContainer{
  height: 100%;
  width: 100%;
  position: relative;
  max-height: calc(100% - 1rem);
  overflow: scroll;
}

#canvasContainer{
  height: 100%;
  width: 100%;
  position: relative;
  max-height: calc(100% - 1rem);
  overflow: scroll;
}

.canvasParentContainer {
  height: 100%;
  width: 100%;
  position: relative;
  max-height: calc(100% - 1rem);
  background: linear-gradient(to right, #023c73 , #5f0b9c, #b814c4);
  border-radius: 1rem;
  overflow: hidden;
}

.pdfContainer {
  height: 100%;
  width: 100%;
}

.main-title {
  color: #8E24AA !important;
}


.example-title {
  background: none;
  color: white !important;
}

.main-banner .v-banner-text {
  padding-inline-end: 0px !important;
  row-gap: 0.5rem;
}

.input-select-example {
  color: white;
}

.input-select-example .v-input__details {
  display: none;
}

.v-card-title {
  position: relative;
  z-index: 999999 !important;
  background: rgb(137 76 148 / 77%);
}

.footer-class {
  background: none;
}

.wrap-el {
  display: flex;
  flex-flow: column;
  grid-gap: 1rem;
}

.widthClass {
  width: 325px;
}

.widthFull {
  width: 100%;
}
</style>
