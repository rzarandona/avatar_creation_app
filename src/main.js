import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToastr from "vue-toastr";
import "./bootstrap/min.css";
import "./bootstrap/bundle.min.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faDownload, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add({ faDownload, faCheck });

Vue.config.productionTip = false;
Vue.use(VueToastr);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
