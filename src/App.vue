<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';


const maxCount = ref(50)
const breakpointsMap = {
  DEFAULT: {
    slidesPerView: 2,
    slidesPerGroup: 2
  },
  sm: {
    slidesPerView: 3,
    slidesPerGroup: 3
  },
  md: {
    slidesPerView: 4,
    slidesPerGroup: 4
  },
  lg: {
    slidesPerView: 5,
    slidesPerGroup: 5
  },
}

const swiperDom = ref()
const swiper = ref()
const slidesPerView = ref(breakpointsMap.lg.slidesPerView)
const items = ref([])

function getRandomData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Array.from({ length: Math.ceil(Math.random() * 5) }).fill(0).map((_, idx) => idx))
    }, 800)
  })
}


onMounted(async () => {
  const res = await getRandomData()
  items.value = res
  if (swiperDom.value) {
    const swiperParams = {
      ...breakpointsMap,
      breakpoints: {
        840: breakpointsMap.sm,
        1128: breakpointsMap.md,
        1416: breakpointsMap.lg,
      },
      allowTouchMove: false,
      on: {
        breakpoint(swiper, breakpointParams) {
          slidesPerView.value = breakpointParams.slidesPerView
        },
        init(instance) {
          swiper.value = instance
        }
      },
      loop: true
    }

    swiper.value = new Swiper(swiperDom.value, swiperParams)
  }
})
// const swiper = new Swiper();


function next() {
  swiper.value.slideNext()
}

function prev() {
  swiper.value.slidePrev()
}
</script>

<template>
  <div class="container mx-auto pt-6">
    <div ref="swiperDom" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, idx) in items">
          <div
            class="w-[300px] h-[300px] border border-gray-400 rounded-lg flex items-center justify-center bg-slate-200">
            {{ idx }}</div>
        </div>
      </div>
      <div class="absolute left-0 border border-sky-400 rounded-full top-1/2 z-10 cursor-pointer" @click="prev">Left
      </div>
      <div class="absolute right-0 border border-sky-400 rounded-full top-1/2 z-10 cursor-pointer" @click="next">Right
      </div>
    </div>
  </div>
</template>

<style scoped></style>
