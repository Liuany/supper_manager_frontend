<template>
    <div id="member_info">
        <label>名称：
            <el-input type="text" v-model="con" style="width: 166px;" placeholder="请输入要显示的内容"></el-input>
        </label>
        <el-button @click="createInfo" type="primary" th:icon="el-icon-search" style="margin-left: 15px;">查询</el-button>
        <el-button type="success" th:icon="el-icon-plus" v-on:click="createInfo">新增</el-button>

        <el-table :data="info" style="text-align: center; width: 100%;margin-top: 20px;" :border="true"
                  :stripe="true" :highlight-current-row="true">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="path" label="路径"></el-table-column>
            <el-table-column prop="isParent" label="是否父节点" :formatter="formatterIsParent"></el-table-column>
            <el-table-column prop="pid" label="父节点"></el-table-column>
            <el-table-column prop="icon" label="图标"></el-table-column>
        </el-table>

        <!--分页-->
        <pagination
            v-show="true"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="init"
        />

        <el-dialog title="新增" :visible.sync="dialogTableVisible" width="40%">
            <el-form :model="results" label-width="100px">
                <el-form-item label="名称：" prop="name" label-width="100px" :required="true">
                    <el-input v-model="results.name"></el-input>
                </el-form-item>
                <el-form-item label="路径：" prop="path" label-width="100px" :required="true">
                    <el-input v-model="results.path"></el-input>
                </el-form-item>
                <el-form-item label="是否父节点：" prop="isParent" style="width:100%" label-width="100px" :required="true">
                    <el-radio v-model="results.isParent" label="1" change="change">是</el-radio>
                    <el-radio v-model="results.isParent" label="2" change="change">否</el-radio>
                </el-form-item>
                <el-form-item label="父节点：" prop="pid" style="width:100%" label-width="100px" :required="true">
                    <el-input v-model="results.pid"></el-input>
                </el-form-item>
                <el-form-item label="图标：" prop="icon" label-width="100px" :required="true">
                    <el-input v-model="results.icon"></el-input>
                </el-form-item>

                <el-form-item style="text-align: right;">
                    <el-button type="success" @click="save">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { getMenuByPage,save } from '@/api/menu'
    import Pagination from '@/components/Pagination'

    export default {
        name: "MenuManager",
        components: { Pagination },
        data() {
            return {
                con: '',
                dialogTableVisible: false,
                results:{},
                info: [],
                displayType: '',
                levels: [],
                page: {
                    current: 1,
                    size: 10,
                    total: 0,
                    tab: 'latest'
                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            createInfo: function () {
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
            formatterIsParent: function (row, column) {
                return row.isParent == '0' ? '否' : '是';
            },
            save: function () {
                save(this.results).then((response) => {
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        duration: 2000,
                    });
                    this.cancel()
                    this.init()
                })
            },
            cancel: function () {
                this.dialogTableVisible = false;
            }
        }
    }
</script>

<style scoped>
    #member_info {
        margin-left: 20px;
        margin-top: 10px
    }
</style>