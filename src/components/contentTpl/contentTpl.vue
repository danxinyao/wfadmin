<template>
    <div class="views">
        <!-- 搜索 -->
        <slot name="search-form"></slot>
        <!-- 图表 -->
        <slot name="echarts"></slot>
        <div class="pg_content clearfix">
            <!-- 表格操作按钮 -->
            <slot name="operations"></slot>
            <!-- 表格 -->
            <slot name="list-table"></slot>
            <!-- 分页 -->
            <slot name="pagination"></slot>
        </div>
        <!-- 其他内容，如弹出框等 -->
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'PgContent'
    }
</script>