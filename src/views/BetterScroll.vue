<template>
    <div class="content">
        <div class="header">
            <h2>使用better-scroll插件实现滚动</h2>
            <button @click="toElement(10)">跳转到第10个元素</button>
        </div>
        <Scroll :pullup="pullup" :pulldown="true" :bounce="true" @pulldown="pullDown" @scrollToEnd="scrollToEnd" class="wrapper" :startY="startY" :data="data" ref="wrapper">
            <div>
                <ul ref="list">
                    <li v-for="(v,i) in data" :key="i" class="col">
                        {{v}}-滚动-上拉加载下一页
                    </li>
                </ul>
            </div>
        </Scroll>
    </div>
</template>
<script>
import Scroll from '@/components/Scroll';
export default {
    data(){
        return {
            pullup:true,//向下
            data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            pgnum:1,
            startY:0,
            wrapperH:0//wrapper元素高度
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.wrapperH=this.$refs.wrapper.$el.offsetHeight;//获取wrapper元素高度
            let scheight=this.$refs.list.offsetHeight;
            this.startY=-parseInt(scheight-this.wrapperH);//首次进入自动定位到底部
        })
    },
    components:{
        Scroll
    },
    methods:{
        //上拉加载下一页
        scrollToEnd(){
            if(this.pgnum>4){
                return;
            }
            this.data=[...this.data].concat(this.data);
            this.pgnum++;
        },
        //跳转到某个元素
        toElement(index){
            index=parseInt(index);
            let all=document.querySelectorAll(".col");
            this.$refs.wrapper.scrollToElement(all[index]);
        },
        //下拉
        pullDown(){
            this.data=this.$options.data().data;
        }
    }
}
</script>
<style lang="less" scoped>
.wrapper{
    position:absolute;
    left:0;
    top:50px;
    bottom:50px;
    width:100%;
    overflow: scroll;
    z-index: 5;
}
.content{
    .col{
        line-height: 50px;
    }
    .header{
        position:relative;
        top:0;
        z-index: 20;
        font-size:16px;
        padding-left:16px;
    }
}
</style>