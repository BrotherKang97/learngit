<template>
  <div class="index">
    <header-bar/>
    <router-view/>
  </div>
</template>

<script>
  import headerBar from "../components/Header"
  export default {
    components: {headerBar},
  }
</script>

<style scoped>
  .index{
    min-height: 100vh;
    background-image: url("../assets/pgy.jpg");
    background-attachment: fixed;
  }
</style>
