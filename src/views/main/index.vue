<template>
    <el-container class="main">
        <el-header style="height: 60px; line-height: 60px; text-align: left; background-color: #323a45; color: #fff; position: relative;">
            <strong class="web_title">{{sysName}}</strong>
            <div class="logout">
                <el-dropdown trigger="hover">
                    <el-button type="text">{{ this.account.name }}</el-button>
                    <el-dropdown-menu slot="dropdown" style="border-radius: 5px">
                        <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container style="height: 100%;">
            <el-aside width="200px" style="background-color: #fff; border: 1px solid #e6e6e6; box-sizing: border-box;">
                <el-menu default-active="index1" theme="dark" router>
                    <el-submenu :index="'index' + (menuIndex + 1)" v-for="(menu, menuIndex) in menuList">
                        <template slot="title">
                            <pg-icon :name="menu.iconCls"></pg-icon>
                            {{ menu.name }}
                        </template>
                        <el-menu-item :index="child.path" v-for="child in menu.children" style="padding-left:64px;">
                            {{ child.name }}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main style="background-color: rgb(238, 241, 246); padding: 10px;">
                <div class="title">
                    <el-breadcrumb separator="/" class="breadcrumb-inner">
                        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                            {{ item.name }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <transition name="el-fade-in-linear" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .main {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .web_title {
        font-size: 24px;
        float: left;
    }
    .parent_menus {
        position: absolute;
        left: 200px;
        top: 0px;
        right: 50px;
        height: 60px;
        line-height: 60px;
        .menu {
            height: 60px;
            line-height: 60px;
            cursor: pointer;
            display: inline-block;
            color: #fff;
            padding: 0px 20px;
            position: relative;
            i {
                color: #d7b791;
                opacity: 1;
            }
            &.active, &:hover {
                background: #474e58;
                i {
                    opacity: 0.8;
                }
            }
        }
    }
    .logout {
        float: right;
        span {
            color: #fff;
        }
    }
    .title {
        display: block;
        // color: #657385;
        // font-size: 20px;
        margin-bottom: 10px;
    }
</style>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>