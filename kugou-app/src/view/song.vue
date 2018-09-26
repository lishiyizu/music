<template>

<div class="contion" style="position:absolute;top:5.5rem">
    <div style="text-align:center" v-show="loading">
        <img src="../assets/loading.gif" style="width:100%" alt="">
    </div>
    <div class="banner"  v-show="!loading">
        <mt-swipe :auto="2000" >
            <mt-swipe-item v-for="item in banner" :key="item.id" >
                <img :src="item.imgurl" style="height:8rem">
            </mt-swipe-item>   
        </mt-swipe>
    </div>
    <div class="list">
            <mt-cell v-for="(item,index) in list" :title="item.filename" :key="index" style="display:block"
            @click.native="play(item.hash,index)" 
            >
            </mt-cell>
    </div>
</div>     
</template>
<script>
export default {
    data(){
        return{
            banner:[],
            list:[],
            loading:true
        }
    },
   methods:{
       play(hash,index){
            this.$store.dispatch('getMp3',hash);
            this.$store.dispatch('getList',{
                songList:this.list,
                index:index
                });
            if(this.$store.state.isPlay){
                this.$store.commit('isPlayMp3')
            }
            
        }
    },
   async created(){
           let {data}  = await this.$api.getSongList() 
           this.banner = data.banner
            this.list = data.data
            this.loading = false
           
    }
}
</script>

<style>
.contion{
    width:100%;
} 
.mint-swipe-items-wrap{
    width:100%
}
.mint-swipe-item img{
    width:100%
}
.banner{
    width:100%;
    height:8rem;
}
.mint-cell{
    border-bottom:1px dashed #e5e5e5;
}
.mint-cell-title{
    font-size:14px;
}
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
    width:5rem;
    font-size:.5rem;
    color:#fff
}
</style>

