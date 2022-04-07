<template>
  <div class="login-container">
    <section class="login-logo">
      <img src="@/assets/img/icon.png" alt="" />
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  min-height: 800px;
  position: absolute;
  background: rgb(235, 245, 245);
}
.login-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  text-align: center;
  margin: 40px auto 30px auto;
  img {
    margin-top: 6px;
    width: 80px;
  }
}
</style>
