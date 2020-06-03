<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="authenticationModal" tabindex="-1" role="dialog" aria-labelledby="authenticationModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="authenticationModalLabel">认证</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="inputAuthenticationPassword">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal" @click="authenticate">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <router-link :to="'/home'" class="navbar-brand" href="#">
               <img src="../../assets/logo.png" class="" height="30" alt="">
            </router-link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link :to="'/home'" class="nav-link" href="#">
                            主页
                        </router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link :to="`/admin/rank/${state.newIssue}`" class="nav-link" href="#">榜单</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            往期
                        </a>
                        <div class="dropdown-menu " aria-labelledby="navbarDropdown">
                            <router-link :to="`/admin/rank/${value}`" class="nav-link mt-1 font-size-13" href="#" v-for="(value, index) in range(state.newIssue)" :key="index">第{{value}}期</router-link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">回收站</a>
                    </li>
                </ul>
                <div class="justify-content-end" role="group">
                    <button class="btn btn-outline-success" type="button" v-show="isAuthenticated" @click="download">
                        下载数据文本<a :href="dataFileUrl" download="data.txt" ref="download"></a>
                    </button>
                    <button class="btn btn-outline-success ml-1" type="button" data-toggle="modal" data-target="#authenticationModal">管理员认证</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "head.vue",
        data() {
            return {
                dataFileUrl: '',
                inputAuthenticationPassword: '',
                authenticationPassword: 'thv',
                state: this.$store.state,
            }
        },
        mounted: function() {
        },
        methods: {
            download: function () {
                this.dataFileUrl = this.axios.defaults.baseURL + `video/issue/${this.$route.params.issue}/data.txt`;
                this.$refs.download.click();
            },
            authenticate: function () {
                if (this.inputAuthenticationPassword !== '') {
                    this.$store.commit('authenticateKey', this.inputAuthenticationPassword);
                    this.$cookies.set('authenticateKey', this.inputAuthenticationPassword, '30d');
                }
            },
            range: function(end) {
                return [...new Array(end).keys()].reverse();
            }
        },
        computed: {
            ...mapGetters([
                'isAuthenticated',
                'isAdmin',
                // ...
            ])
        }
    }
</script>

<style scoped>

</style>