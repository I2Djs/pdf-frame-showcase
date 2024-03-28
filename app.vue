<template>
  <NuxtLayout>
    <v-app>
      <v-layout class="rounded rounded-md">
        <v-app-bar>
          <template v-slot:prepend>
            <v-img src="pdf-frame.svg" width="150"></v-img>
          </template>
          <v-app-bar-title><label>PDF-Frame</label></v-app-bar-title>
          <v-spacer></v-spacer>
          <div class="action-btns">
            <v-btn density="comfortable" href="https://github.com/I2Djs/pdf-frame" color="deep-purple-darken-1" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-github</v-icon>
              PDF-Frame
            </v-btn>

            <v-btn density="comfortable" href="https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue" color="purple-accent-4" rounded="xs" size="x" :slim="true">
              <v-icon size="x-large">mdi-school-outline</v-icon>
              Guide
            </v-btn>

            <v-btn density="comfortable" href="https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase" color="deep-purple-darken-1" rounded="xs" size="x" :slim="true">
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
<style scoped>
  .action-btns{
    display: flex;
    grid-column-gap: 2rem;
    padding-right: 3rem;
  }
</style>
