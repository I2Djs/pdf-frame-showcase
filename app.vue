<template>
  <NuxtLayout>
    <v-app>
      <v-layout class="rounded rounded-md">
        <v-app-bar>
          <template v-slot:prepend>
            <v-img src="pdf-frame.svg" width="150"></v-img>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <!-- <div class="logo">
              <v-btn icon="/pdf-frame.svg">
                Pdf-Grame
              </v-btn>
            </div> -->
          </template>
          <v-app-bar-title><label>PDF-Frame</label></v-app-bar-title>
          <v-spacer></v-spacer>
          <div class="action-btns">
            <v-btn density="comfortable" href="https://github.com/I2Djs/pdf-frame" color="deep-purple-darken-1" rounded="xs" size="x-large" :slim="true">
              <v-icon size="x-large">mdi-github</v-icon>
              PDF-Frame
            </v-btn>

            <v-btn density="comfortable" href="https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue" color="purple-accent-4" rounded="xs" size="x-large" :slim="true">
              <v-icon size="x-large">mdi-school-outline</v-icon>
              Guide
            </v-btn>
          </div>
        </v-app-bar>
      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <NuxtPage />
      </v-main>
  </v-layout>
  </v-app>
  </NuxtLayout>
</template>
<style scoped>
  .action-btns{
    display: flex;
    grid-column-gap: 2rem;
    padding-right: 3rem;
  }
</style>
