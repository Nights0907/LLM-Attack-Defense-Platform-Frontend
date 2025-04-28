import axios from 'axios'

const api = {
  // 日志相关
  log: {
    // 用户登录
    log() {
      return axios.post('/api/logs')
    },
  },
  // 用户相关
  user: {
    // 用户登录
    login(data) {
      return axios.post('/api/users/login', data)
    },
    // 用户注册
    register(data) {
      return axios.post('/api/users/register', data)
    }
  },
  
  // 攻击相关
  attack: {
    // 执行攻击测试
    executeAttack(data) {
      return axios.post('/api/attack/execute', data)
    },
    // 执行流式攻击测试
    streamAttack(data) {
      return {
        url: '/api/attack/execute/stream',
        method: 'post',
        data: data
      }
    },
    // 添加攻击方法
    addAttackMethod(data) {
      return axios.post('/api/attack', data)
    },
    // 修改攻击方法
    updateAttackMethod(data) {
      return axios.put('/api/attack', data)
    },
    // 删除攻击方法
    deleteAttackMethod(data) {
      return axios.delete('/api/attack', { params: data })
    },
    // 获取所有攻击方法
    getAllMethods() {
      return axios.get('/api/attack/methods')
    },
    // 获取历史记录
    getHistory(data) {
      return axios.post('/api/history', data)
    },
    // 获取历史详情
    getHistoryDetail(data) {
      return axios.post('/api/history/details', data)
    }
  },
  
  // 防御相关
  defense: {
    // 添加防御方法
    addDefenseMethod(data) {
      return axios.post('/api/defense', data)
    },
    // 修改防御方法
    updateDefenseMethod(data) {
      return axios.put('/api/defense', data)
    },
    // 删除防御方法
    deleteDefenseMethod(data) {
      return axios.delete('/api/defense', { params: data })
    },
    // 获取所有防御方法
    getAllMethods() {
      return axios.get('/api/defense/methods')
    }
  },
  
  // 模型相关
  model: {
    // 获取所有模型
    getAllModels() {
      return axios.post('/api/models')
    },
    // 根据名称获取模型信息
    getModelByName(data) {
      return axios.post('/api/models/info', data)
    }
  }
}

export default api 