<template>
  <NuxtLayout>
    <v-app>
      <v-layout class="rounded rounded-md">
        <v-app-bar>
          <template v-slot:prepend>
            <v-img src="pdf-frame.svg" width="150"></v-img>
          </template>
          <v-app-bar-title v-if="!smAndDown"><label>PDF-Frame</label></v-app-bar-title>
          <v-spacer></v-spacer>
          <div class="action-btns d-flex pr-10">
            <v-btn density="comfortable" href="https://github.com/I2Djs/pdf-frame" color="purple-darken-3" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-github</v-icon>
              PDF-Frame
            </v-btn>

            <v-btn v-if="!smAndDown" density="comfortable" href="https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue" color="purple-darken-3" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-school-outline</v-icon>
              Guide
            </v-btn>

            <v-btn v-if="!smAndDown" density="comfortable" href="https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase" color="purple-darken-3" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-code-tags</v-icon>
              Examples
            </v-btn>
          </div>
        </v-app-bar>
      <v-main class="d-flex justify-center" style="min-height: 300px;">
        <NuxtPage />
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
</style>
