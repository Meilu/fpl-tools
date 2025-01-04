<template>
  <v-container class="mt-10">
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="7">
        <v-card class="mx-auto" prepend-icon="mdi-cog">
          <template v-slot:title>
            <span class="font-weight-black">Settings</span>
          </template>
          <v-form fast-fail @submit.prevent>
            <v-card-item>
              <v-text-field v-model="localSettings.teamId" label="TeamID"></v-text-field>
            </v-card-item>
            <v-card-item>
              <v-select v-model="localSettings.theme" label="Theme" :items="['light', 'dark']"></v-select>
            </v-card-item>
            <v-card-actions>
              <v-btn @click="saveSettings" type="submit" color="primary" block> Save </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import type { ISettings } from 'jurgen-tools-library';
const sessionComposable = useSessionComposable(useSessionStore())

const localSettings = ref<ISettings>({ ...useFplToolComposable().settings?.value });

const saveSettings = () => {
  useFplToolComposable().setSettings(localSettings.value);
  sessionComposable.setTheme(localSettings.value.theme);
}
</script>

<style>
</style>
