<template>
  <v-container>
    <!-- <v-row class="text-center">
      <v-col cols="12">
        <h1>Add Poop</h1>
        <v-btn color="green" @click="test">Print stuff</v-btn>
      </v-col>
    </v-row> -->
    <!-- <v-row>
      <v-col>
        <v-btn color="green" @click="addPoop">Add Poop!</v-btn>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <v-btn small color="brown" @click="showTimePicker = !showTimePicker"
          >Edit Time</v-btn
        >
        <v-time-picker
          v-if="showTimePicker"
          v-model="time"
          color="green lighten-1"
        ></v-time-picker>
      </v-col>
      <v-col>
        <h3>{{ timestamp.format("h:mma DD-MM-YY") }}</h3>
      </v-col>
      <v-col>
        <v-btn small color="brown" @click="showDatePicker = !showDatePicker"
          >Edit Date</v-btn
        >
        <v-date-picker
          v-if="showDatePicker"
          v-model="date"
          color="green lighten-1"
        ></v-date-picker>
      </v-col>
      <v-col>
        <v-btn color="green" @click="addPoop">Add Poop!</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-slider
              v-model="typeValue"
              step="1"
              ticks
              min="1"
              max="7"
              thumb-label="always"
              :tick-labels="tickLabels"
            ></v-slider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="notes" outlined></v-text-field>
      </v-col>
    </v-row>
    <h5>What did you eat?!</h5>
    <v-row>
      <v-col v-for="food in $store.state.filters.foods" :key="food.label">
        <v-checkbox
          v-model="food.value"
          :label="food.label"
          color="green darken-3"
          :value="food.value"
          hide-details
        ></v-checkbox>
      </v-col>
    </v-row>
    <h5>Do you feel like shit?</h5>
    <v-row>
      <v-col
        v-for="symptom in $store.state.filters.symptoms"
        :key="symptom.label"
      >
        <v-checkbox
          v-model="symptom.value"
          :label="symptom.label"
          color="orange darken-3"
          :value="symptom.value"
          hide-details
        ></v-checkbox>
      </v-col>
    </v-row>
    <h5>How's your brain?</h5>
    <v-row>
      <v-col v-for="mood in $store.state.filters.moods" :key="mood.label">
        <v-checkbox
          v-model="mood.value"
          :label="mood.label"
          color="blue darken-3"
          :value="mood.value"
          hide-details
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="green" @click="addPoop">Add Poop!</v-btn>
      </v-col>
    </v-row>
    <LoginModal />
    <!-- SNACKBAR NOTIFICATION -->
    <v-snackbar v-model="showSnackbar" timeout="1000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="showSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-btn @click="test">Test</v-btn>
  </v-container>
</template>

<script>
// import Vue from "vue";
import moment from "moment-timezone";
import { db } from "../firebase";
import LoginModal from "./LoginModal.vue";
import { mapState } from "vuex";
// import moment-timezone from 'moment-timezone'
// import New from '@/components/New.vue';

const now = moment();

export default {
  name: "AddEntry",
  components: {
    LoginModal
  },
  data: () => ({
    showSnackbar: false,
    snackbarText: "Thanks for pooping! 💩💩💩",
    timestamp: now,
    showTimePicker: false,
    time: now.format("hh:mm"),
    showDatePicker: false,
    date: now.format("YYYY-MM-DD"),
    typeValue: 4,
    tickLabels: ["🐇", "🌽", "🍆", "🐍", "☁", "🍦", "🌊"],
    notes: "",
    username: ""
  }),
  computed: {
    ...mapState(["filters"])
  },
  created() {
    const username = localStorage.getItem("poopAccount");
    this.username = username ? username : "";
    this.$store.state.username = username;
  },
  methods: {
    test() {
      this.$store.state.filters.foods.find(
        food => food.label === "Vegetarian"
      ).value = true;
      console.log(this.filters);
    },
    addPoop() {
      const timestamp = moment
        .tz(`${this.date} ${this.time}`, "Australia/Perth")
        .format();
      this.showSnackbar = true;

      const payload = {
        username: this.username,
        poop: {
          timestamp: timestamp,
          type: this.typeValue,
          notes: this.notes,
          foodNotes: this.$store.state.filters.foods,
          symptomNotes: this.$store.state.filters.symptoms,
          moods: this.$store.state.filters.moods
        }
      };
      this.$store.dispatch("sendPoop", payload);
    }
  }
};
</script>
