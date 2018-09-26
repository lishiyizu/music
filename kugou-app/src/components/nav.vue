<template>  
    <mt-navbar v-model="selected" fixed>
        <mt-tab-item :id="item.path" v-for="item in routes" 
            :key="item.path" 
            @click.native="hide" 
            :class="{isSelected:path == item.path}">
            <router-link :to="{path:item.path}" tab="div">{{item.title}}</router-link>
        </mt-tab-item>
    </mt-navbar> 
</template>
<script>
import {routes} from '@/router/router'
export default {
    data(){
       return {
           routes,
           selected:'/',
           path:''
       } 
    },
    methods:{
        hide(){
         this.$store.commit('playMp3')
        }
    },
    watch:{
        $route:{
            handler(){
                let path = this.$route.path
                this.path = path
            },
            immediate :true
        }
    }
}
</script>
<style scoped>
.mint-navbar .mint-tab-item.is-selected {
    border-bottom:none;
    color:none;
    margin-bottom:0;
}
.mint-navbar .mint-tab-item.isSelected {
    border-bottom: 3px solid #26a2ff;
    color: #26a2ff;
    margin-bottom: -3px;
}
.mint-tab-item-label a{
    text-decoration: none;
    font-size:.9rem;
   color:#333;
}
.mint-navbar.is-fixed{
    right: 0;
    left: 0;
    top:3rem;
    position: fixed;
}
</style>
