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
        <v-btn color="brown" @click="showTimePicker = !showTimePicker"
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
        <v-btn color="brown" @click="showDatePicker = !showDatePicker"
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
              label="Poop type"
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
      <v-col v-for="food in foods" :key="food.label">
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
      <v-col v-for="symptom in symptoms" :key="symptom.label">
        <v-checkbox
          v-model="symptom.value"
          :label="symptom.label"
          color="orange darken-3"
          :value="symptom.value"
          hide-details
        ></v-checkbox>
      </v-col>
    </v-row>
    <h5>How're you actually feeling?</h5>
    <v-row>
      <v-col v-for="mood in moods" :key="mood.label">
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
    <v-snackbar v-model="snackbarText" timeout="1000">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="showSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
// import Vue from "vue";
import moment from "moment-timezone";
import { db } from "../firebase";
import LoginModal from "./LoginModal.vue";
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
    foods: [
      {
        label: "Intermittent Fast",
        value: false
      },
      {
        label: "Low Quality",
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
        label: "Gluten",
        value: false
      },
      {
        label: "Dairy",
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
        label: "Slow",
        value: false
      },
      {
        label: "Fast",
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
      }
    ],
    username: ""
  }),
  computed: {
    // username() {
    //   return localStorage.getItem("poopAccount");
    // }
  },
  created() {
    const username = localStorage.getItem("poopAccount");
    this.username = username ? username : "";
    this.$store.state.username = username;
    // console.log(this.username)
  },
  methods: {
    test() {
      console.log(localStorage.getItem("poopAccount"));
      this.$router.push("/bank");
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
          foodNotes: this.foods,
          symptomNotes: this.symptoms,
          moods: this.moods
        }
      };
      this.$store.dispatch("sendPoop", payload);
    }
  }
};
</script>
