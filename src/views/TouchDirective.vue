<template>
    <div class="content">
        指令
        <ul>
            <li v-for="v in 10" :key="v" v-tap.prevent="{fn:tapIn,item:v}" v-longtap.prevent="{fn:tapLong,item:v}">测试长按和tap指令{{v}}</li>
        </ul>
    </div>
</template>
<script>
import '@/assets/js/directive.js'
export default {
    data(){
        return {

        }
    },
    methods:{
        /* 长按 */
        tapLong(e,pos,val,current){
            let item=val.item;
            console.log(item);
            console.log(pos);
            alert("触发长按事件");
        },
        /* tap */
        tapIn(e,val){
            console.log(val.item);
            console.log(e);
            alert("触发tap事件");
        }
    }
}
</script>
<style lang="less" scoped>
.content{
    font-size:14px;
    li{
        line-height: 40px;
        text-align: center;
    }
}
</style>