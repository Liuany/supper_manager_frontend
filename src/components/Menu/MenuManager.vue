<template>
    <div id="menu_list">
        <label>名称：
            <el-input type="text" v-model="con.name" style="width: 166px;" placeholder="请输入要显示的内容"></el-input>
        </label>
        <el-button @click="search" type="primary" icon="el-icon-search" style="margin-left: 15px;">查询</el-button>
        <el-button @click="resetSearch" type="success" icon="el-icon-refresh" style="margin-left: 15px;">重置</el-button>
        <el-button type="danger" icon="el-icon-plus" v-on:click="createInfo">新增</el-button>

        <el-table :data="info" style="text-align: center; width: 100%;margin-top: 20px;" :border="true"
                  :stripe="true" :highlight-current-row="true">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="path" label="路径" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isParent" label="是否根节点" :formatter="formatterIsParent"></el-table-column>
            <el-table-column prop="pname" label="父节点"></el-table-column>
            <el-table-column prop="icon" label="图标" show-overflow-tooltip></el-table-column>
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
            @pagination="search"
        />

        <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="40%" @close="closeDialog('ruleForm')">
            <el-form 
                ref="ruleForm"
                :model="results" 
                label-width="100px" 
                :rules="rules">
                <el-form-item label="名称：" prop="name" label-width="120px">
                    <el-input v-model="results.name"></el-input>
                </el-form-item>
                <el-form-item label="路径：" prop="path" label-width="120px">
                    <el-input v-model="results.path"></el-input>
                </el-form-item>
                <el-form-item label="是否根节点：" prop="isParent" style="width:100%" label-width="120px">
                    <el-radio v-model="results.isParent" label="1" @change="changeSelect">是</el-radio>
                    <el-radio v-model="results.isParent" label="0" @change="changeSelect">否</el-radio>
                </el-form-item>
                <el-form-item v-if="seletTreeVisible" label="父节点：" prop="valueId" style="width:100%" label-width="120px">
                    <SelectTree 
                        :props="props"
                        :options="optionData"
                        :value="valueId"
                        :clearable="isClearable"
                        :accordion="isAccordion"
                        v-model="results.pid"
                        @getValue="getValue($event)"/>
                </el-form-item>
                <el-form-item label="图标：" prop="icon" label-width="120px">
                    <e-icon-picker v-model="results.icon"/>
                </el-form-item>

                <el-form-item style="text-align: right;">
                    <el-button v-if="dialogSave" type="success" @click="save('ruleForm')">保存</el-button>
                    <el-button @click="closeDialog('ruleForm')">{{cancelTag}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { getMenuByPage,save } from '@/api/menu'
    import Pagination from '@/components/Pagination'
    import SelectTree from '@/components/Tree/TreeSelect.vue';
    import { loadMenu, getByPid, delById, searchMenuByPage } from '@/api/menu'

    export default {
        name: "MenuManager",
        components: { Pagination,SelectTree },
        data() {
            return {
                con: {},
                dialogTableVisible: false,
                dialogTitle: '',
                dialogSave: true,
                seletTreeVisible: false,
                cancelTag: '取消',
                results:{},
                info: [],
                page: {
                    current: 1,
                    size: 10,
                    total: 0,
                    tab: 'latest'
                },
                treeList: [],
                isClearable:true,      // 可清空（可选）
                isAccordion:true,      // 可收起（可选）
                valueId: "",            // 初始ID（可选）
                props:{                // 配置项（必选）
                    value: 'id',
                    label: 'name',
                    children: 'children',
                    // disabled:true
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    path: [
                        {required: true, message: '请输入路径', trigger: 'blur'},
                    ],
                    isParent: [
                        {required: true, message: '请选择是否为父节点', trigger: 'blur'},
                    ]
                },
            }
        },
        created() {
            this.init()
            this.initSelection()
        },
        computed:{
            /* 转树形数据 */
            optionData(){
                let cloneData = JSON.parse(JSON.stringify(this.treeList))      // 对源数据深度克隆
                return cloneData.filter(father=>{                      // 循环所有项，并添加children属性
                    let branchArr = cloneData.filter(child=>father.id == child.pid);       // 返回每一项的子级数组
                    branchArr.length>0 ? father.children=branchArr : ''   //给父级添加一个children属性，并赋值
                    return father.pid==0;      //返回第一层
                });
            }
        },
        methods: {
            createInfo: function () {
                this.dialogTitle = '新增',
                this.dialogTableVisible = true;
            },
            init: function () {
                getMenuByPage(this.page.current, this.page.size).then((response) => {
                    const { data } = response
                    this.page.current = data.current
                    this.page.total = data.total
                    this.page.size = data.size
                    this.info = data.records
                })
            },
            initSelection: function () {
                loadMenu().then((response) => {
                    const { data } = response
                    this.treeList = data
                })
            },
            formatterIsParent: function (row) {
                return row.isParent == '0' ? '否' : '是';
            },
            save: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.results.isParent == '0' && this.results.pid == undefined){
                            this.$message({
                                    message: '请选择父节点',
                                    type: 'error'
                                });
                        } else {
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
                    }
                })
            },
            closeDialog: function (formName) {
                //清空表单
                this.results = {}
                // 重置表单
                this.$refs[formName].resetFields()
                //关闭窗口
                this.dialogTableVisible = false
                //隐藏父节点树形下拉框
                this.seletTreeVisible = false
            },
            // 取值
            getValue(value){
                this.results.pid = value;
            },
            changeSelect: function (value) {
                if ("0" == value) {
                    this.seletTreeVisible = true
                } else {
                    this.seletTreeVisible = false
                     this.results.pid = '0'
                }
            },
            edit: function (row) {
                this.dialogTitle = '编辑'
                // 这一句是关键！！使用this.results = row的方式会使编辑行的数据发生变化
                this.results = Object.assign({}, row)
                this.dialogTableVisible = true
                if ('0' == row.isParent) {
                    this.seletTreeVisible = true
                }
            },
            del: function (row) {
                this.$confirm('此操作将删除本级菜单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //查询是否有子菜单
                    getByPid(row.id).then((response) => {
                        const { data } = response
                        if (data.length > 0) {
                            this.$message({
                                message: '删除失败【当前菜单存在子菜单】',
                                type: 'error'
                            });
                        } else {
                            delById(row.id).then((response) => {
                                const { code } = response
                                if (200 === code) {
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                    //刷新页面
                                    this.init()
                                    //刷新导航栏菜单
                                    this.refresh()
                                } else {
                                    this.$message({
                                        message: '删除失败',
                                        type: 'error'
                                    });
                                }
                            })
                        }
                    })
                }).catch(() => {
                    //取消的提示
                });
            },
            search: function () {
                if (JSON.stringify(this.con) !== "{}") {
                    searchMenuByPage(this.page.current, this.page.size,this.con).then((response) => {
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
    #menu_list {
        margin-left: 20px;
        margin-top: 10px
    }
</style>