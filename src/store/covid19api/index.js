import axios from "axios";
import i18nCountries from "i18n-iso-countries";
import Vue from "vue";
// DOC https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest
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
    console.log(data);
    // state.world = data[0].data;
    // state.countries = data[1].data;
  }
};

const actions = {
  async fetchReport({ commit }) {
    commit("resetReport");

    const response = await axios.all([
      axios.get("https://api.covid19api.com/")
    ]);

    // Parsing data
    const parsedCountries = [];

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
