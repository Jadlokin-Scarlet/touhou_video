<template>
    <div class="container-fluid">
        <nav-bar></nav-bar>
        <div id="body" class="row">
            <div class="col-2">
                <left></left>
            </div>
            <div class="col-10">
                <!--        <rank></rank>-->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    // import Rank from './views/Rank'
    import NavBar from './NavBar'
    import Left from './Left'
    export default {
        name: "Admin",
        components: {
            Left,
            NavBar,
            // Rank
        },
    }
</script>

<style scoped>
#body {
    margin-top: 60px;
}
</style>