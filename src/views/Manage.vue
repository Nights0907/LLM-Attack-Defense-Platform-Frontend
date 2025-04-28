<template>
    <div class="manage-container">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-tabs v-model="activeTab" type="card">
            <el-tab-pane label="模型管理" name="models">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>模型列表</span>
                  <el-button style="float: right;" type="primary" size="small" @click="showAddModelDialog">添加模型</el-button>
                </div>
                <el-table :data="models" style="width: 100%">
                  <el-table-column prop="model_name" label="模型名称" width="240"></el-table-column>
                  <el-table-column prop="base_url" label="API地址"></el-table-column>
                  <el-table-column prop="api_key" label="API密钥" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{ hideApiKey(scope.row.api_key) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button @click="editModel(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="deleteModel(scope.row)" type="text" size="small" style="color: #F56C6C;">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-tab-pane>
            
            <el-tab-pane label="攻击方法管理" name="attack">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>攻击方法列表</span>
                  <el-button style="float: right;" type="primary" size="small" @click="showAddAttackDialog">添加攻击方法</el-button>
                </div>
                <el-table :data="attackMethods" style="width: 100%">
                  <el-table-column prop="id" label="ID" width="100"></el-table-column>
                  <el-table-column prop="name" label="攻击方法名称" width="180"></el-table-column>
                  <el-table-column prop="description" label="攻击方法描述" show-overflow-tooltip width="320">
                    <template slot-scope="scope">
                      <span>{{ scope.row.description || '暂无描述' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="prompt" label="攻击提示词模板" show-overflow-tooltip width="300">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" width="400" trigger="hover">
                        <div style="max-height: 300px; overflow-y: auto;">{{ scope.row.prompt || '暂无提示词' }}</div>
                        <div slot="reference" class="prompt-preview">{{ scope.row.prompt ? scope.row.prompt.substring(0, 50) + '...' : '暂无提示词' }}</div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button @click="editAttackMethod(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="deleteAttackMethod(scope.row)" type="text" size="small" style="color: #F56C6C;">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-tab-pane>
            
            <el-tab-pane label="防御方法管理" name="defense">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>防御方法列表</span>
                  <el-button style="float: right;" type="primary" size="small" @click="showAddDefenseDialog">添加防御方法</el-button>
                </div>
                <el-table :data="defenseMethods" style="width: 100%">
                  <el-table-column prop="id" label="ID" width="100"></el-table-column>
                  <el-table-column prop="name" label="防御方法名称" width="180"></el-table-column>
                  <el-table-column prop="description" label="防御方法描述" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{ scope.row.description || '暂无描述' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="prompt" label="防御提示词模板" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-popover
                        placement="top-start"
                        width="400"
                        trigger="hover">
                        <div style="max-height: 300px; overflow-y: auto;">{{ scope.row.prompt || '暂无提示词' }}</div>
                        <div slot="reference" class="prompt-preview">{{ scope.row.prompt ? scope.row.prompt.substring(0, 50) + '...' : '暂无提示词' }}</div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button @click="editDefenseMethod(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="deleteDefenseMethod(scope.row)" type="text" size="small" style="color: #F56C6C;">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      
      <!-- 模型对话框 -->
      <el-dialog :title="dialogType === 'add' ? '添加模型' : '编辑模型'" :visible.sync="modelDialogVisible">
        <el-form :model="modelForm" :rules="modelRules" ref="modelForm" label-width="100px">
          <el-form-item label="模型名称" prop="model_name">
            <el-input v-model="modelForm.model_name"></el-input>
          </el-form-item>
          <el-form-item label="API地址" prop="base_url">
            <el-input v-model="modelForm.base_url"></el-input>
          </el-form-item>
          <el-form-item label="API密钥" prop="api_key">
            <el-input v-model="modelForm.api_key" type="password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modelDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveModel">确定</el-button>
        </div>
      </el-dialog>
      
      <!-- 攻击方法对话框 -->
      <el-dialog :title="dialogType === 'add' ? '添加攻击方法' : '编辑攻击方法'" :visible.sync="attackDialogVisible">
        <el-form :model="attackForm" :rules="attackRules" ref="attackForm" label-width="130px">
          <el-form-item label="攻击方法名称" prop="name">
            <el-input v-model="attackForm.name"></el-input>
          </el-form-item>
          <el-form-item label="攻击方法描述" prop="description">
            <el-input type="textarea" v-model="attackForm.description" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="攻击提示词模板" prop="prompt">
            <el-input type="textarea" v-model="attackForm.prompt" :rows="10"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attackDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAttackMethod">确定</el-button>
        </div>
      </el-dialog>
      
      <!-- 防御方法对话框 -->
      <el-dialog :title="dialogType === 'add' ? '添加防御方法' : '编辑防御方法'" :visible.sync="defenseDialogVisible">
        <el-form :model="defenseForm" :rules="defenseRules" ref="defenseForm" label-width="130px">
          <el-form-item label="防御方法名称" prop="name">
            <el-input v-model="defenseForm.name"></el-input>
          </el-form-item>
          <el-form-item label="防御方法描述" prop="description">
            <el-input type="textarea" v-model="defenseForm.description" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="防御提示词模板" prop="prompt">
            <el-input type="textarea" v-model="defenseForm.prompt" :rows="8"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="defenseDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDefenseMethod">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import api from '../api/index';
  import axios from 'axios';
  
  export default {
    name: 'Manage',
    data() {
      return {
        activeTab: 'models',
        models: [],
        attackMethods: [],
        defenseMethods: [],
        
        dialogType: 'add', // 'add' 或 'edit'

        oldAttackMethodName: '',
        oldDefenseMethodName: '',

        // 模型表单
        modelDialogVisible: false,
        modelForm: {
          model_name: '',
          base_url: '',
          api_key: ''
        },
        modelRules: {
          model_name: [
            { required: true, message: '请输入模型名称', trigger: 'blur' }
          ],
          base_url: [
            { required: true, message: '请输入API地址', trigger: 'blur' }
          ],
          api_key: [
            { required: true, message: '请输入API密钥', trigger: 'blur' }
          ]
        },
        
        // 攻击方法表单
        attackDialogVisible: false,
        attackForm: {
          name: '',
          description: '',
          prompt: ''
        },
        attackRules: {
          name: [
            { required: true, message: '请输入攻击方法名称', trigger: 'blur' }
          ],
          prompt: [
            { required: true, message: '请输入攻击提示词模板', trigger: 'blur' }
          ]
        },
        
        // 防御方法表单
        defenseDialogVisible: false,
        defenseForm: {
          name: '',
          description: '',
          prompt: ''
        },
        defenseRules: {
          name: [
            { required: true, message: '请输入方法名称', trigger: 'blur' }
          ],
          prompt: [
            { required: true, message: '请输入防御提示词', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.fetchModels();
      this.fetchAttackMethods();
      this.fetchDefenseMethods();
    },
    methods: {
      // 模型管理方法
      fetchModels() {
        this.$store.dispatch('fetchModels')
          .then(models => {
            this.models = models;
          })
          .catch(error => {
            console.error('获取模型列表失败:', error);
            this.$message.error('获取模型列表失败');
          });
      },
      hideApiKey(key) {
        if (!key) return '';
        if (key.length <= 8) {
          return '*'.repeat(key.length);
        }
        return key.substring(0, 4) + '*'.repeat(key.length - 8) + key.substring(key.length - 4);
      },
      showAddModelDialog() {
        this.dialogType = 'add';
        this.modelForm = {
          model_name: '',
          base_url: '',
          api_key: ''
        };
        this.modelDialogVisible = true;
      },
      editModel(model) {
        this.dialogType = 'edit';
        this.modelForm = {
          model_name: model.model_name,
          base_url: model.base_url,
          api_key: model.api_key
        };
        this.modelDialogVisible = true;
      },
      saveModel() {
        this.$refs.modelForm.validate(valid => {
          if (valid) {
            // 在实际应用中，这里应该调用API保存模型信息
            this.$message.success(`${this.dialogType === 'add' ? '添加' : '更新'}模型成功`);
            this.modelDialogVisible = false;

            // 模拟添加/更新
            if (this.dialogType === 'add') {
              this.models.push({...this.modelForm});
            } else {
              const index = this.models.findIndex(m => m.model_name === this.modelForm.model_name);
              if (index !== -1) {
                this.models.splice(index, 1, {...this.modelForm});
              }
            }
          }
        });
      },
      deleteModel(model) {
        this.$confirm(`确定要删除模型 "${model.model_name}" 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 在实际应用中，这里应该调用API删除模型
          const index = this.models.findIndex(m => m.model_name === model.model_name);
          if (index !== -1) {
            this.models.splice(index, 1);
          }
          this.$message.success('删除模型成功');
        }).catch(() => {});
      },

   // 攻击方法管理
fetchAttackMethods() {
  this.$store.dispatch('fetchAttackMethods')
    .then(methods => {
      this.attackMethods = methods;
    })
    .catch(error => {
      console.error('获取攻击方法失败:', error);
      this.$message.error('获取攻击方法列表失败');
    });
},

      showAddAttackDialog() {
        this.dialogType = 'add';
        this.attackForm = {
          name: '',
          description: '',
          prompt: ''
        };
        this.attackDialogVisible = true;
      },
      editAttackMethod(method) {
        this.dialogType = 'edit';
        this.oldAttackMethodName = method.name;
        this.attackForm = {
          name: method.name,
          description: method.description || '',
          prompt: method.prompt || '# 此处为示例提示词模板\ndef attack(prompt):\n    # 在此实现攻击逻辑\n    return modified_prompt'
        };
        this.attackDialogVisible = true;
      },
      saveAttackMethod() {
        this.$refs.attackForm.validate(valid => {
          if (valid) {
            // 构造API需要的参数格式
            const formData = {
              attack_method_name: this.attackForm.name,
              attack_method_prompt: this.attackForm.prompt,
              attack_method_description: this.attackForm.description
            };
            
            // 如果是编辑，则添加old_attack_method_name字段
            if (this.dialogType === 'edit') {
              formData.old_attack_method_name = this.oldAttackMethodName;
              formData.new_attack_method_name = this.attackForm.name;
              formData.new_attack_method_prompt = this.attackForm.prompt;
              formData.new_attack_method_description = this.attackForm.description;
            }
            
            // 根据对话框类型决定调用哪个API
            const apiCall = this.dialogType === 'add' 
              ? api.attack.addAttackMethod(formData)
              : api.attack.updateAttackMethod(formData);
              
            apiCall
              .then(response => {
                this.$message.success(`${this.dialogType === 'add' ? '添加' : '更新'}攻击方法成功`);
                this.attackDialogVisible = false;
                this.fetchAttackMethods(); // 重新获取列表
              })
              .catch(error => {
                this.$message.error(`${this.dialogType === 'add' ? '添加' : '更新'}攻击方法失败: ` + (error.response && error.response.data && error.response.data.error || '服务器错误'));
              });
          }
        });
      },
      deleteAttackMethod(method) {
        this.$confirm(`确定要删除攻击方法 "${method.name}" 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用API删除攻击方法
          api.attack.deleteAttackMethod({ 
            attack_method_name: method.name 
          })
          .then(response => {
            this.$message.success('删除攻击方法成功');
            this.fetchAttackMethods(); // 重新获取列表
          })
          .catch(error => {
            this.$message.error('删除攻击方法失败: ' + (error.response && error.response.data && error.response.data.error || '服务器错误'));
          });
        }).catch(() => {});
      },
      
      // 防御方法管理
      fetchDefenseMethods() {
        this.$store.dispatch('fetchDefenseMethods')
          .then(methods => {
            this.defenseMethods = methods;
          })
          .catch(error => {
            console.error('获取防御方法失败:', error);
            this.$message.error('获取防御方法列表失败');
          });
      },
      showAddDefenseDialog() {
        this.dialogType = 'add';
        this.defenseForm = {
          name: '',
          description: '',
          prompt: ''
        };
        this.defenseDialogVisible = true;
      },
      editDefenseMethod(method) {
        this.dialogType = 'edit';
        this.oldDefenseMethodName=method.name;
        this.defenseForm = {
          name: method.name,
          description: method.description || '',
          prompt: method.prompt || ''
        };
        this.defenseDialogVisible = true;
      },
      saveDefenseMethod() {
        this.$refs.defenseForm.validate(valid => {
          if (valid) {
            // 构造API需要的参数格式
            const formData = {
              defense_method_name: this.defenseForm.name,
              defense_method_prompt: this.defenseForm.prompt,
              defense_method_description: this.defenseForm.description
            };
            
            // 如果是编辑，则添加old_defense_method_name字段
            if (this.dialogType === 'edit') {
              formData.old_defense_method_name = this.oldDefenseMethodName;
              formData.new_defense_method_name = this.defenseForm.name;
              formData.new_defense_method_prompt = this.defenseForm.prompt;
              formData.new_defense_method_description = this.defenseForm.description;
            }
            
            // 根据对话框类型决定调用哪个API
            const apiCall = this.dialogType === 'add' 
              ? api.defense.addDefenseMethod(formData)
              : api.defense.updateDefenseMethod(formData);
              
            apiCall
              .then(response => {
                this.$message.success(`${this.dialogType === 'add' ? '添加' : '更新'}防御方法成功`);
                this.defenseDialogVisible = false;
                this.fetchDefenseMethods(); // 重新获取列表
              })
              .catch(error => {
                this.$message.error(`${this.dialogType === 'add' ? '添加' : '更新'}防御方法失败: ` + (error.response && error.response.data && error.response.data.error || '服务器错误'));
              });
          }
        });
      },
      deleteDefenseMethod(method) {
        this.$confirm(`确定要删除防御方法 "${method.name}" 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用API删除防御方法
          api.defense.deleteDefenseMethod({ 
            defense_method_name: method.name 
          })
          .then(response => {
            this.$message.success('删除防御方法成功');
            this.fetchDefenseMethods(); // 重新获取列表
          })
          .catch(error => {
            this.$message.error('删除防御方法失败: ' + (error.response && error.response.data && error.response.data.error || '服务器错误'));
          });
        }).catch(() => {});
      }
    }
  };
  </script>
  
  <style scoped>
  .manage-container {
    padding: 20px;
  }
  
  .prompt-preview {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  </style> 