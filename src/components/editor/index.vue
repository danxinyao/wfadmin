<template>
    <div class="pg_editor">
        <editor :initContent="initContent" :insertImg.sync="img" @onchange="editorChange"></editor>
        <div class="pg_editor_upload">
            <el-button size="mini" type="primary" @click="showImgLibrary">插入图片</el-button>
        </div>
        <pg-img-library :show.sync="isShowImgLibrary" @change="changeImg"></pg-img-library>
    </div>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    .pg_editor {
        position: relative;
        width: 100%;
        &_upload {
            position: absolute;
            right: 10px;
            top: 0;
            height: 52px;
            line-height: 52px;
        }
    }
</style>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>