<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import HomeCategories from '@/components/HomeCategories.vue';
import BestDeals from '@/components/BestDeals.vue';
import Brands from '@/components/Brands.vue';
</script>

<template>
    <div class="flex flex-col space-y-20">
        <Navbar />
        <HomeCategories />
        <BestDeals />
        <Brands />

    </div>


</template>
