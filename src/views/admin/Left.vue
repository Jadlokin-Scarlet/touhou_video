<template>
    <div class="container-fluid">
        <nav class="nav nav-pills flex-column">
            <router-link :to="'/admin/rank/' + state.newIssue" class="nav-link text-muted" href="#">
                最新的{{state.newIssue}}期
            </router-link>
            <a class="nav-link dropdown-toggle text-muted" data-toggle="collapse" href="#docCollapse" role="button" aria-haspopup="true" aria-expanded="false">往期</a>
            <div id="docCollapse" class="collapse">
                <router-link :to="'/admin/rank/' + value" class="nav-link mt-1 text-muted" href="#" v-for="(value, index) in range(state.newIssue)" :key="index">
                    第{{value}}期
                </router-link>
            </div>
                <router-link to="/admin/recycle-bin" class="nav-link text-muted" href="#">
                    回收站
                </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Left",
        data() {
            return {
                state: this.$store.state,
            }
        },
        methods: {
            range: function(end) {
                return [...new Array(end).keys()].reverse();
            }
        }
    }
</script>

<style scoped>
    .show>.nav-link {
        color: #007bff;
        background-color: #ffffff;
    }
</style>