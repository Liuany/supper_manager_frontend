<template>
    <div>
        <el-row class="tac">
            <el-col :span="4">
                <el-menu router
                         :default-active="this.$route.path"
                         class="el-menu-vertical-de "
                         @open="handleOpen"
                         @close="handleClose">
                    <template>
                        <el-submenu v-for="(item) in menuList" :index="item.path" :key="item.isParent == 1 ? item.isParent + '/' + item.path : item.path">
                            <template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
                            <template v-for="(child) in item.children">
                                <el-submenu v-if="child.children.length > 0" :index="child.path" :key="child.isParent == 1 ? item.isParent + '/' + child.path : child.path">
                                    <template slot="title"><i :class="child.icon"></i><span>{{child.name}}</span></template>
                                    <el-menu-item-group>
                                        <el-menu-item v-for="(grandChild) in child.children" :index="grandChild.path" :key="item.isParent == 1 ? grandChild.isParent + '/' + grandChild.path : grandChild.path">
                                            <i :class="grandChild.icon"></i><span>{{grandChild.name}}</span>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-menu-item v-else :index="child.path" :key="child.isParent == 1 ? item.isParent + '/' + child.path : child.path">
                                    <i :class="child.icon"></i><span>{{child.name}}</span>
                                </el-menu-item>
                            </template>
                        </el-submenu>   
                    </template>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <router-view @postChildInfo="resetMenu"></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { loadMenu } from '@/api/menu'

export default {
    name: 'MenuList',
    data () {
        return {
            menuList: []
        }
    },
    created () {
        this.init()
        this.$on('restMenu', function () {
            alert('111')
        })
    },
    methods: {
        init(){
            loadMenu().then((response) => {
                const { data } = response
                console.log(data);
                this.menuList  = this.formateMenu(data)
            })
        },
        handleOpen(key, keyPath) {

        },
        handleClose(key, keyPath) {

        },
        formateMenu(data) {
            var nodes  = []
            var groupNodeMap = {}
            for (let f in data) {
                var groupName = data[f].name;
                if (groupNodeMap[groupName] === undefined && (data[f].pid === '0')) {
                    var node = {
                        id: data[f].id,
                        name: groupName,
                        path: data[f].path,
                        isParent: data[f].isParent,
                        icon: data[f].icon,
                        children: []
                    }
                    groupNodeMap[groupName] = node
                    for (let c in data) {
                        if (data[f].id == data[c].pid) {
                            groupNodeMap[groupName].children.push({
                                id: data[c].id,
                                name: data[c].name,
                                path: data[c].path,
                                isParent: data[c].isParent,
                                icon: data[c].icon,
                                children: []
                            })
                        }
                    }
                    for (let i in groupNodeMap[groupName].children) {
                        for (let g in data) {
                            if (groupNodeMap[groupName].children[i].id === data[g].pid){
                                groupNodeMap[groupName].children[i].children.push({
                                    id: data[g].id,
                                    name: data[g].name,
                                    path: data[g].path,
                                    icon: data[g].icon,
                                })
                            }
                        }
                    }
                }
            }
            for ( var i in groupNodeMap) {
                nodes.push(groupNodeMap[i]);
            }
            console.log(nodes);
            return nodes
        },
        resetMenu: function (childInfo) {
            this.init()
        }    
    }
}
</script>