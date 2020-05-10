<template>
    <div class="container-fluid">
        <nav class="nav nav-pills flex-column">
            <a class="nav-link" href="#" @click="jumpToNewRank">最新一期</a>
            <a class="nav-link dropdown-toggle" data-toggle="collapse" href="#docCollapse" role="button" aria-haspopup="true" aria-expanded="false">往期</a>
            <div id="docCollapse" class="collapse">
                <a class="nav-link mt-1" href="#" v-for="(index, value) in intList(0, state.newIssue)" :key="index" @click="jumpToOldRank(value)">第{{value}}期</a>
            </div>
            <a class="nav-link" href="#" @click="jumpToRecycleBin">回收站</a>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Left",
        data() {
            return {
                state: this.$store.state,
            }
        },
        methods: {
            jumpToOldRank: function(issue) {
                this.$store.commit('setIssue', issue);
                this.$router.push({
                    name: 'rank',
                });
            },
            jumpToNewRank: function () {
                this.$store.commit('setIssue', this.state.newIssue);
                this.$router.push({
                    name: 'rank',
                });
            },
            jumpToRecycleBin: function () {
                this.$router.push({
                    name: 'recycleBin'
                })
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
    .show>.nav-link {
        color: #007bff;
        background-color: #ffffff;
    }
</style>