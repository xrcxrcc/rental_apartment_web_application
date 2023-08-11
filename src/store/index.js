import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import apartments from './modules/apartments'
import apartdetail from './modules/apartdetail'
import comment from './modules/comment'
import payList from './modules/payList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apartments,
    apartdetail,
    comment,
    payList
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    apartments,
    apartdetail,
    comment,
    payList
  }
})
