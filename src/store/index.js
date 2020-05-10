import Vue from 'vue'
import Vuex from 'vuex'
const newIssue = 2;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newIssue: newIssue,
    issue: newIssue,
    is_authenticated: false,
  },
  mutations: {
    authenticate (state, payload) {
      this.state.is_authenticated = payload;
    },
    setNewIssue(state, payload) {
      this.state.newIssue = payload;
      this.state.issue = payload;
    },
    setIssue(state, payload) {
      this.state.issue = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
