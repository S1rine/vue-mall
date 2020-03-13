<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
        class="tab-control-item"
        :class="index == currentIndex ? 'active' : ''"
        @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    data(){
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    },
    components: {
      
    }
  }
</script>

<style scoped>
  .tab-control {
    height: 40px;
    display: flex;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active span {
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-tint);
  }
</style>