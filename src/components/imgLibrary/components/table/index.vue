<template>
    <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in list" :key="index" v-if="list.length > 0">
            <div class="select_img" @click="handleSelect(item)">
                <!-- 图片 -->
                <pg-img :src="item.url" v-if="item.fileType == 1"></pg-img>
                <!-- 视频 -->
                <i class="document el-icon-document" v-else></i>
                <!-- 文件 -->
                <span class="img_name">{{ item.name }}</span>
                <div class="mask"></div>
            </div>
        </el-col>
        <!-- <el-col :span="24" v-if="list.length == 0">
            <div class="empty_data">
                <span>暂无文件</span>
            </div>
        </el-col> -->
    </el-row>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    @import '~assets/styles/_variables';
    .select_img {
        cursor: pointer;
        position: relative;
        border: 1px solid #ddd;
        margin-bottom: 10px;
        height: 120px;
        overflow: hidden;
        text-align: center;
        &:hover {
            .mask { display: block }
        }
        .mask {
            display: none;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.5);
        }
        .document {
            margin-top: 20px;
            font-size: 50px;
            color: #909399;
        }
        img {
            display: block;
            max-width: 100%;
            height: auto;
            margin: 0 auto;
        }
        .img_name {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            text-align: center;
            .lineClamp(1);
        }
    }
    .empty_data {
        position: relative;
        line-height: 60px;
        text-align: center;
        height: 60px;
        width: 100%;
        span {
            color: #5a5e66;
        }
    }
</style>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>