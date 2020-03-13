<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>        
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <home-feature-view></home-feature-view>
    <tab-control class="tab-control" 
                :titles="['流行','新款','精选']"
                @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  import NavBar from 'common/navbar/NavBar'
  import TabControl from 'content/tabControl/TabControl'
  import GoodsList from 'content/goods/GoodsList'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,

      TabControl,
      NavBar,
      GoodsList,
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
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    created(){
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

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
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    padding-bottom: 49px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /* 吸顶属性 */
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
