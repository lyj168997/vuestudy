<template>
    <div class="content">
        复制功能
        <p v-longtap.prevent="{fn:showLongContent}" class="opera" id="copy">长按此处，显示操作框</p>
        <textarea v-model="val" id="cut"></textarea>
        <div v-show="longtapShow">
            <ul class="flexbox operacontent">
                <li data-clipboard-action="copy"  class="longtapcol copymessage" @click="copyLink">
                    复制
                </li>
                <li data-clipboard-action="cut" data-clipboard-target="#cut" class="longtapcol cutmessage" @click="cutLink">
                    剪切
                </li>
                <li>
                    转发
                </li>
                <li>
                    删除
                </li>
            </ul>
            <!-- 透明遮罩层 -->
            <div class="opacityMask"  @touchstart.stop.prevent="hideLongTapModel" @touchmove.stop.prevent="hideLongTapModel"></div>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard';//复制插件
export default {
    data(){
        return {
            longtapShow:false,
            longtap:{
                Top:0,
                Left:0
            },
            val:'剪切内容'
        }
    },
    methods:{
        /* 隐藏操作框 */
        hideLongTapModel(){
            this.longtapShow=false;
        },
        /* 复制 */
        copyLink(){
            let clipboard=new Clipboard('.copymessage', {
                // target: function() {
                //     return document.querySelector('.opera');
                // }
                text:function(){
                    return $("#copy").html();
                }
            });
            this.hideLongTapModel();
            clipboard.on('success', e => {
                clipboard.destroy();
                alert("复制成功");
            })
            clipboard.on('error', e => {
                clipboard.destroy();
            })
        },
        /* 剪切 */
        cutLink(){
            let _this=this;
            let clipboard=new Clipboard('.cutmessage', {
            });
            this.hideLongTapModel();
            clipboard.on('success', e => {
                clipboard.destroy();
                // alert("剪切成功")
            })
            clipboard.on('error', e => {
                clipboard.destroy();
            })
        },
        /* 长按 */
        showLongContent(){
            this.longtapShow=true;
            let paragraphs=document.getElementById('copy');
            let range = new Range();
            range.setStartBefore(paragraphs);
            range.setEndAfter(paragraphs);
            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}
</script>
<style lang="less" scoped>
.content{
    font-size:14px;
    padding:16px;
    .opera{
        margin:60px 0;
        font-weight: 600;
    }
    .operacontent{
        position: absolute;
        z-index: 100;
        background: #111;
        border-radius: 8px;
        height: 56px;
        padding: 0 20px;
        color: #CDD0D3;
        font-size: 12px;
        display:flex;
        align-items: center;
        top:10px;
        left:20px;
        &:after {
            content: '';
            width: 0;
            height: 0;
            border-right: 16px solid transparent;
            border-left: 16px solid transparent;
            border-top: 16px solid #111;
            position: absolute;
            bottom: -8px;
            left:58px;
        }
        li {
            padding: 12px 12px 8px;
            line-height: 16px;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            font-size: 12px;
            text-align: center;
        }
    }
    .opacityMask{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        z-index: 99;
        background: #fff;
        opacity: 0;
        position: fixed;
        user-select: none;
    }
}
</style>