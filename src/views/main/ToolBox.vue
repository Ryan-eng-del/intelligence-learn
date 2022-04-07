<template>
  <div class="title">工具箱</div>
  <div class="gird">
    <div class="box" v-for="item in list" :key="item.name">
      <div class="logo">
        <!-- img -->
        {{ item.logo }}
      </div>
      <div class="side">
        <div class="name">{{ item.name }}</div>
        <div class="description">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBox",
  data() {
    return {
      list: [
        { logo: "logo", name: "name", description: "description" },
        { logo: "logo", name: "name", description: "description" },
        { logo: "logo", name: "name", description: "description" },
        { logo: "logo", name: "name", description: "description" }
      ]
    };
  }
};
</script>

<style>
.title {
  height: 100%;
  padding: 30px;
  font: 18px sans-serif;
}
.box {
  display: inline-grid;
  margin: 30px;
  position: relative;
  width: 264px;
  height: 94px;
  border: 1px black solid;
}
</style>
s
