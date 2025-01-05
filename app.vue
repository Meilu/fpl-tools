<template>
  <v-app>
    <NuxtLayout :name="layout" />
    <NuxtPage v-if="useUser.isFirebaseReady.value"/>
  </v-app>
</template>

<script setup lang="ts">
const layout = 'main'

const userStore = useUserStore()

const { $firebase, $authService } = useNuxtApp();

const useUser = useUserComposable({
  store: userStore,
  firebaseAuth: $firebase.auth,
  authService: $authService
})


</script>
