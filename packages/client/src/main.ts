import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import "./lib/firebase"; // 👈 initialize firebase here

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
