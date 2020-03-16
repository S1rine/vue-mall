import { debounce } from '@/common/utils'
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