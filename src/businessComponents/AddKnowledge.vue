<template>
  <n-tree
    :data="data"
    checkable
    default-expand-all
    block-line
    :node-props="nodeProps"
    :on-update:checked-keys="handleCheck"
  ></n-tree>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddKnowledge",
  props: {
    //已存在的列表
    exist: {
      type: Array
    },
    //渲染的列表
    list: {
      // TODO: 这里应该是Ref<Array> ，
      type: Array,
      require: true
    }
  },
  setup(props, context) {
    console.log(
      "scr/businessComponents/AddKnowledge 组件引发了一个类型检查失败警告。请大佬修复"
    );
    const nodeProps = () => {
      return {
        style: {
          // height: "30px"
        }
      };
    };
    function handleCheck(_, option) {
      context.emit("submit", option);
    }
    return {
      data: props.list,
      nodeProps,
      handleCheck
    };
  }
});
</script>

<style></style>
