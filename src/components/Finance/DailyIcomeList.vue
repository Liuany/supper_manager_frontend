<template>
    <div id="daily_income">
        <span class="demonstration1">起始日期：</span>
        <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
        <el-button @click="search" type="primary" th:icon="el-icon-search" style="margin-left: 15px;">查询</el-button>
        <el-button @click="resetSearch" type="success" icon="el-icon-refresh" style="margin-left: 15px;">重置</el-button>
        <el-button type="danger" th:icon="el-icon-plus" v-on:click="createInfo">新增</el-button>

        <el-table :data="info" style="text-align: center; width: 100%;margin-top: 20px;" :border="true"
                  :stripe="true" :highlight-current-row="true" show-summary>
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column prop="date" label="日期" width="120"></el-table-column>
            <el-table-column prop="salesCount" label="销售件数"></el-table-column>
            <el-table-column prop="salesPrice" label="销售面值"></el-table-column>
            <el-table-column prop="cashReceivable" label="应收现金"></el-table-column>
            <el-table-column prop="cardIncome" label="刷卡"></el-table-column>
            <el-table-column prop="weChatIncome" label="微收"></el-table-column>
            <el-table-column prop="ticketReduce" label="券减免"></el-table-column>
            <el-table-column prop="balance" label="充值抵扣"></el-table-column>
            <el-table-column prop="tally" label="记账"></el-table-column>
            <el-table-column prop="cashReceipts" label="实收现金"></el-table-column>
            <el-table-column prop="fund" label="备用金"></el-table-column>
            <!-- <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                    <el-row>
                        <el-button @click="del(scope.row)" size="small" type="danger" plain icon="el-icon-delete" style="margin-left: 10px;">查看</el-button>
                        <el-button @click="edit(scope.row)" size="small" type="primary" plain icon="el-icon-edit" style="margin-left: 10px;">编辑</el-button>
                        <el-button @click="del(scope.row)" size="small" type="danger" plain icon="el-icon-delete" style="margin-left: 10px;">删除</el-button>
                    </el-row>
                </template>
            </el-table-column> -->
        </el-table>

        <!--分页-->
        <pagination
            v-show="true"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="init"
        />

        <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="45%" @close="closeDialog('ruleForm')">
            <el-form 
                ref="ruleForm" 
                :model="results" 
                label-width="100px" 
                :rules="rules">
                <el-form-item label="日期：" prop="date" label-width="100px" :required="true">
                    <el-date-picker v-model="results.date"></el-date-picker>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="销售件数：" prop="salesCount" :required="true">
                            <el-input v-model="results.salesCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="销售面值：" prop="salesPrice" :required="true">
                            <el-input v-model="results.salesPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="应收现金：" prop="cashReceivable" label-width="100px" :required="true">
                            <el-input v-model="results.cashReceivable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="刷卡：" prop="cardIncome" label-width="100px" :required="true">
                            <el-input v-model="results.cardIncome"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="微收：" prop="weChatIncome" label-width="100px" :required="true">
                            <el-input v-model="results.weChatIncome"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="券减免：" prop="ticketReduce" label-width="100px" :required="true">
                            <el-input v-model="results.ticketReduce"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="充值抵扣：" prop="balance" label-width="100px" :required="true">
                            <el-input v-model="results.balance"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="记账：" prop="tally" label-width="100px" :required="true">
                            <el-input v-model="results.tally"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="实收现金：" prop="cashReceipts" label-width="100px" :required="true">
                            <el-input v-model="results.cashReceipts"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备用金：" prop="fund" label-width="100px">
                            <el-input v-model="results.cashReceipts"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注：" prop="remark"> 
                    <el-input type="textarea" :rows="3" v-model="results.linkWay"></el-input>
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
    import {getDailyIncome} from '@/api/finance'
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
                    total: 0
                },
                rules: {
                    date: [
                        {required: true, message: '日期不能不空', trigger: 'blur'},
                    ],
                    salesCount: [
                        {required: true, message: '销售件数不能为空', trigger: 'blur'},
                    ],
                    salesPrice: [
                        {required: true, message: '销售面值不能为空', trigger: 'blur'},
                    ],
                    cashReceivable: [
                        {required: true, message: '应收现金不能为空', trigger: 'blur'},
                    ],
                    cashReceipts: [
                        {required: true, message: '实收现金不能为空', trigger: 'blur'},
                    ],
                    cardIncome: [
                        {required: true, message: '刷卡不能为空', trigger: 'blur'},
                    ],
                    salesPrice: [
                        {required: true, message: '销售面值不能为空', trigger: 'blur'},
                    ],
                    ticketReduce: [
                        {required: true, message: '券减免不能为空', trigger: 'blur'},
                    ],
                    balance: [
                        {required: true, message: '充值抵扣不能为空', trigger: 'blur'},
                    ],
                    tally: [
                        {required: true, message: '记账金额不能为空', trigger: 'blur'},
                    ]
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value2: []
            }
        },
        created() {
            this.init();
            //时间控制
            let d = new Date
            let year1,month1,day1;
            [year1,month1,day1] = [d.getFullYear(),d.getMonth(),d.getDate()]
            let date1 = new Date(year1, month1, day1,7)
            this.value2.push(date1)
            //本月第一天设定的日期时间
            var month2 = parseInt(d.getMonth())
            console.log(month2)
            if(month2 < 10) month2 = '0' + month2
            let date2 = new Date(year1,month2,'01',7)
            this.value2.unshift(date2)
        },
        methods: {
            createInfo: function () {
                 this.dialogTitle = '新增',
                this.dialogTableVisible = true;
            },
            init: function () {
                getDailyIncome(this.page.current, this.page.size).then((response) => {
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
            }
        }
    }
</script>

<style scoped>
    #daily_income {
        margin-left: 20px;
        margin-top: 10px
    }
</style>

<style>
    .el-date-editor .el-range-separator {
        width: 8%;
    }
</style>