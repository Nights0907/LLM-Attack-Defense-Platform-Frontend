<template>
  <div class="register-container">
    <div class="register-box">
      <div class="title">
        <div class="logo-icon">
          <i class="el-icon-s-custom"></i>
        </div>
        <h1>大模型黑盒攻击防御能力评估平台</h1>
        <h2>用户注册</h2>
      </div>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" class="register-form">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" prefix-icon="el-icon-lock" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" class="register-button" @click="handleRegister">注册</el-button>
        </el-form-item>
        <div class="other-links">
          <span>已有账号？</span>
          <router-link to="/login">立即登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '../api/index';

export default {
  name: 'Register',
  data() {
    // 密码确认验证
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      loading: false
    };
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          
          const registerData = {
            username: this.registerForm.username,
            password: this.registerForm.password
          };
          
          api.user.register(registerData)
            .then(response => {
              this.loading = false;
              const userData = response.data;
              
              // 存储用户信息
              this.$store.dispatch('login', {
                uid: userData.uid,
                username: userData.username
              });
              
              // 同时在localStorage中也存储用户信息
              localStorage.setItem('uid', userData.uid);
              localStorage.setItem('username', userData.username);
              
              // 通过事件总线通知用户信息更新
              this.$bus.$emit('user-updated', userData.username);
              
              // 设置注册成功消息标志
              localStorage.setItem('showRegisterSuccessMessage', 'true');
              
              this.$router.push('/login');
            })
            .catch(error => {
              this.loading = false;
              this.$message.error('注册失败: ' + (error.response && error.response.data && error.response.data.error || '服务器错误'));
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.register-container {
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

.register-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%);
  transform: rotate(30deg);
}

.register-box {
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

.register-box:hover {
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

.register-form {
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

.register-button {
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

.register-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s;
}

.register-button:hover::before {
  left: 100%;
}

.register-button:hover {
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
  .register-box {
    width: 90%;
    padding: 30px;
  }
}
</style> 