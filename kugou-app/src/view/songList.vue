<template>
    <div class="contion" style="position:absolute;top:4rem">
        <div style="text-align:center" v-show="loading">
            <img src="../assets/loading.gif" style="width:100%" alt="">
        </div>
        <ul class="mainss" v-show="!loading">
            <router-link tag='li' 
                v-for="item in list" 
                :key="item.rankid" class="item" 
                :to="`/plist/list/${item.specialid}`">
                <p>
                    <img :src="item.imgurl" v-lazy="item.imgurl" alt="">
                </p>
                <div class="title">
                    <span class="sub-title" style="margin-top:1rem">{{item.specialname}}</span>
                    <span class="playcount">
                        <i class="iconfont icon-erji1" style="fontSize:1.5rem"></i>
                        {{item.playcount}}</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            loading:true
        }
    },
   async created(){
        let{data} =await this.$api.getSong()
        this.list=data.plist.list.info
        this.loading=false
          this.list.map(item=>{
           item.imgurl = (item.imgurl).split('/{size}').join('')
        })
    }
}
</script>
<style>
.mainss{
     padding:0;
    list-style:none;
    padding-left:1rem
}
.mainss .item .title{
    width:10rem;
    font-size:.8rem;
}
.item .title{
     display: inline-block;
     vertical-align: middle;
     margin-left:1rem;
}
.mainss li p{
    width:5rem;
    height:5rem;
    background:yellow;
   display: inline-block;
    vertical-align: middle;
    margin:0;
    margin:12px 0 12px 0;
}
.mainss li img{
    width:100%;
    height:100%;
}
.mainss .item{
    border-top:1px dashed #f1f1f1;
    border-bottom:1px solid #f1f1f1;
    margin-bottom:-1px
}
.title .playcount{
    display:block;
    color:#9b9b9b;
    margin-top:.5rem;
}
.iconfont{
    color:#000
}
</style>

