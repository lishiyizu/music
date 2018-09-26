<template>
    <mt-header fixed title="我的酷狗" style="z-index:5">
        <router-link to="/" slot="left">
            <mt-button ><img src="../assets/logo.png" alt=""></mt-button>
        </router-link>
        <router-link to="/search" slot="right">
            <mt-button ><img src="../assets/search.png" alt=""></mt-button>
        </router-link>
    </mt-header>
</template>
<script>
export default {
    
}
</script>

<style>
.mint-header{
    height:3rem;
}
.mint-header.is-fixed{
    font-size:1rem;
}
.mint-button-text img{
    height:1.5rem
}
.mint-header-title{
    font-size:1rem
}
.mint-cell{
    min-height:3rem;
}
.mint-cell-text{
 font-size:1rem;
}
.mint-button-text{
    display: inline-block;
    
}
.mint-header .mint-button{
    height:1.5rem;
}
</style>

