<template>
	<div class="home">
		功能展示列表
		<ul class="list">
			<li v-for="v in list" :key="v.id" @click="$router.push(v.path)">{{v.name}}</li>
		</ul>
	</div>
</template>

<script>

export default {
	data(){
		return {
			list:[
				{"id":1,"name":"移动端监听input事件，e.data为undefined","path":'/edata'},
				{"id":2,"name":"移动端拍照上传图片翻转问题","path":'/takephoto'},
				{"id":3,"name":"时间处理函数ios兼容","path":'/btdate'},
				{"id":4,"name":"vue打包后去掉console.log配置","path":'/removelog'},
				{"id":5,"name":"裁剪插件上传图片","path":'/cropper'},
				{"id":6,"name":"自定义移动端touch相关指令","path":'/touchdirective'},
				{"id":7,"name":"移动端better-scroll插件使用","path":'/betterscroll'},
				{"id":8,"name":"长按操作框的复制功能的实现","path":'/clipboard'},
			]
		}
	}
}
</script>
<style lang="less" scoped>
.home{
	padding:16px;
	.list{
		li{
			line-height: 32px;
			font-size:14px;
		}
	}
}
</style>
