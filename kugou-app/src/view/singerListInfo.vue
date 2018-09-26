<template>
    <div class="content" style="position:absolute;top:3rem;width:100%">
        <div style="text-align:center" v-show="loading">
            <img src="../assets/loading.gif" style="width:100%" alt="">
        </div>
       <div class="fixTop" style="backgroundColor:#fff" v-show="!loading">
           <i class="iconfont icon-jiantou-zuo" style="fontSize:1.8rem;" @click="goBack"></i>
           <span class="text">{{className}}</span>
       </div>
        <ul id="list">
            <router-link tag='li' v-for="(item,index) in singerList" :key="index" :to="`/singer/info/${item.singerid}`">
               <span class="pic"><img :src="item.imgurl && item.imgurl.replace('{size}',240)" alt=""></span>
               <span class="singername">{{item.singername}}</span> 
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            singerList:[],
            className:'',
            loading:true
        }
    },
   async created(){
        let id = this.$route.params.id

        let {data} = await this.$api.getSingerIdData({id})

        this.className = data.classname
        this.singerList = data.singers.list.info
        this.loading=false
    },
    methods:{
        goBack(){
            this.$router.go(-1)
            this.$store.commit('playMp3')
        }
    }
}
</script>
<style>
.fixTop{
    height:3rem;
    line-height:3rem;
    border-bottom:1px solid #000;
    position: fixed;
    width:100%;
    z-index: 111;
}
.fixTop .text{
    display: inline-block;
    width:11rem;
    padding-left:2rem;
    text-align:center;
    vertical-align: top;
}
#list{
    margin:0;
    padding:0;
    list-style:none;
    padding-top:3rem;
}
#list .pic{
    display: inline-block;
    height:3rem;
    width:3rem;
    vertical-align: middle;
}
#list li{
   line-height:4rem;
   padding-left:1rem;
   border-bottom:1px solid #e5e5e5
}
#list .pic img{
    width:100%;
}
#list .singername{
    vertical-align: middle;
    margin-left:1rem;
    font-size:.9rem
}
</style>

