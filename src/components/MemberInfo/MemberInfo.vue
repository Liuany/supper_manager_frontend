<template>
    <div id="member_info">
        <label>姓名：
            <el-input type="text" v-model="con" style="width: 166px;" placeholder="请输入要显示的内容"></el-input>
        </label>
        <label style="margin-left:20px;">VIP编号：
            <el-input type="text" v-model="con" style="width: 166px;" placeholder="请输入要显示的内容"></el-input>
        </label>
        <label style="margin-left:20px;">出生年月：
            <el-date-picker type="daterange" format="yyyy-MM" value-format="yyyyMM" placeholder="开始月份"></el-date-picker>
        </label>
        <el-button @click="createInfo" type="primary" th:icon="el-icon-search" style="margin-left: 15px;">查询</el-button>
        <el-button type="success" th:icon="el-icon-plus" v-on:click="createInfo">新增</el-button>

        <el-table :data="info" style="text-align: center; width: 100%;margin-top: 20px;" :border="true"
                  :stripe="true" :highlight-current-row="true">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="code" label="VIP编号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别" :formatter="formatterSex"></el-table-column>
            <el-table-column prop="birthday" label="出生年月"></el-table-column>
            <el-table-column prop="linkWay" label="联系方式"></el-table-column>
            <el-table-column prop="level" label="会员级别" :formatter="formatterLevel"></el-table-column>
            <el-table-column prop="address" label="住址"></el-table-column>
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
                <el-form-item label="VIP编号：" prop="code" label-width="100px" :required="true">
                    <el-input v-model="results.code"></el-input>
                </el-form-item>
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
                <el-form-item label="联系方式：" prop="linkWay" label-width="100px" :required="true">
                    <el-input v-model="results.linkWay"></el-input>
                </el-form-item>
                <el-form-item label="会员级别：" prop="level" label-width="100px" :required="true">
                    <el-select v-model="displayType" placeholder="请选择">
                        <el-option v-for="item in levels" :key="item.value" :label="item.name"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="住址：" prop="address" label-width="100px">
                    <el-input v-model="results.address"></el-input>
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
    import {getMemberInfo} from '@/api/memberInfo'
    import Pagination from '@/components/Pagination'

    export default {
        name: "MemberInfo",
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
            this.levels.push({name: "白银会员", value: "1"});
            this.levels.push({name: "黄金会员", value: "2"});
            this.levels.push({name: "铂金会员", value: "3"});
            this.levels.push({name: "钻石会员", value: "4"});
        },
        methods: {
            createInfo: function () {
                this.dialogTableVisible = true;
            },
            init: function () {
                getMemberInfo(this.page.current, this.page.size).then((response) => {
                    const { data } = response
                    this.page.current = data.current
                    this.page.total = data.total
                    this.page.size = data.size
                    this.info = data.records
                    console.log(this.info)
                })
            },
            save: function () {
                console.log(this.results);
            },
            cancel: function () {
                this.dialogTableVisible = false;
            },
            formatterSex: function (row, column, cellValue, index) {
                return row.sex == '1' ? '男' : row.sex == '2' ? '女' : '未知';
            },
            formatterLevel: function (row, column) {
                switch (row.level) {
                    case '1':
                        return '白银会员';
                        break;
                    case '2':
                        return '黄金会员';
                        break;
                    case '3':
                        return '铂金会员';
                        break;
                    case '4':
                        return '钻石会员';
                        break;
                    default:
                        return '未知';
                }
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