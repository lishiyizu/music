
酷狗音乐<br/>

因为服务端协议的问题github上不能在线预览<br/>
 项目描述：<br/>
该项目主要是实现音乐的播放，歌词的滚动，上一首/下一首的切换功能；<br/>
运用的技术：<br/>
vue，vueX, axios, mint-ui, http://www.iconfont.cn/<br/>
遇到的问题和解决的办法：<br/>
1.跨域获取数据的问题？<br/>
解决方案：代理解决跨域<br/>
proxyTable: {<br/>
"/proxy/": { target: "http://m.kugou.com",//目标的网址<br/>
                  "changeOrigin": true, //允许跨域<br/>
                  "pathRewrite": { '^/proxy': '' }<br/>
               },<br/>
 2.数据传递的问题？<br/>
问题：简单的数据传递会用props来传递，子组件来接受，但是对于组件嵌套比较深的项目在使用父传子的方式显然是很繁琐的，并且中间可能会出现问题，所以这时我们会想到使用vuex插件。<br/>
解决方案：使用vuex<br/>
 官方的解释是：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。<br/>
简单的来说就是一个状态管理器，将所需要用的数据全放在vuex里面，形成一个全局的api,在每个组件里都能直接的使用<br/>
let store = new Vuex.Store({<br/><br/> 
 state:{    songUrl: '', <br/>
           imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',<br/>
           songName: '', <br/>
           singerName: '小音乐',<br/>
           currentLength: 0, <br/>
           currentFlag: false,<br/>
        ｝
再组件里直接调用<br/>
<p>{{$store.state.songName}}</p><br/>
3怎么方便调用获取数据api?<br/>
基本的调用数据api的方式：每次使用不同的api都先import xxx from xxxx 引入;<br/>
比较简单的是：<br/>
// *server/api.js *//<br/>
 export default {<br/>
      install(Vue){<br/>
             Vue.prototype.$api={ <br/>
                      getSongList, <br/>
                      getRankList, <br/>
                      getSong, <br/>
                      getSingerList, <br/>
  } } }
 //“main.js”//引入一次<br/>
     import Api from './server/api'<br/>
     Vue.use(Api)<br/>
 组件里可以直接调用：<br/>
async created(){ <br/>
       let {data} = await this.$api.getSongList() <br/>
              this.banner = data.banner <br/>
  }
