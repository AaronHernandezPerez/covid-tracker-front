<template>
  <q-page padding>
    <div class="text-center text-h2 q-mb-md">
      <gb-flag class="c-flag q-mr-sm" :code="$route.params.id" />
      {{countryName}}
    </div>
    {{countryData}}
    <div v-if="countryData" class="row q-gutter-md q-mb-md">
      <q-badge align="middle" color="blue-7 col-12 col-md">
        <div
          class="text-h6 text-center full-width"
        >{{$t('confirmed')}}: {{countryData.cases | formatNumberDot}}</div>
      </q-badge>
      <q-badge align="middle" color="red-7 col-12 col-md">
        <div
          class="text-h6 text-center full-width"
        >{{$t('deaths')}}: {{countryData.deaths | formatNumberDot}}</div>
      </q-badge>
      <q-badge align="middle" color="orange-7 col-12 col-md">
        <div
          class="text-h6 text-center full-width"
        >{{$t('critical')}}: {{countryData.critical | formatNumberDot}}</div>
      </q-badge>
      <q-badge align="middle" color="yellow-7 col-12 col-md text-black">
        <div
          class="text-h6 text-center full-width"
        >{{$t('actives')}}: {{countryData.active | formatNumberDot}}</div>
      </q-badge>
      <q-badge align="middle" color="green-7 col-12 col-md">
        <div
          class="text-h6 text-center full-width"
        >{{$t('recovered')}}: {{countryData.recovered | formatNumberDot}}</div>
      </q-badge>
    </div>

    <div class="text-h4 q-mb-sm">
      <q-icon name="far fa-chart-bar text-blue-7" />
      {{$t('timeline')}}
    </div>
    <q-card flat class="my-card q-mb-xl">
      <q-card-section>
        <CountryLine v-if="lineData" :data="lineData" transition-show="jump-down" />
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
        <CountryLine v-if="statisticsData" :data="lineData" />
        <div v-else class="flex items-center justify-center q-pa-lg" style="font-size: 10em">
          <q-spinner-pie color="red-7" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

import { mapState } from "vuex";

import CountryLine from "src/components/charts/CountryLine";

export default {
  // xdd {{ $route.params.id }}
  data() {
    return {
      countryName: null,
      countryData: null,
      lineData: null,
      statisticsData: null
    };
  },
  methods: {
    findCountry() {
      if (this.countries) {
        this.countryData = this.countries.find(
          e => e.countryInfo.iso2 === this.$route.params.id
        );
      }
    }
  },
  computed: {
    ...mapState("novelCOVID", ["countries"])
  },
  created() {
    this.countryName = this.$options.filters.translateCountry2(
      this.$route.params.id
    );
  },
  mounted() {
    if (!this.countryName) {
      this.$destroy();
      return this.$router.push("/");
    }

    // Country data
    this.findCountry();

    // Line chart
    const diffDays = moment().diff(moment("01-01-2020", "DD-MM-YYYY"), "days");
    axios
      .get("https://disease.sh/v2/historical/" + this.$route.params.id, {
        params: {
          lastdays: diffDays
        }
      })
      .then(response => {
        this.lineData = response.data;
      });
  },
  watch: {
    countries(newVal) {
      this.findCountry();
    }
  },
  components: {
    CountryLine
  }
};
</script>

<style lang="scss" scoped>
.c-flag {
  height: 64px;
  vertical-align: sub;
}
.chart-container {
  position: relative;
  min-height: 500px;
}
.badges-wrapper {
  min-height: 36px;
}
</style>