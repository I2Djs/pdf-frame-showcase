<script setup>
import { watch, shallowRef, onMounted, ref } from 'vue';
import Canvas_example from './../components/Canvas_example.vue';
import Canvas_path_animation from './../components/Canvas_path_animation.vue';
import Canvas_path_morph from './../components/Canvas_path_morph.vue';
import Pdf_example from './../components/Pdf_example.vue';
import Pdf_custom_fonts from './../components/Pdf_custom_fonts.vue';
import Pdf_language_fonts from './../components/Pdf_language_fonts.vue';
import Canvas_Helix_animation from './../components/Canvas_helix_animation.vue';
import Canvas_rect_animation from './../components/Canvas_animate.vue';
import PDf_table from './../components/Pdf_table_test.vue';
import PDf_encrypt from './../components/Pdf_encrypt_blob.vue';
import Canvas_events from './../components/Canvas_events.vue';
import Canvas_tadpole_animation from './../components/Canvas_tadpole_animation.vue';
import Canvas_line_chart from './../components/Canvas_line_chart.vue';
import Canvas_geomap from './../components/Canvas_geomap.vue';
import Pdf_geomap from './../components/Pdf_geomap.vue';
import Pdf_line_chart from './../components/Pdf_line_chart.vue';
import Pdf_blob from './../components/Pdf_blob.vue';
import { useDisplay } from 'vuetify'
  
  const { mdAndUp } = useDisplay()
  let rawTemplate = shallowRef('');
  const router = useRouter();
  const route = useRoute();
  
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
  },{
    title: 'PDF: Line Chart',
    component: Pdf_line_chart,
    file: 'Pdf_line_chart.vue'
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
    title: 'PDF: Language Fonts',
    component: Pdf_language_fonts,
    file: 'Pdf_language_fonts.vue'
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
    title: 'Canvas: Geo Map Rendering',
    component: Canvas_geomap,
    file: 'Canvas_geomap.vue'
  }, {
    title: 'PDF: Geo Map Rendering',
    component: Pdf_geomap,
    file: 'Pdf_geomap.vue'
  }, {
    title: 'PDF: Blob',
    component: Pdf_blob,
    file: 'Pdf_blob.vue'
  }];


  let selectedValue = shallowRef('Canvas: Basic Rendering');
  let selectedExample = shallowRef('');

  watch(
    () => route.query.title,
    title => {
      loadComponent(title);
      selectedValue.value = title;
    }, { immediate: true }
  )

  watch(selectedValue, () => {
    router.push({
      path: '/',
      query: {
        title: selectedValue.value
      },
    })
  });

  async function loadComponent(selectedEx) {
    let selectedObj =  exampleList.filter((d)=>{
      return d.title === selectedEx;
    })[0];

    if (!selectedObj) {
      router.push({
        path: '/',
        query: {
          title: 'Canvas: Basic Rendering'
        },
      })
      return;
    }

    selectedExample.value = selectedObj.component;

    let response = await $fetch("/components/"+selectedObj.file);
    response = await response.text();
    rawTemplate.value = response;
  }


const editorInit = (editor) => {
  editor.setReadOnly(true);
};


</script>

<template>
  <v-container fluid class="d-flex flex-column pl-12 pr-12 pt-5" style="overflow-y: auto;">
      <v-row class="fill-width px-10">
        <v-banner class="justify-center d-flex text-subtitle-1 text-center font-weight-medium main-banner py-0" justify="space-around" :stacked="true"  position="sticky" border=0>
            <template v-slot:text>
              Discover PDF-Frame, the JavaScript framework for client-side PDF and Canvas rendering. Effortlessly integrate with Vue3 and Nuxt3 for dynamic graphical content creation.
            </template>
        </v-banner>
      </v-row>
      <v-row>
        <v-banner density="compact" class="d-flex justify-center text-subtitle-1 text-center pt-2 main-sub-title font-weight-medium" border=0>
            Powered By <v-btn variant="tonal" href="https://github.com/I2Djs/I2Djs" color="pink-accent-3" class="rounded-pill ml-2" density="compact"> I2Djs </v-btn>
        </v-banner>
      </v-row>
      <v-row class="fill-width px-10" justify="space-around">
          <v-autocomplete
            density="compact"
            label="Select Example"
            :items="exampleList"
             v-model="selectedValue"
             hint="Select example from the list"
             persistent-hint
             class="select-example"
            :item-props="(d) => d"
          > </v-autocomplete>
      </v-row>
      <v-row justify="space-around" >
          <v-banner class="pt-4 justify-center align-center text-center text-subtitle-1 example-title pt-0" lines="one" density="compact" border=0 position="sticky">
            Try Examples on:  <v-btn class="ml-2" color="light-blue-darken-4" prepend-icon="mdi-pencil"  href="https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase/tree/stackBlitzShowcase">Stackblitz</v-btn>
          </v-banner>
      </v-row>
      <v-row class="fill-width justify-space-around mb-5" style="min-height: 600px; overflow-y: auto;" >
          <v-col
              cols="12"
              md="7"
              :class=" mdAndUp ? 'order-2' : 'order-1'"
              style="min-height: 300px;"
            >
            <div class="canvasParentContainer">
              <component :is="selectedExample"></component>
            </div>
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
  color: #01579B !important;
}

.main-banner .v-banner-text {
  padding-inline-end: 0px !important;
}

.select-example .v-input__details {
  display: none;
}
</style>
