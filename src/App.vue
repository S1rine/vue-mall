<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <!-- 使用 keep-alive 暂时用来解决该项目在
           第一次打开时轮播图无法正常轮播
           以及组件切换时轮播图再次失效的问题 -->
      <router-view></router-view>    
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'content/mainTabBar/MainTabBar'
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
