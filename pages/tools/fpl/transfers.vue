<template>
  <v-container class="mt-10">
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="12">
        <v-card class="mx-auto" prepend-icon="mdi-account">
          <template v-slot:title>
            <span class="font-weight-black">Transfers</span>
          </template>
          <v-card-text>
            <vue-json-pretty :data="transfers" :deep="4" :key-name-as-string="true" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Loader :is-loading="isLoading" loading-text="Fetching Transfers.." />
  </v-container>
</template>

<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'

const fplToolComposable = useFplToolComposable()
const transfers = ref<string>('')
const isLoading = ref<boolean>(false)
const userStore = useUserStore()

definePageMeta({
  middleware: 'auth-guard'
});

onMounted(async () => {
  isLoading.value = true
  
  const result = await fplToolComposable.getTransfers()

  transfers.value = result

  isLoading.value = false
})
</script>

<style>
</style>
