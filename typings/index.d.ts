import type { AxiosInstance } from 'axios';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';

declare module '#app' {
  interface NuxtApp {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
    };
    $authService: ReturnType<typeof createAuthenticationService>;
    $apiClient: AxiosInstance;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
    };
    $authService: ReturnType<typeof createAuthenticationService>;
    $apiClient: AxiosInstance;
  }
}
