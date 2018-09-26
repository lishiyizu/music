<template>
     <div class="m-main" v-show="$store.state.isShowMp3">
       <audio autoplay :src="$store.state.songUrl" id="playOrstop" @timeupdate="change()" @ended="next"></audio>
        <div class="tops" v-on:click.stop>
            <i class="iconfont icon-jiantou-zuo" style="fontSize:1.5rem;color:#fff" @click="goBack"></i>
            <span>{{$store.state.singerName}}</span>
        </div>
        <div class="bg-overlay"></div>
        <div class="play-overlay">
            <img :src="$store.state.imgUrl && $store.state.imgUrl.replace('{size}',240)" 
            v-lazy="$store.state.imgUrl.replace('{size}',240)"></div>
        <div class="m-lyric-area">
          <div class="m-lyric" :style="{marginTop: lrcOffset + 'px' }">
                <P v-show="isLrc" style="margin-top:3rem;font-size:1.5rem;color:orange">暂无歌词</P>
                 <p v-for="(item,index) in songLrc" v-show="!isLrc"
              :class="{isCurrentLrc:item.seconds >= $store.state.currentLength }" :key="index"
             >
              {{item.lrcContent}}
           </p>
          
          </div>
        </div>
       <div class="m-bottom">
          <div class="m-progress-box">
            <span class="current-time" style="margin-right:.8rem">{{this.$store.state.currentLength | time}}</span>
            <mt-range
              v-model="this.$store.state.currentLength"
              :min="0"
              :max="this.$store.state.totalTime"
              :bar-height="3"
              @click.native="rangeChange($event)"
              style="width:13rem"
              >
            </mt-range>
            <span class="total-time"  style="margin-left:.8rem">{{this.$store.state.totalTime | time}}</span>
          </div>
          <div class="m-play-control">
            <div class="m-play-btn m-play-prev-btn iconfont icon-bofangqi-shangyiji" @click="prevSong"></div>
            <div :class=" `m-play-btn iconfont ${this.$store.state.isPlay?'icon-bofangqi01':'icon-bofangqizanting-copy'}`" @click="boFang"></div>
            <div 
            class="m-play-btn iconfont icon-bofangqi-xiayiji m-play-next-btn"
            @click="nextSong"
            ></div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isLrc:true
    }
  },
  filters:{
    time(value){
      var length = Math.floor(parseInt(value))
      var min = Math.floor(parseInt(value/60))
      if(min<10){
        min = '0'+min
      }else{
        min
      }
      var second = length%60
      if(second<10){
        second = '0'+ second
      }else{
        second
      }
      return min + ':' + second
    }
  },
  methods:{
    goBack(){
      this.$store.commit('stopShowMp3')
    },
    boFang(){
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
    rangeChange(e){
        var offset = event.offsetX

        var rangeWidth = (document.documentElement.clientWidth-26) * 0.8-26

        var clickLength = Math.floor(offset * this.$store.state.totalTime / rangeWidth)
        if (offset < rangeWidth) {
          this.$store.commit('songTime',{
            t:clickLength
          } )
        this.$store.commit('setCurrentFlag', true);
          
        }
    },
    change(){
       var audio =  document.getElementById('playOrstop')
          var time = audio.currentTime
          if(this.$store.state.currentFlag){
              document.getElementById('playOrstop').currentTime =this.$store.state.currentLength
              this.$store.commit('setCurrentFlag', false);
          }else{
             this.$store.commit('songTime',{
                  t:time
              })
          }
    },
    next(){
      this.$store.commit('nextSong')
    }
  },
  computed:{
    songLrc(){
        if (this.$store.state.songLrc && this.$store.state.songLrc !=="") {

              this.isLrc=false
              var temp =this.$store.state.songLrc.split('\r\n')

              temp = temp.splice(0, temp.length - 1)
                var time=''
              temp = temp.map((value)=> {
              
                  time = value.substr(1, 5)
                  this.time = time

                  var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
                  var lrcContent = value.substr(10)
                  return {
                    seconds,
                    lrcContent
                  }
              })
              return temp;
        }
    },  
    lrcOffset(){
        if (this.songLrc) { 
            var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length-1) * (-36)
            return this.$store.state.currentLength+offset-this.$store.state.currentLength;
        }
    }
   }
}
</script>

<style>
 .isCurrentLrc{
    color: orange;
} 
  .mt-range-thumb{
    top:.5rem;
    width:.6rem;
    height:.6rem;
  }
  .mt-range-content,.mt-range-runway{
    width:100%;
    margin:0;
  }
.m-main .tops{
    position: fixed;
    top:0;
    height:2.5rem;
    background:rgba(0,0,0,0.1);
    width:100%;
    z-index: 222;
  }
    .m-main .tops i{
        display:inline-block;
        color:#fff;
        height:100%;
        margin-top:.5rem;
        margin-left:.5rem;
        vertical-align: top;
    }
    .m-main  .tops span{
        display:inline-block;
        color:#fff;
        height:100%;
        width:15rem;
        text-align:center;
        vertical-align: top;
        line-height: 2.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
 .iconfont{
   font-size:2rem;
  
 }
  .m-main {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      box-sizing: border-box;
      color: #fff;
      background:#7B68EE;
      transition: .5s;
      z-index: 10000;
      overflow: hidden;
    }
    .bg-overlay {
     background: url(https://y.gtimg.cn/music/photo_new/T002R300x300M000003lFlWa0CwNbA.jpg?max_age=2592000) no-repeat;
       /* background:#7B68EE;  */
      background-size: cover;
      filter: blur(10px);
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    .play-overlay {
       /* background: url(../assets/ba.jpg); */
        width: 12rem;
        height: 12rem;
        position: absolute;
        top: 3rem;
        left: 4rem;
        background: rgba(0,0,0,.6);
    }
   .play-overlay img{
        width: 100%;
       
    }

    .hide-player {
      background: rgba(255,255,255,0);
      color: #fff;
      z-index: 999;
      height: 1rem;
    }



    .m-bottom {
      /* width: 100%; */
      position: absolute;
      top:27rem;
      left: 1rem;
    }

    .m-progress-box {
      /* padding: 0 .2rem; */
      box-sizing: border-box;
      font-size: .8rem;
      display: flex;
      align-items: center;

    }

    .m-progress-box span {
      width: 2rem;
    }

    .m-progress {
      width: 13rem;
      height: .44rem;
      margin:.5rem;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    .m-progress-line {
      width: 100%;
      background:#9c8d88;
      height: .2rem;
      position: relative;
    }

    .m-progress-lineed {
      width: 0;
      background: #d23d43;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }

    .m-progress-circle {
      width: .6rem;
      height: .6rem;
      background: #fff;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      z-index: 2;
    }

    .m-play-control {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: .1rem;
    }

    .m-play-play-btn {
      width: 1rem;
      height: 1rem;
      background: #c84040;
      border-radius: 50%;
      margin: 0px .56rem;
      

    }

    .m-play-btn:before {
      font-size: 3rem;
      color: #fff;
      display: block;
      text-align: center;
      line-height: .85rem;
      margin-top:1rem;
      margin-right:.5rem;
    }

    .m-play-play-btn {
      font-size: .8rem;
      color: #fff;
      display: block;
      text-align: center;
      line-height: 1rem;
    }

    .m-play-btn {
      width: 2.5rem;
      height: 2.5rem;
      /* background: #7B68EE; */
      border-radius: 50%;
      margin: 0 1rem 0 0;
    }


    .m-lyric-area {
      height: 11rem;
      overflow: auto;
      position: relative;
      top:15rem;
      z-index: 2;
      margin-top: .6rem;
    }

    .m-lyric {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      transition: all .8s;
      transform: translateZ(0);
    }

    .m-lyric-area p {
      text-align: center;
      line-height:18px;
      font-size: 18px;
      height:18px;
    }


    .m-lyric .bg {
      color: red;
      font-size: .4rem;
    }
</style>