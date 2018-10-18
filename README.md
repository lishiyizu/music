# -
酷狗音乐
因为服务端协议的问题github上不能在线预览
 项目描述：
该项目主要是实现音乐的播放，歌词的滚动，上一首/下一首的切换功能；
运用的技术：
vue，vueX, axios, mint-ui, http://www.iconfont.cn/
遇到的问题和解决的办法：
1.跨域获取数据的问题？
解决方案：代理解决跨域
proxyTable: {
"/proxy/": { target: "http://m.kugou.com",//目标的网址
                  "changeOrigin": true, //允许跨域
                  "pathRewrite": { '^/proxy': '' }
               },
 2.数据传递的问题？
问题：简单的数据传递会用props来传递，子组件来接受，但是对于组件嵌套比较深的项目在使用父传子的方式显然是很繁琐的，并且中间可能会出现问题，所以这时我们会想到使用vuex插件。
解决方案：使用vuex
 官方的解释是：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
简单的来说就是一个状态管理器，将所需要用的数据全放在vuex里面，形成一个全局的api,在每个组件里都能直接的使用
let store = new Vuex.Store({ 
 state:{ songUrl: '', 
           imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
           songName: '', 
           singerName: '小音乐',
           currentLength: 0, 
           currentFlag: false,
        ｝
再组件里直接调用
<p>{{$store.state.songName}}</p>
3怎么方便调用获取数据api?
基本的调用数据api的方式：每次使用不同的api都先import xxx from xxxx 引入;
比较简单的是：
// *server/api.js *//
 export default {
      install(Vue){
             Vue.prototype.$api={ 
                      getSongList, 
                      getRankList, 
                      getSong, 
                      getSingerList, 
  } } }
 //“main.js”//引入一次
     import Api from './server/api'
     Vue.use(Api)
 组件里可以直接调用：
async created(){ 
       let {data} = await this.$api.getSongList() 
              this.banner = data.banner 
  }
