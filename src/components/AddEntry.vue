<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Add Poop</h1>
        <v-btn color="green" @click="test">Print stuff</v-btn>
      </v-col>
    </v-row>
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
        <v-card>
          <v-card-text>
            <v-text-field label="notes" outlined></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
        <v-btn color="brown" @click="addPoop">Add Poop!</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment-timezone";
import { dbPoopBank } from "../firebase";
// import moment-timezone from 'moment-timezone'
// import New from '@/components/New.vue';

const now = moment();

export default Vue.extend({
  name: "AddEntry",

  data: () => ({
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
    ]
  }),
  computed: {},
  methods: {
    test() {
      console.log("meow");
    },
    addPoop() {
      const timestamp = moment
        .tz(`${this.date} ${this.time}`, "Australia/Perth")
        .format();

      dbPoopBank
        .add({
          timestamp: timestamp,
          type: this.typeValue,
          notes: this.notes,
          foodNotes: this.foods,
          symptomNotes: this.symptoms,
          moods: this.moods
        })
        .then(() => console.log("Poop saved!"));
    }
  }
});
</script>
