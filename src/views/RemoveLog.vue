<template>
    <div class="content">
        <b>vue打包后去掉console.log配置</b>
        <dl>
            <dt> npm install terser-webpack-plugin -D</dt>
            <dt> 在vue.config.js 中</dt>
            <dd>引入插件 const TerserPlugin=require('terser-webpack-plugin');</dd>
            <dd>在配置插件地方添加以下代码
                 configureWebpack: {
                    plugins: [
                        //打包后移除console.log
                        new TerserPlugin({
                            terserOptions: {
                            ecma: undefined,
                            warnings: false,
                            parse: {},
                            compress: {
                                drop_console: true,
                                drop_debugger: false,
                                pure_funcs: ['console.log'] 移除console
                            }
                            },
                        })
                    ]
                },
            </dd>
            
        </dl>
    </div>
</template>
<script>
export default {
    mounted(){
		console.log('测试')
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