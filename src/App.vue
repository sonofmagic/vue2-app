<script setup lang="ts">
// import Swiper from './components/Swiper.vue';
import CalendarRange from './components/CalendarRange.vue';
import { ref, computed } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { usePageStore } from './store'
import { groupBy } from 'lodash-es'
const store = usePageStore()
// const coms = ['textarea', 'div', 'span', 'a', CalendarRange]
// const { x, y, top, right, bottom, left, width, height } = useElementBounding(el)
// const els = ref(Array.from({ length: coms.length }).map(_ => ref()))

// const res = useElementBounding(els.value[0])
// console.log(res)
// onMounted(() => {
//   const res = useElementBounding(els[0])
//   console.log(res)
// })
const groupedList = computed(() => {
  console.log('----------------')
  return groupBy(store.list, 'group')
})
console.log(store.groupedList, groupedList)

</script>

<template>
  <div class="container mx-auto pt-6 space-y-4">

    <div :key="'b' + k" v-for="(data, k) in store.groupedList">
      {{ k }}
      <el-table size="mini" :data="data">
        <el-table-column>
          <template #default="{ row }">
            <el-input size="mini" v-model="row.xxx"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div :key="'a' + k" v-for="(data, k) in groupedList">
      {{ k }}
      <el-table size="mini" :data="data">
        <el-table-column>
          <template #default="{ row }">
            <el-input size="mini" v-model="row.xxx"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div>
      <Swiper></Swiper>
    </div>

    <component :key="idx" :is="com" v-for="(com, idx) in coms" :ref="el=> els[idx].value = el">
      <template v-if="typeof com === 'string'"> {{ com }}{{ res }}</template>
    </component> -->

  </div>
</template>
