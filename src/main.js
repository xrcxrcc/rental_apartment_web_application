import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/styles/common.less'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAkYOGZsEvRSYYZdzW7sc5LJbhk2rjCxyI',
    libraries: 'places' // You can add other libraries as needed
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
