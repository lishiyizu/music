
import Song from '@/view/song'
import Rank from '@/view/rank'
import SongList from '@/view/songList'
import Singer from '@/view/singer'
import Nav from '@/components/nav'
export let routes=[
    {
        path:'/',
        title:'新歌',
        name:'Song',
        components:{
            nav:Nav,
            default:Song    
        }
    },
     {
        path:'/rank',
        title:'排行',
        name:'Rank',
        components:{
            nav:Nav,
            default:Rank    
        }
    },
     {
        path:'/plish',
        title:'歌单',
        name:'SongList',
        components:{
            nav:Nav,
            default:SongList    
        }
    },
     {
        path:'/singer',
        title:'歌手',
        name:'Singer',
        components:{
            nav:Nav,
            default:Singer    
        }
    }
   
]