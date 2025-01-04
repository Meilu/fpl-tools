import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

debugger;
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
