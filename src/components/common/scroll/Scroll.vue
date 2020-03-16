<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      data: {
		    type: Array,
        default: () => {
          return []
        }
      },
    },
    data(){
      return {
        scroll: {}
      }
    },
    mounted(){
      // 创建 BScroll 对象
      setTimeout(this.__initScroll, 20);
    },
    methods: {
      __initScroll(){
        if(!this.$refs.wrapper) return;
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })
        // 监听滚动的位置
        if(this.probeType === 2 || this.probeType === 3){
          this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
          })
        }
        // 监听上拉事件
        if(this.pullUpLoad){
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      },
      scrollTo(x, y, time=300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
      },
      refresh(){
        this.scroll && this.scroll.refresh && this.scroll.refresh();
      },
      getScrollY(){
        return this.scroll.y ? this.scroll.y : 0
      }
    },
    watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style scoped>
  
</style>