import { defineStore } from 'pinia'
import _ from 'lodash'
import { ref } from 'vue'
import type { BootstrapStatic } from 'fpl-interfaces'

const STORAGE_KEY = 'fplBootstrap'

export const useFplBootstrapStore = defineStore(
  STORAGE_KEY,
  () => {
    const bootstrap = ref<BootstrapStatic>()

    const setBootstrap = (bootstrapStatic: BootstrapStatic) => {
      bootstrap.value = bootstrapStatic
    }

    const getPlayerInfo = (playerId: number) => {
      return _.find(bootstrap.value?.elements, { id: playerId })
    }

    return {
      setBootstrap,
      getPlayerInfo,
      bootstrap
    }
  },
  {
    persist: {
      key: STORAGE_KEY
    }
  }
)
