<template>
  <q-card flat class="my-card">
    <q-card-section>
      <h3 class="text-center">
        {{$t('totals')}}
        <q-badge align="top" class="text-subtitle2">
          Live
          <q-tooltip
            anchor="top middle"
            self="center middle"
            content-style="font-size: 14px"
            content-class="bg-black text-weight-bold"
          >{{$t('totalTooltip')}}</q-tooltip>
        </q-badge>
      </h3>
    </q-card-section>
    <div v-if="world">
      <q-card-section>
        <div
          class="text-h3 text-center text-blue-7 text-weight-bold"
          v-text="$options.filters.formatIntDot(world.cases)"
        ></div>
        <p class="text-center">{{$t('confirmedCases')}}</p>
      </q-card-section>
      <q-card-section color="primary">
        <div
          class="text-h3 text-center text-red-7 text-weight-bold"
          v-text="$options.filters.formatIntDot(world.deaths)"
        ></div>
        <p class="text-center">{{$t('deaths')}}</p>
      </q-card-section>
      <q-card-section>
        <div
          class="text-h3 text-center text-orange-7 text-weight-bold"
          v-text="$options.filters.formatIntDot(world.critical)"
        ></div>
        <p class="text-center">{{$t('critical')}}</p>
      </q-card-section>
      <q-card-section>
        <div
          class="text-h3 text-center text-yellow-7 text-weight-bold"
          v-text="$options.filters.formatIntDot(world.active)"
        ></div>
        <p class="text-center">{{$t('activeCases')}}</p>
      </q-card-section>
      <q-card-section>
        <div
          class="text-h3 text-center text-green-7 text-weight-bold"
          v-text="$options.filters.formatIntDot(world.recovered)"
        ></div>
        <p class="text-center">{{$t('recovered')}}</p>
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
