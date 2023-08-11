import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
import ProDetail from '@/views/prodetail/index'
import RoomDetail from '@/views/prodetail/roomDetail'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'
import Home from '@/views/layout/home'
import Like from '@/views/layout/like'
import Stays from '@/views/layout/stays'
import Profile from '@/views/layout/profile'
import Apply from '@/views/apply/apply'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/like', component: Like },
        { path: '/stays', component: Stays },
        { path: '/profile', component: Profile }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/prodetail/:id/:rmid', component: RoomDetail },
    { path: '/prodetail/:id/:rmid/apply', component: Apply },
    { path: '/pay/:id/:rmid/:payid', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})
const authUrls = ['/pay', '/myorder', '/profile']
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else if (to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
