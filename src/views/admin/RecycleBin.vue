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
                        <td v-for="(head, index) in heads" :key="index">{{video[head] | dateFomatter(head)}}</td>
                        <td class="but-td row">
                            <a :href="`https://www.bilibili.com/video/av${video.av}`" target="_blank">
                                <button type="button" class="btn btn-outline-warning btn-sm">查看</button>
                            </a>
                            <button type="button" class="btn btn-outline-warning btn-sm" @click="recoveryVideo(video.av)" v-if="isAuthenticated">恢复</button>
                            <button type="button" class="btn btn-outline-warning btn-sm" @click="deleteVideo(video.av)" v-if="isAdmin">彻底删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

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
                this.api.video.info.listDeletedVideo()
                    .then(rep => rep.data)
                    .then(data => this.videos = data);
            },
            recoveryVideo: function (av) {
                this.api.video.info.recoveryVideo(av)
                    .then(() => this.updateDeletedVideo());
            },
            deleteVideo: function (av) {
                this.api.video.delete(av)
                    .then(() => this.updateDeletedVideo());
            }
        },
        computed: {
            ...mapGetters([
                'isAuthenticated',
                'isAdmin',
                // ...
            ])
        },
        filters: {
            dateFomatter: function (value, head) {
                if (head === "pubTime") {
                    return value.split(" ")[0];
                }
                return value;
            }
        }
    }
</script>

<style scoped>

</style>