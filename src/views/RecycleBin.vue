<template>
    <div class="container-fluid">
        <div class="row">
            <table class="table table-hover table-bordered table-sm">
                <thead class="">
                <tr>
                    <th scope="col" v-for="(head, index) in heads" :key="index">{{head}}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody v-if="videos.length > 0">
                    <tr v-for="(video, index) in videos" :key="index">
                        <td v-for="(head, index) in heads" :key="index">{{video[head]}}</td>
                        <td class="but-td">
                            <a :href="`https://www.bilibili.com/video/av${video.av}`" target="_blank">
                                <button type="button" class="btn btn-outline-primary btn-sm">查看</button>
                            </a>
                            <button type="button" class="btn btn-outline-primary btn-sm" @click="recoveryVideo(video.av)">恢复</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RecycleBin",
        data() {
            return {
                videos: [],
                heads: ['av', 'name', 'owner', 'type', 'pubTime']
            }
        },
        mounted: function () {
            this.updateDeletedVideo();
        },
        methods: {
            updateDeletedVideo: function () {
                this.api.video.getDeletedVideo()
                    .then(rep => rep.data)
                    .then(data => this.videos = data);
            },
            recoveryVideo: function (av) {
                this.api.video.recoveryVideo(av)
                    .then(() => this.updateDeletedVideo());
            }
        }
    }
</script>

<style scoped>

</style>