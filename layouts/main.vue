<template>
    <v-app>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="hideIfSmallScreen">
                <template v-slot:prepend>
                    <v-list-item lines="two" :prepend-avatar="'https://ionicframework.com/docs/img/demos/avatar.svg'"></v-list-item>
                </template>
                <v-divider></v-divider>
                <template>
                    <v-list nav>
                        <v-list-subheader>
                            GENERAL
                        </v-list-subheader>
                        <v-list-item title="Dashboard" value="dashboard" @click="goToDashboard">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-chart-bar"></v-icon>
                            </template>
                        </v-list-item>
                        <v-list-subheader>PROMOTIONS</v-list-subheader>
                        <v-list-item title="Create Promotions" @click="goToCreatePromotion">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-email-plus-outline"></v-icon>
                            </template>
                        </v-list-item>
                        <v-list-item title="List Promotions" @click="goToListPromotion">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-format-list-bulleted"></v-icon>
                            </template>
                        </v-list-item>
                        <v-list-subheader>OTHER</v-list-subheader>
                        <v-list-item
                            :prepend-icon="theme.global.name.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                            title="Toggle Theme" value="Toggle Theme" slim @click="toggleTheme"></v-list-item>
                        <v-list-item prepend-icon="mdi-account" title="Logout" value="Logout"
                            @click="logOut"></v-list-item>
                    </v-list>
                </template>
                <template v-slot:append>
                    <v-list density="compact" nav>
                        <v-list-subheader>BUILD INFO</v-list-subheader>
                        <v-list-item @click="showBuildInfoDialog = true">
                            <pre>{{ gitInfo?.commit?.shortHash }}</pre>
                        </v-list-item>
                    </v-list>
                </template>
            </v-navigation-drawer>
            <v-app-bar prominent image="/public/images/header_champions2024.png">
                <v-app-bar-nav-icon variant="text" @click.stop="toggleMenu()" color="white"></v-app-bar-nav-icon>
            </v-app-bar>
            <v-main class="scrollable-content">
                <slot />
            </v-main>
        </v-layout>
    </v-app>
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
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useTheme } from 'vuetify';
import { useRouter } from 'vue-router/auto';
import { useDisplay } from 'vuetify';

const router = useRouter();

const theme = useTheme();
const display = useDisplay();
const drawer = ref(true);
const rail = ref(false);
const showBuildInfoDialog = ref(false);

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};

const hideIfSmallScreen = () => {
    if (display.smAndDown.value)
        drawer.value = false;
}

const logOut = async () => {
    await logOutUserAction();
    router.push({ name: '/login' });
};

const goToDashboard = () => {
    router.push({ name: '/dashboard' });
};

const goToCreatePromotion = () => {
    router.push({ name: '/tools/promotions/create' });
};

const goToListPromotion = () => {
    router.push({ name: '/tools/promotions/list' });
};

const goBack = () => {
    router.go(-1);
};

const toggleMenu = () => {
    drawer.value = !drawer.value;
}

watch(() => display.smAndUp.value, (isLargeScreen) => {
    drawer.value = isLargeScreen;
}, { immediate: true });
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
