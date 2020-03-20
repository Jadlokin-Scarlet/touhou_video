<template>
  <div id="app" class="container-fluid">
    <nav-bar></nav-bar>
    <div class="row">
      <div class="col-2">
        <left></left>
      </div>
      <div class="col-8">
<!--        <rank></rank>-->
        <router-view :to="{ name: 'newRank'}">最新一期</router-view>
      </div>
      <div class="col-2 pr-0">

      </div>
    </div>
  </div>
</template>

<script>
// import Rank from './views/Rank'
import NavBar from './views/NavBar'
import Left from './views/Left'

export default {
  name: 'App',
  components: {
    Left,
    NavBar,
    // Rank
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
