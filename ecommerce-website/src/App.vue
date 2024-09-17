<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue'
import 'animate.css';

import { 
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    initDrawers, 
    initDropdowns, 
    initModals, 
    initPopovers, 
    initTabs, 
    initTooltips } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
})
onMounted(() => {
  initFlowbite();
})
</script>

<template>
 
  <RouterView />
</template>

<style>
@font-face {
  src: url('./assets/fonts/IBM_Plex_Sans_Arabic/IBMPlexSansArabic-Regular.ttf');
  font-family: 'IBM Plex Sans Arabic';
}
body{
  font-family: 'IBM Plex Sans Arabic', sans-serif;

}
.material-icons {
  font-family: "Material Icons";
}

</style>