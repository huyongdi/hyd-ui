<p align="center">
  <a href="javascript:viod(0)">
    <img width="200" src="http://huyongdi.com/favicon.ico">
  </a>
</p>

<h1 align="center">hyd-ui</h1>

<h4 align="center">react按需加载组件库脚手架</h4>

## 1: 安装 📦
> 使用 npm 
```
npm i hyd-ui --save
```

> 使用 yarn
```
yarn add hyd-ui
```

## 2: 使用(按需导入) 🔨 
> 1. 手动引入
```js
import Button from 'hyd-ui/lib/button'; // 加载 JS
import 'hyd-ui/lib/button/style/css'; // 加载 CSS
```
> 2. 利用插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

```js
// .babelrc.js 或加入到webpack.config.js的babel-loader中
module.exports = {
  plugins: [
    ["import", {
      "libraryName": "hyd-ui",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// 项目引入了多个库
module.exports = {
  plugins: [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true
    }], 
    ["import", {
      "libraryName": "hyd-ui",
      "libraryDirectory": "es",
      "style": true
    },'hyd-ui'], 
  ]
}
```


## 3: 参考文档 🌍
- [ant-design](https://github.com/ant-design/ant-design)
- [gulp](https://www.gulpjs.com.cn/docs/)
- [webpack](https://www.webpackjs.com/)
```
