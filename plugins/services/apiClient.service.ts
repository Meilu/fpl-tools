import { createApiClient } from 'jurgen-tools-library'

export default defineNuxtPlugin(() => {
  const { $firebase, $authService } = useNuxtApp()
  const config = useRuntimeConfig();
  const userStore = useUserStore()
  const useUser = useUserComposable({
    store: userStore,
    firebaseAuth: $firebase.auth,
    authService: $authService
  })

  const getAccessToken = async (): Promise<string | undefined> => {

    const currentUser = $firebase.auth.currentUser;

    if (!currentUser) {
      return undefined
    }

    return await currentUser.getIdToken()
  }
  const apiBaseUrl = config.public.apiBaseUrl;
  const apiClient = createApiClient(<string>apiBaseUrl, getAccessToken)

  return {
    provide: {
      apiClient
    }
  }
})
