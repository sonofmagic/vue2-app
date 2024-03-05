<script setup lang="ts">
import { onMounted, ref, nextTick, watch } from 'vue'
import Swiper from 'swiper';
import { nanoid } from 'nanoid'
// import Swiper styles
import 'swiper/css';

const page = ref(0)
const maxCount = ref(50)
const isLoaded = ref(false)
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
      let res: string[]
      switch (true) {
        case page.value < 2: {
          res = Array.from({ length: 5 }).fill(0).map((_, idx) => nanoid())
          break
        }
        case page.value === 2: {
          res = Array.from({ length: Math.floor(Math.random() * 5) }).fill(0).map((_, idx) => nanoid())
          // isLoaded.value = true
          break
        }
        default: {
          res = []
          break
        }
      }

      resolve(res)
    }, 800)
  })
}

// watch(isLoaded, () => {
//   if (isLoaded.value) {
//     nextTick(() => {
//       swiper.value.update()
//     })
//   }
// })

onMounted(async () => {
  const res = await getRandomData()
  if (res.length < 5) {
    isLoaded.value = true
  }
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
    nextTick(() => {
      swiper.value.update()
    })
  }


})
// const swiper = new Swiper();


async function next() {
  swiper.value.slideNext()
  console.log(swiper.value.realIndex, swiper.value.activeIndex)
  page.value++
  const res = await getRandomData()
  if (res.length < 5) {
    isLoaded.value = true
  }
  items.value.push(...res)
  nextTick(() => {
    swiper.value.update()
  })
}

function prev() {
  swiper.value.slidePrev()
}
</script>

<template>
  <div class="container mx-auto pt-6">
    <div ref="swiperDom" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="item" v-for="(item, idx) in items">
          <div
            class="w-[300px] h-[300px] border border-gray-400 rounded-lg flex items-center justify-center bg-sky-100">
            {{ idx }}</div>
        </div>
        <template v-if="!isLoaded">
          <div class="swiper-slide" :key="`g${idx}`" v-for="(idx) in 5">
            <div
              class="w-[300px] h-[300px] border border-gray-400 rounded-lg flex items-center justify-center bg-red-50">
              骨架屏{{ idx }}</div>
          </div>
        </template>
      </div>
      <div class="absolute left-0 border border-yellow-400 rounded-full top-1/2 z-10 cursor-pointer" @click="prev">Left
      </div>
      <div class="absolute right-0 border border-yellow-400 rounded-full top-1/2 z-10 cursor-pointer" @click="next">
        Right
      </div>
    </div>
  </div>
</template>

<style scoped></style>
