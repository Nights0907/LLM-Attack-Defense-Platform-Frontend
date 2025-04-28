<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="welcome-card">
          <h2>欢迎使用大模型黑盒攻击防御能力评估平台</h2>
          <p>本平台提供大模型黑盒攻击和防御能力的综合评估，提供专业的安全分析与优化建议，帮助研究人员和开发者提升模型安全性。</p>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="8">
        <el-card class="dashboard-card">
          <div slot="header" class="clearfix">
            <span>攻击测试</span>
          </div>
          <div class="card-content">
            <i class="el-icon-warning-outline"></i>
            <div class="card-info">
              <div class="card-title">开始黑盒攻击测试</div>
              <div class="card-desc">使用各种攻击方法评估大模型的防御能力</div>
            </div>
          </div>
          <el-button type="primary" @click="$router.push('/attack')" class="card-button">开始测试</el-button>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card class="dashboard-card">
          <div slot="header" class="clearfix">
            <span>历史记录</span>
          </div>
          <div class="card-content">
            <i class="el-icon-time"></i>
            <div class="card-info">
              <div class="card-title">查看历史测试记录</div>
              <div class="card-desc">浏览之前的攻击测试结果和防御效果评估</div>
            </div>
          </div>
          <el-button type="primary" @click="$router.push('/history')" class="card-button">查看记录</el-button>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card class="dashboard-card">
          <div slot="header" class="clearfix">
            <span>系统管理</span>
          </div>
          <div class="card-content">
            <i class="el-icon-setting"></i>
            <div class="card-info">
              <div class="card-title">管理系统配置</div>
              <div class="card-desc">配置攻击方法、防御策略和目标模型</div>
            </div>
          </div>
          <el-button type="primary" @click="$router.push('/manage')" class="card-button">系统设置</el-button>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>本平台支持的目标模型与攻防方法</span>
          </div>
          <el-row>
            <el-col :span="8">
              <div class="model-section">
                <div class="section-header">
                  <i class="el-icon-s-grid"></i>
                  <span>支持的目标模型</span>
                </div>
                <div class="model-list">
                  <div class="model-item" v-for="(model, index) in supportedModels" :key="'model-'+index">
                    <i class="el-icon-circle-check model-check-icon"></i>
                    <span>{{ model }}</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="model-section">
                <div class="section-header">
                  <i class="el-icon-s-data"></i>
                  <span>支持的攻击方法</span>
                </div>
                <div class="model-list">
                  <div class="model-item" v-for="(method, index) in attackMethods" :key="'method-'+index">
                    <i class="el-icon-circle-check model-check-icon"></i>
                    <span>{{ method }}</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="model-section">
                <div class="section-header">
                  <i class="el-icon-s-promotion"></i>
                  <span>支持的防御方法</span>
                </div>
                <div class="model-list">
                  <div class="model-item" v-for="(method, index) in defenseMethods" :key="'method-'+index">
                    <i class="el-icon-circle-check model-check-icon"></i>
                    <span>{{ method }}</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      supportedModels: [
        'OpenAI GPT-3.5 / GPT-4 / GPT-4o',
        'Anthropic Claude 3 系列',
        'DeepSeek-Reasoner / DeepSeek-Chat',
        '通义千问 Qwen-Plus',
        '腾讯混元（Hunyuan-Turbo）'
      ],
      attackMethods: [
        'ReNeLLM 对抗攻击',
        'CodeChameleon 代码注入攻击',
        'DeepInception 深度幻觉攻击',
        'JailbreakingLLM 越狱攻击',
        'SAP（Soft-Attack Prompting）软提示攻击'
      ],
      defenseMethods: [
        'Self-Reminders 提醒机制防御',
        'Goal Priority 目标优先级防御',
        'In-Context Defense 上下文防御'
      ]
    };
  },
  created() {
    // 检查是否需要显示登录成功消息
    if (localStorage.getItem('showLoginSuccessMessage') === 'true') {
      this.$message.success('登录成功');
      localStorage.removeItem('showLoginSuccessMessage'); // 移除标志，避免刷新页面后再次显示
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.welcome-card {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: white;
  text-align: center;
  padding: 20px;
}

.welcome-card h2 {
  margin-top: 0;
}

.dashboard-card {
  height: 250px;
  display: flex;
  flex-direction: column;
}

.card-content {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-grow: 1;
}

.card-content i {
  font-size: 40px;
  margin-right: 20px;
  color: #409EFF;
}

.card-info {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-desc {
  color: #909399;
  font-size: 14px;
}

.card-button {
  width: 100%;
  margin-top: auto;
}

/* 模型与攻击方法样式 */
.model-section {
  padding: 10px 20px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;
}

.section-header i {
  font-size: 20px;
  margin-right: 10px;
  color: #409EFF;
}

.model-list {
  display: flex;
  flex-direction: column;
}

.model-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.model-check-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #52c41a;
  margin-right: 12px;
  font-size: 16px;
}
</style> 