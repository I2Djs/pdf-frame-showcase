<template>
  <NuxtLayout>
    <v-app>
      <v-layout class="rounded rounded-md">
        <v-app-bar class="page-header">
          <template v-slot:prepend>
            <router-link to="/">
              <v-img src="pdf-frame.svg" width="150" alt="PDF Frame"></v-img>
            </router-link>
          </template>
          <!-- <v-app-bar-title v-if="!smAndDown"><label>PDF-Frame</label></v-app-bar-title> -->
          <v-spacer></v-spacer>
          <div class="action-btns d-flex pr-10">
            <v-btn density="comfortable" href="https://github.com/I2Djs/pdf-frame" class="link-color" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-github</v-icon>
              PDF-Frame
            </v-btn>

            <v-btn v-if="!smAndDown" density="comfortable" href="https://github.com/I2Djs/pdf-frame/wiki" class="link-color" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-school-outline</v-icon>
              Guide
            </v-btn>

            <v-btn v-if="!smAndDown" density="comfortable" href="https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase" class="link-color" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-code-tags</v-icon>
              Examples
            </v-btn>
          </div>
        </v-app-bar>
      <v-main class="d-flex justify-center">
        <v-container fluid class="d-flex flex-column pl-12 pr-12 pt-5" style="height: auto;">
          <v-row class="fill-width px-10 pt-6 pb-4 justify-center d-flex">
            <v-label class="text-h2 text-center font-weight-bold main-banner-title" justify="space-around" :stacked="true"  position="sticky" border=0 >
                PDF-Frame
            </v-label>
          </v-row>
          <v-row class="fill-width px-10">
            <v-banner class="justify-center d-flex text-center font-weight-medium main-banner pt-0" :class=" smAndDown ? 'text-subtitle-1' : 'text-h6'" color="purple-accent-2" justify="space-around" :stacked="true"  position="sticky" border=0 >
                <template v-slot:text>
                  JavaScript framework for client-side PDF and Canvas rendering. Effortlessly integrate with Vue3 and Nuxt3 for dynamic graphical content creation.
                </template>
            </v-banner>
          </v-row>
          <!-- <v-row class="mt-0 pb-0" style="min-height: 3rem;">
            <v-banner  class="d-flex pt-0 pb-1 pt-1 justify-center text-subtitle-1 text-center  main-sub-title font-weight-medium pink-lighten-3" color="pink-lighten-3" border=0>
                Powered By <v-btn variant="outlined" elevation="2" href="https://github.com/I2Djs/pdf-frame" color="pink-lighten-3" class="rounded-pill ml-2" density="compact"> PDF-Frame </v-btn>
            </v-banner>
          </v-row> -->
          <NuxtPage />
        </v-container>
      </v-main>
  </v-layout>
  </v-app>
  </NuxtLayout>
</template>
<script setup lang="ts">
  import { useDisplay } from 'vuetify'

  useHead({
    title: 'PDF-Frame: JavaScript Web Framework for Client-Side PDF/Canvas Rendering with Vue.js and Nuxt.js Support',
    meta:[{
      name: "description", content: "PDF-Frame is a JavaScript web framework for client-side PDF/Canvas rendering. With its declarative HTML syntax and semantics, it offers an easy and efficient way to define PDF/Canvas graphical content. It follows syntax similar to SVG's and provides component support for popular frameworks like Vue.js, Nuxt.js, and React (work in progress). Powered by i2djs, PDF-Frame presently supports rendering outputs as PDF and Canvas formats."
    }]
  })

  useSeoMeta({
    title: 'PDF-Frame: JavaScript Web Framework for Client-Side PDF/Canvas Rendering with Vue.js and Nuxt.js Support',
    ogTitle: 'PDF-Frame: JavaScript Web Framework for Client-Side PDF/Canvas Rendering with Vue.js and Nuxt.js Support',
    description: "PDF-Frame is a JavaScript web framework for client-side PDF/Canvas rendering. With its declarative HTML syntax and semantics, it offers an easy and efficient way to define PDF/Canvas graphical content. It follows syntax similar to SVG's and provides component support for popular frameworks like Vue.js, Nuxt.js, and React (work in progress). Powered by i2djs, PDF-Frame presently supports rendering outputs as PDF and Canvas formats.",
    ogDescription: "PDF-Frame is a JavaScript web framework for client-side PDF/Canvas rendering. With its declarative HTML syntax and semantics, it offers an easy and efficient way to define PDF/Canvas graphical content. It follows syntax similar to SVG's and provides component support for popular frameworks like Vue.js, Nuxt.js, and React (work in progress). Powered by i2djs, PDF-Frame presently supports rendering outputs as PDF and Canvas formats.",
    ogImage: "https://raw.githubusercontent.com/I2Djs/pdf-frame/main/assets/pdf-frame.svg",

  })
  
  const { smAndDown } = useDisplay()
</script>
<style scoped>
  /*.action-btns{
    display: flex;
    grid-column-gap: 2rem;
    padding-right: 3rem;
  }*/

.main-banner {
  background: none !important;
  color: white !important;
}

.main-banner {
  background: none !important;
  color: #cbd5e1 !important;
}

.main-banner .v-banner-text {
  padding-inline-end: 0px !important;
  color: white !important;
}

.main-sub-title {
  background: none !important;
  /* color: #ff76a8 !important; */
}

.example-title {
  color: #01579B !important;
}

.v-row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: 0;
}

.v-main {
   /* background: linear-gradient(to bottom right, #30105f, #541961)  */
   background: #1e142a;
/*  background-color: rgb(15, 23, 42);*/
}

.page-header {
  background: #180a1b !important;
  color: white !important;
}

.page-header .link-color {
  color: #ffa0cf !important;
}
</style>
