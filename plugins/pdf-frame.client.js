import pdfFrame from "@i2d/pdf-frame-vue";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("pdfFrame", pdfFrame);
});