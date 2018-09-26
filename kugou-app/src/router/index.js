import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import RankInfo from '@/view/rankInfo'
import songListInfo from '@/view/songListInfo'
import SingerListInfo from '@/view/singerListInfo'
import HotSingerList from '@/view/hotSingerList'
import Search from '@/components/search'
import {routes} from './router'
export default new Router({
    mode:'history',
    routes:[
       ...routes,
       {
        path:'/rank/info/:id',
        name:'RankInfo',
        component:RankInfo
        },
        {
        path:'/plist/list/:id',
        name:'songListInfo',
        component:songListInfo
        },
        {
        path:'/singer/list/:id',
        name:'SingerListInfo',
        component:SingerListInfo
        },
        {
        path:'/singer/info/:id',
        name:'HotSingerList',
        component:HotSingerList
        },
        {
            path:'/search',
            name:'Search',
            component:Search
        },
        {
            path:'*',
            redirect: '/'
        }

    ]
})
