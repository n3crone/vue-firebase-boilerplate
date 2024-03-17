import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Vuefire
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/firebaseDb';

// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
});

app.use(
  createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark'
    }
  })
);

app.mount('#app');
