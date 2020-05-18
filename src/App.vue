<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import store from './store'
export default {
    name: 'App',
    store,
    mounted: function() {
        this.api.video.getNewIssue()
            .then(rep => rep.data)
            .then(newIssue => this.$store.commit('setNewIssue', newIssue));
        this.$store.commit('authenticateKey', this.$cookies.get('authenticateKey'));
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
