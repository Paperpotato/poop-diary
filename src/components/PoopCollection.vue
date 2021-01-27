<template>
  <v-container>
    <template>
      <v-data-table
        dense
        :headers="poopTableHeaders"
        :items="poopTableData"
        item-key="name"
        class="elevation-1"
      ></v-data-table>
    </template>

    <apexchart
      width="1000"
      type="heatmap"
      :options="mapOptions"
      :series="mapSeries"
    ></apexchart>

    <apexchart
      width="1000"
      type="bar"
      :options="rawTypeOptions"
      :series="rawTypeSeries"
    ></apexchart>

    <apexchart
      width="1000"
      type="bar"
      :options="filteredOptions"
      :series="filteredSeries"
    ></apexchart>

    <template>
      <v-row justify="center">
        <v-dialog v-model="filterModal" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Select Filters
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Select filters</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row
                  v-for="(filter, index) in $store.state.filters"
                  :key="index"
                >
                  <v-col>
                    <v-row>
                      <v-col>
                        <h2>
                          {{ index.charAt(0).toUpperCase() + index.slice(1) }}
                        </h2>
                      </v-col>
                    </v-row>
                    <v-row v-for="subFilter in filter" :key="subFilter.label">
                      <v-col>
                        <v-checkbox
                          v-model="subFilter.value"
                          :label="`${subFilter.label}`"
                          color="brown darken-3"
                          :value="`${subFilter.value}`"
                          hide-details
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="filterModal = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="filterPoops">
                Filter poops
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <apexchart
      width="1000"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>

    <apexchart
      width="1000"
      type="donut"
      :options="donutOptions"
      :series="donutSeries"
    ></apexchart>

    <v-btn @click="test" color="green">Test</v-btn>
  </v-container>
</template>

<script>
import { db } from "../firebase";
import moment from "moment";
import Chart from "chart.js";

export default {
  data: () => ({
    filterModal: false,
    rawBankData: [],
    typeLabels: [
      "Type 1",
      "Type 2",
      "Type 3",
      "Type 4",
      "Type 5",
      "Type 6",
      "Type 7"
    ],
    poopTableData: [
      {
        label: "Gross Average",
        average: 0,
        total: 0,
        "Type 1": 0,
        "Type 2": 0,
        "Type 3": 0,
        "Type 4": 0,
        "Type 5": 0,
        "Type 6": 0,
        "Type 7": 0
      }
    ],
    poopTableHeaders: [
      {
        text: "Poop Notes",
        align: "start",
        sortable: false,
        value: "label"
      },
      { text: "Average", value: "average" },
      { text: "Total", value: "total" },
      { text: "Type 1", value: "Type 1" },
      { text: "Type 2", value: "Type 2" },
      { text: "Type 3", value: "Type 3" },
      { text: "Type 4", value: "Type 4" },
      { text: "Type 5", value: "Type 5" },
      { text: "Type 6", value: "Type 6" },
      { text: "Type 7", value: "Type 7" }
    ],
    totalRawPoops: 0,
    rawTypeOptions: {
      chart: {
        id: "raw-series"
      },
      xaxis: {
        type: "category"
      },
      colors: ["#F44336"]
    },
    rawTypeSeries: [
      {
        data: []
      }
    ],
    filteredOptions: {
      chart: {
        id: "filtered-series"
      },
      xaxis: {
        type: "category"
      },
      colors: ["#228B22"]
    },
    filteredSeries: [
      {
        data: []
      }
    ],
    mapOptions: {
      plotOptions: {
        heatmap: {
          radius: 5,
          height: 100
        }
      },
      chart: {
        type: "heatmap"
      },
      dataLabels: {
        enabled: true
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
    },
    series: [
      {
        data: []
      }
    ],
    donutSeries: [0, 0, 0, 0, 0, 0, 0],
    filtersParams: []
  }),
  computed: {},
  methods: {
    test() {
      console.log("meow");
    },
    flattenNotes(poop) {
      const notes = Object.values(poop.foodNotes).concat(
        Object.values(poop.symptomNotes),
        Object.values(poop.moods)
      );

      return Object.values(notes.filter(note => note.value)).map(
        note => note.label
      );
    },
    createFilters() {
      console.log("populate filteredSeries with with filtered data");
      for (const type of this.filteredSeries) {
        type.data.y = 0;
      }
      for (const poop of this.rawBankData) {
        console.log("meow");
      }
    },
    filterPoops() {
      this.filterModal = false;
      const stateFilters = this.$store.state.filters;
      const filtersMerged = [].concat(
        ...Object.values(this.$store.state.filters)
      );
      const filteredKeys = filtersMerged
        .filter(filter => filter.value)
        .map(filter => filter.label);

      this.filteredData = this.rawBankData.filter(poop => {
        const positiveNoteArray = this.flattenNotes(poop);
        return positiveNoteArray.some(noteLabel => {
          return filteredKeys.indexOf(noteLabel) > -1;
        });
      });

      //INITIALISE OUTPUT
      const filteredOutput = this.typeLabels.map(type => {
        return {
          x: type,
          y: 0
        };
      });

      this.filteredData.forEach(poop => {
        filteredOutput.find(type => type.x === `Type ${poop.type}`).y++;
      });

      const totalFilteredPoops = filteredOutput
        .map(poop => poop.y)
        .reduce((a, b) => a + b, 0);

      filteredOutput.forEach(poop => {
        poop.y = Math.floor((poop.y / totalFilteredPoops) * 100);
      });

      this.filteredSeries = [
        {
          data: filteredOutput
        }
      ];
    }
  },
  created() {
    const username = localStorage.getItem("poopAccount");
    db.collection(username)
      .get()
      .then(querySnapshot => {
        //INITIALISE OUTPUTS
        const output = [];
        const pieOutput = [0, 0, 0, 0, 0, 0, 0];
        const rawTypeOutput = this.typeLabels.map(type => {
          return {
            x: type,
            y: 0
          };
        });
        const mapOutput = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ].map(day => {
          const dayObject = {
            name: day,
            data: []
          };
          for (let i = 1; i < 53; i++) {
            dayObject.data.push({
              x: `W${i}`,
              y: 0
            });
          }
          return dayObject;
        });

        this.totalRawPoops = querySnapshot.length;

        querySnapshot.forEach(doc => {
          const poop = doc.data();
          const poopTimeStamp = moment(poop.timestamp);
          this.rawBankData.push(poop);

          const poopDate = poopTimeStamp.format("DD/MM/YYYY");
          // const poopUnix = poopTimeStamp.format("x");
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

          if (!foundPoopWeek) {
            foundMapPoop.data.push({
              x: `W${poopWeek}`,
              y: 1
            });
          } else {
            foundPoopWeek.y++;
          }

          if (!foundPoop) {
            output.push({
              x: poopDate,
              y: 1
            });
          } else {
            foundPoop.y++;
          }
        });

        //POPULATES DATA FOR DEFAULT TYPES IN BAR FORMAT
        this.rawBankData.forEach(poop => {
          rawTypeOutput.find(type => type.x === `Type ${poop.type}`).y++;
        });

        const totalRawPoops = this.rawBankData.length;

        rawTypeOutput.forEach(poop => {
          poop.y = Math.floor((poop.y / totalRawPoops) * 100);
        });

        this.rawTypeSeries = [
          {
            data: rawTypeOutput
          }
        ];

        const notesList = []
          .concat(...Object.values(this.$store.state.filters))
          .map(filter => filter.label);
        //INITIALISE TABLE
        notesList.forEach(note => {
          this.poopTableData.push({
            label: note,
            average: 0,
            total: 0,
            "Type 1": 0,
            "Type 2": 0,
            "Type 3": 0,
            "Type 4": 0,
            "Type 5": 0,
            "Type 6": 0,
            "Type 7": 0
          });
        });

        //POPULATE POOPTABLE DATA
        this.rawBankData.forEach(poop => {
          console.log("meow");
          const positiveNotes = this.flattenNotes(poop);
          const apportionedPositiveNote = parseFloat(
            (1 / positiveNotes.length).toPrecision(3)
          );

          this.poopTableData.forEach(tableEntry => {
            if (positiveNotes.includes(tableEntry.label)) {
              tableEntry[`Type ${poop.type}`] += apportionedPositiveNote;
              tableEntry.total += apportionedPositiveNote;
            }
          });
        });

        this.rawBankData.forEach(poop => {
          this.poopTableData[0][`Type ${poop.type}`]++;
          this.poopTableData[0].total++;
        });

        this.poopTableData.forEach(tableEntry => {
          const type2 = tableEntry["Type 2"] * 2;
          const typeArray = Object.keys(tableEntry).filter(key =>
            key.match(/\d/)
          );
          console.log(tableEntry.label);
          let grossType = 0;
          for (let i = 0; i < typeArray.length; i++) {
            console.log(tableEntry[typeArray[i]]);
            grossType += tableEntry[typeArray[i]] * (i + 1);
          }

          tableEntry.average = grossType
            ? (grossType / tableEntry.total).toFixed(1)
            : "No Data";
        });

        //POPULATE HEATMAP DATA
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
