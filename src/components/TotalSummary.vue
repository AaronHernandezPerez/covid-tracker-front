<template>
  <q-card flat class="my-card">
    <q-card-section>
      <h3 class="text-center">
        Totales
        <q-badge align="top" class="text-subtitle2">
          Live
          <q-tooltip
            anchor="bottom middle"
            self="center middle"
            content-style="font-size: 14px"
            content-class="bg-black text-weight-bold text-primary"
          >Los datos se actualizan cada 15 min</q-tooltip>
        </q-badge>
      </h3>
    </q-card-section>
    <div v-if="world">
      <q-card-section>
        <div
          class="text-h3 text-center text-blue-7 text-weight-bold"
          v-text="world.cases.toLocaleString()"
        ></div>
        <p class="text-center">Casos confirmados</p>
      </q-card-section>
      <q-card-section color="primary">
        <div
          class="text-h3 text-center text-red-7 text-weight-bold"
          v-text="world.deaths.toLocaleString()"
        ></div>
        <p class="text-center">Muertes</p>
      </q-card-section>
      <q-card-section>
        <div
          class="text-h3 text-center text-orange-7 text-weight-bold"
          v-text="world.critical.toLocaleString()"
        ></div>
        <p class="text-center">Críticos</p>
      </q-card-section>
      <q-card-section>
        <div
          class="text-h3 text-center text-amber-7 text-weight-bold"
          v-text="world.active.toLocaleString()"
        ></div>
        <p class="text-center">Casos activos</p>
      </q-card-section>
      <q-card-section>
        <div
          class="text-h3 text-center text-green-7 text-weight-bold"
          v-text="world.recovered.toLocaleString()"
        ></div>
        <p class="text-center">Recuperados</p>
      </q-card-section>
    </div>
    <div v-else class="flex align-center justify-center q-pa-lg" style="font-size: 8em">
      <q-spinner-audio color="blue-7" />
    </div>
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
    ...mapState("novelCOVID", ["world"]),
    loadingData() {
      return this.world;
    }
  }
};
</script>
