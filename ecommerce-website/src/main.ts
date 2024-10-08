import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "./includes/i18n";
import "flowbite";

import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify'

const app = createApp(App);
app.use(vuetify);
app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
