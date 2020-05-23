import axios from 'axios';

let baseUrl = 'https://covid-tracker-back.herokuapp.com/';
// if (process.env.DEV) {
//   baseUrl = 'http://127.0.0.1:5000/'
// }

const state = {
  claps: null,
};

const getters = {
};


const mutations = {
  storeClaps: (state, data) => {
    state.claps = data.claps;
  }
};

const actions = {
  async fetchClaps({ commit }) {
    const response = await axios.get(`${baseUrl}get_claps`)

    commit('storeClaps', response.data);
  },

  async add_clap({ commit }) {
    const response = await axios.get(`${baseUrl}clap`)

    commit('storeClaps', response.data);
  },

};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}