<script setup lang="ts">
import { initFlowbite } from 'flowbite';
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
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
    initTooltips 
} from 'flowbite';

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
});
onMounted(() => {
  initFlowbite();
});

const { locale } = useI18n();
const direction = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'));
</script>

<template>
 <main :dir="direction" class="bg-backgroundLight dark:bg-backgroundDark">
  <Navbar />

  <RouterView />
  <Footer />
 </main>
</template>

<style>
@font-face {
  src: url('./assets/fonts/IBM_Plex_Sans_Arabic/IBMPlexSansArabic-Regular.ttf');
  font-family: 'IBM Plex Sans Arabic';
}
body {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}
.material-icons {
  font-family: "Material Icons";
}
</style>