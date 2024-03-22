import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';
import themeChromeUrl from 'ace-builds/src-noconflict/theme-chrome?url';

export default defineNuxtPlugin((nuxtApp) => {
    ace.config.setModuleUrl('ace/theme/chrome', themeChromeUrl);
    nuxtApp.vueApp.component("VAceEditor", VAceEditor);
});