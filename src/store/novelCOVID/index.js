import axios from 'axios';

const state = {
  world: null,
  countries: null,
  loadingPromise: null,
};

const getters = {
};

const mutations = {
  resetReport: (state, data) => {
    state.world = null;
    state.countries = null;
  },
  parseReport: (state, data) => {
    state.world = data[0].data;
    state.countries = data[1].data
  }
};

const actions = {
  async fetchReport({ commit }) {
    commit('resetReport');

    const response = await axios.all([
      axios.get('https://disease.sh/v2/all'),
      axios.get('https://disease.sh/v2/countries')
    ]);

    commit('parseReport', response);
  },

};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}