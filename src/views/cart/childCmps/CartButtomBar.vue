<template>
  <div class="bottom-bar">
    <div class="check-wrapper">
      <check-button @click.native="checkChange" :is-checked="isCheckedAll" class="bar-check-button" />
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="check-in" @click="checkClick">
      去结算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartButtomBar",
    data(){
      return {
        
      }
    },
    methods: {
      checkChange(){
        // if(this.isCheckedAll){
        //   for(let item of this.cartList){
        //     item.checked = false;
        //   }
        // }else {
        //   for(let item of this.cartList){
        //     item.checked = true;
        //   }
        // }
        const check = this.isCheckedAll;
        this.cartList.forEach(item => item.checked = !check)
      },      
      checkClick(){
        if(!this.siCheckedAll){
          this.$toast.toShow('请选择要购买的商品');
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥'+this.cartList.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0)
      },
      checkedLength(){
        return this.cartList.filter(item => item.checked).length;
      },
      isCheckedAll(){
        if(this.cartList.length === 0 ) return false;
        return !this.cartList.find(item => !item.checked)
      },
    },
    components: {
      CheckButton
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #fff;
    position: relative;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .check-wrapper {
    display: flex;
    /* line-height: 40px; */
    align-items: center;
    margin-left: 10px;

  }
  .bar-check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
    /* display: inline-block; */
  }
  .price {
    margin-left: 20px;
  }
  .check-in {
    padding: 0 10px;
    color: #fff;
    font-size: 13px;
    background-color: red;
  }
</style>