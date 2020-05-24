<template>
  <div class="chart-container">
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: null,
      chartOptions: {
        type: "LineWithLine",
        data: {
          datasets: [
            {
              label: this.$t("deaths"),
              data: [],
              backgroundColor: "rgba(229, 57, 53,0.2)", // red7
              borderColor: "rgb(229, 57, 53)"
            },
            {
              label: this.$t("actives"),
              data: [],
              backgroundColor: "rgba(251, 192, 45,0.2)", // yellow7
              borderColor: "rgb(251, 192, 45)"
            },

            {
              label: this.$t("recovered"),
              data: [],
              backgroundColor: "rgba(56, 142, 60,0.2)", // green7
              borderColor: "rgb(56, 142, 60)"
            },
            {
              label: this.$t("confirmed"),
              data: [],
              backgroundColor: "rgba(22, 106, 189,0.2)", // blue7
              borderColor: "rgb(22, 106, 189)"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontColor: "white"
            },
            reverse: true
          },
          hover: {
            intersect: false
          },
          tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: (tooltipItem, data) => {
                return (
                  `${data.datasets[tooltipItem.datasetIndex].label}: ` +
                  this.$options.filters.formatIntDot(tooltipItem.yLabel)
                );
              }
            }
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  tooltipFormat: "DD-MM-YYYY",
                  unit: "day"
                },
                ticks: {
                  fontColor: "white"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "white",
                  callback: (label, index, labels) => {
                    let numeral = this.$options.filters.numeral(label, "0.00a");
                    const letter = numeral.substr(-1);
                    return parseFloat(numeral) + letter;
                  }
                }
              }
            ]
          }
        }
      }
    };
  },
  props: ["data"],
  methods: {
    parseData(response) {
      if (!response) {
        return;
      }
      let data = response.timeline;

      for (const key in data.cases) {
        // Deaths
        this.chartOptions.data.datasets[0].data.push({
          x: moment(key, "M/D/YY"),
          y: data.deaths[key]
        });

        // Actives
        this.chartOptions.data.datasets[1].data.push({
          x: moment(key, "M/D/YY"),
          y: data.cases[key] - data.deaths[key] - data.recovered[key]
        });

        // Recovereds
        this.chartOptions.data.datasets[2].data.push({
          x: moment(key, "M/D/YY"),
          y: data.recovered[key]
        });

        // Cases
        this.chartOptions.data.datasets[3].data.push({
          x: moment(key, "M/D/YY"),
          y: data.cases[key]
        });
      }

      this.chart.update();
      this.dataLoaded = true;
    }
  },
  mounted() {
    const ctx = document.getElementById("chart").getContext("2d");
    this.chart = new Chart(ctx, this.chartOptions);

    this.parseData(this.data);
  },
  watch: {
    data(newVal) {
      this.parseData(newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>