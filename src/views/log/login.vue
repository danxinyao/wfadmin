<template>
    <transition name="el-fade-in-linear">
        <div class="box">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-position="left" label-width="0" class="ruleForm login-container">
                <h2 class="title">后台管理系统</h2>
                <el-form-item prop="userName">
                    <el-input type="text" v-model="form.userName" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                <el-form-item style="width: 100%">
                    <el-button type="primary" style="width: 100%" @click="handleSubmit" :loading="logining">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </transition>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        // background: #f0f2f5;
        background: url(~assets/images/bg.jpg) 50% 50% no-repeat;
        background-size: cover;
    }
    .login-container {
        position: absolute;
        width: 350px;
        height: 300px;
        left: 50%;
        top: 50%;
        margin-top: -150px;
        margin-left: -175px;
        border-radius: 5px;
        background-clip: padding-box;
        // margin: 180px auto;
        // width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #d5d5d5;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #409EFF;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
<script type="text/babel">
    import log from './login'
    export default {
        ...log
    }
</script>