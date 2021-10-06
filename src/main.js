import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./bootstrap/min.css";
import "./bootstrap/bundle.min.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDownload,
  faUndo,
  faRedo,
  faRandom,
  faTrash,
  faShare,
  faMars,
  faVenus,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
library.add({
  faDownload,
  faUndo,
  faRedo,
  faRandom,
  faTrash,
  faShare,
  faMars,
  faVenus,
  faVenusMars,
});

import VueSocialSharing from "vue-social-sharing";
Vue.use(VueSocialSharing);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
