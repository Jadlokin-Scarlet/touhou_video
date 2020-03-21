<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="startTimeModal" tabindex="-1" role="dialog" aria-labelledby="startTimeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="startTimeModalLabel">修改时间选区</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="startTime">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveStartTime">确定</button>
                    </div>
                </div>
            </div>
        </div>
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
        <div class="card text-left mt-3" v-for="(video,index) in videos" :key="index">
            <div class="row no-gutters">
                <div class="col-1 align-self-center text-center">
                    <a class="display-4">{{video.rank}}</a>
                </div>
                <div class="col-3 border-left card-img-div">
                    <a :href="'https://www.bilibili.com/video/av' + video.av" target="_blank">
                        <img :src="video.img" class="card-img" :alt="video.av">
                    </a>
                </div>
                <div class="col-7 border-right align-self-center">
                    <div class="card-body pb-0 pt-0">
                        <h5 class="card-title m-1 ">{{video.name}}{{video.startTime | timeFilter}}</h5>
                        <hr class="m-1">
                        <div class="row ml-3">
                            <span class="oi oi-bar-chart mr-2" title="得分" aria-hidden="true"></span>
                            <a class="mr-4">{{video.point}}</a>
                            <span class="oi oi-play-circle mr-2" title="播放量" aria-hidden="true"></span>
                            <a class="mr-4">{{video.view}}</a>
                            <span class="oi oi-comment-square mr-2" title="评论" aria-hidden="true"></span>
                            <a class="mr-4">{{video.reply}}</a>
                            <span class="oi oi-star mr-2" title="收藏" aria-hidden="true"></span>
                            <a class="mr-4">{{video.favorite}}</a>
                            <span class="oi oi-aperture mr-2" title="硬币" aria-hidden="true"></span>
                            <a class="mr-4">{{video.favorite}}</a>
                        </div>
                        <div class="ml-2 mt-2">
<!--                            <div class="btn-group tags" role="group">-->
                            <a class="border p-1 tag mr-2" v-for="(tag, index) in video.tags" :key="index">{{tag}}</a>
<!--                            </div>-->
                        </div>
                    </div>
                </div>
                <div class="col-1 align-self-center text-center">
                    <button type="button" class="btn btn-outline-primary btn-sm mb-3" @click="openModal(video)" data-toggle="modal" data-target="#startTimeModal">设置选区</button>
                    <br>
                    <button v-show="is_authenticated" type="button" class="btn btn-outline-danger btn-sm" @click="deleteVideo(video.av)">删除</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../api.js'
    export default {
        name: "Rank",
        data() {
            return {
                is_authenticated: false,
                inputAuthenticationPassword: '',
                authenticationPassword: 'thv',
                issue: this.newIssue,
                chooseVideo: 0,
                startTime: 0,
                videos:[],
                video: {
                    av: 53625263,
                    rank: 30,
                    view: 12539,
                    reply: 171,
                    favorite: 1330,
                    coin: 2085,
                    name: "【东方手书/三月精】あいやこれまで!（诶呀到此为止了）",
                    img: "http://i1.hdslb.com/bfs/archive/02b82358b6108cba4ff221cd4281dbeffb5532a5.jpg",
                    tags: ["东方PROJECT", "东方", "全勤挑战", "东方三月精", "凋叶棕", "爆肝"],
                    point: 2,
                    startTime: 0,
                }
            }
        },
        methods: {
            update: function() {
                api.video.list(this.issue).then(rep => this.videos = rep.data)
            },
            deleteVideo: function (av) {
                api.video.delete(av).then(() => console.log("success to delete" + av));
                this.update();
            },
            saveStartTime: function () {
                api.video.setStartTime(this.chooseVideo, this.startTime).then(() => console.log("success to update startTime"));
                this.update();
            },
            openModal: function (video) {
                this.chooseVideo = video.av;
                this.startTime = video.startTime;
            },
            authenticate: function () {
                this.is_authenticated = (this.inputAuthenticationPassword === this.authenticationPassword);
                this.$cookies.set('is_authenticated', this.is_authenticated, '30d');
                if(this.$cookies.isKey('is_authenticated') === false) {
                    console.log('!!!!');
                }
            }
        },
        mounted: function() {
            this.update();
            this.is_authenticated = this.$cookies.get('is_authenticated');
        },
        watch: {
            '$route' (to) {
                this.issue = to.params.issue;
            },
            issue: function () {
                this.update();
            }
        },
        filters: {
            timeFilter: function (startTime) {
                // startTime = parseInt(startTime);
                return `(${startTime / 60 < 10 ? '0' : ''}${ Math.floor(startTime / 60)}:${startTime % 60 < 10 ? '0' : ''}${startTime % 60})`
            }
        }
    }
</script>

<style scoped>
    img{
        width: 250px;
        height: 161px;
    }
    .card-img-div{
        height: 161px;
    }
    .tag{
        font-size: 5px;
        border-radius: 35px;
    }
</style>