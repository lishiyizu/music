<template>
<div class="searchInfo">
    <div class="tops">
        <i class="iconfont icon-jiantou-zuo" style="fontSize:1.5rem;color:#000" @click ="goBack"></i>
        <span>搜索</span>
    </div>
    <mt-search
      fixed
      v-model="value"
      cancel-text="取消"
      placeholder="请输入：歌手/歌名/拼音"
      @keydown.native.enter="search"
      @blur.native.capture="search"
    ></mt-search>
     <div class="songs-list">
        <div style="text-align:center" v-show="loading">
          <img src="../assets/loading.gif" style="width:100%" alt="">
        </div>
      <div v-for="(item,index) in songList" @click.native="playAudio(index)" 
      :key="index"
      v-show="!loading"
      class="message"
      @click="playMp3(item.hash,index)"
      >
       <span>{{item.filename}}</span> 
        <!-- <img src="../assets/images/download_icon.png" width="20" height="20"> -->
      </div>
    </div>
</div>

</template>
<script>
    export default {
      data(){
        return {
            value:'',
            songList:[],
            loading:true
        }
      },
      methods:{
        async search(){
          if(this.value){

            let{data}=await this.$api.getSearchList({
              keyword:this.value
            })
            this.songList = data.data.info
            this.loading=false
            this.value = ''

          }
        },
        goBack(){
          this.$router.go(-1)
        },
         playMp3(hash,index){
            this.$store.dispatch('getMp3',hash)
            this.$store.dispatch('getList',{
                songList:this.songList,
                index:index
            })
            this.$store.commit('isPlayMp3')
        }
      }
    }
</script>
<style>
.mint-searchbar{
  position:absolute;
  top:5rem;
  width:100%;
}
.mint-search{
  height:0vh;
  height:100%
}
.message{
  font-size:.9rem;
  padding: 1rem .5rem 1rem .5rem;
  border-bottom:1px dashed #e5e5e5;
}
.songs-list{
  margin-top:6rem;
}
.searchInfo .tops{
  position: fixed;
  height:2.5rem;
  background:#fff;
  width:100%;
  z-index: 222;
}
.searchInfo .tops i{
    display:inline-block;
    height:100%;
    margin-top:.5rem;
    margin-left:.5rem;
    vertical-align: top;
}
.searchInfo .tops span{
    display:inline-block;
    color:#000;
    height:100%;
    width:15rem;
    text-align:center;
    vertical-align: top;
    font-size:.8rem;
    line-height: 2.5rem;
}
</style>


