<template>
  <q-card flat class="my-card">
    <q-card-section>
      <div class="text-h3 text-center">Totales</div>
    </q-card-section>

    <q-card-section>
      <div class="text-h3 text-center text-blue-7 text-weight-bold" v-text="world.confirmed"></div>
      <p class="text-center">Casos confirmados</p>
    </q-card-section>
    <q-card-section color="primary">
      <div class="text-h3 text-center text-red-7 text-weight-bold" v-text="world.deaths"></div>
      <p class="text-center">Muertes</p>
    </q-card-section>
    <q-card-section>
      <div class="text-h3 text-center text-orange-7 text-weight-bold" v-text="world.critical"></div>
      <p class="text-center">Críticos</p>
    </q-card-section>
    <q-card-section>
      <div
        class="text-h3 text-center text-amber-7 text-weight-bold"
        v-text="world.confirmed - world.recovered - world.deaths + world.critical"
      ></div>
      <p class="text-center">Casos activos</p>
    </q-card-section>
    <q-card-section>
      <div class="text-h3 text-center text-green-7 text-weight-bold" v-text="world.recovered"></div>
      <p class="text-center">Recuperados</p>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TotalSummary",
  data() {
    return {};
  },
  computed: {
    ...mapState("cov19cc", ["world"])
  }
};
</script>
