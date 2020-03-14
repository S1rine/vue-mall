# vue-mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### bug 记录

1. 轮播图只显示一张图
* 解决办法: 将 `Swiper.vue` 中的初始函数延时做修改.
```javascript
    mounted: function () {
      // 1.操作DOM, 在前后添加Slide
      setTimeout(() => {
        this.handleDom();

        // 2.开启定时器
        this.startTimer();
      }, 300)
      // 时间从100修改为300 即可解决 进入首页轮播图
      // 不轮播的bug 
    },
```
2. 解决完1的 `bug` 后, 详情页轮播图图片无法轮播,只有底部的点在跳转.
* 解决办法: `DetailSwiper` 中误写了一个 `swiper` 类名来限制轮播图的高度与溢出隐藏,与内部冲突,修改类名即可.
* 原因: 查询内部轮播图组件代码发现, 移动使用了 `dom` 元素查找然后挂载行内样式来实现, 因此查找的元素不止一个出现错乱.

3. 详情页返回至首页无法保留初始位置,会直接返回顶部,效果类似于点击了 `backTop` 