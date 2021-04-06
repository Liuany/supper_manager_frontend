<template>
    <div class="columns py-6">
        <div class="column is-half is-offset-one-quarter">
            <el-card shadow="never">
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    新用户注册
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
                        <!-- 曾经把label-width的属性设置为100px;发现带了';'后label与input出现错位 -->

                        <el-form-item label="账号" prop="username">
                            <el-input v-model="ruleForm.username"/>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPassword">
                            <el-input v-model="ruleForm.checkPassword" type="password" autocomplete="off"/>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback (new Error('请再次输入密码'))
            }else if(value !== this.ruleForm.password){
                callback (new Error('两次输入密码不一致'))
            }else{
                callback()
            }
        }
        return {
            loading: false,
            ruleForm: {
                name: '',
                pass: '',
                checkPass: '',
                email: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                ],
                checkPassword: [
                    {required: true, message: '请再次输入密码', trigger: 'blur'},
                    {validator: validatePass, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid){
                    userRegister(this.ruleForm).then((value) => {
                        const {code, message} = value
                        if (code === 200) {
                            this.$message({
                                message: '账号注册成功',
                                type: 'success'
                            })
                            setTimeout(() => {
                                this.loading = false
                                this.$refs[formName].resetFields()
                            }, 2000)
                        }
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