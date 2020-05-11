<template>
    <div class="container-fluid">
        <div class="row">
            <img class="img-fluid" src="../assets/head.png" alt="head">
        </div>
        <div class="container">
            <div class="row mt-2">
                <div class="col-5">
                    <div id="carousel" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="http://i2.hdslb.com/bfs/archive/fdce3eb1fd7327e597e26d3b1a5cc7c5c1ce648d.jpg" class="d-block w-100 news-img" alt="老腔皮影戏【东方风神录】">
                            </div>
                            <div class="carousel-item">
                                <img src="https://i0.hdslb.com/bfs/album/a3b033f671c621a3dcf41b73738cd70b85e4fb7d.jpg@518w_1e_1c.jpg" class="d-block w-100 news-img" alt="【东方我乐多丛志】Vtuber访谈后篇">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div class="col-7" v-if="newsVideoListList">
                    <div class="row" v-for="(list, index) in newsVideoListList" :key="index">
                        <div class="col-4" v-for="(newsVideo, jndex) in list" :key="jndex">
                            <img class="img-fluid news-video-img" :src="newsVideo.img" :alt="newsVideo.name" @click="JumpToBilibili(newsVideo.av)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-2" v-if="randomAllTypeVideoListList">
                <div class="col-10">
                    <div class="row">
                        <h3 class="col-4 text-left">
                            <span class="oi oi-loop" title="随便看看" aria-hidden="true"></span>
                            随便看看
                        </h3>
                    </div>
                    <div class="row">
                        <div class="col-3" v-for="(video, index) in randomAllTypeVideoListList" :key="index">
                            <video-card :video="video"/>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <img class="img-fluid mt-4 border" src="../assets/东方Rank.png" @click="JumpToRank()">
                </div>
            </div>

            <div class="row mt-2" v-for="(item, index) in randomOtherTypeVideoListList" :key="index">
                <div class="col-10">
                    <div class="row justify-content-between">
                        <h3 class="col-4 text-left">
                            <span class="oi oi-link-intact" :title="item.title" aria-hidden="true"></span>
                            {{item.title}}
                        </h3>
                        <h5 class="col-2" @click="updateRandomVideoList(item.title)">
                            <span class="oi oi-loop-circular" :title="item.title" aria-hidden="true"></span>
                            换一换
                        </h5>
                    </div>
                    <div class="row" v-for="(list, jndex) in item.random" :key="jndex">
                        <div class="col-3" v-for="(video, kndex) in list" :key="kndex">
                            <video-card :video="video"/>
                        </div>
                    </div>
                </div>
                <div class="col-2 text-left">
                    <h3>排行榜</h3>
                    <div class="row">
                        <p class="text-truncate rank-item" v-for="(video, jndex) in item.rank" :key="jndex" @click="JumpToBilibili(video.av)">
                            {{(jndex + 1) + ' ' + video.name}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VideoCard from "@/components/VideoCard";
    Array.prototype.getByTitle = function (title) {
        for (const item of this) {
            if (item.title === title) {
                return item;
            }
        }
    };
    Array.prototype.divide = function (length) {
        const list = this.slice(0, length * 2);
        return [list.slice(0, length), list.slice(length)];
    };
    Array.prototype.peek = function (fun) {
        for (const item of this) {
            fun(item);
        }
        return this;
    };
    Array.prototype.isNotEmpty = function () {
        return this.length !== 0;
    };
    export default {
        name: "Home",
        components: {VideoCard},
        data() {
            return {
                videoList: [],
                state: this.$store.state,
                titleList: ['all', '动画', '音乐', '游戏', '鬼畜', '舞蹈', '生活'],
            }
        },
        mounted: function () {
            this.update();
        },
        methods: {
            update() {
                this.updateVideoList();
            },
            updateVideoList() {
                this.titleList.forEach(async title => {
                    let random = (await this.api.video.info.listRandom(title, 8)).data;
                    const rank = await this.api.video.listTop(this.state.newIssue, 10, title).then(rep => rep.data);
                    this.videoList.push(Object.assign({}, {title, random, rank}));
                })
            },
            updateRandomVideoList(title) {
                const obj = this.videoList.getByTitle(title);
                this.api.video.info.listRandom(obj.title, 8)
                    .then(rep => rep.data)
                    .then(data => this.$set(obj, 'random', data))
            },
            JumpToBilibili(av) {
                window.open(`https://www.bilibili.com/video/av${av}`);
            },
            JumpToRank() {
                this.$router.push({
                    path: '/',
                });
            }
        },
        computed: {
            newsVideoListList: function () {
                const item = this.videoList.getByTitle('all');
                if (item && item.rank) {
                    return item.rank.divide(3);
                }
                return undefined;
            },
            randomAllTypeVideoListList: function() {
                const item = this.videoList.getByTitle('all');
                if (item && item.random) {
                    return item.random.slice(0, 4);
                }
                return undefined;
            },
            randomOtherTypeVideoListList: function () {
                return this.titleList
                    .filter(title => title !=='all')
                    .map(title => this.videoList.getByTitle(title))
                    .filter(item => item !== undefined && item.random.isNotEmpty())
                    .map(item => Object.assign({}, item, {random: item.random.divide(4)}));
            }
        }
    }
</script>

<style scoped>
    .news-img{
        height: 250px;
    }
    .news-video-img{
        height: 120px;
        margin-top: 2px;
        margin-bottom: 3px;
    }
    .rank-item {
        font-size: 10px;
    }
</style>