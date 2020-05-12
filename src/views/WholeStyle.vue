<template>
    <div>
        全局引用公共less文件
        <pre class="pre">
            (vue-cli3构建的环境)
            1.安装sass-resources-loader
            2.在vue.config.js文件中配置
            const path=require("path");
            module.exports = {
                pluginOptions: {
                    "style-resources-loader": {
                        preProcessor: "less",
                        patterns: [path.resolve(__dirname, "less文件路径")]
                    }
                }
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