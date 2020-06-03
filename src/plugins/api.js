import Vue from 'vue'
export default {
    baseUrl: 'http://47.100.66.36:8081/api/',
    // baseUrl: 'http://localhost:8081/api/',
    video: {
        getVideoByAv: function (issue, av) {
            return Vue.axios.get(`/video/issue/${issue}/av/${av}`);
        },
        listAllTypeTop30: function (issue) {
            return this.search(issue, 30, "全部", "", "point");
        },
        listAllTypeTop: function (issue, top) {
            return this.search(issue, top, "全部", "", "point");
        },
        listTop: function (issue, top, type) {
            return this.search(issue, top, type, "", "point");
        },
        search: function (issue, top, type, searchKey, sortKey) {
            return Vue.axios.get(`/video/issue/${issue}`, {params: {top, type, searchKey, sortKey}});
        },
        falseDelete: function(av) {
            return Vue.axios.delete(`/video/${av}/isDelete/true`);
        },
        delete: function(av) {
            return Vue.axios.delete(`/video/${av}`)
        },
        getDataFile(issue) {
            return Vue.axios.get(`/video/issue/${issue}/data.txt`);
        },
        getNewIssue() {
            return Vue.axios.get(`/video/issue`);
        },
        info: {
            listDeletedVideo() {
                return Vue.axios.get(`/video/info/deleted`);
            },
            listRandom(type, number) {
                return Vue.axios.get(`/video/info/type/${type}/random/${number}`);
            },
            recoveryVideo(av) {
                return Vue.axios.post(`/video/info/deleted/${av}`);
            },
            setStartTime(av, startTime) {
                return Vue.axios.patch(`/video/info/${av}/startTime/${startTime}`);
            },
        }
    },
};
