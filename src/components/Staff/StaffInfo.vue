<template>
    <div id="staff_info">
        <label>姓名：
            <el-input type="text" v-model="con.name" style="width: 166px;" placeholder="请输入要显示的内容"></el-input>
        </label>
        <el-button @click="search" type="primary" th:icon="el-icon-search" style="margin-left: 15px;">查询</el-button>
        <el-button @click="resetSearch" type="success" icon="el-icon-refresh" style="margin-left: 15px;">重置</el-button>
        <el-button type="danger" th:icon="el-icon-plus" v-on:click="createInfo">新增</el-button>

        <el-table :data="info" style="text-align: center; width: 100%;margin-top: 20px;" :border="true"
                  :stripe="true" :highlight-current-row="true">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="staffCode" label="员工编号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别" :formatter="formatterSex"></el-table-column>
            <el-table-column prop="birthday" label="出生日期"></el-table-column>
            <el-table-column prop="positionCode" label="职位" :formatter="formatterPosition"></el-table-column>
            <el-table-column prop="belongsCode" label="所属门店" :formatter="formatterBelongs"></el-table-column>
            <el-table-column prop="linkWay" label="联系方式" width="150"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-row>
                        <el-button @click="edit(scope.row)" size="small" type="primary" plain icon="el-icon-edit" style="margin-left: 10px;">编辑</el-button>
                        <el-button @click="del(scope.row)" size="small" type="danger" plain icon="el-icon-delete" style="margin-left: 10px;">删除</el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <pagination
            v-show="true"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="init"
        />

        <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="40%" @close="closeDialog('ruleForm')">
            <el-form 
                ref="ruleForm" 
                :model="results" 
                label-width="100px" 
                :rules="rules">
                <el-form-item label="姓名：" prop="name" label-width="100px" :required="true">
                    <el-input v-model="results.name"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="sex" style="width:100%" label-width="100px" :required="true">
                    <el-radio v-model="results.sex" label="1" change="change">男</el-radio>
                    <el-radio v-model="results.sex" label="2" change="change">女</el-radio>
                </el-form-item>
                <el-form-item label="出生年月：" prop="birthday" style="width:100%" label-width="100px" :required="true">
                    <el-date-picker v-model="results.birthday"></el-date-picker>
                </el-form-item>
                <el-form-item label="职位：" prop="positionCode" label-width="100px" :required="true">
                    <el-select v-model="results.positionCode" placeholder="请选择">
                        <el-option v-for="item in position" :key="item.value" :label="item.name"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属门店：" prop="belongsCode" label-width="100px" :required="true">
                    <el-select v-model="results.belongsCode" placeholder="请选择">
                        <el-option v-for="item in belongs" :key="item.value" :label="item.name"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式：" prop="linkWay" label-width="100px" :required="true">
                    <el-input v-model="results.linkWay"></el-input>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="success" @click="save('ruleForm')">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {getStaffInfo, save, delById, searchStaffByPage} from '@/api/staff'
    import Pagination from '@/components/Pagination'

    export default {
        name: "MemberInfo",
        components: { Pagination },
        data() {
            return {
                con: {},
                dialogTableVisible: false,
                dialogTitle: '',
                results:{},
                info: [],
                displayType: '',
                position: [],
                belongs: [],
                page: {
                    current: 1,
                    size: 10,
                    total: 0,
                    tab: 'latest'
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    birthday: [
                        {required: true, message: '请选择出生日期', trigger: 'blur'},
                    ],
                    positionCode: [
                        {required: true, message: '请选择职位', trigger: 'blur'},
                    ],
                    belongsCode: [
                        {required: true, message: '请选择所属门店', trigger: 'blur'},
                    ],
                    linkWay: [
                        {required: true, message: '请填写联系电话', trigger: 'blur'},
                    ]
                },
            }
        },
        created() {
            this.init();
            this.position.push({name: "店长", value: "001"});
            this.position.push({name: "导购员", value: "002"});
            this.belongs.push({name: "七匹狼", value: "S"});
            this.belongs.push({name: "忘不了", value: "W"});
        },
        methods: {
            createInfo: function () {
                 this.dialogTitle = '新增',
                this.dialogTableVisible = true;
            },
            init: function () {
                getStaffInfo(this.page.current, this.page.size).then((response) => {
                    const { data } = response
                    this.page.current = data.current
                    this.page.total = data.total
                    this.page.size = data.size
                    this.info = data.records
                })
            },
            save: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        save(this.results).then((response) => {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                duration: 2000,
                            })
                            //关闭窗口
                            this.closeDialog(formName)
                            //刷新页面
                            this.refresh()
                        })
                    }
                })
            },
            edit: function (row) {
                this.dialogTitle = '编辑'
                // 这一句是关键！！使用this.results = row的方式会使编辑行的数据发生变化
                this.results = Object.assign({}, row)
                this.dialogTableVisible = true
            },
            del: function (row) {
                this.$confirm('此操作将本条员工信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delById(row.id).then((response) => {
                        const { code } = response
                        if (200 === code) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            //刷新页面
                            this.init()
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                    })
                }).catch(() => {
                    //取消的提示
                });
            },
            search: function () {
                if (JSON.stringify(this.con) !== "{}") {
                    searchStaffByPage(this.page.current, this.page.size,this.con).then((response) => {
                        const { data } = response
                        this.page.current = data.current
                        this.page.total = data.total
                        this.page.size = data.size
                        this.info = data.records
                    })
                }else{
                    this.init()
                }
            },
            refresh: function () {
                //刷新页面
                this.init()
                //刷新菜单导航
                this.$emit('postChildInfo')
            },
            cancel: function () {
                this.dialogTableVisible = false;
            },
            closeDialog: function (formName) {
                //清空表单
                this.results = {}
                // 重置表单
                this.$refs[formName].resetFields()
                //关闭窗口
                this.dialogTableVisible = false
            },
            refresh: function () {
                //刷新页面
                this.init()
            },
            resetSearch: function () {
                //重置查询条件
                this.con = {}
                //重置page
                this.page.current = 1
                this.page.size = 10
                //刷新数据
                this.init()
            },
            formatterSex: function (row, column, cellValue, index) {
                return row.sex == '1' ? '男' : row.sex == '2' ? '女' : '未知';
            },
            formatterBelongs: function (row, column, cellValue, index) {
                return row.belongsCode == 'S' ? '七匹狼' : row.belongsCode == 'W' ? '忘不了' : '未知';
            },
            formatterPosition: function (row, column, cellValue, index) {
                return row.positionCode == '001' ? '店长' : row.positionCode == '002' ? '导购员' : '未知';
            }
        }
    }
</script>

<style scoped>
    #member_info {
        margin-left: 20px;
        margin-top: 10px;
    }
</style>