<template>
    <v-dialog v-model="isLoading" persistent>
        <v-container>
            <v-row align-content="center" class="fill-height" justify="center">
                <v-card  class="pa-2 rounded-lg" style="width: 300px;">
                    <v-col class="text-subtitle-1 text-center" cols="12">
                        {{ loadingText || "Loading..." }}
                    </v-col>
                    <v-col cols="12">
                        <v-progress-linear color="red-darken-4" height="6" indeterminate
                            rounded></v-progress-linear>
                    </v-col>
                </v-card>
            </v-row>
        </v-container>
    </v-dialog>
</template>
<script setup lang="ts">

const props = defineProps<{
    isLoading: boolean;
    loadingText?: string;
}>();

const { isLoading, loadingText } = toRefs(props)

</script>
