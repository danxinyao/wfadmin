<template>
    <el-table 
        :data="list" 
        highlight-current-row 
        border 
        stripe 
        style="width: 100%" 
        @selection-change="selectChange"
        v-loading="localLoading === 'getDemo'" 
        element-loading-text="加载中">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="teamname" label="所属团队" width="300"></el-table-column>
        <el-table-column prop="name" label="分销客户名称" min-width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <pg-row-link 
                    @edit="handleClick"
                    @del="handleClick"
                    :btns="rowLink"
                    :row="scope.row">
                </pg-row-link>
            </template>
        </el-table-column>
    </el-table>
</template>
<script type="text/babel">
    import index from './index'
    export default {
        ...index
    }
</script>