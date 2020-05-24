<template>
  <q-page padding>
    <div class="text-h4 q-mb-sm">
      <q-icon name="far fa-chart-bar text-blue-7" />
      {{$t('timeline')}}
    </div>
    <q-card flat class="my-card q-mb-md">
      <q-card-section>
        <CountryLine v-if="lineData" :data="lineData" />
        <div v-else class="flex align-center justify-center q-pa-lg" style="font-size: 10em">
          <q-spinner-audio color="blue-7" />
        </div>
      </q-card-section>
    </q-card>

    <div class="text-h4 q-mb-sm">
      <q-icon name="far fa-chart-bar text-blue-7" />
      {{$t('timeline')}}
    </div>
    <q-card flat class="my-card q-mb-md">
      <q-card-section>
        <CountryLine v-if="lineData" :data="lineData" />
        <div v-else class="flex align-center justify-center q-pa-lg" style="font-size: 10em">
          <q-spinner-audio color="blue-7" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

import CountryLine from "src/components/charts/CountryLine";

export default {
  // xdd {{ $route.params.id }}
  data() {
    return {
      lineData: null
    };
  },
  mounted() {
    const apiUrl = "https://disease.sh/v2/historical/";
    const diffDays = moment().diff(moment("01-01-2020", "DD-MM-YYYY"), "days");

    axios
      .get(apiUrl + this.$route.params.id, {
        params: {
          lastdays: diffDays
        }
      })
      .then(response => {
        this.lineData = response.data;
      });
  },
  components: {
    CountryLine
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  min-height: 500px;
}
</style>