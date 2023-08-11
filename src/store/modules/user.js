import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    const userInfo = getInfo()
    return {
      userInfo,
      likeQuery: userInfo.likeQuery || []
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    },
    setLikeQuery (state, rmid) {
      const index = state.likeQuery.indexOf(rmid)
      if (index === -1) {
        state.likeQuery.push(rmid)
      } else {
        state.likeQuery.splice(index, 1)
      }
      state.userInfo.likeQuery = state.likeQuery
      setInfo(state.userInfo)
    }
  },
  actions: {
    userLogout ({ commit }) {
      console.log('执行 logout')
      commit('setUserInfo', {}) // 将用户信息设置为空对象来清除用户信息
    },
    addToLikeQuery ({ commit, state }, rmid) {
      commit('setLikeQuery', rmid)
    }
  },
  getters: {}
}
