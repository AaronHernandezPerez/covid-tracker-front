<template>
  <q-card flat class="my-card">
    <q-card-section>
      <q-table
        class="my-table"
        title="Datos por países"
        :data="countries"
        :columns="columns"
        :pagination.sync="pagination"
        :filter="filter"
        dense
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <PlusButton :row="props"></PlusButton>
          </q-td>
        </template>
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="flex items-center">
              <q-tooltip>Very good!</q-tooltip>

              <gb-flag class="c-flag q-mr-sm" :code="props.row.country_code" />
              {{props.row.country}}
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>


<script>
import { mapState } from "vuex";
import PlusButton from "src/components/PlusButton";
//  { "country": "Hong Kong", "confirmed": 1064, "deaths": 4, "recovered": 1029, "last_updated": "2020-05-22T08:45:13Z", "country_code": "hk", "daily_confirmed": -1, "daily_deaths": -1, "critical": 1, "tests": 168291 }
export default {
  name: "TotalSummary",
  data() {
    return {
      filter: "",
      pagination: {
        sortBy: "confirmed", // String, column "name" property value
        descending: true,
        page: 1,
        rowsPerPage: 25 // current rows per page being displayed
      },
      columns: [
        { name: "actions", label: "", field: "", align: "center" },
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "country",
          sortable: true
        },
        {
          name: "confirmed",
          align: "left",
          label: "Confirmados",
          field: "confirmed",
          sortable: true,
          classes: "text-blue-7"
        },
        {
          name: "deaths",
          align: "left",
          label: "Muertes",
          field: "deaths",
          sortable: true,
          classes: "text-red-7"
        },
        {
          name: "critical",
          align: "left",
          label: "Críticos",
          field: "critical",
          sortable: true,
          classes: "text-orange-7"
        },
        {
          name: "active",
          align: "left",
          label: "Casos activos",
          field: "",
          sortable: true,
          classes: "text-amber-7",
          format: (val, row) => `${row.confirmed - row.recovered - row.deaths}`
        },
        {
          name: "tests",
          align: "left",
          label: "Tests",
          field: "tests",
          sortable: true,
          classes: "text-yellow-7"
        },
        {
          name: "recovered",
          align: "left",
          label: "Recuperados",
          field: "recovered",
          sortable: true,
          classes: "text-green-7"
        }
      ]
    };
  },
  computed: {
    ...mapState("cov19cc", ["countries"])
  },
  methods: {
    test(t) {
      console.log("da", t, event);
    }
  },
  components: {
    PlusButton
  }
};
</script>

<style lang="scss" scoped>
.c-flag {
  border-radius: 10px;
  // font-size: 1.8em;
}
</style>