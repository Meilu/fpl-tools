import { createApiClient } from 'jurgen-tools-library'

export default defineNuxtPlugin(() => {
  const { $firebase, $authService } = useNuxtApp()

  const userStore = useUserStore()
  const useUser = useUserComposable({
    store: userStore,
    firebaseAuth: $firebase.auth,
    authService: $authService
  })

  const getAccessToken = async (): Promise<string | undefined> => {

    const currentUser = useUser.user.value;

    if (!currentUser) {
      return undefined
    }

    return await currentUser.getIdToken()
  }

  const apiClient = createApiClient('http://localhost:4000/', getAccessToken)

  return {
    provide: {
      apiClient
    }
  }
})
