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
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="authenticate">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">TouHouVideoRank</a>
                <div class="justify-content-end" role="group">
                    <button class="btn btn-outline-success" type="button" v-show="state.is_authenticated" @click="download">
                        下载数据文本<a :href="dataFileUrl" download="data.txt" ref="download"></a>
                    </button>
                    <button class="btn btn-outline-success ml-1" type="button" data-toggle="modal" data-target="#authenticationModal">管理员认证</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
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
            this.authenticate();
        },
        methods: {
            download: function () {
                this.dataFileUrl = this.axios.defaults.baseURL + `video/issue/${this.$store.state.issue}/data.txt`;
                this.$refs.download.click();
            },
            authenticate: function () {
                let is_authenticated = this.inputAuthenticationPassword === this.authenticationPassword;
                if (is_authenticated) {
                    this.$store.commit('authenticate', is_authenticated);
                }
                this.$cookies.set('is_authenticated', is_authenticated, '30d');
            },
        }
    }
</script>

<style scoped>

</style>