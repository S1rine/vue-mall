<template>
  <div class="detail-swiper">
    <swiper class="swiper">
      <swiper-item v-for="(item, index) in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'common/swiper'

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default(){
          return [];
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
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .swiper{
    height: 300px;
    overflow: hidden;
  }
</style>