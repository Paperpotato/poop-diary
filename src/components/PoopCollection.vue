<template>
  <v-container>
    <column-chart :data="rawBankData"></column-chart>
    <v-btn @click="test" color="green">Test</v-btn>
  </v-container>
</template>

<script>
import { db } from "../firebase";
import moment from "moment";

export default {
  data: () => ({
    barData: [
      ["Sun", 32],
      ["Mon", 46],
      ["Tue", 28]
    ],
    rawBankData: [],
    dataByDate: []
  }),
  computed: {},
  methods: {
    test() {
      console.log(this.rawBankData);
      this.rawBankData.forEach(poop => {
        console.log(poop);
      });
    }
  },
  created() {
    const username = localStorage.getItem("poopAccount");
    db.collection(username)
      .get()
      .then(querySnapshot => {
        const output = [];
        querySnapshot.forEach(doc => {
          const docData = doc.data();
          this.rawBankData.push(docData);

          const poopDate = moment(docData.timestamp).format("DD-MMM");
          const poopExists = output.find(poop => poop[0] === poopDate);
          if (!poopExists) {
            output.push([poopDate, 1]);
          } else {
            output.find(poop => poop[0] === poopDate)[1]++;
          }
        });
        this.rawBankData = output;
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    // console.log(await this.rawBankData)
  }
};
</script>
