<template>
    <div class="mainInfo" style="position:absolute;top:3rem">
        <div style="text-align:center" v-show="loading">
            <img src="../assets/loading.gif" style="width:100%" alt="">
        </div>
        <div class="top" v-show="!loading">
            <i class="iconfont icon-jiantou-zuo" @click="goBack" style="fontSize:1.5rem"></i>
            <span>{{songInfo.rankname}}</span>
        </div>
        <p style="margin:0" class="showPic">
            <img :src="songInfo.imgurl&&songInfo.imgurl.replace('{size}',240)" alt="">
        </p>
        <ul class="list" style="margin:0;padding:0">
            <li v-for="(item,index) in songList" :key="index" @click="playMp3(item.hash,index)">
                <span>{{item.filename}} </span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            songList:[],
            songInfo:[],
            loading:true


        }
    },
    watch:{
        $route:'getData()'
    },
    methods:{
        async getData(){
            let id = this.$route.params.id

            let {data} =await this.$api.getRankIdData({id})
            this.songList = data.songs.list
            this.songInfo = data.info
            this.loading=false
        },
        playMp3(hash,index){
            this.$store.dispatch('getMp3',hash)
            this.$store.dispatch('getList',{
                songList:this.songList,
                index:index
            })
            this.$store.commit('isPlayMp3')
        },
        goBack(e){
            this.$router.go(-1)
            this.$store.commit('playMp3')
             e.preventDefault();
        }
        
    },
    created(){
       this.getData()
    }
}
</script>

<style>
.mainInfo{
    width:100%;
}
.mainInfo ul{
    list-style:none;
    position: relative;
}
 .top{
    position: fixed;
    top:3rem;
    height:2.5rem;
    background:rgba(0,0,0,0.1);
    width:100%;
    z-index: 33;
}
 .top i{
    display:inline-block;
    color:#fff;
    height:100%;
     margin-top:.5rem;
    margin-left:.5rem;
     vertical-align: top;
}
 .top span{
    display:inline-block;
    color:#fff;
    height:100%;
    width:15rem;
    text-align:center;
    vertical-align: top;
    line-height: 2.5rem;
}
.mainInfo .showPic{
   height:15rem;
   width:100%;
}
.mainInfo img{
   width:100%;
   height:15rem
}
 .list li{
    padding:1rem 0 1rem 0;
    font-size:.8rem;
    border-bottom:1px dashed #f1f1f1;
    margin-left:1rem;
}
.list i{
    position:absolute;
    top:1rem;
    padding:.1rem .2rem;
    font-size:.5rem;
    border:1px solid #fff;
    border-radius: .5rem;
}

</style>

