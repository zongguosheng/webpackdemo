const path = require('path');  // 首先要引入node.js中path 模块，用于处理文件与目录的路径
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlwebpackplugin = require('html-webpack-plugin')
const webpack = require("webpack")// 用于访问内置插件

//   var htmlWebpackPlugin = require('html-webpack-plugin');
//   var nodeExternals = require('webpack-node-externals');
//   var CompressionPlugin = require("compression-webpack-plugin");

module.exports ={

    entry: './js/index.js',  // 指定入口文件
    output:{
        //把一个路径或路径片段的序列解析为一个绝对路径
        path: path.resolve(__dirname,'./dist'),     // 指定出口文件的路径目录
        filename : 'bundlezongguosheng.js'     // 制定出口文件的名称
    },
    plugins: [
        　　　　new ExtractTextPlugin('./dist/css/style.css'),
               new webpack.BannerPlugin('zongguosheng编写的组件代码'),
               new htmlwebpackplugin({
                   hash: true,
                   template: './src/index.html',
                   filename: 'index.html'
               })
        　　],
    mode: 'production',
    //module 模块：例如解读CSS,图片如何转换，压缩
    module: {
        // 对一个单独的 module 对象定义了 rules 属性   多个loaders
        rules: [
    　　　　　　{
                    test: /\.css$/, 
                    use:  ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                      })    
    　　　　　　},
        ]
    },
    //自带插件直接配置
    watchOptions: {
        poll: 1000, //检测代码修改时间，以毫秒为单位
        aggregateTimeout: 300, //防止重复保存而发生重复编译错误，这里设置的500为半秒内重复保存，不进行打包操作
        ignored: /node_modules/ //不监听目录，使用正则匹配
    }

};
