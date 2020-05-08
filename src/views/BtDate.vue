<template>
    <div class="content">
        <p>时间处理函数ios兼容</p>
        <b>ios端Date.parse()中不能识别  年-月-日 这种以'-'形式日期，需要替换为以'/'连接</b>
        <p>{{time}}</p>
        <p>{{time2}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return {
            time:'2019-02-12 12:25:23',
            time2:''
        }
    },
    mounted(){
        this.dealTime();
    },
    methods:{
        dealTime(){
            let date= new Date(Date.parse(this.time.replace(/-/g,"/")));
            let mYear=date.getFullYear();
            let mMonth=date.getMonth()+1;
            this.time2=mYear+'-'+ (mMonth<10?'0'+mMonth:mMonth)
        },
        /**
         * 日期格式化
         * @param {*} time  时间戳
         * @param {*} fmt  格式：yyyy-MM-dd HH:mm:ss
        */
        formatDateByTime(time, fmt) {
            var date = new Date();
            date.setTime(time);
            var o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "H+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
    }
}
</script>
<style lang="less" scoped>
.content{
    padding:16px;
    font-size:14px;
    line-height: 32px;
}
</style>