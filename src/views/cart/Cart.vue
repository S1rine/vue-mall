<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>
          购物车({{length}})
        </div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-buttom-bar />
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'

  import CartList from './childCmps/CartList'
  import CartButtomBar from './childCmps/CartButtomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtomBar
    },
    computed: {
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
    z-index: 9;
    position: relative;
  }
</style>
