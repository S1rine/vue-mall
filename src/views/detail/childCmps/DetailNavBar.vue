<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>        
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item, index) in titles" 
               class="title-item"
               @click="titleClick(index)"
               :class="{active: index == currentIndex}">{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    props: {
      // currentIndex: {
      //   type: Number,
      //   default: 0
      // }
    },
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick(){
        this.$router.back();
      }
    },
    components: {
      NavBar,
    },
    watch: {
      // currentIndex(){
      //   // console.log;
      //   this.myCurrentIndex = this.currentIndex;
      // }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 10px;
  }
</style>