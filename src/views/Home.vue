<template>
	<div class="home">
		功能展示列表
		<ul class="list">
			<li>移动端监听input事件，e.data为undefined</li>
			<li>移动端拍照上传图片翻转问题</li>
			<li>时间处理函数ios兼容</li>
			<li>vue打包后去掉console.log配置</li>
			<li>裁剪插件上传图片</li>
		</ul>
	</div>
</template>

<script>

export default {
	
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
