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
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isBackTopShow" />
    <!-- <toast :show="toastShow" :message="toastMessage" /> -->
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
  import DetailBottomBar from './childCmps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'content/goods/GoodsList'
  // import Toast from 'common/toast/Toast'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from '@/common/mixin'
  import { debounce } from '@/common/utils'

  import { mapActions } from 'vuex'

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
        // toastShow: false,
        // toastMessage: ''
      }
    },
    methods: {
      ...mapActions(['addCart']),

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
        for(let i = 0;i<length - 1;i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        // 判断 backTop 是否需要显示
        this.isBackTopShow = (positionY) > 1000
        // console.log(position);
        // console.log(positionY);
        // console.log(this.themeTopYs[1]);
      },
      addToCart(){
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        
        // 将商品添加到购物车
        this.addCart(product).then(res => {
          // this.toastShow = true;
          // this.toastMessage = res;

          // setTimeout(() => {
          //   this.toastShow = false;
          // }, 1500)
          console.log(this.$toast);
          this.$toast.toShow(res, 1500);
        })
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
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
        this.themeTopYs.push(Number.MAX_VALUE);
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
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast,
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