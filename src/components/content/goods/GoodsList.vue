<template>
  <div class="goods">
    <goods-list-item 
      :goodsItem="item" 
      v-for="(item, index) in goods"
      :key="index" />
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem';

  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /* width: 100%; */
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>