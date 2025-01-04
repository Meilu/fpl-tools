import { createAuthenticationService } from 'jurgen-tools-library';
import { useUserStore } from '@/stores/user.store';

export default defineNuxtPlugin(() => {
  const { $firebase } = useNuxtApp();
  
  const userStore = useUserStore();

  const authService = createAuthenticationService({
    userStore,
    firebaseAuth: $firebase.auth,
  });

  return {
    provide: {
      authService: authService,
    }
  };
});
