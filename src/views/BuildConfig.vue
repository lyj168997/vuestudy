<template>
    <div>
        在项目的子目录中构建vue项目-打包目录配置
        <pre class="pre">
        (假设/h5/wx为你的vue项目目录)
        1.路由使用history方式，需要在nginx中
            location /h5/wx {
                alias $pages_dir/h5/wx;
                index index.html;
                try_files $uri $uri/ /h5/wx/index.html;
            }
        2.在vue.config.js配置
            module.exports = {
                publicPath: process.env.NODE_ENV === 'production' ? '/h5/wx/' : '/',
                //vueConf.publicPath, // 根域上下文目录
                outputDir: 'D:/**/page/**', // 构建输出目录
                assetsDir: './static/', // 静态资源目录 (js, css, img, fonts) 
                indexPath: 'index.html',
            }
        </pre>
    </div>
</template>
<style lang="less" scoped>
.pre{
    word-break: break-all;
    white-space: pre-wrap;
}
</style>