---
title: webpack 基础
date: 2020-12-30 11:15:32
---

大纲：
1、webpack 是什么，为什么需要webpack
2、模块化
3、webpack的基本配置

## webpack是什么

我们先引入一段官网的解释
> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

理解一下，那就是 webpack 是一个打包模块化 JavaScript 程序的工具。webpack 处理应用程序时，会从配置的入口文件开始，识别出模块化导入语句，然后递归找出入口文件的所有模块依赖，将这些依赖统统打包进一个或多个独立文件中（即bundle文件）。

## 为什么需要模块化打包工具

那么我们为什么要使用它，模块化究竟有什么好处呢？试想一下，在没有模块化之前，代码是怎么样的呢？

 - 变量和方法容易造成全局污染，不容易维护
 - 通过script标签从上自下加载资源
 - 大型项目资源难以维护，多人协作容易造成混乱

我们都知道，在HTML中，可以通过script标签引入js资源。script标签自上而下的加载执行，当然，如果设置了defer 和 async 属性的话，那就另当别论了。但不难看出，js的执行顺序至关重要，资源加载的先后顺序决定了你的项目是否能够成功运行下去。当项目越来越大，逻辑越来越复杂时，就会让维护变得困难和混乱起来，全局污染的可能性就大的多了。
### 形成独立作用域
在早期，我们通过命名空间的方法，尽量减少全局变量的产生：
``` 
// 使用对象字面量的形式形成命名空间
var Lily = {
        name: 'Lily',
        age: 20,
        hello: function() {
            console.log('My name is ' + this.name);
        }
    };

var Tom = {
        name: 'Tom',
        age: 20,
        hello: function() {
            console.log('My name is ' + this.name);
        }
    };
```
虽然命名空间能够在一定程度上减少全局变量的产生，但它存在另外一个问题。我们很容易就能够对 Lily 和 Tom 的姓名和年龄进行更改，但实际我们只希望暴露 hello 方法，而不希望基础属性被修改。那么我们怎么进行属性私有化呢？

那就是IIFE 立即执行函数，它会形成自己的独立作用域。我们可以在立即执行函数中创建属性和方法，return出希望暴露的方法。
```
var helloLily = (function() {
    var _Lily = {
        name: 'Lily',
        age: 20,
    };
    var hello = function() {
        console.log('My name is ' + _Lily.name);
    }
    return hello;
})();

var helloTom = (function() {
    var _Tom = {
        name: 'Tom',
        age: 20,
    };
    var hello = function() {
        console.log('My name is ' + _Tom.name);
    }
    return hello;
})();
```
实际上立即执行函数就是模块化的基石。我们使用 webpack 打包生成的 bundle 文件就是一个立即执行函数。
![webpack-bundle立即执行函数](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/webpack基础配置/webpack-bundle立即执行函数.png)

随之，社区制定了 COMMONJS/AMD/CMD 模块化管理方案，让大程序拆分成互相依赖的小文件成为可能。

ES6 模块化
> ES6 在语言标准的层面上，实现了模块功能。
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

模块化的优点：

 - 编译时加载的特性，让静态分析成为可能
 - 团队协作、代码组织及管理起来更加方便
 - 减少代码的耦合性，一个模块处理一件事情
 - 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
 - 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

现在我们大致了解了模块化的一个演变过程，接下来我们来谈谈webpack的模块。
### webpack 模块
在webpack模块中，我们可以使用：

 - ES2015 import 语句 CommonJS require() 语句 
 - AMD define 和 require 语句
 - css/sass/less 文件中的 @import 语句。 
 - 样式(url(...))
 - HTML 文件(\<img src=...>)中的图片链接(image url)

webpack本身只能处理 json 和 JavaScript 语言。但是它提供的 loader，让其他语言的编写模块变成了可能。loader 描述了 webpack 如何处理非 JavaScript 模块。

## webpack 基础概念
### 入口 entry
在webpack进行构建的时候，首先会找到入口文件，通过入口文件的依赖递归查找到所有依赖。
单页应用入口配置：
```
    // 执行构建的入口文件
    entry: './src/index.js'
```
多页应用入口配置：
```
    // 多页应用入口
    entry: {
        index: './src/index.js',
        list: './src/list.js',
        about: './src/about.js'
    }
```
### 出口 output
output 配置项，用于告诉 webpack 将打包生成的 bundle 文件放在哪个目录下。
多个入口时必须配置多出口，否则会造成构建出错。
```
    output: {
        path: path.resolve(__dirname, "./dist"),
        // filename: 'index.js', // 可指定导出文件命名
        /* 
            可自动根据name生成导出文件名，多个时会与入口配置的属性一一对应
         */
        filename: "[name].js", 
    }
```
### loader
webpack 自身只理解 JavaScript 文件，而 loader 为 webpack 提供了处理其他语言的能力，它可以将所有类型的文件转换为 webpack 能够处理的有效模块。

 - loader 支持链式传递，loader将按照从右往左的顺序，链式的进行调用。
  在第一个 loader，传入的参数是资源文件(resource file)的内容。
  在最终一个 loader 中，处理结果应该是 String 或者 Buffer（被转换为一个 string），代表了模块的 JavaScript 源码。
 - loader 可以同步、可以异步
 - loader 模块需要返回一个函数
配置loader：
```
    module: {
        rules: [
            {
                // 正则表达式，标识应该被处理的文件
                test: /\.css$/,
                // 使用什么 loader 去处理匹配到的文件
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
```
 
### 插件 plugins

> Loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

在使用插件时，我们只需要通过 require 将插件引入，new 一个实例出来就可以。

```
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
    ]
}
```

### 模式 mode
用于告诉 webpack 启用哪种模式的内置优化
```
module.exports = {
    mode: "development"
}
```
| 选项 | 描述 |
| ------ | ------ |
| development | 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 |
| production | 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin. |
### bundle

bundle 即是 webpack 打包构建之后生成的文件。通常情况下，一个入口会对应一个 bundle 文件。
bundle 文件是由 chunk 片段组成的，每一个模块，都会生成一个 chunk 片段。例如入口文件和入口文件引用a.js打包后的chunk文件：
![bundle文件查看](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/webpack基础配置/bundle文件查看.png)
![bundle多依赖文件查看](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/webpack基础配置/bundle多依赖文件查看.png)
 
## defer 和 async 拓展
当浏览器解析到js脚本时:
    情况一：立即加载执行
``` <script src="index.js"></script>```
    情况二：异步解析，解析完成之后立即执行。
    可能在DOMContentLoaded事件执行之前或之后执行，一定会在loaded事件前执行。
    多个async脚本，谁先解析完成谁先执行
``` <script src="index.js" async></script>```
    情况三：异步解析，解析完成之后，需要等待文档解析完成之后，DOMContentLoaded 事件触发之前执行。
    有defer的脚本会阻止DOMContentLoaded事件，直到脚本解析完成。
    defer脚本会按照js顺序执行。

``` <script src="index.js" defer></script>```
情况四：既设置了 async,又设置了 defer 的脚本，如果浏览器两者都支持，则会按照 async 来处理脚本的解析和执行
``` <script src="index.js" async defer></script>```

![script脚本加载顺序](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/webpack基础配置/script脚本加载顺序.png)
情况五：浏览器在加载 es6 模块时，需要加入type = 'module' 属性，浏览器在识别到该属性时，会对脚本进行异步加载，表现形式上等同于 defer。
如果此时设置了 async，则会解析完成后立即执行，遵循 async 的执行规则。
``` <script src="index.js" type="module"></script>```

## 参考
[webpack官方文档](https://www.webpackjs.com/concepts/)
[阮一峰-es6入门模块化章节](https://es6.ruanyifeng.com/#docs/module)
[async、defer与DOMContentLoaded的执行先后关系](https://blog.csdn.net/zyj0209/article/details/79698430)