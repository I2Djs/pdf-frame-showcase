<script setup>
import { watch, shallowRef, onMounted, ref } from 'vue';
import barChart from './../components/charts/barChart.vue';
import multiLineChart from './../components/charts/multiLineChart.vue';
import stepChart from './../components/charts/stepChart.vue';

import { useDisplay } from 'vuetify'
  
  const { mdAndUp } = useDisplay()
  let rawTemplate = shallowRef('');
  const router = useRouter();
  const route = useRoute();
  
  let exampleList = [{
    title: 'Bar Chart',
    component: barChart,
    file: 'charts/barChart.vue'
  }, {
    title: 'MultiLine Chart',
    component: multiLineChart,
    file: 'charts/multiLineChart.vue'
  }, {
    title: 'Step Chart;',
    component: stepChart,
    file: 'charts/stepChart.vue'
  }];

  const selectedOption = ref('pdf');
  let selectedValue = shallowRef('Bar Chart');
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
      path: '/charts',
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
        path: '/charts',
        query: {
          title: 'Bar Chart'
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
      <v-row justify="space-around" style=" max-height: 2rem;" class="pb-1">
          <v-banner class="h-auto justify-center align-center text-center text-subtitle-1 example-title pt-0 pb-0" lines="one" density="compact" border=0 position="sticky">
            Try Examples on:  <v-btn class="ml-2" color="light-blue-darken-4" prepend-icon="mdi-pencil"  href="https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase/tree/stackBlitzShowcase">Stackblitz</v-btn>
          </v-banner>
      </v-row>
      <v-row class="fill-width justify-space-around mb-5" style="min-height: 700px; max-height: 100%; overflow-y: auto;" >
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
              style="min-height: 300px;"
            >
              <v-ace-editor
                v-model:value="rawTemplate"
                lang="html"
                theme="chrome"
                :readOnly="true"
                style="height: 100%"
                @init="editorInit" />
          </v-col>
      </v-row>
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
