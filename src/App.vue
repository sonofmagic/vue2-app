<script setup lang="ts">
import Swiper from './components/Swiper.vue';
import CalendarRange from './components/CalendarRange.vue';
</script>

<template>
  <div class="container mx-auto pt-6 space-y-4">
    <div>
      <Swiper></Swiper>
    </div>

    <div>
      <CalendarRange></CalendarRange>
    </div>

  </div>
</template>

<style scoped></style>
