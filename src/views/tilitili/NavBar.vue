<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light home-bar align-items-start">
            <router-link :to="'/home'" class="navbar-brand" href="#">
                <img src="../../assets/logo.png" class="" height="30" alt="">
            </router-link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link :to="'/home'" class="nav-link" href="#">
                            主页
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="`/admin/rank/${state.newIssue}`" class="nav-link" href="#">榜单</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            往期
                        </a>
                        <div class="dropdown-menu min-width-none" aria-labelledby="navbarDropdown">
                            <router-link :to="`/admin/rank/${value}`" class="nav-link mt-1 font-size-13" href="#" v-for="(value, index) in range(state.newIssue)" :key="index">第{{value}}期</router-link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">回收站</a>
                    </li>
                </ul>
                <div class="row" v-show="showSearch">
                    <input class="col-8 form-control mr-1 search-input" type="search" v-model="searchKey" :placeholder="top1Video | get('name')" aria-label="Search">
                    <button class="col-3 btn btn-outline-success" type="submit" @click="search">搜索</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import Video from "@/entity/Video";

    export default {
        name: "NavBar",
        props: ['showSearch'],
        data() {
            return {
                top1Video: new Video(),
                searchKey: '',
                state: this.$store.state,
            }
        },
        mounted: function () {
            this.update();
        },
        methods: {
            update() {
                this.updateTop1Video();
            },
            updateTop1Video() {
                (async () => {
                    const newIssue = await this.$store.getters.isNewIssueUpdated;
                    return (await this.api.video.listTop(newIssue, 1, '全部')).data[0];
                })().then(video => this.top1Video = video);
            },
            range: function(end) {
                return [...new Array(end).keys()].reverse();
            },
            search() {
                const searchKey = this.searchKey === ''
                    ?this.top1Video.name
                    :this.searchKey;
                this.$router.push({
                    path: `/search/${searchKey}`,
                });
            },
        },
        filters: {
            get: function (value, key) {
                if (!value) return '';
                return value[key]
            },
        },
    }
</script>

<style scoped>
    .home-bar {
        background-image: url("../../assets/head.png");
        background-repeat:no-repeat;
        background-size: 100% auto;
        height: 163px;
    }
    .search-input {
        width: 500px;
    }
    .font-size-13 {
        font-size: 13px;
    }
    .min-width-none {
        min-width: auto;
    }
</style>