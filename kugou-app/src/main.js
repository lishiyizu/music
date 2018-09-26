// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Api from './server/api'
import store from './store'
import VueLazyload from 'vue-lazyload'
Vue.use(Api)
Vue.use(MintUI)
Vue.use(VueLazyload, {
  loading: require('./assets/loading.gif')
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
