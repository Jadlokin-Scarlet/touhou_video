<template>
    <div class="video-card text-left" @click="JumpToBilibili(video.av)">
        <img class="img-fluid video-card-img" :src="video.img" :alt="video.name"/>
        <a class="d-inline-block text-wrap text-truncate text-left video-card-text">{{video.name}}</a>
    </div>
</template>

<script>
    export default {
        name: "VideoCard",
        props: ['video'],
        data() {
            return {
            }
        },
        methods: {
            JumpToBilibili(av) {
                window.open(`https://www.bilibili.com/video/av${av}`);
            }
        }
    }
</script>

<style scoped>
    .video-card {
        height: 160px;
        font-size: 13px;
    }
    .video-card-img {
        width: 200px;
        height: 120px;
    }
    .video-card-text {
        max-width: 200px;
    }
</style>