<template>
    <div class="content">
        解决移动端监听input事件，e.data为undefined问题
        <div id="editor" class="editor" contenteditable="true" @input="listenEditor"></div>
    </div>
</template>
<script>
export default {
    methods:{
        /* 监听输入框input事件 */
        listenEditor(e){
            let selection = getSelection();
            if(selection.isCollapsed&&selection.anchorNode.nodeType==3){
                let data=selection.anchorNode.data.substring(selection.focusOffset-1);
                if(data=='@'){
                    alert("你输入@了");
                }
            }
        },
    }
}
</script>
<style lang="less" scoped>
.content{
    padding:16px;
    font-size:14px;
    line-height: 32px;
    .editor{
        border:1px solid #ccc;
        height:400px;
        width:100%;
        padding: 14px;
    }
}
</style>