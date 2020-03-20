import Vue from 'vue'
export default {
    video: {
        list: function (issue) {
            return Vue.axios.get(`/video/issue/${issue}`);
        },
        delete: function(av) {
            return Vue.axios.delete("/video/"+av);
        },
        setStartTime(av, startTime) {
            return Vue.axios.patch(`/video/${av}/startTime/${startTime}`);
        }
    },
}
