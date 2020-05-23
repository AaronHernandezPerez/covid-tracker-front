<template>
  <q-card flat class="my-card">
    <q-card-section>
      <q-table
        v-if="countries"
        class="my-table"
        title="Datos por países"
        :data="countries"
        :columns="columns"
        :pagination.sync="pagination"
        :filter="filter"
        :binary-state-sort="true"
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
        <template v-slot:body-cell-country="props">
          <q-td :props="props" auto-width>
            <div class="flex items-center">
              <gb-flag class="c-flag q-mr-sm" :code="props.row.countryInfo.iso2" />
              {{props.row.country}}
            </div>
          </q-td>
        </template>
      </q-table>
      <div v-else class="flex align-center justify-center q-pa-lg" style="font-size: 10em">
        <q-spinner-oval color="red-7" />
      </div>
    </q-card-section>
  </q-card>
</template>


<script>
import { mapState } from "vuex";
import PlusButton from "src/components/PlusButton";

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
          name: "country",
          align: "left",
          label: "País",
          field: "country",
          sortable: true,
          classes: "name-col"
        },
        {
          name: "confirmed",
          align: "left",
          label: "Confirmados",
          field: "cases",
          sortable: true,
          classes: "text-blue-7",
          format: val => val.toLocaleString()
        },
        {
          name: "deaths",
          align: "left",
          label: "Muertes",
          field: "deaths",
          sortable: true,
          classes: "text-red-7",
          format: val => val.toLocaleString()
        },
        {
          name: "critical",
          align: "left",
          label: "Críticos",
          field: "critical",
          sortable: true,
          classes: "text-orange-7",
          format: val => val.toLocaleString()
        },
        {
          name: "active",
          align: "left",
          label: "Casos activos",
          field: "active",
          sortable: true,
          classes: "text-amber-7",
          format: val => val.toLocaleString()
        },
        {
          name: "tests",
          align: "left",
          label: "Tests",
          field: "tests",
          sortable: true,
          classes: "text-yellow-7",
          format: val => val.toLocaleString()
        },
        {
          name: "recovered",
          align: "left",
          label: "Recuperados",
          field: "recovered",
          sortable: true,
          classes: "text-green-7",
          format: val => val.toLocaleString()
        }
      ]
    };
  },
  computed: {
    ...mapState("novelCOVID", ["countries"])
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
}

.name-col {
  min-width: 250px;
}
</style>