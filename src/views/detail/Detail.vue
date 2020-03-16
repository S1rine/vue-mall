<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" 
                    @titleClick="titleClick"
                    ref="nav" />
    <scroll class="content" 
            ref="scroll"
            :data="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, recommend]"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper ref="base" :top-images="topImages" />
      <detail-base-info :goods="goods" class="base-info" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childCmps/DetailNavBar'
  import DetailSwiper from './childCmps/DetailSwiper'
  import DetailBaseInfo from './childCmps/DetailBaseInfo'
  import DetailShopInfo from './childCmps/DetailShopInfo'
  import DetailGoodsInfo from './childCmps/DetailGoodsInfo'
  import DetailParamInfo from './childCmps/DetailParamInfo'
  import DetailCommentInfo from './childCmps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'content/goods/GoodsList'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
  import {itemListenerMixin} from '@/common/mixin'
  import { debounce } from '@/common/utils'

  export default {
    name: "Detail",
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    methods: {
      imageLoad(){
        this.refresh();
        this.getThemeTopY();
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      },
      contentScroll(pos){
        const positionY = -pos.y;
        let length = this.themeTopYs.length;
        for(let i = 0;i<length;i++){
          if((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) 
            || (i === length - 1 
                && positionY >= this.themeTopYs[i]))){
             this.currentIndex = i;
             this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        // console.log(positionY);
        // console.log(this.themeTopYs[1]);
      }
    },
    mixins: [itemListenerMixin],
    created(){
      this.iid = this.$route.params.iid;
      
      getDetail(this.iid).then(res => {
        const data = res.result;
        // 获取顶部轮播图片数据
        this.topImages = data.itemInfo.topImages;
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // 获取商家信息
        this.shop = new Shop(data.shopInfo);
        // 获取商品详细数据
        this.detailInfo = data.detailInfo;
        // 获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }        
      })

      // 请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list;
      })
      
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(this.$refs.base.$el.offsetTop);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      }, 100)
    },
    mounted(){
      
    },
    updated(){
      // console.log('data updated');
      // this.getThemeTopY();
    },
    destroyed(){
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px)
  }
  .nav-bar {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
</style>