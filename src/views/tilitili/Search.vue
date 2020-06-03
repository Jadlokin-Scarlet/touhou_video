<template>
    <div class="container-fluid">
        <nav-bar :showSearch="false"></nav-bar>
        <div class="container">
            <div class="row justify-content-md-center mt-2">
                <div class="row align-items-end">
                    <img src="../../assets/search-logo.png" class="search-image mr-5" alt="">
                </div>
                <input class="mr-3 search-input rounded pl-3 pr-3 pt-2 pb-1" v-model="searchKey">
                <button class="btn btn-outline-success" @click="search(searchKey)"><span class="oi oi-magnifying-glass" title="搜索" aria-hidden="true"></span> 搜 索</button>
            </div>
            <div class="row border-bottom justify-content-around">
                <div :class="['p-3', 'ml-2', 'mr-2', 'border-warning', nowTitle === title? 'border-bottom': '']"
                     v-for="(title, index) in titleList" :key="index" @click="chooseTitle(title)">
                    {{title}}
                </div>
            </div>
            <div class="row pt-2 pb-1">
                <div :class="['border rounded mr-3 ml-3 font-size-13 pl-2 pr-2', nowSortKey === obj.sortKey? 'bg-warning text-white': '']"
                     @click="chooseSortKey(obj.sortKey)"
                     v-for="(obj, index) in sortKeyList" :key="index">
                    {{obj.value}}
                </div>
            </div>
            <div class="row pt-1 pb-1">
                <div :class="['border rounded mr-3 ml-3 font-size-13 pl-2 pr-2', true? 'bg-warning text-white': '']"
                     v-for="(obj, index) in videoLengthList" :key="index">
                    {{obj.value}}
                </div>
            </div>
            <div class="row border-bottom pt-1 pb-2">
                <div :class="['border rounded mr-3 ml-3 font-size-13 pl-2 pr-2', nowTitle === title? 'bg-warning text-white': '']"
                     @click="chooseTitle(title)"
                     v-for="(title, index) in titleList" :key="index">
                    {{title}}
                </div>
            </div>
            <div class="spinner-border text-warning mt-3" role="status" v-if="searchVideoList.length === 0 && !noSearchResult">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="row justify-content-md-center">
                <big-video-card class="ml-2 mr-2" v-for="(video, index) in searchVideoList" :key="index" :video="video" @update="update(searchKey)"></big-video-card>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "@/views/tilitili/NavBar";
    import BigVideoCard from "@/components/BigVideoCard";
    import {mapGetters} from "vuex";
    Array.prototype.getByIndex = function (index) {
        for (const item of this) {
            if (item.index === index) {
                return item;
            }
        }
    };
    export default {
        name: "Search",
        components: {BigVideoCard, NavBar},
        data() {
            return {
                searchKey: this.$route.params.searchKey,
                searchVideoList: [],
                nowTitle: '全部',
                nowSortKey: 'point',
                noSearchResult: false,
                state: this.$store.state,
                titleList: ['全部', '动画', '音乐', '游戏', '鬼畜', '舞蹈', '生活'],
                videoLengthList: [
                    {value: '全部时长', range: [0, 999999999]},
                ],
                sortKeyList: [
                    {sortKey: 'point', value: '综合排序'},
                    {sortKey: 'view', value: '最多点击'},
                    {sortKey: 'pub_time', value: '最新发布'},
                    // {sortKey: 'damuku', value: '最多弹幕'},
                    {sortKey: 'favorite', value: '最多收藏'},
                ]
            }
        },
        mounted: function () {
            this.update(this.searchKey);
        },
        methods: {
            async update(searchKey) {
                this.noSearchResult = false;
                this.searchVideoList.splice(0, this.searchVideoList.length);
                const newIssue = await this.isNewIssueUpdated;
                await this.api.video.search(newIssue, 20, this.nowTitle, searchKey, this.nowSortKey)
                    .then(rep => rep.data)
                    .then(data => this.searchVideoList = data)
                    .then(data => this.noSearchResult = data.length === 0);
            },
            search(searchKey) {
                if (searchKey === undefined) {
                    return;
                }
                if (searchKey === '') {
                    this.$router.push('/home');
                    return;
                }
                this.$router.push(`/search/${searchKey}`);
                this.update(this.searchKey);
            },
            chooseTitle(title) {
                this.nowTitle = title;
                this.update(this.searchKey);
            },
            chooseSortKey(sortKey) {
                this.nowSortKey = sortKey;
                this.update(this.searchKey);
            },
        },
        computed: {
            ...mapGetters([
                'isNewIssueUpdated'
            ]),
        },
        // watch: {
        //     searchKey: function () {
        //         this.update();
        //     }
        // }
    }
</script>

<style scoped>
    .search-image {
        height: 35px;
    }
    .search-input {
        width: 330px;
        font-size: 16px;
    }
</style>