<template>
  <v-layout>
    <v-navigation-drawer permanent v-model="drawer" :rail="rail">
      <template v-slot:prepend>
        <v-list-item
          v-if="isClient"
          lines="two"
          class="text-subtitle-2"
          :prepend-avatar="'https://ionicframework.com/docs/img/demos/avatar.svg'"
          :subtitle="user != null ? 'Logged In' : 'Logged Out'"
          ><span class="text-truncate d-inline-block" v-if="user?.email != null" style="max-width: 140px">
            {{ user?.email }}
          </span></v-list-item
        >
      </template>
      <v-divider></v-divider>
      <v-list>
        <v-list-subheader> GENERAL </v-list-subheader>
        <template v-if="isAuthenticated && isClient">
          <v-list-item class="text-subtitle-1" title="Manager Info" @click="router.push({ path: '/tools/fpl/managerinfo' })">
            <template v-slot:prepend>
              <v-icon icon="mdi-account"></v-icon>
            </template>
          </v-list-item>
          <v-list-item class="text-subtitle-1" title="Transfers" @click="router.push({ path: '/tools/fpl/transfers' })">
            <template v-slot:prepend>
              <v-icon icon="mdi-cash"></v-icon>
            </template>
          </v-list-item>
          <v-list-item class="text-subtitle-1" title="History" @click="router.push({ path: '/tools/fpl/history' })">
            <template v-slot:prepend>
              <v-icon icon="mdi-history"></v-icon>
            </template>
          </v-list-item>
          <v-list-item class="text-subtitle-1" title="Team" @click="router.push({ path: '/tools/fpl/team' })">
            <template v-slot:prepend>
              <v-icon icon="mdi-account-group"></v-icon>
            </template>
          </v-list-item>

          <v-list-subheader>TOOLS</v-list-subheader>
        </template>
        <v-list-subheader>OTHER</v-list-subheader>
        <v-list-item class="text-subtitle-1" title="Settings" @click="router.push({ path: '/tools/fpl/settings' })">
          <template v-slot:prepend>
            <v-icon icon="mdi-cog"></v-icon>
          </template>
        </v-list-item>
        <v-list-item
          v-if="isAuthenticated && isClient"
          prepend-icon="mdi-account"
          title="Logout"
          value="Logout"
          @click="logOut"
        ></v-list-item>

        <v-list-item
          v-if="!isAuthenticated && isClient"
          prepend-icon="mdi-account"
          title="Login"
          value="Login"
          @click="router.push({ path: '/login' })"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-subheader>BUILD INFO</v-list-subheader>
          <v-list-item @click="showBuildInfoDialog = true">
            <pre>{{ gitInfo?.commit?.shortHash }}</pre>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar prominent image="/public/images/header6.png">
      <v-app-bar-nav-icon variant="text" @click.stop="toggleMenu()" color="white"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="scrollable-content">
      <NuxtPage />
    </v-main>
    <v-dialog v-model="showBuildInfoDialog" max-width="500px">
      <v-card>
        <v-card-title>Current Commit Info</v-card-title>
        <v-card-text>
          <vue-json-pretty :data="gitInfo" :deep="4" :key-name-as-string="true" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showBuildInfoDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import gitInfo from '@/git-info.json'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const { $firebase, $authService } = useNuxtApp()
const useUser = useUserComposable({
  store: userStore,
  firebaseAuth: $firebase.auth,
  authService: $authService
})

const { logOutUserAction, isAuthenticated, user } = useUser

const display = useDisplay()
const sessionComposable = useSessionComposable(useSessionStore())

const rail = ref(false)
const showBuildInfoDialog = ref(false)
const drawer = ref(false)
const isClient = ref(false)

onMounted(() => {
  sessionComposable.initializeSession()
})

const hideIfSmallScreen = () => {
  if (display.smAndDown.value) drawer.value = false
}

const logOut = async () => {
  await logOutUserAction()
  router.push({ path: '/login' })
}

const goBack = () => {
  router.back()
}

const toggleMenu = () => {
  drawer.value = !drawer.value
}

watch(
  () => display.smAndUp.value,
  isLargeScreen => {
    drawer.value = isLargeScreen
  },
  { immediate: true }
)

onMounted(() => {
  isClient.value = true
})
</script>

<style scoped>
.scrollable-content {
  height: calc(100vh);

  overflow-y: auto;
}
</style>

<style>
.vjs-tree-node.is-highlight,
.vjs-tree-node:hover {
  background-color: transparent;
}
</style>
