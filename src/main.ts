import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import Chartkick from "vue-chartkick";
import Chart from "chart.js";

import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

Vue.use(Chartkick.use(Chart));

// import VCharts from 'v-charts'

// Vue.use(VCharts)

require("dotenv").config();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
