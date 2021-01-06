<template>
  <v-container>
    <apexchart
      width="1000"
      type="bar"
      :options="chartOptions"
      :series="series"
      ref="demoChart"
    ></apexchart>

    <!-- <column-chart :data="rawBankData"></column-chart>
    <column-chart :data="barData"></column-chart> -->
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
    // barData: [
    //   ["Sun", 32, 10],
    //   ["Mon", 46, 99],
    //   ["Tue", 28, 50]
    // ],
    rawBankData: [],
    // dataByDate: [],
    //apexchart data
    chartOptions: {
      chart: {
        id: "time-series"
      },
      xaxis: {
        type: "category"
      }
    },
    series: [
      {
        // data: [{x: 'meow', y: 2}]
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
      console.log("meow");
      // this.series[0].data = {
      //   x: 'cheese',
      //   y: 20
      // }
    }
  },
  created() {
    const username = localStorage.getItem("poopAccount");
    db.collection(username)
      .get()
      .then(querySnapshot => {
        const output = [];
        const test = [];
        querySnapshot.forEach(doc => {
          const docData = doc.data();
          this.rawBankData.push(docData);

          const poopDate = moment(docData.timestamp).format("DD/MM/YYYY");
          const poopUnix = moment(docData.timestamp).format("x");
          const foundPoop = output.find(poop => poop.x === poopDate);

          if (!foundPoop) {
            output.push({
              x: poopDate,
              y: 1,
              z: poopUnix
            });
            test.push(poopUnix);
          } else {
            foundPoop.y++;
            // poopExists[2] = poopUnix;
          }
        });

        test.sort();
        console.log(test);
        // output.sort(function(a, b) { return a.poopUnix > b.poopUnix ? 1 : -1})
        output.sort((a, b) => a.poopUnix - b.poopUnix);
        // output.sort()
        console.log("sorted output", output);
        this.series = [
          {
            data: output
          }
        ];
        // this.series[0].data = output;
        this.poopData = output;
        console.log(this.series);
        console.log(this.poopData);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    // console.log(await this.rawBankData)
  }
};
</script>
