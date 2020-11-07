import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    setAuthentication(state, auth){
      state.authenticated = auth;
    }
  },
  actions: {
  },
  modules: {
  }
})
