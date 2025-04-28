<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">
        <div class="logo-icon">
          <i class="el-icon-s-platform"></i>
        </div>
        <h1>大模型黑盒攻击防御能力评估平台</h1>
        <h2>用户登录</h2>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" class="login-button" @click="handleLogin">登录</el-button>
        </el-form-item>
        <div class="other-links">
          <span>还没有账号？</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '../api/index';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          api.user.login(this.loginForm)
            .then(response => {
              this.loading = false;
              const userData = response.data;
              // 存储用户信息
              this.$store.dispatch('login', {
                uid: userData.uid,
                username: userData.username
              });
              
              // 同时在localStorage中也存储用户信息，用于顶部导航栏显示
              localStorage.setItem('uid', userData.uid);
              localStorage.setItem('username', userData.username);
              
              // 通过事件总线通知用户信息更新
              this.$bus.$emit('user-updated', userData.username);
              
              // 在localStorage中设置一个标志，表示刚刚登录成功
              localStorage.setItem('showLoginSuccessMessage', 'true');
              
              // 跳转到仪表盘页面
              this.$router.push('/dashboard');
            })
            .catch(error => {
              this.loading = false;
              this.$message.error('登录失败: ' + (error.response && error.response.data && error.response.data.error || '服务器错误'));
            });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    // 检查是否有注册成功的消息需要显示
    if (localStorage.getItem('showRegisterSuccessMessage') === 'true') {
      this.$message.success('注册成功，请登录');
      localStorage.removeItem('showRegisterSuccessMessage'); // 移除标志
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #1a237e, #0288d1, #26a69a);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  position: relative;
  overflow: hidden;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%);
  transform: rotate(30deg);
}

.login-box {
  width: 450px;
  padding: 50px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transform: translateY(0);
  transition: transform 0.3s, box-shadow 0.3s;
  z-index: 10;
  position: relative;
}

.login-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.title {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.logo-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-icon i {
  font-size: 48px;
  padding: 15px;
  background: linear-gradient(45deg, #1a237e, #0288d1);
  color: white;
  border-radius: 50%;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.title h1 {
  font-size: 28px;
  color: #333;
  margin: 0;
  font-weight: 600;
  background: linear-gradient(45deg, #1a237e, #0288d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.title::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #1a237e, #0288d1);
  margin: 15px auto 0;
  border-radius: 2px;
}

.login-form {
  margin-top: 30px;
}

.el-input >>> .el-input__inner {
  height: 50px;
  padding-left: 45px;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.el-input >>> .el-input__prefix {
  left: 12px;
}

.el-input >>> .el-input__icon {
  font-size: 18px;
  color: #1a237e;
}

.el-input >>> .el-input__inner:focus {
  border-color: #1a237e;
  background-color: white;
  box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
}

.login-button {
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 10px;
  background: linear-gradient(90deg, #1a237e, #0288d1);
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 40, 140, 0.2);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s;
}

.login-button:hover::before {
  left: 100%;
}

.login-button:hover {
  background: linear-gradient(90deg, #0288d1, #1a237e);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 40, 140, 0.3);
}

.other-links {
  text-align: center;
  margin-top: 30px;
  font-size: 16px;
  color: #606266;
}

.other-links a {
  color: #0288d1;
  margin-left: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.other-links a:hover {
  color: #1a237e;
  text-decoration: underline;
}

/* 添加响应式适配 */
@media (max-width: 768px) {
  .login-box {
    width: 90%;
    padding: 30px;
  }
}
</style> 