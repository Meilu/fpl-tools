<template>
  <v-container class="mt-10">
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="12">
        <v-card class="mx-auto" prepend-icon="mdi-account">
          <template v-slot:title>
            <span class="font-weight-black">Bootstrap</span>
          </template>
          <v-card-text>
            bootstrap is too big to print here
            <!-- <vue-json-pretty :data="bootstrap" :deep="4" :key-name-as-string="true" /> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Loader :is-loading="isLoading" loading-text="Fetching Bootstrap.." />
  </v-container>
</template>

<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'

const fplToolComposable = useFplToolComposable()
const bootstrap = ref<string>('')
const isLoading = ref<boolean>(false)

definePageMeta({
  middleware: 'auth-guard'
});

onMounted(async () => {
  isLoading.value = true
  
  const result = await fplToolComposable.getBootstrap()

  bootstrap.value = <string | undefined>result ?? '';

  isLoading.value = false
})
</script>

<style>
</style>
