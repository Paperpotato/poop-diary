<template>
  <v-container>
    <apexchart
      width="1000"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>

    <column-chart :data="rawBankData"></column-chart>
    <column-chart :data="barData"></column-chart>
    <v-btn @click="test" color="green">Test</v-btn>
  </v-container>
</template>

<script>
import { db } from "../firebase";
import moment from "moment";
// import apexchart from 'apexcharts'

export default {
  // components: {
  //   apexchart
  // },
  data: () => ({
    barData: [
      ["Sun", 32, 10],
      ["Mon", 46, 99],
      ["Tue", 28, 50]
    ],
    rawBankData: [],
    dataByDate: [],
    //apexchart data
    chartOptions: {
      chart: {
        id: "time-series"
      },
      xaxis: {
        // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        type: "category"
      }
    },
    series: [
      {
        // name: "test1",
        data: []
      }
    ]
  }),
  computed: {
    // series() {
    //   return [
    //     {
    //       name: "series-1",
    //       data: [30, 40, 35, 50, 49, 60, 70, 100]
    //     },
    //     {
    //       name: "series-2",
    //       data: [30, 40, 35, 50, 49, 60, 70, 100]
    //     }
    //   ]
    // }
  },
  methods: {
    test() {
      // console.log(this.rawBankData);
      // this.rawBankData.forEach(poop => {
      //   console.log(poop);
      // });
      console.log(this.series);
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
          const poopUnix = moment(docData.timestamp).format("x");
          const poopExists = output.find(poop => poop.x === poopDate);
          if (!poopExists) {
            output.push({
              x: poopDate,
              y: 1
            });
          } else {
            poopExists.y++;
            // poopExists[2] = poopUnix;
          }
        });
        output.sort();
        this.series[0].data = output;
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    // console.log(await this.rawBankData)
  }
};
</script>
