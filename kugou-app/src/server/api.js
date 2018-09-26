import axios from 'axios'
let instace = axios.create({
    baseUrl : 'http://m.kugou.com'
})
let getLrc = axios.create({
    baseUrl : 'http://www.kugou.com'
})
let getSearch =axios.create({
    baseUrl:'http://mobilecdn.kugou.com'
})
// export default instace.get('/proxy/?json=true').then(({data})=>{
//     console.log(data)
// })
export function getSongList(){
    return instace.get('/proxy/?json=true');
}
export function getRankList(){
    return instace.get('/proxy/rank/list?json=true')
}
export function getSong(){
    return instace.get('/proxy/plist/index?json=true')
}
export function getSingerList(){
    return instace.get('/proxy/singer/class?json=true')
}
export function getPlayMp3(hash){
    return instace.get(`/proxy/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`)
}
export function getSongLrc(hash){
    return getLrc.get(`/kugou/yy/index.php?r=play/getdata&hash=${hash}`)
}
export function getRankIdData(params={id:''}){
    return instace.get(`/proxy/rank/info/${params.id}?json=true`)
}
export function getSingListIdData(params={id:''}){
    return instace.get(`/proxy/plist/list/${params.id}?json=true`)
}
export function getSingerIdData(params={id:''}){
    return instace.get(`/proxy/singer/list/${params.id}?json=true`)
}
export function getHotSingerIdData(params={id:''}){
    return instace.get(`/proxy/singer/info/${params.id}?json=true`)
}
export function getSearchList(params={keyword:''}){
    return getSearch.get(`/search/api/v3/search/song?format=json&keyword=${params.keyword}&page=1&pagesize=20&showtype=1`)
}

//设置vue的插件
export default {
    install(Vue){
        Vue.prototype.$api={
            getSongList,
            getRankList,
            getSong,
            getSingerList,
            getPlayMp3,
            getRankIdData,
            getSingListIdData,
            getSingerIdData,
            getHotSingerIdData,
            getSongLrc,
            getSearchList
        }
    }
}