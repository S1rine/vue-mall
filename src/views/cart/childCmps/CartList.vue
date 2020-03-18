<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
        v-for="(item, index) in cartList" 
        :key="index" 
        :product="item" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    data(){
      return {
        
      }
    },
    methods: {
      
    },
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 93px - 40px);
    overflow: hidden;
  }
  .content {
    height: 100%;
  }
</style>