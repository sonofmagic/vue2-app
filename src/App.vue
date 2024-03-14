<script setup lang="ts">
import Swiper from './components/Swiper.vue';
import CalendarRange from './components/CalendarRange.vue';
import { ref, onMounted } from 'vue'
import { useElementBounding } from '@vueuse/core'

const coms = ['textarea', 'div', 'span', 'a', CalendarRange]
// const { x, y, top, right, bottom, left, width, height } = useElementBounding(el)
const els = ref([])

const res = useElementBounding(els[0])
console.log(res)
// onMounted(() => {
//   const res = useElementBounding(els[0])
//   console.log(res)
// })
</script>

<template>
  <div class="container mx-auto pt-6 space-y-4">
    <div>
      <Swiper></Swiper>
    </div>

    <component :key="idx" :is="com" v-for="(com, idx) in coms" ref="els">
      <template v-if="typeof com === 'string'"> {{ com }}{{ res }}</template>
    </component>

  </div>
</template>
