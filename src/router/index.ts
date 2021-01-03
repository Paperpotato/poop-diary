import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Bank from "../views/Bank.vue";
import PoopCollection from "@/components/PoopCollection.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/poopbank",
    name: "PoopCollection",
    component: PoopCollection
  },
  {
    path: "/bank",
    name: "Bank",
    component: Bank
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import("../views/Bank.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
