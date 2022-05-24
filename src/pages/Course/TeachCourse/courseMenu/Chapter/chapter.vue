<template>
  <n-layout
    class="chapter-container"
    content-style="padding: 30px 30px 30px 30px;"
  >
    <!--标题-->
    <n-h2 :align-text="false" prefix="bar" style="margin-right: 10px"
      >编辑章节</n-h2
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
        @click="dragEnable"
      >
        <template #icon>
          <n-icon>
            <add />
          </n-icon>
        </template>
        {{ dragDisable ? "完成调整顺序" : "开启调整" }}
      </n-button>
      <!--新建课程按钮-->
      <n-button
        style="height: 34px; width: 120px"
        size="medium"
        round
        type="primary"
        @click="showCreateNodeFn"
      >
        <template #icon>
          <n-icon>
            <add />
          </n-icon>
        </template>
        新建总节点
      </n-button>
    </div>
    <!-- 树形选择器 -->
    <n-tree
      :data="data"
      selectable
      default-expand-all
      block-line
      @drop="handleDrop"
      :draggable="dragDisable"
      :node-props="nodeProps"
      :render-switcher-icon="renderSwitcherIcon"
    ></n-tree>
    <!-- 右键菜单 -->
    <n-dropdown
      trigger="manual"
      placement="bottom-start"
      :show="showDropdown"
      :options="options"
      :x="x"
      :y="y"
      @select="handleSelect"
      @clickoutside="handleClickoutside"
    />
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref, h } from "vue";
import Add from "@/components/iconComponents/Add.vue";
import { TreeOption, NIcon, DropdownOption, TreeDropInfo } from "naive-ui";
import { ChevronForward } from "@vicons/ionicons5";
import { getRandomInt } from "element-plus/lib/utils";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "chapter",
  components: {
    Add
  },
  setup() {
    const dataRef = ref([
      {
        label: "Chapter I",
        key: 1,
        children: [
          { label: "Chapter I-I", key: 11, children: [] },
          { label: "Node I-II", key: 12, isLeaf: true }
        ]
      },
      { label: "Node II", key: 2, isLeaf: true },
      { label: "Node aa", key: 3, isLeaf: true },
      { label: "Node cc", key: 4, isLeaf: true },
      { label: "Node kk", key: 5, isLeaf: true },
      { label: "Node gg", key: 6, isLeaf: true }
    ]);

    function showCreateNodeFn() {
      dataRef.value.push({
        label: "Node New",
        key: getRandomInt(999),
        children: []
      });
    }

    const showDropdownRef = ref(false);
    const DropdownOption = ref(); //下拉菜单的选项
    const optionsRef = ref<DropdownOption[]>([]);
    const router = useRouter();
    const xRef = ref(0);
    const yRef = ref(0);

    // 删除节点
    function deleteNode(data = dataRef.value) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key == DropdownOption.value.key) {
          data.splice(i, 1);
        } else if (data[i].children) {
          deleteNode(data[i].children);
        }
      }
    }
    // 点击了右键菜单选项
    const handleSelect = (key: string | number) => {
      switch (key) {
        case "new":
          DropdownOption.value.children.push({
            label: "可学习内容",
            key: getRandomInt(999)
          });
          break;
        case "delete":
          deleteNode();
          break;
        case "newNode":
          DropdownOption.value.children.push({
            label: "新文件夹",
            key: getRandomInt(999),
            children: []
          });
          break;
        case "rename":
          // TODO:
          console.log("rename");
          break;
      }
      showDropdownRef.value = false;
    };

    // 仅关闭菜单
    const handleClickoutside = () => {
      showDropdownRef.value = false;
    };

    // 节点功能设置
    const nodeProps = ({ option }: { option: TreeOption }) => {
      return {
        style: {
          height: "30px"
        },
        onClick() {
          if (option.children == undefined) {
            const condition = true;
            if (condition) {
              //如果资源存在
              router.push({
                path: `/chapter/${router.currentRoute.value.params.courseId}/preview/${option.key}`
              });
            } else {
              //如果资源不存在
              router.push({
                path: `/chapter/${router.currentRoute.value.params.courseId}/editor/${option.key}`
              });
            }
          }
        },
        onContextmenu(e: MouseEvent): void {
          DropdownOption.value = option;
          optionsRef.value = [
            { label: "重命名", key: "rename" },
            { label: "删除", key: "delete" }
          ];
          // 是文件夹才有
          if (option.children !== undefined) {
            optionsRef.value.push(
              { label: "添加内容", key: "new" },
              { label: "新建子节点", key: "newNode" }
            );
          }
          showDropdownRef.value = true;
          xRef.value = e.clientX;
          yRef.value = e.clientY;
          e.preventDefault();
        }
      };
    };
    // 拖拽功能
    const dragDisable = ref(false); //拖拽模式开关
    function dragEnable() {
      if (dragDisable.value) {
        dragDisable.value = false;
      } else {
        dragDisable.value = true;
      }
    }
    function findSiblingsAndIndex(
      node: TreeOption,
      nodes?: TreeOption[]
    ): [TreeOption[], number] | [null, null] {
      if (!nodes) return [null, null];
      for (let i = 0; i < nodes.length; ++i) {
        const siblingNode = nodes[i];
        if (siblingNode.key === node.key) return [nodes, i];
        const [siblings, index] = findSiblingsAndIndex(
          node,
          siblingNode.children
        );
        if (siblings && index !== null) return [siblings, index];
      }
      return [null, null];
    }
    function handleDrop({ node, dragNode, dropPosition }: TreeDropInfo) {
      const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
        dragNode,
        dataRef.value
      );
      if (dragNodeSiblings === null || dragNodeIndex === null) return;
      dragNodeSiblings.splice(dragNodeIndex, 1);
      if (dropPosition === "inside") {
        if (node.children) {
          node.children.unshift(dragNode);
        } else {
          node.children = [dragNode];
        }
      } else if (dropPosition === "before") {
        const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
          node,
          dataRef.value
        );
        if (nodeSiblings === null || nodeIndex === null) return;
        nodeSiblings.splice(nodeIndex, 0, dragNode);
      } else if (dropPosition === "after") {
        const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
          node,
          dataRef.value
        );
        if (nodeSiblings === null || nodeIndex === null) return;
        nodeSiblings.splice(nodeIndex + 1, 0, dragNode);
      }
      dataRef.value = Array.from(dataRef.value);
    }
    //树的左侧图标
    const renderSwitcherIcon = () =>
      h(NIcon, null, { default: () => h(ChevronForward) });

    return {
      data: dataRef, //数据
      showCreateNodeFn, //创建根节点
      dragDisable, //启用拖拽
      handleDrop, //启用拖拽
      dragEnable, //启用拖拽
      showDropdown: showDropdownRef, //下拉菜单
      x: xRef, //下拉菜单
      y: yRef, //下拉菜单
      options: optionsRef, //下拉菜单
      handleSelect, //下拉菜单
      handleClickoutside, //下拉菜单
      nodeProps,
      renderSwitcherIcon
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
