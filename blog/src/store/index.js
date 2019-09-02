import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { // 初始值（状态）初始数据
    user_name: ''
  },
  // 更新state的逻辑
  mutations: {
    // eslint-disable-next-line camelcase
    'SET_MSG': function (state, user_name) {
      // eslint-disable-next-line camelcase
      state.user_name = user_name
      console.log('保存', state.user_name)
    }
  },
  // 获取数据从state中获取 state的计算属性
  getters: {
    'GET_MSG': function (state) {
      console.log('获取', state.user_name)
      return state.user_name
    }
  },
  // 触发mutations
  actions: {
    // eslint-disable-next-line camelcase
    'SET_MSG': function (state, user_name) {
      store.commit('SET_MSG', user_name)
    }
  }

})

export default store
