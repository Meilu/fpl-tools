import { watch } from 'vue';
import { defineNuxtRouteMiddleware } from '#app';
import { useUserStore } from '@/stores/user.store';
import { useNuxtApp } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const { $firebase, $authService } = useNuxtApp();
  const useUser = useUserComposable({
    store: userStore,
    firebaseAuth: $firebase.auth,
    authService: $authService
  });

  return new Promise((resolve) => {
    const stopWatch = watch(
      () => useUser.isFirebaseReady.value,
      (newVal) => {
        if (newVal) {
          // Resume navigation
          stopWatch();
          resolve(true);
        }
      },
      { immediate: true }
    );
  });
});
