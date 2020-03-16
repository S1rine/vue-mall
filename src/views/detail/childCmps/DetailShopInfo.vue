<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | showNumbers}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {      
      shop: {
        type: Object,
        default(){
          return {};
        }
      }
    },
    data(){
      return {
        
      }
    },
    methods: {
      
    },
    components: {
      
    },
    filters: {
      showNumbers(count){
        if(count > 10000){
          return (count / 10000).toFixed(1) + '万'
        }else{
          return count
        }
      }
    }
  }
</script>

<style scoped>
  .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .shop-top img {
    width: 45px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.1);
    vertical-align: middle;
  }
  .shop-top .title {
    margin-left: 10px;
  }
  .shop-middle {
    /* margin: 0 0 0 20px; */
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .shop-middle-item {
    flex: 1;
  }
  .shop-middle-left {
    display: flex;
    border-right: 1px solid rgba(0,0,0,.1);
    text-align: center;
    color: #333;
    /* margin: 19px 0; */
    /* font-weight: bold; */
    justify-content: space-evenly;
  }
  .sells-count, .goods-count {
    font-size: 18px;
  }
  .sells-text, .goods-text {
    font-size: 12px;
    margin-top: 10px;
  }
  .shop-middle-right {
    /* padding-left: 25px; */
    font-size: 12px;
    color: #333;
  }
  .shop-middle-right table {
    border-collapse: sepatate;
    width: 120px;
    margin-left: 30px;
    /* border-spacing: 10px; */
  }
  .shop-middle-right table td {
    padding: 5px 0;
  }
  .score{
    color: #5ea732;
  }
  .score-better{
    color: #f13e3a;
  }
  .better span {
    text-align: cetner;
    background-color: #5ea732;
    color: #fff;
  }
  .better-more span {
    color: #fff;
    background-color: #f13e3a;
  }
  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }
  .shop-bottom .enter-shop {
    display: inline-block;
    height: 30px;
    width: 150px;
    background-color: #f2f5f8;
    color: #000;
    font-size: 14px;
    line-height: 30px;
    border-radius: 10px;
  }
</style>