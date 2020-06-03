<template>
    <div class="container-fluid">
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
                        <input type="text" v-model="inputStartTime">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal" @click="saveStartTime">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <b-modal size="lg" id="videoPlayerModal" :title="videoPlayerData.name || ''">
            <template class="container-fluid" v-slot:default="{}">
                    <iframe class="justify-content-center" :src="'//player.bilibili.com/player.html?danmaku=0&high_quality=1&aid=' + videoPlayerData.av"
                            allowfullscreen="allowfullscreen"
                            width="768"
                            height="512"
                            sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts">
                    </iframe>
            </template>
            <template v-slot:modal-footer="{}">
                <span></span>
            </template>
        </b-modal>
        <div class="row" v-if="videos | videos.length >= pageSize">
            <div class="col-10">
                <div class="card text-left mt-3" v-for="(video,index) in videos.slice(0, pageSize)" :key="index">
                    <div class="row no-gutters">
                        <div class="col-1 align-self-center text-center">
                            <a :class="index + 1 < 100? 'display-4': 'h1'">{{index  + 1}}</a>
                        </div>
                        <div class="col-3 border-left card-img-div">
                            <!--                    <a :href="'https://www.bilibili.com/video/av' + video.av" target="_blank">-->
                            <a @click="openVideoPlayerModal(video)">
                                <img :src="video.img" class="card-img" :alt="video.av">
                            </a>
                        </div>
                        <div class="col-7 border-right align-self-center">
                            <div class="card-body pb-0 pt-0">
                                <h5 class="card-title m-1 ">
                                    <a :href="'https://www.bilibili.com/video/av' + video.av" target="_blank">
                                        {{video.name}}{{video.startTime | timeFilter}}
                                    </a>
                                </h5>
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
                        <div class="col-1 align-self-center text-center" v-show="isAuthenticated">
                            <button type="button" class="btn btn-outline-warning btn-sm mb-3" @click="openStartTimeModal(video)" data-toggle="modal" data-target="#startTimeModal">设置选区</button>
                            <br>
                            <button type="button" class="btn btn-outline-primary btn-sm" @click="deleteVideo(video.av)">删除</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2" v-if="videos.isNotEmpty()">
                <div class="form-check mt-3">
                    <input class="form-check-input" v-model="isShowMoreVideo" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        <a class="text-justify font-size-15">
                            让我康康!(指视频摩多)
                        </a>
                    </label>
                </div>
            </div>
        </div>
        <div class="row justify-content-md-center mt-3" v-else>
            <h5 class="col-12">Tip: 每天第一次加载请稍等</h5>
            <div class="spinner-border text-warning" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../plugins/api.js'
    import {mapGetters} from "vuex";

    export default {
        name: "Rank",
        data() {
            return {
                chooseVideo: 0,
                inputStartTime: 0,
                isShowMoreVideo: JSON.parse(this.$cookies.get('isShowMoreVideo')),
                videoPlayerData: {},
                videos:[],
                state: this.$store.state,
                event: "hidden.bs.modal",
                event2: "click",
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
                },
            }
        },
        methods: {
            update: function() {
                this.videos.splice(0, this.videos.length);
                const top = this.isShowMoreVideo? 100: 30;
                api.video.listAllTypeTop(this.$route.params.issue, top).then(rep => this.videos = rep.data)
            },
            deleteVideo: function (av) {
                api.video.falseDelete(av).then(() => console.log("success to delete" + av));
                this.update();
            },
            saveStartTime: function () {
                api.video.info.setStartTime(this.chooseVideo, this.inputStartTime).then(() => console.log("success to update startTime"));
                this.update();
            },
            openStartTimeModal: function (video) {
                this.chooseVideo = video.av;
                this.inputStartTime = video.startTime;
            },
            openVideoPlayerModal: function (video) {
                this.videoPlayerData = video;
                this.$bvModal.show("videoPlayerModal");
            },
        },
        mounted: function() {
            this.update();
        },
        watch: {
            'state.issue': function () {
                this.update();
            },
            '$route': function () {
                this.update();
            },
            'isShowMoreVideo': function (isShowMoreVideo) {
                this.pageSize = isShowMoreVideo? 100: 30;
                this.$cookies.set('isShowMoreVideo', isShowMoreVideo, '30d');
                if (this.videos.length < this.pageSize) {
                    this.update();
                }
            },
        },
        update: function() {
            this.update();
        },
        filters: {
            timeFilter: function (startTime) {
                return `(${startTime / 60 < 10 ? '0' : ''}${ Math.floor(startTime / 60)}:${startTime % 60 < 10 ? '0' : ''}${startTime % 60})`
            },
        },
        computed: {
            pageSize: function () {
                return this.isShowMoreVideo ? 100 : 30;
            },
            ...mapGetters([
                'isAuthenticated',
                'isAdmin',
            ])
        }
    }
</script>

<style scoped>
    img{
        width: 250px;
        height: 161px;
    }
    a{
        text-decoration:none;
        color:#333;
    }
    .card-img-div{
        height: 161px;
    }
    .tag{
        font-size: 5px;
        border-radius: 35px;
    }
</style>