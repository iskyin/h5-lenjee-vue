# h5-lenjee-vue

## 异步加载组件
```
修改webpack:
output: {
  path: resolve(__dirname, 'dist'),
  filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
  chunkFilename: 'chunk[id].js?[chunkhash]',
  publicPath: options.dev ? '/assets/' : publicPath
}
chunkFilename路径将会作为组件懒加载的路径

配合webpack支持的异步加载方法：
  1. resolve => require([URL], resolve)
    支持性好
  2. () => system.import(URL)
    webpack2官网上已经声明将逐渐废除, 不推荐使用
  3. () => import(URL)
    webpack2官网推荐使用, 属于es7范畴, 需要配合babel的syntax-dynamic-import插件使用
    安装依赖：
      npm install --save-dev babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-es2015

```
