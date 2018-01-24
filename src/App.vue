<template>
  <div id="app">
    <div class="base-bg"></div>
    <navigation>
        <router-view></router-view>
    </navigation>
  </div>
</template>

<script>
// navigation
// import { mapState, mapActions } from 'vuex'
export default {
  name: 'app'
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "./styles/common.less";
* {
-webkit-touch-callout:none;
-webkit-user-select:none;
-khtml-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
}
body {
  background-color: @page-bg;
}
.base-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: @page-bg;
  z-index: 0;
}
.load-more-view{
  height: 50px;
}
</style>
