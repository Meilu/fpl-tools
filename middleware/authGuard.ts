import { watch } from 'vue'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter()

  // We need to use cookie here because of SSR.
  const user = useCookie('user')

  const userStore = useUserStore()
  const { $firebase, $authService } = useNuxtApp()
  const useUser = useUserComposable({
    store: userStore,
    firebaseAuth: $firebase.auth,
    authService: $authService
  })

  if (!useUser.isFirebaseReady.value) {
    await new Promise(resolve => {
      const stopWatch = watch(
        () => useUser.isFirebaseReady.value,
        newVal => {
          if (newVal) {
            stopWatch()
            resolve(true)
          }
        },
        { immediate: true }
      )
    })
  }
  
  if (!user.value) {
    // Redirect to login page if not authenticated
    return router.push('/login')
  }
})
