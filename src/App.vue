<template>
  <div id="app">
    <keep-alive exclude="Detail">  
<!-- exclude属性， 游览器不缓存选择的页面 -->
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

