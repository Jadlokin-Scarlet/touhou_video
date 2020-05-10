<template>
    <div></div>
</template>

<script>
    export default {
        name: "Root",
        mounted: function () {
            this.$router.push({
                path: '/admin',
            });
        }
    }
</script>

<style scoped>

</style>