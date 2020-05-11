<template>
    <header class="headerc">
        <span @click="goBack">
            < 返回
        </span>
    </header>
</template>
<script>
export default {
    methods:{
        goBack(){
            this.$router.push('/');
        }
    }
}
</script>
<style lang="less" scoped>
</style>