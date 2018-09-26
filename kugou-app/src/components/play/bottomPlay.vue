<template>
    <div class="bottom"  v-show="this.$store.state.playMp3">
        <div style="display:inline-block;width:11rem" @click="showMp3">
            <!-- <audio autoplay :src="$store.state.songUrl" id="playOrstop"></audio> -->
            <span><img :src="$store.state.imgUrl && $store.state.imgUrl.replace('{size}',240)" alt=""></span>
            <div style="display:inline-block;width:3rem;vertical-align:middle">
                <p>{{$store.state.songName}}</p>
                <p style="color:#f3f3f3">{{$store.state.singerName}}</p>
            </div>
        </div>
        <div style="display:inline-block;float:right;margin:1rem 2rem 0 0" > 
            <i class="iconfont icon-bofangqi-shangyiji" @click="prevSong"></i>
            <i :class="`iconfont ${this.$store.state.isPlay?'icon-bofangqi01':'icon-bofangqizanting-copy'}`" @click="change"></i>
            <i class="iconfont icon-bofangqi-xiayiji" @click="nextSong"></i>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        change(){
                 this.$store.commit('starOrstop')
           
        },
        prevSong(){
            this.$store.commit('prevSong')
            if(this.$store.state.isPlay){
                this.$store.commit('isPlayMp3')
            }
        },
        nextSong(){
            this.$store.commit('nextSong')
        },
        showMp3(){
            this.$store.commit('showMp3')
        }
     }
}
</script>
<style scoped>
.bottom{
   position:fixed;
   bottom:0;
   background:#000;
   width:100%;
   height:4rem
}
.bottom span{
    display:inline-block;
    height:4rem;
    width:4rem;
    vertical-align:middle
}
.bottom img{
    height:4rem;
    width:4rem;
    
}
.bottom p{
    margin:0;
    width:8rem;
    font-size:.5rem;
    color:#fff;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
}
.iconfont{
    font-size:2rem;
    color:#fff
}
</style>

