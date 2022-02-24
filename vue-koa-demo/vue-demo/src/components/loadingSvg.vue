<!--圆环形 加载状态-->
<template>
  <Spin fix>
    <svg class="load" viewBox="10 10 80 80">
      <circle cx="50" cy="50" r="30" stroke="#eee" stroke-width="6" fill="none" stroke-dasharray="1,18" stroke-linecap="round" />
      <circle class="loading" cx="50" cy="50" r="30" stroke="rgb(53,157,218)" fill="none" stroke-linecap="round" />
    </svg>
  </Spin>
</template>

<script>
  export default {
    name: "loadingSvg"
  }
</script>

<style scoped>
  .load{
    width: 30px;
    height: 30px;
    stroke-dasharray: 10,10;
    stroke-dashoffset: 10;
    animation:rotate 10s linear infinite;
  }

  .loading{
    stroke: rgb(53,157,218);
    stroke-width: 5;
    fill:none;
    animation: dash 1.5s linear infinite;
  }

  @keyframes dash{
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }

    50%{
      stroke-dasharray: 130,200;
      stroke-dashoffset: -50;
    }

    100% {
      stroke-dasharray: 130,200;
      stroke-dashoffset: -188;
    }
  }

  @keyframes rotate{
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

</style>
