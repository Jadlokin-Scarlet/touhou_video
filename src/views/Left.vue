<template>
    <div class="container-fluid">
        <nav class="nav flex-column nav-pills">
<!--            <router-link :to="{ name: 'newRank', params: { issue: 1}}">最新一期</router-link>-->
            <a class="nav-link active" href="#" @click="jumpToNewRank">最新一期</a>
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">往期</a>
            <div class="dropdown-menu">
                <div v-for="(index, value) in intList(0, 1)" :key="index">
                    <a class="nav-link" href="#" @click="jumpToOldRank(value)">第{{value}}期</a>
                </div>
            </div>
            <a class="nav-link" href="#">设置</a>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Left.vue",
        methods: {
            jumpToOldRank: function(issue) {
                this.$router.push({
                    name: 'rank',
                    params: {
                        issue: issue,
                    }
                });
            },
            jumpToNewRank: function () {
                this.$router.push({
                    name: 'newRank',
                });
            },
            intList: function(start, end) {
                let ans = [];
                if(start > end) return ans;
                do {
                    ans.push(start);
                } while(++start <= end);
                return ans
            }
        }
    }
</script>

<style scoped>

</style>