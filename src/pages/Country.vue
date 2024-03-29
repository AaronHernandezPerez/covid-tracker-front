<template>
  <q-page padding>
    <h1 v-if="countryName" class="text-center q-mb-md text-h2">
      <gb-flag class="c-flag q-mr-sm" :code="$route.params.id" />
      {{countryName}}
    </h1>
    <div class>
      <div v-if="countryData" class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-sm-6 col-md-4 col-lg">
          <q-badge align="middle" color="blue-7 full-width">
            <div
              class="text-h6 text-center full-width"
            >{{$t('confirmed')}}: {{countryData.cases | filterFunc(formatOrUnknown)}}</div>
          </q-badge>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg">
          <q-badge align="middle" color="red-7 full-width">
            <div
              class="text-h6 text-center full-width"
            >{{$t('deaths')}}: {{countryData.deaths | filterFunc(formatOrUnknown)}}</div>
          </q-badge>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg">
          <q-badge align="middle" color="orange-7 full-width">
            <div
              class="text-h6 text-center full-width"
            >{{$t('critical')}}: {{countryData.critical | filterFunc(formatOrUnknown)}}</div>
          </q-badge>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg">
          <q-badge align="middle" color="yellow-7 text-black full-width">
            <div
              class="text-h6 text-center full-width"
            >{{$t('actives')}}: {{countryData.active | filterFunc(formatOrUnknown)}}</div>
          </q-badge>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg">
          <q-badge align="middle" color="green-7 full-width">
            <div
              class="text-h6 text-center full-width"
            >{{$t('recovered')}}: {{countryData.recovered | filterFunc(formatOrUnknown)}}</div>
            {{countryData.recovered}}
          </q-badge>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg">
          <q-badge align="middle" color="cyan full-width">
            <div
              class="text-h6 text-center full-width"
            >{{$t('tests')}}: {{countryData.tests | filterFunc(formatOrUnknown)}}</div>
          </q-badge>
        </div>
      </div>
    </div>

    <div class="text-h4 q-mb-sm">
      <q-icon name="far fa-chart-bar text-blue-7" />
      {{$t('timeline')}}
    </div>
    <q-card flat class="my-card q-mb-xl">
      <q-card-section>
        <CountryLine v-if="lineData" :data="lineData" />
        <div
          v-else
          class="flex items-center justify-center q-pa-lg"
          style="font-size: 10em; height:500px"
        >
          <q-spinner-audio color="blue-7" />
        </div>
      </q-card-section>
    </q-card>

    <div class="text-h4 q-mb-sm">
      <q-icon name="fas fa-chart-pie text-red-7" />
      {{$t('statistics')}}
    </div>
    <q-card flat class="my-card q-mb-xl">
      <q-card-section>
        <div v-if="pieData" class="row q-gutter-lg">
          <div class="col-12 col-md column align-around justify-center">
            <div class="text-h4 text-center q-mb-sm">{{$t("confirmed")}} / {{$t("deaths")}}</div>
            <StatisticPie :data="deathRatio" />
          </div>
          <div class="col-12 col-md column align-around justify-center">
            <div class="text-h4 text-center q-mb-sm">{{$t("confirmed")}} / {{$t("recovered")}}</div>
            <StatisticPie :data="recoveredRatio" />
          </div>
          <div class="col-12 col-md column align-around justify-center">
            <div class="text-h4 text-center q-mb-sm">{{$t("perMillion") | capitalize}}</div>
            <StatisticPie :data="perMillionRatio" />
          </div>
        </div>
        <div v-else class="flex items-center justify-center q-pa-lg" style="font-size: 10em">
          <q-spinner-pie color="red-7" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import moment from "moment";

import { mapState } from "vuex";

import CountryLine from "src/components/charts/CountryLine";
import StatisticPie from "src/components/charts/StatisticPie";

export default {
  data() {
    return {
      countryName: null,
      countryData: null,
      lineData: null,
      pieData: null,
      deathRatio: null
    };
  },
  methods: {
    findCountry() {
      if (!this.countries) {
        return this.toHome();
      }

      this.countryName = this.$options.filters.translateCountry2(
        this.$route.params.id
      );

      this.countryData = this.countries.find(
        e => e.countryInfo.iso2 === this.$route.params.id.toLowerCase()
      );

      if (!this.countryName || !this.countryData) {
        return this.toHome();
      }

      // Line chart
      const diffDays = moment().diff(
        moment("01-01-2020", "DD-MM-YYYY"),
        "days"
      );
      axios
        .get("https://disease.sh/v2/historical/" + this.$route.params.id, {
          params: {
            lastdays: diffDays
          }
        })
        .then(response => {
          this.lineData = response.data;
        })
        .catch(error => {
          console.error("No timeline");
        });

      /* Pie statistics */

      // DeathRatio statistic
      this.deathRatio = {
        data: {
          label: "deathRatio",
          data: [this.countryData.cases, this.countryData.deaths],
          backgroundColor: [
            "rgba(22, 106, 189, 0.8)",
            "rgba(229, 57, 53, 0.8)"
          ],
          borderColor: ["rgb(22, 106, 189)", "rgb(229, 57, 53)"]
        },
        labels: [this.$t("confirmed"), this.$t("deaths")],
        overlay: {
          title: (
            ((this.countryData.deaths * 100) / this.countryData.cases).toFixed(
              2
            ) + "%"
          ).replace(".", ","),
          text: this.$t("mortality")
        }
      };

      this.recoveredRatio = {
        data: {
          label: "recoveredRatio",
          data: [this.countryData.cases, this.countryData.recovered],
          backgroundColor: [
            "rgba(22, 106, 189, 0.8)",
            "rgba(56, 142, 60, 0.8)"
          ],
          borderColor: ["rgb(22, 106, 189)", "rgb(56, 142, 60)"]
        },
        labels: [this.$t("confirmed"), this.$t("recovered")],
        overlay: {
          title: (
            (
              (this.countryData.recovered * 100) /
              this.countryData.cases
            ).toFixed(2) + "%"
          ).replace(".", ","),
          text: this.$t("healed")
        }
      };

      this.perMillionRatio = {
        data: {
          label: "perMillionRatio",
          data: [
            this.countryData.casesPerOneMillion,
            this.countryData.deathsPerOneMillion,
            this.countryData.criticalPerOneMillion,
            this.countryData.activePerOneMillion,
            this.countryData.recoveredPerOneMillion
          ],
          backgroundColor: [
            "rgba(22, 106, 189, 0.8)",
            "rgba(229, 57, 53,0.8)",
            "rgba(251, 140, 0, 0.8)",
            "rgba(251, 192, 45,0.8)",
            "rgba(56, 142, 60, 0.8)"
          ],
          borderColor: [
            "rgb(22, 106, 189)",
            "rgb(229, 57, 53)",
            "rgb(251, 140, 0)",
            "rgb(251, 192, 45)",
            "rgb(56, 142, 60)"
          ]
        },
        labels: [
          `${this.$t("confirmed")} ${this.$t("perMillion")}`,
          `${this.$t("deaths")} ${this.$t("perMillion")}`,
          `${this.$t("critical")} ${this.$t("perMillion")}`,
          `${this.$t("actives")} ${this.$t("perMillion")}`,
          `${this.$t("recovered")} ${this.$t("perMillion")}`
        ],
        overlay: {
          title: (
            (
              (this.countryData.cases * 100) /
              this.countryData.population
            ).toFixed(2) + "%"
          ).replace(".", ","),
          text: this.$t("percentagePopulation"),
          textClass: "text-h6"
        }
      };

      this.pieData = true;
    },
    toHome() {
      this.$destroy();
      this.$router.replace("/");
    },
    formatOrUnknown(val) {
      if (!val) {
        return this.$t("unknown");
      }

      return this.$options.filters.formatNumberDot(val);
    }
  },
  computed: {
    ...mapState("novelCOVID", ["countries"])
  },
  mounted() {
    if (this.countries) {
      this.findCountry();
    }
  },
  watch: {
    countries(newVal) {
      this.findCountry();
    },
    $route(to, from) {
      this.findCountry();
    }
  },
  components: {
    CountryLine,
    StatisticPie
  },
  metaInfo() {
    return {
      title: this.countryName,
      titleTemplate: "%s | Status Covid"
    };
  }
};
</script>

<style lang="scss" scoped>
.c-flag {
  height: 64px;
  vertical-align: sub;
}

.badges-wrapper {
  min-height: 36px;
}
</style>