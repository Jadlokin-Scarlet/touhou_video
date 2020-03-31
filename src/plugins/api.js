import Vue from 'vue'
export default {
    baseUrl: 'http://47.100.66.36:8081/api/',
    // baseUrl: 'http://localhost:8081/api/',
    video: {
        list: function (issue) {
            return Vue.axios.get(`/video/issue/${issue}`);
        },
        delete: function(av) {
            return Vue.axios.delete("/video/"+av);
        },
        setStartTime(av, startTime) {
            return Vue.axios.patch(`/video/${av}/startTime/${startTime}`);
        },
        getDataFile(issue) {
            return Vue.axios.get(`/video/issue/${issue}/data.txt`);
        },
        getDeletedVideo() {
            return Vue.axios.get(`/video/deleted`);
        },
        recoveryVideo(av) {
            return Vue.axios.post(`/video/deleted/${av}`);
        }
    },
};
