const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:['./app/js/root.js'],
    output:{
        path:path.join(__dirname,'./build'),
        filename:'bundle.js'
    },
    devServer:{
        inline:true,
        port:8090
    },
    module:{
        loaders:[
            {
                test:/\.(js|jsx)?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                include:path.join(__dirname,'app'),
                query:{
                    presets:['react','es2015'],
                    plugins:[
                        'react-html-attrs',
                    ]
                }
            },
            {
                test:/\.css?$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html', // 源模板文件
            filename: 'index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}