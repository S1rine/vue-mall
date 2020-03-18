<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      toShow(message='默认文字', duration=2000){
        this.isShow = true;
        this.message = message;

        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration)
      }
    },
    components: {
      
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .8);
  }
</style>