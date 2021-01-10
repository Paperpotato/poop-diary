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
      colors: ["#964B00"],
      title: {
        text: "PoopMap Chart (Single color)"
      }
    },
    mapSeries: [],
    chartOptions: {
      chart: {
        id: "time-series"
      },
      xaxis: {
        type: "category"
      },
      colors: ["#964B00"]
    },
    donutOptions: {
      colors: [
        "#bc8f8f",
        "#f4a460",
        "#d2691e",
        "#a0522d",
        "#ffdead",
        "#ffe4c4",
        "#fff8e7"
      ],
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
            data: [
              {
                x: "Week 1",
                y: 0
              }
            ]
          },
          {
            name: "Tuesday",
            data: [
              {
                x: "Week 1",
                y: 0
              }
            ]
          },
          {
            name: "Wednesday",
            data: [
              {
                x: "Week 1",
                y: 0
              }
            ]
          },
          {
            name: "Thursday",
            data: [
              {
                x: "Week 1",
                y: 0
              }
            ]
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
            week => week.x === `Week ${poopWeek}`
          );

          if (!foundPoopWeek) {
            foundMapPoop.data.push({
              x: `Week ${poopWeek}`,
              y: 1
              // z: poopDate
            });
          } else {
            foundPoopWeek.y++;
          }

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

        // mapOutput.find(day => day.name === 'Saturday').data.push({
        //     x: `Week 5`,
        //     y: 1
        //   });
        console.log({ mapOutput });
        mapOutput.forEach(day => day.data.sort((a, b) => a.x < b.x));
        this.mapSeries = mapOutput;

        this.donutSeries = pieOutput;
        output.sort((a, b) => parseInt(a.z) - parseInt(b.z));
        // output.sort()
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
