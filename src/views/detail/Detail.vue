<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <DetailSwiper :top-images="topImages"></DetailSwiper>
  </div>
</template>

<script>
  import DetailNavBar from './childCmps/DetailNavBar'
  import DetailSwiper from './childCmps/DetailSwiper'

  import {getDetail} from 'network/detail'

  export default {
    name: "Detail",
    data(){
      return {
        iid: null,
        topImages: [],
      }
    },
    methods: {
      
    },
    created(){
      this.iid = this.$route.params.iid;
      
      getDetail(this.iid).then(res => {
        // 获取顶部轮播图片数据
        this.topImages = res.result.itemInfo.topImages;
        console.log(res.result);
      })
    },
    components: {
      DetailNavBar,
      DetailSwiper,
    }
  }
</script>

<style scoped>
  
</style>