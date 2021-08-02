import axios from "axios";
import i18nCountries from "i18n-iso-countries";
import Vue from "vue";

const state = {
  world: null,
  countries: null,
  loadingPromise: null
};

const getters = {};

const mutations = {
  resetReport: (state, data) => {
    state.world = null;
    state.countries = null;
  },
  parseReport: (state, data) => {
    state.world = data[0].data;
    state.countries = data[1].data;
    console.log(state.world, state.countries[0]);
  }
};

const actions = {
  async fetchReport({ commit }) {
    commit("resetReport");

    const response = await axios.all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries?sort=country/countries")
    ]);

    // Parsing data
    const parsedCountries = [];

    response[1].data.forEach(e => {
      if (e.countryInfo.iso2) {
        e.countryInfo.iso2 = e.countryInfo.iso2.toLowerCase();
        // Adding language translations
        Vue.prototype.$supportedLanguages.forEach(lang => {
          e.countryInfo[lang] = i18nCountries
            .getName(e.countryInfo.iso2, lang)
            .split(",")
            .shift()
            .split(" (")
            .shift()
            .split(" (")
            .shift();
        });
        parsedCountries.push(e);
      }
    });

    response[1].data = parsedCountries;

    commit("parseReport", response);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
