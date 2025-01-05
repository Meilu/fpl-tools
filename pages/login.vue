<template>
  <v-container class="mt-10">
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="7">
        <v-card class="mx-auto pa-5" subtitle="If this won't get you to the top of the league...">
          <template v-slot:title>
            <span class="font-weight-black">Welcome to FPL Tools.</span>
          </template>
          <v-form fast-fail @submit.prevent>
            <v-card-item>
              <v-sheet class="mx-auto">
                <v-text-field type="email" v-model="email" label="Email"></v-text-field>
                <v-text-field type="password" v-model="password" label="Password"></v-text-field>
              </v-sheet>
            </v-card-item>
            <v-card-actions>
              <v-btn @click="login" type="submit" color="primary" class="sign-in-with-microsoft-button" block> Sign in </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <Loader :is-loading="isLoading" loading-text="Logging in..." />
  </v-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.store'

const router = useRouter();
const email = ref<string>('jurgen.welschen@gmail.com')
const password = ref<string>('2369od8d')
const isLoading = ref<boolean>(false)
const showErrorDialog = ref(false)
const userStore = useUserStore()

const { $firebase, $authService } = useNuxtApp();

const useUser = useUserComposable({
  store: userStore,
  firebaseAuth: $firebase.auth,
  authService: $authService
})
const { loginWithEmailAndPasswordAction, loginError } = useUser;

const login = async () => {
  isLoading.value = true

  await loginWithEmailAndPasswordAction(email.value, password.value)

  isLoading.value = false

  if (!loginError.value) {
    router.push({ name: 'index' }) // Redirect to the root page
    return
  }

  showErrorDialog.value = true
}
</script>

<style>
</style>
