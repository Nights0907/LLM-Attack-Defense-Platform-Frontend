<template>
  <div id="app">
    <el-container v-if="$route.path !== '/login' && $route.path !== '/register'">
      <!-- 顶部栏 -->
      <el-header height="64px" class="main-header">
        <div class="top-header">
          <div class="logo-area">
            <img src="./assets/logo.png" alt="Logo" height="36">
            <span class="logo-text">LLM-Attack&Defense-Platform</span>
          </div>
          <div class="user-info">
            <span class="welcome-text">欢迎，</span>
            <span class="username">{{ currentUsername }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="logout" class="logout-btn">退出</el-button>
          </div>
        </div>
      </el-header>
      
      <el-container class="main-container">
        <!-- 侧边栏 -->
        <el-aside width="240px" class="main-sidebar">
          <el-menu mode="vertical" :router="true" background-color="#001529" text-color="rgba(255,255,255,0.65)" active-text-color="#1890ff" :default-active="activeMenu" class="sidebar-menu">
            <el-menu-item index="/dashboard">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/attack">
              <i class="el-icon-s-tools"></i>
              <span slot="title">攻击测试</span>
            </el-menu-item>
            <el-menu-item index="/history">
              <i class="el-icon-document"></i>
              <span slot="title">历史记录</span>
            </el-menu-item>
            <el-menu-item index="/manage">
              <i class="el-icon-setting"></i>
              <span slot="title">系统管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        
        <!-- 主内容区域 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    username() {
      return this.$store.state.user.username || '用户';
    }
  },
  data() {
    return {
      activeMenu: '',
      currentUsername: ''
    }
  },
  created() {
    this.activeMenu = this.$route.path;
    this.currentUsername = this.$store.state.user.username || '用户';
    
    // 监听用户信息更新事件
    this.$bus.$on('user-updated', (username) => {
      this.currentUsername = username;
    });
  },
  watch: {
    $route(to) {
      this.activeMenu = to.path;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.currentUsername = '用户';
      this.$router.push('/login');
    }
  }
}

</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(0,0,0,0.85);
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
  overflow: hidden;
}

/* 顶部栏样式 */
.main-header {
  background-color: #002140;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);
  padding: 0;
  position: relative;
  z-index: 11;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 3px;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo-text {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 12px;
  white-space: nowrap;
}

.app-title {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  position: absolute;
  left: 35%;
  transform: translateX(-50%);
}

.user-info {
  display: flex;
  align-items: center;
  color: rgba(255,255,255,0.85);
}

.welcome-text {
  color: rgba(255,255,255,0.65);
  font-size: 14px;
}

.username {
  color: #fff;
  font-weight: 500;
  margin: 0 8px;
}

.logout-btn {
  color: rgba(255,255,255,0.85);
  font-size: 14px;
  margin-left: 8px;
  transition: all 0.3s;
}

.logout-btn:hover {
  color: #fff;
  opacity: 0.85;
}

/* 内容容器 */
.main-container {
  height: calc(100vh - 64px);
}

/* 侧边栏样式 */
.main-sidebar {
  background-color: #001529;
  height: 100%;
  overflow-y: auto;
  position: relative;
  z-index: 10;
  box-shadow: 2px 0 8px rgba(0,21,41,0.15);
}

.sidebar-menu {
  border-right: none !important;
}

.sidebar-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
  margin: 4px 0;
  padding: 0 24px !important;
  font-size: 14px;
  transition: all 0.3s ease;
  border-radius: 0 22px 22px 0;
  border: none !important;
}

.sidebar-menu .el-menu-item:hover {
  background-color: rgba(24,144,255,0.1) !important;
  color: #1890ff !important;
}

.sidebar-menu .el-menu-item.is-active {
  background-color: #1890ff !important;
  color: white !important;
}

.sidebar-menu .el-menu-item i {
  margin-right: 10px;
  font-size: 18px;
  transition: all 0.3s;
}

/* 主内容区域样式 */
.el-main {
  background-color: #f0f2f5;
  padding: 24px;
  overflow-y: auto;
  height: 100%;
  border: none;
}

/* 卡片样式 */
.el-card {
  border-radius: 8px;
  border: none;
  margin-bottom: 24px;
  box-shadow: 0 1px 2px -2px rgba(0,0,0,0.12), 0 3px 6px 0 rgba(0,0,0,0.08), 0 5px 12px 4px rgba(0,0,0,0.05) !important;
  transition: all 0.3s;
}

.el-card:hover {
  box-shadow: 0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px 0 rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05) !important;
  transform: translateY(-2px);
}

.el-card__header {
  padding: 16px 20px;
  font-weight: 500;
  border-bottom: 1px solid #f0f0f0;
}

.el-card__body {
  padding: 20px;
}

/* 按钮样式 */
.el-button {
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-weight: 400;
}

.el-button:hover {
  transform: translateY(-1px);
}

.el-button--primary {
  background-color: #1890ff;
  border-color: #1890ff;
}

.el-button--primary:hover, 
.el-button--primary:focus {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.el-button--success {
  background-color: #52c41a;
  border-color: #52c41a;
}

.el-button--success:hover, 
.el-button--success:focus {
  background-color: #73d13d;
  border-color: #73d13d;
}

.el-button--danger {
  background-color: #f5222d;
  border-color: #f5222d;
}

.el-button--danger:hover, 
.el-button--danger:focus {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

/* 表格样式 */
.el-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03);
}

.el-table th {
  background-color: #fafafa;
  color: rgba(0,0,0,0.85);
  font-weight: 500;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #fafafa;
}

.el-table__row:hover > td {
  background-color: #e6f7ff !important;
}

/* 进度条样式 */
.el-progress-bar__inner {
  transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
}

/* 分页样式 */
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #1890ff;
}

/* 标签样式 */
.el-tag {
  border-radius: 4px;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.2);
}

::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
}
</style> 