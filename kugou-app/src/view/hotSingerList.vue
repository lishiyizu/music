<template>
    <div class="contion" style="position:absolute;top:3rem" >
         <div style="text-align:center" v-show="loading">
            <img src="../assets/loading.gif" style="width:100%" alt="">
        </div>
        <div class="top" v-on:click.stop v-show="!loading">
            <i class="iconfont icon-jiantou-zuo" style="fontSize:1.5rem" @click="goBack"></i>
            <span>{{songInfo.singername}}</span>
        </div>
        <p style="margin:0">
            <img :src="songInfo.imgurl&&songInfo.imgurl.replace('{size}',240)" alt="">
        </p>
         <div style="width:18rem; position:relative" class="text">
             <p :class="showIcon ? 'isShow' :'show'">{{songInfo.intro}}</p>
             <i :class="`iconfont ${showIcon?'icon-xiala-copy-copy':'icon-xiala-copy'}`" style="fontSize:1.5rem" @click="open"></i>
        </div>
        <ul class="list" style="margin-top:.3rem;padding:0">
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
            showIcon:true,
            loading:true
        }
    },
  async created(){
        let id = this.$route.params.id
        let {data} =await this.$api.getHotSingerIdData({id})
        this.songList = data.songs.list
        this.songInfo = data.info
        this.loading=false
    },
    methods:{
        playMp3(hash,index){
            this.$store.dispatch('getMp3',hash)
            this.$store.dispatch('getList',{
                songList:this.songList,
                index:index
            })
            this.$store.commit('isPlayMp3')
        },
        goBack(){
            this.$router.go(-1)
            this.$store.commit('playMp3')
        },
        open(){
           this.showIcon = !this.showIcon
        }
    }
}
</script>
<style>
    .contion{
        width:100%;
    }
    .list{
        list-style:none;
        position: relative;
        margin-bottom:4rem
    }
    .contion .top{
        position: fixed;
        top:3rem;
        height:2.5rem;
        background:rgba(0,0,0,0.1);
        width:100%;
        z-index: 222;
    }
    .contion .top i{
        display:inline-block;
        color:#fff;
        height:100%;
        margin-top:.5rem;
        margin-left:.5rem;
        vertical-align: top;
    }
    .contion .top span{
        display:inline-block;
        color:#fff;
        height:100%;
        width:15rem;
        text-align:center;
        vertical-align: top;
        font-size:.8rem;
        line-height: 2.5rem;
    }
    .isShow{
        font-size:.8rem;
        line-height:1.8rem;
        margin-left:1rem;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        border-bottom:1px solid #f1f1f1
    }
    .contion .text i{
        position: absolute;
        right:-1.7rem;
        top:.1rem
    }
    .show{
        font-size:.8rem;
        line-height:1.8rem;
        margin-left:1.5rem;
        border-bottom:1px solid #f1f1f1
    }
    .contion img{
        width:100%;
        height:14rem
    }
    .iconfont{
        font-size:1rem
    }
    .contion .list li{
        padding:1rem 1rem 1rem 0;
        font-size:.8rem;
        border-bottom:1px dashed #f1f1f1;
        margin-left:1rem;
    }
    .contion .list i{
        position:absolute;
        top:1rem;
        padding:.1rem .2rem;
        font-size:.5rem;
        border:1px solid #fff;
        border-radius: .5rem;
    }

</style>

