<template>
  <div id="app">
      <HeaderInfo></HeaderInfo>
      <router-view name="nav"></router-view>
       <router-view></router-view>
       <PlayNusic></PlayNusic>
       <PlayNusicBig></PlayNusicBig>
  </div>
</template>
<script>
import HeaderInfo from './components/header'
import axios from 'axios'
import PlayNusic from './components/play/bottomPlay'
import PlayNusicBig from './components/play/playMp3'
export default {
  name: 'App',
  components:{
    HeaderInfo,
    PlayNusic,
    PlayNusicBig
   }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 40px;
}
/* .contion{
 position:absolute;
 top:5.5rem;
  width:100%;
  margin-bottom:5rem
} */
</style>
