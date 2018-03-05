<template>
    <el-dialog 
        :title="title"
        :visible.sync="dialogVisible"
        width="60%"
        append-to-body>
        <el-upload 
            class="upload"
            ref="upload"
            :action="action"
            :headers="headers"
            drag
            :multiple="multiple"
            :on-success="handleSuccess"
            :on-error="handleError"
            :accept="accept"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <el-button @click.native="downloadImportTemplate" :loading="localLoading === 'downloadImportTemplateFile'">下载模板</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click.native="confirm">导 入</el-button>
        </span>
    </el-dialog>
</template>

<style rel="stylesheet/less" lang="less" scoped>
    .upload {
        text-align: center
    }
</style>

<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>