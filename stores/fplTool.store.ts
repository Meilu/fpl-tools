
import { defineStore } from "pinia";
import _ from 'lodash';
import { ref, computed} from "vue";
import type { ISettings } from "jurgen-tools-library";

const STORAGE_KEY = 'fplTool';

export const useFplToolStore = defineStore(STORAGE_KEY, () => {

    const settings = ref<ISettings>({
        teamId: 3474287,
        theme: ''
    });

    const setSettings = (newSettings: ISettings) => {
        settings.value = newSettings;
      };

    return {
        setSettings,
        settings
    };
}, {
    persist: {
        key: STORAGE_KEY
    },
})
