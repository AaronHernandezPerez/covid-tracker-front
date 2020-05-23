import axios from 'axios';

/**
 * Unused
 */

const state = {
  world: {},
  countries: [],
  loadingPromise: null,
};

const getters = {
};

const mutations = {
  parseReport: (state, data) => {
    console.log('data', data.regions.world.totals)
    state.world = data.regions.world.totals;
    state.countries = data.regions.world.list.sort((a, b) => {
      var x = a['country']; var y = b['country'];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
};

const actions = {
  async fetchReport({ commit }) {
    console.log('executing fetch report');
    const response = await axios.get('https://cov19.cc/report.json');

    commit('parseReport', response.data);
  },

};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}