<template>
    <div>
        <nav-bar :show-search="true"></nav-bar>
        <div class="container mt-2">
            <div class="row justify-content-between">
                <div class="col-8">
                    <div class="row">
                        <a class="font-size-20">{{video.name}}</a>
                    </div>
                    <div class="row mt-2">
                        <a class="font-size-10 text-black-50"> > {{video.type}}</a>
                        <a class="font-size-10 ml-3 text-black-50">{{video.pubTime}}</a>
                    </div>
                    <div class="row mt-2">
                        <a class="font-size-10 text-black-50">{{video.view}}播放 · {{video.danmaku}}弹幕</a>
                    </div>
                    <div class="row mt-2">
                        <iframe class="justify-content-center" :src="'//player.bilibili.com/player.html?danmaku=0&high_quality=1&aid=' + this.av"
                                allowfullscreen="allowfullscreen"
                                width="768"
                                height="512"
                                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts">
                        </iframe>
                    </div>
                    <div class="row mt-2 font-size-20 mb-2 pb-2 border-bottom">
                        <a class="col-auto mr-1 pl-0 text-black-50"><span class="oi oi-thumb-up"></span> {{video.like}}</a>
                        <a class="col-auto mr-1 text-black-50"><span class="oi oi-thumb-down"></span> {{video.dislike}}</a>
                        <a class="col-auto mr-1 text-black-50"><span class="oi oi-star"></span> {{video.favorite}}</a>
                        <a class="col-auto mr-1 text-black-50"><span class="oi oi-share"></span> {{video.share}}</a>
                    </div>
                    <div class="row mt-3 font-size-10">
                        <a>{{video.description}}</a>
                    </div>
                    <div class="row mt-3 pb-2 border-bottom">
                        <a class="border pr-2 pl-2 mr-2 font-size-12 rounded-pill bg-grey" v-for="(tag, index) in video.tags" :key="index">{{tag}}</a>
                    </div>
                    <div class="mt-2 ">
                        <a class="row font-size-20">{{video.reply}}  评论</a>
                    </div>
                </div>
                <div class="col-4 pl-5 pr-5">
                    <div class="row pb-4 border-bottom">
                        <div class="col-3">
                            <img class="rounded-circle" width="48" height="48" :src="video.img" alt=""/>
                        </div>
                        <div class="col-9">
                            <a class="row font-size-13">{{video.owner}}</a>
                            <a class="row font-size-10 mt-1">简介</a>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <a class="col-auto font-size-13">相关推荐(暂时只推荐同区排行榜)</a>
                    </div>
                    <div class="row mt-3" v-for="(recommendVideo, index) in recommendVideoList" :key="index">
                        <div class="col-6">
                            <img class="img-fluid" height="80" :src="recommendVideo.img">
                        </div>
                        <div class="col-6 text-left">
                            <a class="row d-inline-block text-wrap text-truncate text-left height-40px font-size-13">{{recommendVideo.name}}</a>
                            <a class="row font-size-10 text-black-50">{{recommendVideo.owner}}</a>
                            <a class="row font-size-10 text-black-50 mt-1">{{recommendVideo.view}}播放 · {{recommendVideo.danmaku}}弹幕</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "@/views/tilitili/NavBar";
    import {mapGetters} from "vuex";
    export default {
        name: "Player",
        components: {NavBar},
        data() {
            return {
                av: this.$route.params.av,
                video: {},
                recommendVideoList: [],
            }
        },
        mounted() {
            this.update();
        },
        methods: {
            async update() {
                const newIssue = await this.isNewIssueUpdated;
                const VideoRep = await this.api.video.getVideoByAv(newIssue, this.av);
                this.video = VideoRep.data;
                const VideoListRep = await this.api.video.listTop(newIssue, 10, this.video.type);
                this.recommendVideoList = VideoListRep.data;
            },
        },
        computed: {
            ...mapGetters([
                'isNewIssueUpdated'
            ]),
        },
    }
</script>

<style scoped>
    .bg-grey {
        background-color: rgba(0, 0, 0, 0.05) !important;
    }

</style>