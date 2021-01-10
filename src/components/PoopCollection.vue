<template>
  <v-container>
    <apexchart
      width="1000"
      type="heatmap"
      :options="mapOptions"
      :series="mapSeries"
    ></apexchart>

    <apexchart
      width="1000"
      type="bar"
      :options="chartOptions"
      :series="series"
      ref="demoChart"
    ></apexchart>

    <apexchart
      width="1000"
      type="donut"
      :options="donutOptions"
      :series="donutSeries"
    ></apexchart>

    <!-- <column-chart :data="rawBankData"></column-chart>
    <column-chart :data="barData"></column-chart> -->
    <v-btn @click="test" color="green">Test</v-btn>
  </v-container>
</template>

<script>
import { db } from "../firebase";
import moment from "moment";

export default {
  data: () => ({
    rawBankData: [],
    mapOptions: {
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: "PoopMap Chart (Single color)"
      }
    },
    mapSeries: [
      {
        name: "Monday",
        data: [
          {
            week: 0,
            x: "W1",
            y: 22,
            z: "1/1/1"
          },
          {
            week: 1,
            x: "W2",
            y: 29,
            z: "1/1/1"
          }
        ]
      },
      {
        name: "Tuesday",
        data: [
          {
            week: 0,
            x: "W1",
            y: 43,
            z: "1/1/1"
          },
          {
            week: 2,
            x: "W2",
            y: 43,
            z: "1/1/1"
          }
        ]
      }
    ],
    chartOptions: {
      chart: {
        id: "time-series"
      },
      xaxis: {
        type: "category"
      }
    },
    donutOptions: {
      plotOptions: {
        pie: {
          customScale: 0.8,
          donut: {
            size: "25%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "32px"
              },
              value: {
                show: true,
                fontSize: "32px"
              }
            }
          }
        }
      },
      chart: {
        type: "donut"
      },
      labels: [
        "Type 1",
        "Type 2",
        "Type 3",
        "Type 4",
        "Type 5",
        "Type 6",
        "Type 7"
      ]
      // total: {
      //     show: true,
      //     showAlways: true,
      //     label: 'Total',
      //     fontSize: '32px',
      // }
    },
    series: [
      {
        data: []
      }
    ],
    donutSeries: [0, 0, 0, 0, 0, 0, 0]
  }),
  computed: {},
  methods: {
    test() {
      console.log("meow");
    }
  },
  created() {
    const username = localStorage.getItem("poopAccount");
    db.collection(username)
      .get()
      .then(querySnapshot => {
        const output = [];
        const pieOutput = [0, 0, 0, 0, 0, 0, 0];
        const mapOutput = [
          {
            name: "Monday",
            data: []
          },
          {
            name: "Tuesday",
            data: []
          },
          {
            name: "Wednesday",
            data: []
          },
          {
            name: "Thursday",
            data: []
          },
          {
            name: "Friday",
            data: []
          },
          {
            name: "Saturday",
            data: []
          },
          {
            name: "Sunday",
            data: []
          }
        ];
        querySnapshot.forEach(doc => {
          const poop = doc.data();
          const poopTimeStamp = moment(poop.timestamp);
          this.rawBankData.push(poop);

          const poopDate = poopTimeStamp.format("DD/MM/YYYY");
          const poopUnix = poopTimeStamp.format("x");
          const foundPoop = output.find(poop => poop.x === poopDate);
          const poopType = poop.type - 1;

          pieOutput[poopType]++;

          const poopDay = poopTimeStamp.weekday(); //sunday === 0
          const poopWeek = poopTimeStamp.week(); //week from 1st of Jan

          const foundMapPoop = mapOutput.find(
            day => day.name === poopTimeStamp.format("dddd")
          );
          const foundPoopWeek = foundMapPoop.data.find(
            week => week.x === `W${poopWeek}`
          );
          console.log({ foundPoopWeek });
          if (!foundPoopWeek) {
            foundMapPoop.data.push({
              x: `W${poopWeek}`,
              y: 1
            });
            console.log(foundMapPoop);
          } else {
            foundPoopWeek.y++;
          }

          this.mapSeries = mapOutput;

          if (!foundPoop) {
            output.push({
              x: poopDate,
              y: 1,
              z: poopUnix
            });
          } else {
            foundPoop.y++;
          }
        });

        this.donutSeries = pieOutput;
        output.sort((a, b) => parseInt(a.z) - parseInt(b.z));
        // output.sort()
        console.log("sorted output", output);
        this.series = [
          {
            data: output
          }
        ];
        this.poopData = output;
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }
};
</script>
