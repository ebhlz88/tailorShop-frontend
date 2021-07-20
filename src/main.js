import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";

import "bootstrap";
import "./assets/app.scss";

import table from "./components/table.vue";
import home from "./components/home.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: home },
  { path: "/table", component: table },
];

const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
