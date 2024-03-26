import { defineStore } from 'pinia'
import { groupBy } from 'lodash-es'

export const usePageStore = defineStore('page', {
  state: () => {
    return {
      list: [
        {
          id: 0,
          group: 1
        },
        {
          id: 1,
          group: 1
        },
        {
          id: 2,
          group: 2
        },
        {
          id: 3,
          group: 2
        },
        {
          id: 4,
          group: 3
        },
      ].map(x => {
        return {
          ...x,
          xxx: ''
        }
      })
    }
  },
  getters: {
    groupedList: (state) => {
      return groupBy(state.list, 'group')
    }
  },
  actions: {

  },
})