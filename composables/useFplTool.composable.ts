import type { ISettings } from 'jurgen-tools-library'
import _ from 'lodash'
import { fplToolService } from '~/services/tools/fplTool.service'

export const useFplToolComposable = () => {
  const store = useFplToolStore()
  const service = fplToolService()

  const bootstrapStore = useFplBootstrapStore();

  const settings = computed(() => store.settings)

  const setSettings = (settings: ISettings) => {
    store.setSettings(settings)
  }

  const getBootstrap = async () => {
    try {
      const result = await service.getBootstrapStatic()

      if (result)
        bootstrapStore.setBootstrap(result)
      
    } catch (error) {
      throw error
    }
  }

  const getManager = async () => {
    try {
      return await service.getManager(store.settings.teamId)
    } catch (error) {
      throw error
    }
  }

  const getTeam = async () => {
    try {
      return await service.getTeam(store.settings.teamId, 16)
    } catch (error) {
      throw error
    }
  }

  const getHistory = async () => {
    try {
      return await service.getHistory(store.settings.teamId)
    } catch (error) {
      throw error
    }
  }

  const getTransfers = async () => {
    try {
      return await service.getTransfers(store.settings.teamId)
    } catch (error) {
      throw error
    }
  }

  return {
    setSettings,
    getManager,
    getTransfers,
    getHistory,
    getTeam,
    getBootstrap,
    settings
  }
}
