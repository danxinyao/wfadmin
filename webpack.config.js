var proxyApi = '' // 代理服务器
// 先清空 build 文件夹下的文件
var buildFolder = 'dist'
var fs = require('fs')
var path = require('path')
var buildPath = './' + buildFolder + '/'
var folder_exists = fs.existsSync(buildPath)

if (!folder_exists) {
    fs.mkdirSync(buildFolder)
}
else {
    var dirList = fs.readdirSync(buildPath)
    dirList.forEach(function (fileName) {
        fs.unlinkSync(buildPath + fileName)
    })
    console.log("clearing " + buildPath)
}

// readfile
// 先把index.html里面关于style和js的hash值都删除掉，避免在使用 npm run dev 的时候，路径还是压缩后的路径
fs.readFile('index.html','utf-8',function (err, data) {
    if (err) {
        console.log("clear hash error")
    } else {
        var devhtml = data.replace(/((?:href|src)="[^"]+\.)(\w{20}\.)(js|css)/g, '$1$3')
        fs.writeFileSync('index.html',devhtml)
    }
})

var webpack = require('webpack')

// 检测重用模块
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

// 独立样式文件

const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 在命令行 输入  “PRODUCTION=1 webpack --progress” 就会打包压缩，并且注入md5戳 到 d.html里面

var production = process.env.PRODUCTION

// 会将所有的样式文件打包成一个单独的style.css
var extractCSS = new ExtractTextPlugin({
    filename: production ? 'style.[chunkhash].css' : 'style.css',
    disable: false,
    allChunks: true
})

var plugins = [
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    extractCSS,
    // 自动分析重用模块并且打包单独文件
    new CommonsChunkPlugin(production ? 'vendor' : 'vendor'),

    function () {
        return this.plugin('done', function (stats) {
            var content
            //这里可以拿到hash值   参考：http://webpack.github.io/docs/long-term-caching.html
            content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2)
            console.log('版本是：'+JSON.stringify(stats.toJson().hash))
            return fs.writeFileSync(buildFolder + '/assets.json', content)
        })
    }
]

// 发布编译时,压缩,版本控制
var devtool = false,   // 是否开启source-map
    devServer = {}   // 代理设置
if (process.env.PRODUCTION) {
    console.log('压缩...')
    // 压缩
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
        }
    }))
    devtool = '#source-map'   // 生产环境不开启source-map
    devServer = {}   // 代理为空
} else {
    console.log('代理...')
    devtool = '#eval-source-map'
    devServer = {
        historyApiFallback: true,
        host: 'localhost',
        proxy: {
            '/Api/*': proxyApi,
            '/api/*': proxyApi,
            '/ImageTemp/*': proxyApi,
            '/Import/*': proxyApi,
            '/ImportImage/*': proxyApi,
            '/Export/*': proxyApi,
            '/Upload/*': proxyApi
        },
    }
}

/**
 版本控制
 package.json中的
 "html-webpack-plugin": "^1.6.2",
 模块是把生成的带有md5戳的文件，插入到index.html中。
 通过index.tpl模板，生成 index.html
 */
var HtmlWebpackPlugin = require('html-webpack-plugin')
//HtmlWebpackPlugin文档 https://www.npmjs.com/package/html-webpack-plugin
//https://github.com/ampedandwired/html-webpack-plugin/issues/52
plugins.push(new HtmlWebpackPlugin({
    filename: '../index.html', // 会生成d.html在根目录下,并注入脚本
    template: 'index.tpl',
    inject: true //此参数必须加上，不加不注入
}))
module.exports = {
    entry: {
        common: ['vue', 'vue-router','vuex','vuex-router-sync'],
        build: './src/app.js'
    },
    output: {
        path: path.join(__dirname, buildFolder),
        /**
         publicPath路径就是你发布之后的路径，
         比如你想发布到你站点的/util/vue/build 目录下, 那么设置
         publicPath: "/util/vue/build/",
         此字段配置如果不正确，发布后资源定位不对，比如：css里面的精灵图路径错误
         */
        publicPath: '/' + buildFolder + '/',
        filename: production ? '[name].[chunkhash].js' : '[name].js' //"build.[hash].js"//[hash]MD5戳   解决html的资源的定位可以使用 webpack提供的HtmlWebpackPlugin插件来解决这个问题  见：http://segmentfault.com/a/1190000003499526 资源路径切换
    },
    plugins: plugins,
    // 代理,将所有API接口都通过代理,调试用
    devtool: devtool,
    devServer: devServer,
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        alias: {
            'src': path.resolve(__dirname, 'src'),
            'assets': path.resolve(__dirname, 'src/assets'),
            'components': path.resolve(__dirname, 'src/components'),
            'configs': path.resolve(__dirname, 'src/configs'),
            'directives': path.resolve(__dirname, 'src/directives'),
            'routes': path.resolve(__dirname, 'src/routes'),
            'services': path.resolve(__dirname, 'src/services'),
            'statics': path.resolve(__dirname, 'src/statics'),
            'util': path.resolve(__dirname, 'src/util'),
            'views': path.resolve(__dirname, 'src/views'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: extractCSS
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!less-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test: /\.(woff|woff2?|svg|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    }
}