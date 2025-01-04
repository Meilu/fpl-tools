// stores/user.store.ts (Nuxt project)
import { createUserStore } from 'jurgen-tools-library';
import { defineStore } from 'pinia';

export const useUserStore = createUserStore('user');
