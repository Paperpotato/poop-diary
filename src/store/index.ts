import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    rawBankData: []
  },
  mutations: {
    // SET_USER() {
    //   const username = localStorage.getItem("poopAccount");
    //   this.username = localStorage.getItem('poopAccount') ? localStorage.getItem('poopAccount') : ''
    // }
  },
  actions: {
    sendPoop(context, payload) {
      db.collection(payload.username)
        .add(payload.poop)
        .then(() => console.log("Poop saved!"));
    }
  },
  modules: {}
});
