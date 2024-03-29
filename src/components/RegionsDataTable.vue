<template>
  <q-card flat class="my-card">
    <q-card-section>
      <q-table
        v-if="countries"
        class="my-table"
        :title="$t('dataPerCountry')"
        :data="countries"
        :columns="columns"
        :pagination.sync="pagination"
        :filter="filter"
        :binary-state-sort="true"
        dense
      >
        <template v-slot:top-right="props">
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-mr-xl"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
              content-style="font-size: 14px"
              content-class="bg-black text-weight-bold"
            >{{$t('fullscreen')}}</q-tooltip>
          </q-btn>

          <q-input
            dense
            debounce="300"
            v-model="filter"
            :placeholder="$t('search')"
            ref="searchInput"
          >
            <template v-slot:append>
              <q-icon class="search-icon" name="search" @click="$refs.searchInput.focus()" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <PlusButton :country="props.row.countryInfo.iso2"></PlusButton>
          </q-td>
        </template>

        <template v-slot:body-cell-country="props">
          <q-td :props="props">
            <div class="flex items-center">
              <gb-flag class="c-flag q-mr-sm" :code="props.row.countryInfo.iso2" />
              {{props.value}}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-confirmed="props">
          <q-td :props="props" auto-width>
            <div>{{props.value}}</div>
            <div v-if="props.row.todayDeaths" class="sub-text">
              + {{props.row.todayCases | formatNumberDot}}
              <q-tooltip
                anchor="top middle"
                self="center middle"
                content-style="font-size: 12px"
                content-class="bg-black"
                :delay="500"
              >{{$t('todaysIncrement')}}</q-tooltip>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-deaths="props">
          <q-td :props="props" auto-width>
            <div>{{props.value}}</div>
            <div v-if="props.row.todayDeaths" class="sub-text">
              + {{props.row.todayDeaths | formatNumberDot}}
              <q-tooltip
                anchor="top middle"
                self="center middle"
                content-style="font-size: 12px"
                content-class="bg-black"
                :delay="500"
              >{{$t('todaysIncrement')}}</q-tooltip>
            </div>
          </q-td>
        </template>

        <template v-slot:pagination="scope">
          <div>{{$t('page')}} {{scope.pagination.page}} {{$t('of')}} {{scope.pagesNumber}}</div>
          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="first_page"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="pagination.page=1"
          />

          <q-btn
            v-if="scope.pagesNumber > 1"
            icon="chevron_left"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="scope.prevPage()"
          />

          <q-btn
            v-if="scope.pagesNumber > 1"
            icon="chevron_right"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.nextPage()"
          />
          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="last_page"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="pagination.page=scope.pagesNumber"
          />
        </template>
      </q-table>
      <div v-else class="flex items-center justify-center q-pa-lg" style="font-size: 10em">
        <q-spinner-oval color="red-7" />
      </div>
    </q-card-section>
  </q-card>
</template>


<script>
import { mapState } from "vuex";
import PlusButton from "src/components/PlusButton";

export default {
  name: "RegionsDataTable",
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
          label: this.$t("country"),
          field: row => row.countryInfo[this.$language],
          sortable: true,
          classes: "name-col",
          style: "font-size:18px",
          headerStyle: "font-size:20px"
        },
        {
          name: "confirmed",
          align: "left",
          label: this.$t("confirmed"),
          field: "cases",
          sortable: true,
          classes: "text-blue-7",
          style: "font-size:18px",
          headerStyle: "font-size:20px",
          format: val => this.formatOrUnknown(val)
        },
        {
          name: "deaths",
          align: "left",
          label: this.$t("deaths"),
          field: "deaths",
          sortable: true,
          classes: "text-red-7",
          style: "font-size:18px",
          headerStyle: "font-size:20px",
          format: val => this.formatOrUnknown(val)
        },
        {
          name: "critical",
          align: "left",
          label: this.$t("critical"),
          field: "critical",
          sortable: true,
          classes: "text-orange-7",
          style: "font-size:18px",
          headerStyle: "font-size:20px",
          format: val => this.formatOrUnknown(val)
        },
        {
          name: "active",
          align: "left",
          label: this.$t("activeCases"),
          field: "active",
          sortable: true,
          classes: "text-yellow-7",
          style: "font-size:18px",
          headerStyle: "font-size:20px",
          format: val => this.formatOrUnknown(val)
        },
        {
          name: "recovered",
          align: "left",
          label: this.$t("recovered"),
          field: "recovered",
          sortable: true,
          classes: "text-green-7",
          style: "font-size:18px",
          headerStyle: "font-size:20px",
          format: val => this.formatOrUnknown(val)
        },
        {
          name: "tests",
          align: "left",
          label: this.$t("tests"),
          field: "tests",
          sortable: true,
          classes: "text-cyan",
          style: "font-size:18px",
          headerStyle: "font-size:20px",
          format: val => this.formatOrUnknown(val)
        }
      ]
    };
  },
  methods: {
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
  min-width: 300px;
}

.search-icon {
  cursor: text;
}

.sub-text {
  font-size: 0.7rem;
}
</style>


<style lang="scss">
.q-table--dense .q-table__bottom {
  min-height: auto;
}
</style>