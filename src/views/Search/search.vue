<template>
    <div class="search">
        <header>
            <span @click="goBack">返回</span>
            <input type="text" @input="changSearch" v-model="msg">
        </header>
        <div v-html='dataList'></div>
    </div>
</template>

<script>
export default {
    name: "search",
    data(){
        return{
            msg:"",
            dataList:""
        }
    },
    methods:{
       changSearch(){
           this.$http.get(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.msg}&dotime=1528960226000`).then(res=>{
                this.dataList=res
           })
       },
       goBack(){
        this.$router.go(-1)
       } 
    }
}
</script>

<style scoped>
    .search{
        width: 100%;
    }
</style>
