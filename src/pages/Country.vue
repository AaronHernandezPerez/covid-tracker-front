<template>
  <q-page padding>
    <div class="text-h4">{{$t('timeline')}}</div>
    <q-card flat class="my-card">
      <q-card-section class="chart-container text-blue">
        <canvas id="chart"></canvas>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  // xdd {{ $route.params.id }}
  data() {
    return {
      dataLoaded: false,
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
            }
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
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
                  callback: function(label, index, labels) {
                    return label / 1000 + "k";
                  }
                }
              }
            ]
          }
        }
      }
    };
  },
  created() {
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
      draw: function(ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          var activePoint = this.chart.tooltip._active[0],
            ctx = this.chart.ctx,
            x = activePoint.tooltipPosition().x,
            topY = this.chart.legend.bottom,
            bottomY = this.chart.chartArea.bottom;

          // draw line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#1976D2";
          ctx.stroke();
          ctx.restore();
        }
      }
    });
  },
  mounted() {
    const apiUrl = "https://disease.sh/v2/historical/";
    const now = moment();
    const diffDays = now.diff(moment("01-01-2020", "DD-MM-YYYY"), "days");
    console.log(diffDays);
    const ctx = document.getElementById("chart").getContext("2d");
    this.chart = new Chart(ctx, this.chartOptions);
    console.log(ctx, this.chart);

    axios
      .get(apiUrl + this.$route.params.id, {
        params: {
          lastdays: diffDays
        }
      })
      .then(response => {
        let data = response.data.timeline;

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
      });
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  min-height: 500px;
}
</style>