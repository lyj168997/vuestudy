<template>
    <div>
        引入问题
        <pre>
        1.全局引入jquery
        >安装jquery npm install jquery -S
        >在vue.config.js文件中配置
            configureWebpack: {
                plugins: [
                new webpack.ProvidePlugin({
                    $:"jquery",
                    jQuery:"jquery",
                    "windows.jQuery":"jquery"
                }),
                ]
            } 

        2. 引入图片路径
         src="~@/assets/img/**.png" 

        3. 引入less文件
         @import '~@/assets/less/**.less';

        
        </pre>
    </div>
</template>