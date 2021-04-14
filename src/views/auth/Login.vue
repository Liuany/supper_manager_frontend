<template>
    <div class="columns py-6">
        <div class="column is-half is-offset-one-quarter">
            <el-card shadow="never">
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    登录
                </div>
                <div>
                    <el-form
                        ref="ruleForm"
                        v-loading="loading"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        label-width="100px" 
                        class="demo-ruleForm">

                        <el-form-item label="账号" prop="userName">
                            <el-input v-model="ruleForm.userName"/>
                        </el-form-item>
                        <el-form-item label="密码" prop="passWord">
                            <el-input v-model="ruleForm.passWord" type="password" autocomplete="off"/>
                        </el-form-item>

                        <el-form-item label="记住密码" prop="rememberMe">
                            <el-switch v-model="ruleForm.rememberMe"></el-switch>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import {login} from '@/api/auth/auth'

export default {
    name: 'Login',
    data() {
        return {
            loading: false,
            redirect: undefined,
            ruleForm: {
                userName: '',
                passWord: '',
                rememberMe: true
            },
            rules: {
                userName: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                ],
                passWord: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.loading = true;
                    this.$store.dispatch("user/login", this.ruleForm).then(() => {
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 2000,
                        });

                        setTimeout(() => {
                            this.loading = false
                            this.$router.push({path: this.redirect || "/"})
                        }, 0.1 * 1000)
                    })
                    .catch (() => {
                        this.loading = false;
                    })
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>