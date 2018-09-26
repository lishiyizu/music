<template>
    <div class="contions">
         <div style="text-align:center" v-show="loading">
            <img src="../assets/loading.gif" style="width:100%" alt="">
        </div>
        <ul class="mains" id="mains" v-show="!loading">
            <router-link tag='li' v-for="item in list" 
                :key="item.rankid" 
                class="item" id="item" 
                :to="`/singer/list/${item.classid}`">
                <div class="title">
                    <span >{{item.classname}}</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            loading:true
        }
    },
   async created(){
        let {data} = await this.$api.getSingerList()
        this.list = data.list
        this.loading=false
    }
}
</script>
<style scoped>
.contions{
    position:absolute;
    top:0rem;
    width:100%
} 
.mains{
    margin-top:5.5rem;
    list-style:none;
    margin-left:-1.5rem;
}
#mains{
    padding-right:1rem;
   
}
.mains .item{
    font-size:1rem;  
}
.item .title{
     display: inline-block;
     vertical-align: middle;
     margin-left:1rem;
}
.mains #item{
    background:#fbfbfb;
    margin-bottom:.5rem;
    line-height:3rem;
}
</style>

