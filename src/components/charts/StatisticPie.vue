<template>
  <div class="chart-container">
    <div class="overlay" v-if="overlay">
      <div class="text-h3 text-center text-weight-bold">{{overlay.title}}</div>
      <div class="text-h5 text-center" :class="[overlay.textClass]">{{overlay.text}}</div>
    </div>
    <canvas class="chart" :id="_uid"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlay: null,
      chartOptions: {
        type: "doughnut",
        data: {
          datasets: [],
          labels: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 65,
          legend: {
            display: false,
            labels: {
              fontColor: "white"
            }
            // onClick: function(e, legendItem) {
            //   const visibleLegend = this.chart.legend.legendItems.find(
            //     e => !e.hidden && e.index !== legendItem.index
            //   );

            //   if (visibleLegend) {
            //     var index = legendItem.index;
            //     var chart = this.chart;
            //     var i, ilen, meta;

            //     for (
            //       i = 0, ilen = (chart.data.datasets || []).length;
            //       i < ilen;
            //       ++i
            //     ) {
            //       meta = chart.getDatasetMeta(i);
            //       // toggle visibility of index if exists
            //       if (meta.data[index]) {
            //         meta.data[index].hidden = !meta.data[index].hidden;
            //       }
            //     }

            //     chart.update();
            //   }
            // }
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                return (
                  `${data.labels[tooltipItem.index]}: ` +
                  this.$options.filters.formatNumberDot(
                    data.datasets[0].data[tooltipItem.index]
                  )
                );
              }
            }
          }
        }
      }
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
      validator: config =>
        ["data", "labels", "overlay"].every(key => key in config)
    }
  },
  mounted() {
    const ctx = document.getElementById(this._uid).getContext("2d");
    this.chart = new Chart(ctx, this.chartOptions);

    this.parseData(this.data);
  },
  methods: {
    parseData(data) {
      if (!data) {
        return;
      }

      this.chartOptions.data.datasets = [data.data];
      this.chartOptions.data.labels = data.labels;
      this.overlay = data.overlay;

      this.chart.update();
      window.test = this.chart;
    }
  },
  watch: {
    data(newVal) {
      this.parseData(newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  width: 100%;
  min-height: 300px;
  position: relative;
}

.overlay {
  pointer-events: none;
  max-width: 180px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.chart {
  z-index: 1;
}
</style>