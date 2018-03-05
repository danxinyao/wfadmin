<template>
    <el-dialog
        :title="isUpload ? '上传文件': '资源库'"
        :visible.sync="dialogVisible"
        width="80%"
        append-to-body
        center>
        <div class="dialog_wrapper" v-if="!isUpload">
            <!-- 搜索 -->
            <pg-search-form
                v-model="query"
                :reset-form="query"
                :default-form="defaultQuery"
                @search="search">
            </pg-search-form>
            <!-- 列表 -->
            <pg-table
                :list="fileList"
                @change="change">
            </pg-table>
            <!-- 分页 -->
            <pg-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-sizes="[18, 36, 54, 72, 90,108,120]"
                :page-size="pageSize"
                :total="total">
            </pg-pagination>
        </div>
        <div class="dialog_wrapper" v-if="isUpload">
            <el-form
                ref="form"
                :model="form"
                label-width="100px"
                :rules="rules"
                style="max-width: 500px">
                <el-form-item label="选择文件" prop="url">
                    <pg-img-upload :isImgFile="form.fileType == 1" @upload-success="uploadSuccess"></pg-img-upload>
                </el-form-item>
                <el-form-item label="文件类型" prop="fileType">
                    <el-radio-group v-model="form.fileType">
                        <el-radio :label="1">图片</el-radio>
                        <el-radio :label="2">视频</el-radio>
                        <el-radio :label="3">文件</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文件分组" prop="groupId">
                    <el-select v-model="form.groupId">
                        <el-option
                            :label="item.name"
                            value="item.id"
                            v-for="(item, index) in groupList"
                            :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="文件地址" prop="url">
                    <el-input v-model="form.url" disabled></el-input>
                </el-form-item>
                <el-form-item label="文件大小" prop="size">
                    <el-input v-model="form.size" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input v-model="form.note"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">
                {{ isUpload ? '返 回' : '取 消' }}
            </el-button>
            <el-button type="primary" @click="upload" :loading="isUpload && localLoading === 'saveFile'">
                {{ isUpload ? '保 存' : '上传文件' }}
            </el-button>
        </span>
    </el-dialog>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>