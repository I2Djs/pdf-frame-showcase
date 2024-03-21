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
          <v-btn icon>
          <v-icon size="x-large">mdi-github</v-icon>
        </v-btn>
        </v-app-bar>
      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <NuxtPage />
      </v-main>
  </v-layout>
  </v-app>
  </NuxtLayout>
</template>
