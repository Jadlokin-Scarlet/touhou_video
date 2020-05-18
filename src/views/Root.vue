<template>
    <div></div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Root",
        mounted: async function () {
            const newIssue = await this.isNewIssueUpdated;
            await this.$router.push({
                path: '/admin/rank/' + newIssue,
            });
        },
        computed: {
            ...mapGetters([
                'isAuthenticated',
                'isAdmin',
                'isNewIssueUpdated',
            ])
        }
    }
</script>

<style scoped>

</style>