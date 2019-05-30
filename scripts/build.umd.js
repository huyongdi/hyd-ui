/**
 * @name UMD 模块 打包
 * @description 输出目录 [dist]
 * @description 文件名 [cuke-ui]
 * CMD Node.js 环境
 * AMD 浏览器环境
 * UMD 两种环境都可以执行
 */

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");  //压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩单独的CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //webpack4新出，单独打包CSS
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); //编译进度条插件
// eslint-disable-next-line
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")  //打包体积展示
const { name } = require("../package.json");

const config = {
  mode: "production",
  entry: {
    [name]: ["./components/index.js"]
  },

  //umd 模式打包
  output: {
    library: name,
    libraryTarget: "umd",
    umdNamedDefine: true, // 是否将模块名称作为 AMD 输出的命名空间
    path: path.join(process.cwd(), "dist"), //当前Node.js进程执行时的工作目录与dist连接
    filename: "[name].min.js"
  },
  //react 和 react-dom 不打包
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  resolve: {
    enforceExtension: false,  //导入语句去掉文件后缀
    extensions: [".js", ".jsx", ".json", ".less", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: "/node_modules/",
        include: [path.resolve("components")]  //当前工作目录的绝对路径
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          { loader: "postcss-loader", options: { sourceMap: false } },
          {
            loader: "less-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|cur|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name][hash:8].[ext]" //遇到图片  生成一个images文件夹  名字.后缀的图片
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            // warnings: false,
            drop_debugger: true,
            drop_console: false
          },
        }
      }),
      new OptimizeCSSAssetsPlugin({
        // 压缩css  与 ExtractTextPlugin 配合使用
        cssProcessor: require("cssnano"),
        cssProcessorOptions: { discardComments: { removeAll: true } }, // 移除所有注释
        canPrint: true //是否向控制台打印消息
      })
    ],

    // noEmitOnErrors: true //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
  },
  plugins: [
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].min.css"
    }),
    // 在打包的文件之前 加上版权说明
//     new webpack.BannerPlugin(` \n ${name} v${version} \n ${description}
//     \n ${LOGO}\n ${fs.readFileSync(path.join(process.cwd(), "LICENSE"))}
//   `),

    // 这个插件允许你创建全局常量用于编译时解析。如果设置mode："production",webpack默认会设置"process.env.NODE_ENV": JSON.stringify("production")。
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production"),
    //   __DEBUG__: false,
    // }),

    // 是否要切换到优化模式 在某个 loader 升级为依靠直接传递给它的配置选项运行之前
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // }),

    //moment 2.18 会将所有本地化内容和核心功能一起打包（见该 GitHub issue）。你可使用 IgnorePlugin 在打包时忽略本地化内容:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin(),
  ]
};

module.exports = config;
