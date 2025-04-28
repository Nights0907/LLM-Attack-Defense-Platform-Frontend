import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: localStorage.getItem('uid') || '',
      username: localStorage.getItem('username') || ''
    },
    models: [],
    attackMethods: [],
    defenseMethods: []
  },
  getters: {
    isLoggedIn: state => !!state.user.uid,
    currentUser: state => state.user
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('uid', user.uid)
      localStorage.setItem('username', user.username)
    },
    clearUser(state) {
      state.user = { uid: '', username: '' }
      localStorage.removeItem('uid')
      localStorage.removeItem('username')
    },
    setModels(state, models) {
      state.models = models
    },
    setAttackMethods(state, methods) {
      state.attackMethods = methods
    },
    setDefenseMethods(state, methods) {
      state.defenseMethods = methods
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('clearUser')
    },
    fetchModels({ commit }) {
      return Vue.prototype.$http.post('/api/models')
        .then(response => {
          commit('setModels', response.data)
          return response.data
        })
    },
    fetchAttackMethods({ commit }) {
      return Vue.prototype.$http.get('/api/attack/methods')
        .then(response => {
          commit('setAttackMethods', response.data)
          return response.data
        })
        .catch(error => {
          console.error('获取攻击方法列表失败:', error)
          return []
        })
    },
    fetchDefenseMethods({ commit }) {
      return Vue.prototype.$http.get('/api/defense/methods')
        .then(response => {
          commit('setDefenseMethods', response.data)
          return response.data
        })
        .catch(error => {
          console.error('获取防御方法列表失败:', error)
          return []
        })
    }
  },
  modules: {
  }
}) 