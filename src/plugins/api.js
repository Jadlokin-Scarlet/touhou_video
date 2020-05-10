import Vue from 'vue'
export default {
    baseUrl: 'http://47.100.66.36:8081/api/',
    // baseUrl: 'http://localhost:8081/api/',
    video: {
        listAllTypeTop30: function (issue) {
            return Vue.axios.get(`/video/issue/${issue}`);
        },
        listAllTypeTop: function (issue, top) {
            return Vue.axios.get(`/video/issue/${issue}/top/${top}`);
        },
        listTop: function (issue, top, type) {
            return Vue.axios.get(`/video/issue/${issue}/top/${top}/type/${type}`);
        },
        delete: function(av) {
            return Vue.axios.delete("/video/"+av);
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
