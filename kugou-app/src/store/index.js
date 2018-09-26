import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
// http://m.kugou.com/v3/static/images/index/logo_kugou.png
let store = new Vuex.Store({
    state:{
        songUrl: '',
        imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
        songName: '',
        singerName: '小音乐',
        currentLength: 0,
        currentFlag: false,
        isPlay:false,
        songList:[],
        songIndex:'',
        playMp3:false,
        isShowMp3:false,
        totalTime:0,
        songLrc:'',
        minu:''
    },
    mutations:{
        isPlayMp3(){
            this.state.isPlay = !this.state.isPlay
        },
        playMp3(){ 
            document.getElementById('playOrstop').pause();
            this.state.playMp3=false
            
        },
        starOrstop(){
            if(this.state.isPlay){
                document.getElementById('playOrstop').play(); 
               
            }else{
               document.getElementById('playOrstop').pause();
      
                if(this.state.playMp3){
                    this.state.playMp3=true
                }else{
                    this.state.playMp3=false
                }
            
                    
            }
            store.commit('isPlayMp3')
        },
        prevSong(state){
           if(this.songIndex == 0){
            this.songIndex = this.songList.length-1
           }else{
                this.songIndex--
           }
           var hash = this.songList[this.songIndex].hash

           store.dispatch('getMp3',hash)
        },
        nextSong(){
            if(this.songIndex == this.songList.length-1){
                this.songIndex = 0
            }else{
                this.songIndex++
            }
            var hash = this.songList[this.songIndex].hash
            store.dispatch('getMp3',hash)
        },
        showMp3(){
            this.state.isShowMp3 = true
        },
        stopShowMp3(){
            this.state.isShowMp3 = false
        },
        songTime(state,playload){
                 this.state.currentLength = playload.t
        },
        setCurrentFlag(state,flag){
            this.state.currentFlag = flag
        },
        setMinu(state,flag){
            this.state.minu = flag
        }
    },
    actions:{
       async getMp3(state,hash){
            var lrc =await Vue.prototype.$api.getSongLrc(hash)
            this.state.songLrc = lrc.data.data.lyrics
           let {data} =await Vue.prototype.$api.getPlayMp3(hash)
           if(!data.url){
                alert('没有这首歌，听听别的把')
           }
           this.state.songUrl = data.url
           if(data.imgUrl){
                 this.state.imgUrl = data.imgUrl
           }
         
           this.state.singerName = data.fileName
           this.state.songName = data.songName
           this.state.totalTime = data.timeLength
           this.state.playMp3=true
           if(this.state.isPlay){
               store.commit('isPlayMp3')
           }
        },
        getList(state,data){
            this.songList = data.songList
            this.songIndex = data.index
        },
        
    }
})
export default store