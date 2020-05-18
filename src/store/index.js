import Vue from 'vue'
import Vuex from 'vuex'
const newIssue = 2;

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        newIssue: newIssue,
        is_authenticated: false,
        authenticateKey: '',
    },
    mutations: {
        authenticateKey (state, payload) {
            this.state.authenticateKey = payload;
        },
        setNewIssue(state, payload) {
            this.state.newIssue = payload;
        },
    },
    actions: {
    },
    modules: {
    },
    getters: {
        isNewIssueUpdated: state => new Promise(resolve => {
            let stop = setInterval(() => {
                if (state.newIssue !== 2) {
                    clearInterval(stop);
                    resolve(state.newIssue)
                }
            }, 100)
        }),
        isAuthenticated: state => ["thv", "tilitili"].indexOf(state.authenticateKey) !== -1,
        isAdmin: state =>  state.authenticateKey === "tilitili",
    }
})
