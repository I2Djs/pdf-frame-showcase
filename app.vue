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

            <v-btn v-if="!smAndDown" density="comfortable" href="https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase/tree/stackBlitzShowcase" class="link-color" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-code-tags</v-icon>
              Examples
            </v-btn>
          </div>
        </v-app-bar>
      <v-main class="d-flex justify-center">
        <v-container fluid class="d-flex flex-column pt-5" :class=" smAndDown ? 'px-6 overflow-auto' : 'px-12'" style="height: auto;">
          <v-row class="fill-width px-10 pt-4 pb-4 justify-center">
            <v-label class="text-h2 text-center font-weight-bold main-banner-title" :class=" smAndDown ? 'text-h4' : 'text-h2'" justify="space-around" :stacked="true"  position="sticky" border=0 >
                PDF-Frame
            </v-label>
          </v-row>
          <v-row class="fill-width mt-0 " :class=" smAndDown ? 'px-0' : 'px-10'">
            <v-banner class="justify-center d-flex text-center font-weight-medium main-banner pt-0 px-0" justify="space-around" :stacked="true"  position="sticky" border=0 >
                <template v-slot:text>
                  <p class="first-desc" :class=" smAndDown ? 'text-subtitle-1' : 'text-h5'">
                    A web framework for creating dynamic and complex PDFs and Canvas graphics with the declarative templates.
                  </p>
                  <p class="second-desc" :class=" smAndDown ? 'text-subtitle-2' : 'text-h6'">
                    Supports <a class="anchor-text" href="https://nuxt.com/modules/nuxt-pdf-frame">Nuxt.js</a> and <a class="anchor-text" href="https://vuejs.org/">Vue.js</a>, providing declarative and reactive bindings for <a class="anchor-text" href="https://github.com/I2Djs/I2Djs"> I2Djs </a>
                  </p>
                </template>
            </v-banner>
          </v-row>
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
    title: 'PDF-Frame: JavaScript Web Framework for Client-Side PDF/Canvas Rendering with Vuejs and Nuxtjs Support',
    meta:[{
      name: "description", content: "PDF-Frame is a JavaScript web framework for client-side PDF/Canvas rendering. With its declarative HTML syntax and semantics, it offers an easy and efficient way to define PDF/Canvas graphical content. It follows syntax similar to SVG's and provides component support for popular frameworks like Vue.js, Nuxt.js, and React (work in progress). Powered by i2djs, PDF-Frame presently supports rendering outputs as PDF and Canvas formats."
    }]
  })

  useSeoMeta({
    title: 'PDF-Frame: JavaScript Web Framework for Client-Side PDF/Canvas Rendering with Vuejs and Nuxtjs Support',
    ogTitle: 'PDF-Frame: JavaScript Web Framework for Client-Side PDF/Canvas Rendering with Vuejs and Nuxtjs Support',
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
  color: #e8dede !important;
}

.main-banner .v-banner-text {
  padding-inline-end: 0px !important;
  color: white !important;
  row-gap: 0.5rem;
}

.main-sub-title {
  background: none !important;
  /* color: #e8dede !important; */
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
  color: #ffbcdd !important;
}

.main-banner-title {
  opacity: 0.9 !important;
  background: linear-gradient(to right,#b77cba, #e76f96, #b77cba);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
}

.first-desc {
  font-weight: 300;
  color: rgba(255,255,255, 0.9);
}

.second-desc {
  font-weight: 300;
  color: #ffadc8;
}

.anchor-text {
  color: #e45a88;
}

</style>

<style>
  .ace_gutter-layer  {
    background: #673264 !important;
    color: white !important;
  }
</style>
