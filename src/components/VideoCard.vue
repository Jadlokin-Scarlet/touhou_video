<template>
    <div class="video-card text-left" @mouseover="showDelete" @mouseout="hideDelete">
        <div class="position-relative">
            <img class="img-fluid height-120px" width="200px" :src="video.img" :alt="video.name" @click="JumpToBilibili(video.av)"/>
            <div class="video-card-delete" v-if="isAuthenticated" v-show="isShowDelete" @click="deleteVideo">
                <a>x</a>
            </div>
        </div>
        <a class="d-inline-block text-wrap text-truncate text-left video-card-text" @click="JumpToBilibili(video.av)">{{video.name}}</a>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "VideoCard",
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
    .video-card {
        height: 160px;
        font-size: 13px;
    }
    .height-120px {
        height: 120px;
    }
    .video-card-text {
        max-width: 200px;
    }
    .video-card-delete {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>