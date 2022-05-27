<template>
  <n-layout
    class="chapter-container"
    content-style="padding: 30px 30px 30px 30px;"
  >
    <!--标题-->
    <n-h2 :align-text="false" prefix="bar" style="margin-right: 10px"
      >知识点部分</n-h2
    >
    <n-divider />
    <!--操作区-->
    <div class="operation">
      <!--搜索框-->
      <n-input-group style="width: 260px">
        <n-input style="width: 200px" />
        <n-button type="primary">搜索</n-button>
      </n-input-group>
      <!--新建课程按钮-->
      <n-button
        style="height: 34px; width: 120px"
        size="medium"
        round
        type="primary"
        @click="createNode"
      >
        <template #icon>
          <n-icon><add /></n-icon>
        </template>
        新建总节点
      </n-button>
    </div>
    <!-- 树形选择器 -->
    <n-tree :data="data" selectable block-line :node-props="nodeProps"></n-tree>
    <!-- 右键菜单 -->
    <n-dropdown
      trigger="manual"
      placement="bottom-start"
      :show="showDropdown"
      :options="options"
      :x="Menu.xRef.value"
      :y="Menu.yRef.value"
      default-expand-all
      @select="Menu.handleSelect"
      @clickoutside="Menu.handleClickoutside"
    />
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Add from "@/components/iconComponents/Add.vue";
import { TreeOption, DropdownOption } from "naive-ui";
import { getRandomInt } from "element-plus/lib/utils";

export default defineComponent({
  name: "chapter",
  components: {
    Add
  },
  setup() {
    const dataRef = ref([
      {
        label: "知识点1",
        key: 1
      }
    ]);
    // 添加总节点
    function createNode() {
      dataRef.value.push({
        label: "Node New",
        key: getRandomInt(999)
      });
    }

    const showDropdownRef = ref(false);
    const DropdownOption = ref(); //下拉菜单的选项
    const optionsRef = ref<DropdownOption[]>([]);

    // 删除节点
    function deleteNode(data = dataRef.value) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key == DropdownOption.value.key) {
          data.splice(i, 1);
        } else if ((data[i] as any).children) {
          deleteNode((data[i] as any).children);
        }
      }
    }

    const Menu = {
      xRef: ref(0),
      yRef: ref(0),
      // 仅关闭菜单
      handleClickoutside() {
        showDropdownRef.value = false;
      },
      // 点击了右键菜单选项
      handleSelect(key: string | number) {
        switch (key) {
          case "new":
            if (!DropdownOption.value.children) {
              DropdownOption.value.children = [];
            }
            DropdownOption.value.children.push({
              label: "新子知识点",
              key: getRandomInt(999)
            });
            break;
          case "delete":
            deleteNode();
            break;
          case "rename":
            // TODO:
            console.log("rename");
            break;
        }
        showDropdownRef.value = false;
      }
    };
    // 节点功能设置
    const nodeProps = ({ option }: { option: TreeOption }) => {
      return {
        style: {
          height: "30px"
        },
        onContextmenu(e: MouseEvent): void {
          DropdownOption.value = option;
          optionsRef.value = [
            { label: "重命名", key: "rename" },
            { label: "删除", key: "delete" },
            { label: "新建子知识点", key: "new" }
          ];
          showDropdownRef.value = true;
          Menu.xRef.value = e.clientX;
          Menu.yRef.value = e.clientY;
          e.preventDefault();
        }
      };
    };
    return {
      data: dataRef, //数据
      createNode, //创建根节点
      showDropdown: showDropdownRef, //下拉菜单
      Menu,
      options: optionsRef, //下拉菜单
      nodeProps
    };
  }
});
</script>

<style lang="less">
.chapter-container {
  cursor: default;

  .operation {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 4px 30px 30px 30px;
    box-sizing: border-box;
    align-items: center;
  }

  .cour-list {
    padding: 0 30px 0 30px;

    .cour-glance {
      margin-bottom: 40px;
    }

    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding-top: 40px;

      .title {
        font-size: 20px;
        // font-family: @font-family;
        font-weight: 500;
        transform: translateY(-14px);
      }
    }
  }
}
</style>
