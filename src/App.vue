<script setup lang="ts">
import { onMounted, ref, nextTick, watch, computed } from 'vue'
import Swiper from 'swiper/bundle';
import { nanoid } from 'nanoid'
// import Swiper styles
import 'swiper/css/bundle';

const page = ref(0)
const maxCount = ref(21)
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
const items = ref<string[]>([])
const isShow = ref(false)
const isFetching = ref(false)

const isOverflow = computed(() => {
  return items.value.length >= maxCount.value
})
// const skeletons = ref(Array.from({ length: 5 }).fill(0).map(() => nanoid()))
function getRandomData() {
  isFetching.value = true
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let res: string[]
      switch (true) {
        case page.value < 4: {
          res = Array.from({ length: 5 }).fill(0).map(() => nanoid())
          break
        }
        case page.value < 5: {
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
      isFetching.value = false
    }, 1800)
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

  getRandomData().then(res => {
    if (res.length < slidesPerView.value) {
      isLoaded.value = true
    }
    for (let i = 0; i < res.length; i++) {
      if (items.value.length <= maxCount.value) {
        items.value.push(res[i])
      }
    }
    nextTick(() => {
      swiper.value.update()
    })
  })


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
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
    }

    swiper.value = new Swiper(swiperDom.value, swiperParams)
    isShow.value = true
    nextTick(() => {
      swiper.value.update()
    })
  }


})

async function next() {
  if (isFetching.value) {
    return
  }
  swiper.value.slideNext()
  console.log(swiper.value.realIndex, swiper.value.activeIndex)

  if (!isLoaded.value) {
    page.value++
    const res = await getRandomData()
    if (res.length < slidesPerView.value) {
      isLoaded.value = true
    }
    for (let i = 0; i < res.length; i++) {
      if (items.value.length <= maxCount.value) {
        items.value.push(res[i])
      }
    }


    nextTick(() => {
      swiper.value.update()
      // nextTick(() => {
      //   if (isLoaded.value) {
      //     swiper.value.slideNext(0)
      //   }
      // })

    })
  }

}

const isFirstPage = computed(() => swiper.value?.isBeginning)

function prev() {
  swiper.value.slidePrev()
}
</script>

<template>
  <div class="container mx-auto pt-6">
    <div v-show="isShow" ref="swiperDom" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="item" v-for="(item, idx) in items">
          <div
            class="w-[300px] h-[300px] border border-gray-400 rounded-lg flex items-center justify-center bg-sky-100">
            {{ idx + 1 }}</div>
        </div>
        <template v-if="!isLoaded">
          <div class="swiper-slide" :key="idx" v-for="(idx) in slidesPerView">
            <div
              class="w-[300px] h-[300px] border border-gray-400 rounded-lg flex items-center justify-center bg-red-50">
              骨架屏{{ idx }}</div>
          </div>
        </template>
      </div>
      <div class="swiper-pagination"></div>
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
      <div v-if="isLoaded || !isFirstPage"
        class="absolute left-0 border border-yellow-400 rounded-full top-1/2 z-10 cursor-pointer" @click="prev">Left
      </div>
      <div class="absolute right-0 border border-yellow-400 rounded-full top-1/2 z-10 cursor-pointer" @click="next">
        Right
      </div>
    </div>
  </div>
</template>

<style scoped></style>
