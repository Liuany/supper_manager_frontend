<template>
    <div class="menu">
        <el-row class="tac">
            <el-col :span="4">
                <el-menu router
                         :default-active="$route.path"
                         class="el-menu-vertical-demo"
                         @open="handleOpen"
                         @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-s-custom"></i><span>会员管理</span></template>
                        <el-menu-item index="1-1"><i class="el-icon-collection-tag"></i><span>会员信息</span></el-menu-item>
                        <el-submenu index="1-2">
                            <template slot="title"><i class="el-icon-shopping-cart-2"></i><span>消费记录</span></template>
                            <el-menu-item index="1-2-1">月消费</el-menu-item>
                            <el-menu-item index="1-2-2">季度消费</el-menu-item>
                            <el-menu-item index="1-2-3">年消费</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-s-data"></i><span>销售管理</span></template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">日销售</el-menu-item>
                            <el-menu-item index="2-2">月销售</el-menu-item>
                            <el-menu-item index="2-3">季度销售</el-menu-item>
                            <el-menu-item index="2-4">年销售</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-grid"></i><span>库存管理</span></template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">本地库存</el-menu-item>
                            <el-menu-item index="3-2">调拨库存</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i><span>系统管理</span></template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">系统设置</el-menu-item>
                            <el-menu-item index="4-2">字典管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <router-view/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        data() {
            return {}
        },
        methods: {
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            }
        }
    }
</script>
