<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12 q-pb-md col-md-3">
        <TotalSummary></TotalSummary>
      </div>
      <div class="col-12 q-pb-md col-md-9">
        <RegionsDataTable></RegionsDataTable>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import TotalSummary from "src/components/TotalSummary";
import RegionsDataTable from "src/components/RegionsDataTable";

export default {
  name: "PageIndex",
  components: { TotalSummary, RegionsDataTable },
  methods: {
    ...mapActions("novelCOVID", ["fetchReport"])
  },
  created() {
    this.fetchReport();
  },
  mounted: function() {
    window.setInterval(() => {
      this.fetchReport();
    }, 15 * 60 * 1000); // 15 min
  }
};
</script>
