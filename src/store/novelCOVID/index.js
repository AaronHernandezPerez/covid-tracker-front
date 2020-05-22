import axios from 'axios';

const state = {
  world: {},
  countries: [],
  loadingPromise: null,
};

const getters = {
};

const mutations = {
  parseReport: (state, data) => {
    state.world = data[0];
    if (state.world.country !== 'World') {
      // Manually parse data
      const [pass, fail] = a.reduce(([p, f], e) => (e.country !== 'World' ? [[...p, e], f] : [p, [...f, e]]), [[], []]);
      state.countries = pass;
      state.world = fail;
    } else {
      data.shift();
    }

    state.countries = data.sort((a, b) => {
      var x = a['country']; var y = b['country'];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
};

const actions = {
  async fetchReport({ commit }) {
    console.log('executing fetch report')
    const response = await axios.get('https://coronavirus-19-api.herokuapp.com/countries');

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