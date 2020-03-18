import {
  debounce
} from '@/common/utils'
import BackTop from 'content/backTop/BackTop'

export const itemListenerMixin = {
  data(){
    return {
      ItemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100);

    this.itemImgListener = () => {
      this.refresh();
      // console.log('yes');
      // this.$refs.scroll.refresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener);
  },
}
export const backTopMixin = {
  data(){
    return {
      isBackTopShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },
  components: {
    BackTop
  }
}