<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>        
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control class="tab-control" 
            :titles="['流行','新款','精选']"
            @tabClick="tabClick"
            ref="tabControl1" 
            v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <!-- 直接传入 probe-type 会导致 3 为字符串类型 -->
      <!-- 动态绑定传入就会是数字类型 -->
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackTopShow" />
    <!-- .native 修饰符用于监听事件，vue 组件默认无法监听 -->
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  import NavBar from 'common/navbar/NavBar'
  import TabControl from 'content/tabControl/TabControl'
  import GoodsList from 'content/goods/GoodsList'
  import Scroll from 'common/scroll/Scroll'
  import BackTop from 'content/backTop/BackTop'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'
  import { debounce } from '@/common/utils';

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,

      TabControl,
      NavBar,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isBackTopShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        savedY: 0,
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /**
       * 网络请求相关
       */
      getHomeMultidata(){
        // 请求轮播图 推荐数据 
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type){
        // 请求商品数据
        const page = this.goods[type].page + 1;
        // 动态获取当前类别商品的下一页
        getHomeGoods(type, page).then(res => {
          // 展开返回值数组，依次 push 进 list 中防止
          // 原有数据被覆盖
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page;
        })
      },
      /**
       * 事件监听相关
       */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position){
        // 判断 backTop 是否需要显示
        this.isBackTopShow = (-position.y) > 1000
        // console.log(position);
        // 判断 tabControl 是否吸顶（display: flxed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
      },
      swiperImageLoad(){
        // 获取 tabControl 的 offsetTop
        // vue 组件无法直接获取到 oeffsetTop 属性
        // 所有组件都有一个属性 $el, 用于获取组件内部元素
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },
    },
    created(){
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted(){
      // 监听事件总线中的图片加载完成事件
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      this.$bus.$on('itemImageLoad', () => {
        refresh();
        // this.$refs.scroll.refresh();
      })

    },
    activated(){
      this.$refs.scroll.scrollTo(0, this.savedY, 10);
      this.$refs.scroll.refresh();
    },
    deactivated(){
      this.savedY = this.$refs.scroll.getScrollY();
      // this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    padding-bottom: 49px;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了避免导航栏的滚动 */
    /* 绝对定位导航栏，换用better-scroll后可以取消 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* 换用 betterscroll 后 该属性失效 */
  /* .tab-control {
    吸顶属性
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  /* 顶部新的组件的属性 */
  .tab-control {
    position: relative;
    z-index: 9;

  }
  .content {
    /* height: 100%; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
