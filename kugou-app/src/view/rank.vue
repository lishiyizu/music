<template>
    <div class="contion" style="position:absolute;top:5rem;width:100%">
        <div style="text-align:center" v-show="loading">
            <img src="../assets/loading.gif" style="width:100%" alt="">
        </div>
        <ul class="main" v-show="!loading" >
            <router-link v-for="item in list" 
            :key="item.rankid" class="item" 
            :to="`/rank/info/${item.rankid}`" is-link tag='li'>
                <p>
                <img :src="item.banner7url" v-lazy="item.banner7url" alt="">
                </p>
            <div class="title">
                <span>{{item.rankname}}</span>
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
        let {data}= await this.$api.getRankList()
        this.list = data.rank.list
        this.loading=false
        this.list.map(item=>{
           item.banner7url = (item.banner7url).split('/{size}').join('')
        })
    }
}
</script>

<style>   
.contion .main{
    padding:0;
    margin:0;
    list-style:none;
    margin-left:1rem
}     
.item .title{
     display: inline-block;
     vertical-align: middle;
     margin-left:1rem;
}
.main li p{
    width:5rem;
    height:5rem;
    background:yellow;
   display: inline-block;
    vertical-align: middle;
    margin:0;
    margin:12px 0 12px 0;
}
.main li img{
    width:100%;
    height:100%;
}
.main .item{
    border-top:1px dashed #f1f1f1;
    border-bottom:1px solid #f1f1f1;
    margin-bottom:-1px
}
</style>
