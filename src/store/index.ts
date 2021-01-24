import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    rawBankData: [],
    filters: {
      foods: [
        {
          label: "Vegetarian",
          value: false
        },
        {
          label: "High Meat",
          value: false
        },
        {
          label: "Intermittent Fast",
          value: false
        },
        {
          label: "Frequent Meals",
          value: false
        },
        {
          label: "Low Quality",
          value: false
        },
        {
          label: "Clean Food",
          value: false
        },
        {
          label: "Low FODMAP",
          value: false
        },
        {
          label: "High FODMAP",
          value: false
        },
        {
          label: "Low Volume",
          value: false
        },
        {
          label: "High Volume",
          value: false
        },
        {
          label: "High Gluten",
          value: false
        },
        {
          label: "Gluten-Free",
          value: false
        },
        {
          label: "High Dairy",
          value: false
        },
        {
          label: "Spicy Food",
          value: false
        },
        {
          label: "Known Intolerance",
          value: false
        }
      ],
      symptoms: [
        {
          label: "Stomach Ache",
          value: false
        },
        {
          label: "Indigestion",
          value: false
        },
        {
          label: "Bloated",
          value: false
        },
        {
          label: "Gassy",
          value: false
        },
        {
          label: "Pungent",
          value: false
        },
        {
          label: "Discoloured",
          value: false
        },
        {
          label: "Bloody",
          value: false
        },
        {
          label: "Painful",
          value: false
        },
        {
          label: "Spicy",
          value: false
        }
      ],
      moods: [
        {
          label: "Stressed",
          value: false
        },
        {
          label: "Anxious",
          value: false
        },
        {
          label: "Sad",
          value: false
        },
        {
          label: "Fatigued",
          value: false
        }
      ]
    }
  },
  mutations: {
    CLEAR_FILTERS(state, payload) {
      // for (const filterKey of Object.entries(state.filters)) {
      //   for (const subFilter of filter) {
      //     subFilter.value = false
      //   }
      // }
      for (const food of state.filters.foods) {
        food.value = false;
      }
      for (const symptoms of state.filters.symptoms) {
        symptoms.value = false;
      }
      for (const mood of state.filters.moods) {
        mood.value = false;
      }
    }
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
