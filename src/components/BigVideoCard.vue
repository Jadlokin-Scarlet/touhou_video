<template>
    <div class="font-size-13 text-left border mt-4" @mouseover="showDelete" @mouseout="hideDelete" v-if="video">
        <div class="position-relative">
            <router-link :to="`/player/av/${video.av}`">
                <img class="img-fluid height-120px" width="200px" :src="video.img" :alt="video.name"/>
            </router-link>
            <div class="video-card-delete" v-if="isAuthenticated" v-show="isShowDelete" @click="deleteVideo">
                <a>x</a>
            </div>
        </div>
        <div class="max-width-200 p-2 container">
            <a class="d-inline-block text-wrap text-truncate text-left height-40px" @click="JumpToBilibili(video.av)">{{video.name}}</a>
            <div class="row justify-content-between">
                <a class="col-auto"><span class="oi oi-media-play mr-1"></span>{{video.view}}</a>
                <a class="col-auto"><span class="oi oi-clock mr-1"></span>{{video.pubTime.split(" ")[0]}}</a>
            </div>
            <div class="row mt-1">
                <a class="col-auto"><span class="oi oi-person mr-1"></span>{{video.owner}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "BigVideoCard",
        props: ['video'],
        data() {
            return {
                isShowDelete: false,
            }
        },
        methods: {
            JumpToBilibili(av) {
                window.open(`https://www.bilibili.com/video/av${av}`);
            },
            showDelete() {
                this.isShowDelete = true;
            },
            hideDelete() {
                this.isShowDelete = false;
            },
            deleteVideo: function () {
                this.api.video.falseDelete(this.video.av)
                    .then(() => this.$emit("update"));
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
    span {
        width: 13px;
    }
    .video-card-delete {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>