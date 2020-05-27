<template>
  <q-page padding>
    <div class="overflow-hidden max-w">
      <h1 class="seo-Title max-w">{{$t('indexH1')}}</h1>
    </div>
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
import TotalSummary from "src/components/TotalSummary";
import RegionsDataTable from "src/components/RegionsDataTable";

export default {
  name: "PageIndex",
  components: { TotalSummary, RegionsDataTable },
  metaInfo: {
    title: "Corona virus tracker",
    titleTemplate: "%s | Status Covid"
  }
};
</script>

<style lang="scss" scoped>
.seo-Title {
  color: #121212;
  position: absolute;
  user-select: none;
}
.max-w {
  max-width: 300px;
  font-size: 1em;
}
</style>