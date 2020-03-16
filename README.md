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
* 解决办法：修改了使用 `scrollTo` 方法处的延时数值

4. 详情页轮播图在轮播图片只有一张的情况下也会出现 `indicator`。
* 解决办法: 将 `indicator` 的判断条件修改为 `v-if` 指令即可。

5. 详情页点击顶部导航跳转的时候出现记录对应位置的 `offsetTop` 值远远小于实际值的情况，猜测为记录值时图片没有加载完全，高度出错。
* 解决办法：在子组件内部 `img` 加载完成后发射到父组件的事件中再次重新获取 `offsetTop`，此时基本解决。观察网络请求获取图片的时间可以发现慢的离谱。